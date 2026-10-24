import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";

const cwd = process.cwd();
const apiKey = process.env.LASTFM_API_KEY;
const defaultInputs = [
  resolve(cwd, "src/patr-music-export.csv"),
  resolve(cwd, "data/rym-export.csv"),
];
const inputPath = process.argv[2]
  ? resolve(cwd, process.argv[2])
  : defaultInputs.find((candidate) => existsSync(candidate));
const outputPath = resolve(cwd, "src/data/rym-covers.json");
const lastFmEndpoint = "https://ws.audioscrobbler.com/2.0/";
const requestInterval = 250;
const coverSizeRank = new Map([
  ["mega", 5],
  ["extralarge", 4],
  ["large", 3],
  ["medium", 2],
  ["small", 1],
]);

if (!apiKey) {
  console.error("Missing LASTFM_API_KEY. Set it before running this script.");
  process.exitCode = 1;
} else if (!inputPath) {
  console.error("Could not find src/patr-music-export.csv or data/rym-export.csv.");
  process.exitCode = 1;
} else {
  await buildCovers();
}

async function buildCovers() {
  const csv = await readFile(inputPath, "utf8");
  const rows = parseCsv(csv);
  const candidates = rows
    .map((row) => {
      const localizedArtist = joinName(row["First Name localized"], row["Last Name localized"]);
      const originalArtist = joinName(row["First Name"], row["Last Name"]);

      return {
        artist: localizedArtist || originalArtist,
        title: clean(row.Title),
        rating: Number(clean(row.Rating)),
      };
    })
    .filter(
      (row) =>
        (row.rating === 10 || row.rating === 9) && row.artist && row.title,
    );

  const covers = [];
  let skipped = rows.filter((row) => {
    const rating = Number(clean(row.Rating));
    return rating === 10 || rating === 9;
  }).length - candidates.length;

  for (const [index, candidate] of candidates.entries()) {
    const album = await getAlbumInfo(candidate.artist, candidate.title, apiKey);
    const coverUrl = getLargestCover(album?.image);

    if (!coverUrl) {
      skipped += 1;
    } else {
      covers.push({ ...candidate, coverUrl });
    }

    if ((index + 1) % 25 === 0 || index === candidates.length - 1) {
      console.log(`Processed ${index + 1}/${candidates.length}`);
    }
  }

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(covers, null, 2)}\n`, "utf8");

  console.log(`Cover found: ${covers.length}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Wrote: ${outputPath}`);
}

function clean(value) {
  return decodeEntities(String(value ?? "")).trim();
}

function decodeEntities(value) {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function joinName(first, last) {
  return [clean(first), clean(last)].filter(Boolean).join(" ");
}

function parseCsv(input) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < input.length; index += 1) {
    const character = input[index];

    if (inQuotes) {
      if (character === '"' && input[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (character === '"') {
        inQuotes = false;
      } else {
        field += character;
      }
      continue;
    }

    if (character === '"' && field.length === 0) {
      inQuotes = true;
    } else if (character === ",") {
      row.push(field);
      field = "";
    } else if (character === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else if (character !== "\r") {
      field += character;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const headers = (rows.shift() ?? []).map((header) => header.replace(/^\uFEFF/, "").trim());
  return rows
    .filter((values) => values.some((value) => clean(value)))
    .map((values) =>
      Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])),
    );
}

async function getAlbumInfo(artist, title, key) {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    await waitForRateLimit();

    try {
      const url = new URL(lastFmEndpoint);
      url.search = new URLSearchParams({
        method: "album.getInfo",
        api_key: key,
        artist,
        album: title,
        autocorrect: "1",
        format: "json",
      });
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Last.fm returned ${response.status}`);
      }

      const payload = await response.json();
      if (payload.error || !payload.album) {
        throw new Error(payload.message || "Album not found");
      }

      return payload.album;
    } catch (error) {
      if (attempt === 1) {
        console.warn(`Skipped ${artist} — ${title}: ${error.message}`);
      } else {
        await sleep(350);
      }
    }
  }

  return null;
}

async function waitForRateLimit() {
  const now = Date.now();
  const wait = requestInterval - (now - (waitForRateLimit.lastRequestAt ?? 0));
  if (wait > 0) await sleep(wait);
  waitForRateLimit.lastRequestAt = Date.now();
}

function getLargestCover(images) {
  return [...(images ?? [])]
    .map((image) => ({
      size: image?.size,
      url: clean(image?.["#text"] || image?.url),
    }))
    .filter(({ url }) => isUsableCover(url))
    .sort((a, b) => (coverSizeRank.get(b.size) ?? 0) - (coverSizeRank.get(a.size) ?? 0))
    .at(0)?.url ?? null;
}

function isUsableCover(url) {
  const normalized = url.toLowerCase();
  return Boolean(
    /^https?:\/\//.test(url) &&
      !normalized.includes("2a96cbd8b46e442fc41c2b86b821562f") &&
      !normalized.includes("default_album") &&
      !normalized.includes("noimage"),
  );
}

function sleep(milliseconds) {
  return new Promise((resolvePromise) => setTimeout(resolvePromise, milliseconds));
}
