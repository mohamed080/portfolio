import { MetadataRoute } from "next";

const SITE_URL = "https://portfolio-ma-rouge.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  // All locales
  const locales = ["en", "ar"];

  // Section anchors — these are all on the homepage but worth listing for Google to understand structure
  const routes = [
    { path: "", priority: 1.0, changeFrequency: "monthly" as const },
  ];

  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const route of routes) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        lastModified,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: {
          languages: {
            en: `${SITE_URL}/en${route.path}`,
            ar: `${SITE_URL}/ar${route.path}`,
          },
        },
      });
    }
  }

  // Canonical root
  entries.push({
    url: SITE_URL,
    lastModified,
    changeFrequency: "monthly",
    priority: 1.0,
  });

  return entries;
}
