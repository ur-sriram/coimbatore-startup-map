/** Atlas Field Notes design contract: typed startup data powers a precise, map-first Coimbatore atlas. */
export type Startup = {
  id: string;
  slug: string;
  name: string;
  website: string;
  description: string;
  sector: string;
  subsector: string;
  stage: string;
  tags: string[];
  area: string;
  location: string;
  address: string;
  foundedYear: string;
  teamSize: string;
  fundingUsd: string;
  investors: string;
  founders: string;
  coordinateQuality: "city_level" | "missing" | "unverified";
  displayLat: number;
  displayLng: number;
  isDisplayOffset: boolean;
  sourceUrls: string;
  sourceUrl: string;
};

export const getInitials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

export const faviconUrl = (website: string) =>
  `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(website)}&sz=128`;

export const formatFunding = (value: string) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return "Not listed";
  if (numeric >= 1_000_000) return `$${(numeric / 1_000_000).toFixed(numeric >= 10_000_000 ? 0 : 1)}M`;
  if (numeric >= 1_000) return `$${Math.round(numeric / 1_000)}K`;
  return `$${numeric}`;
};
