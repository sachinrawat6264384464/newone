import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl;

  return [
    {
      url: base,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${base}/gallery`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/contact`,
      lastModified: new Date("2026-05-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}
