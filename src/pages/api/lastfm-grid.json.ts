import type { APIRoute } from "astro";

export const prerender = false;

const LAST_FM_ENDPOINT = "https://ws.audioscrobbler.com/2.0/";
const CACHE_CONTROL = "public, s-maxage=10800, stale-while-revalidate=86400";
const coverSizeRank = new Map([
  ["mega", 5],
  ["extralarge", 4],
  ["large", 3],
  ["medium", 2],
  ["small", 1],
]);

export const GET: APIRoute = async () => {
  const apiKey = import.meta.env.LASTFM_API_KEY ?? process.env.LASTFM_API_KEY;
  const username = import.meta.env.LASTFM_USERNAME ?? process.env.LASTFM_USERNAME;

  if (!apiKey || !username) {
    return json(
      { error: "Last.fm is not configured. Set LASTFM_API_KEY and LASTFM_USERNAME." },
      500,
      "no-store",
    );
  }

  try {
    const url = new URL(LAST_FM_ENDPOINT);
    url.search = new URLSearchParams({
      method: "user.getTopAlbums",
      api_key: apiKey,
      user: username,
      period: "1month",
      limit: "9",
      autocorrect: "1",
      format: "json",
    });
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Last.fm returned ${response.status}`);
    }

    const payload = await response.json();
    if (payload.error) {
      throw new Error(payload.message || "Last.fm request failed");
    }

    const albums = Array.isArray(payload.topalbums?.album)
      ? payload.topalbums.album
      : [];
    const result = albums.slice(0, 9).map((album) => ({
      artist: String(album.artist?.name || album.artist || "Unknown artist"),
      title: String(album.name || "Untitled album"),
      coverUrl: getLargestCover(album.image),
      playcount: Number(album.playcount) || 0,
    }));

    return json(result, 200, CACHE_CONTROL);
  } catch (error) {
    console.error("Last.fm grid request failed:", error);
    return json({ error: "Last.fm could not be reached right now." }, 502, "no-store");
  }
};

function getLargestCover(images) {
  return [...(images ?? [])]
    .map((image) => ({
      size: image?.size,
      url: String(image?.["#text"] || image?.url || "").trim(),
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

function json(body, status, cacheControl) {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Cache-Control": cacheControl,
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
