export interface ProjectSource {
  label: string;
  href: string;
}

export interface PortfolioProject {
  number: string;
  title: string;
  type: string;
  typeKey: string;
  href: string;
  image?: string;
  imageAlt?: string;
  visualText?: string;
  stat?: string;
  statKey?: string;
  wip?: boolean;
  wipKey?: string;
  tone?: "oppo" | "ink";
  size?: "wide" | "narrow" | "standard";
  sources: ProjectSource[];
}

export const patrykProjects: PortfolioProject[] = [
  {
    number: "01 / 2026",
    title: "OPPO Reno16 5G",
    type: "motion · social campaign",
    typeKey: "portfolioOppoType",
    href: "https://www.tiktok.com/@oppopoland/video/7675669840618605857",
    visualText: "RENO16",
    stat: "8.4M + 11.4M",
    statKey: "portfolioOppoStat",
    tone: "oppo",
    size: "wide",
    sources: [
      {
        label: "video 01",
        href: "https://www.tiktok.com/@oppopoland/video/7675669840618605857",
      },
      {
        label: "video 02",
        href: "https://www.tiktok.com/@oppopoland/video/7677598965516274976",
      },
    ],
  },
  {
    number: "02 / 2024",
    title: "Ruddy Corp — NLC Finals",
    type: "campaign · event poster",
    typeKey: "portfolioRuddyNlcType",
    href: "https://www.behance.net/gallery/247442095/Ruddy-Corp-NLC-Finals-Event-Poster-(2024)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/c59fa9247442095.Y3JvcCwxMTI1LDg3OSwwLDMwOQ.jpg",
    imageAlt: "Ruddy Corp NLC Finals event poster",
    size: "narrow",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247442095/Ruddy-Corp-NLC-Finals-Event-Poster-(2024)",
      },
    ],
  },
  {
    number: "03 / 2023",
    title: "RUDDY Halloween Drop",
    type: "campaign · apparel design",
    typeKey: "portfolioRuddyHalloweenType",
    href: "https://www.behance.net/gallery/247441467/RUDDY-Halloween-Drop-Campaign-Apparel-Design-(2023)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/dc0f36247441467.Y3JvcCwzOTk5LDMxMjgsMCw0MzU.png",
    imageAlt: "RUDDY Halloween Drop campaign and apparel design",
    size: "standard",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247441467/RUDDY-Halloween-Drop-Campaign-Apparel-Design-(2023)",
      },
    ],
  },
  {
    number: "04 / 2025",
    title: "Chodź Się Bawić",
    type: "brand identity · social strategy",
    typeKey: "portfolioCsbType",
    href: "https://www.behance.net/gallery/247443937/Chodz-Sie-Bawic-Logo-Revamp-Brand-Identity-(2025)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/bcb8f0247443937.Y3JvcCwyMDg0LDE2MzAsMCwyMjY.png",
    imageAlt: "Chodź Się Bawić logo revamp and brand identity",
    size: "standard",
    sources: [
      {
        label: "identity",
        href: "https://www.behance.net/gallery/247443937/Chodz-Sie-Bawic-Logo-Revamp-Brand-Identity-(2025)",
      },
      {
        label: "strategy",
        href: "https://www.behance.net/gallery/249304785/Chodz-Sie-Bawic-Social-Media-Audit-Strategy-(2025)",
      },
    ],
  },
  {
    number: "05 / 2026",
    title: "digiQUIZ",
    type: "UX/UI · educational product",
    typeKey: "portfolioDigiQuizType",
    href: "https://www.behance.net/gallery/249299475/digiQUIZ-UIUX-Case-Study-(WIP)-(2026)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/404/e2b616249299475.Y3JvcCw4MDgsNjMyLDAsMA.png",
    imageAlt: "digiQUIZ UX and UI case study",
    size: "narrow",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/249299475/digiQUIZ-UIUX-Case-Study-(WIP)-(2026)",
      },
    ],
  },
  {
    number: "06 / 2026",
    title: "nAIczyciel.pl",
    type: "UX/UI · AI-powered EdTech",
    typeKey: "portfolioNaiczycielType",
    href: "https://github.com/2s0lace/",
    visualText: "nAI",
    stat: "Next.js / AI",
    wip: true,
    wipKey: "portfolioWorkInProgress",
    tone: "ink",
    size: "wide",
    sources: [
      {
        label: "github",
        href: "https://github.com/2s0lace/",
      },
    ],
  },
];

