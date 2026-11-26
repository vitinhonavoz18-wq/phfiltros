export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { solutions } from "@/config/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/a-empresa`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    ...solutions.map((s) => ({ url: `${site.url}/solucoes/${s.slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.8 })),
    { url: `${site.url}/politica-de-privacidade`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
}
