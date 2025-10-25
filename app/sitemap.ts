import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL;
  return [
    { url: `${base}/`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/information`, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/profile`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/register`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