export const githubProjects: PortfolioProject[] = [
  {
    number: "07 / 2026",
    title: "Silvaiee / Aiceus",
    type: "Python · AI agents for Pokémon ROM hacking and model benchmarking",
    typeKey: "common.portfolioSilvaieeType",
    href: "https://github.com/2s0lace/silvaiee",
    sources: [{ label: "github", href: "https://github.com/2s0lace/silvaiee" }],
  },
  {
    number: "08 / 2026",
    title: "Morfo",
    type: "Android / web · 3D tooth anatomy, comparison and FDI quizzes",
    typeKey: "common.portfolioMorfoType",
    href: "https://github.com/2s0lace/morfo",
    sources: [{ label: "github", href: "https://github.com/2s0lace/morfo" }],
  },
  {
    number: "09 / 2026",
    title: "Luxuria Coon",
    type: "Next.js · Maine Coon cattery website · Material Design 3",
    typeKey: "common.portfolioLuxuriaType",
    href: "https://github.com/2s0lace/luxuria-coon",
    sources: [{ label: "github", href: "https://github.com/2s0lace/luxuria-coon" }],
  },
];

export const solaceProjects: PortfolioProject[] = [
  {
    number: "01 / 2026",
    title: "Banned From The World",
    type: "editorial concept",
    typeKey: "portfolioBannedType",
    href: "https://www.behance.net/gallery/247996715/Banned-From-The-World-Bully-Editorial-Concept-(2026)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/38f5d6247996715.Y3JvcCwxMDgwLDg0NCwwLDI1MQ.png",
    imageAlt: "Banned From The World editorial concept",
    size: "wide",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247996715/Banned-From-The-World-Bully-Editorial-Concept-(2026)",
      },
    ],
  },
  {
    number: "02 / 2026",
    title: "Switch 2 Dream",
    type: "fan ad concept",
    typeKey: "portfolioFanAdType",
    href: "https://www.behance.net/gallery/248080993/Switch-2-Dream-Tomodachi-Life-Fan-Ad-Concept-(2026)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/665b52248080993.Y3JvcCwxMzUwLDEwNTUsMCwxMw.png",
    imageAlt: "Switch 2 Dream fan advertisement concept",
    size: "narrow",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/248080993/Switch-2-Dream-Tomodachi-Life-Fan-Ad-Concept-(2026)",
      },
    ],
  },
  {
    number: "03 / 2026",
    title: "Living The Dream",
    type: "fan campaign concept",
    typeKey: "portfolioFanCampaignType",
    href: "https://www.behance.net/gallery/248080803/Tomodachi-Life-Living-The-Dream-Fan-Concept-(2026)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/299ca6248080803.Y3JvcCwxMDgwLDg0NCwwLDY0.png",
    imageAlt: "Tomodachi Life Living The Dream fan concept",
    size: "standard",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/248080803/Tomodachi-Life-Living-The-Dream-Fan-Concept-(2026)",
      },
    ],
  },
  {
    number: "04 / 2022",
    title: "Cocteau Twins × Azealia Banks",
    type: "fan cover art",
    typeKey: "portfolioCoverType",
    href: "https://www.behance.net/gallery/247442425/Cocteau-Twins-x-Azealia-Banks-Fan-Cover-Art-(2022)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/c89f04247442425.Y3JvcCw5OTgsNzgwLDAsMTA4.jpg",
    imageAlt: "Cocteau Twins and Azealia Banks fan cover art",
    size: "standard",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247442425/Cocteau-Twins-x-Azealia-Banks-Fan-Cover-Art-(2022)",
      },
    ],
  },
  {
    number: "05 / 2022",
    title: "Steve Lacy — Bad Habit Mashup",
    type: "fan cover art",
    typeKey: "portfolioCoverType",
    href: "https://www.behance.net/gallery/247444579/Steve-Lacy-Bad-Habit-Mashup-Fan-Cover-Art-(2022)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/a9f920247444579.Y3JvcCw5OTksNzgyLDAsMTA4.jpg",
    imageAlt: "Steve Lacy Bad Habit mashup fan cover art",
    size: "narrow",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247444579/Steve-Lacy-Bad-Habit-Mashup-Fan-Cover-Art-(2022)",
      },
    ],
  },
  {
    number: "06 / 2020",
    title: "Yung Lean — Starz Tour",
    type: "fan poster",
    typeKey: "portfolioPosterType",
    href: "https://www.behance.net/gallery/247444317/Yung-Lean-Starz-Tour-Fan-Poster-(2020)",
    image:
      "https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/958b26247444317.Y3JvcCw5MDAsNzAzLDAsMA.png",
    imageAlt: "Yung Lean Starz Tour fan poster",
    size: "wide",
    sources: [
      {
        label: "behance",
        href: "https://www.behance.net/gallery/247444317/Yung-Lean-Starz-Tour-Fan-Poster-(2020)",
      },
    ],
  },
];
