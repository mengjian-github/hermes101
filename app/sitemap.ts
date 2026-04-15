import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://hermes101.pages.dev";
  const routes = [
    "/",
    "/setup",
    "/7-days",
    "/migrate",
    "/faq",
    "/privacy",
    "/terms",
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date("2026-04-15"),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : route === "/setup" ? 0.9 : 0.8,
  }));
}
