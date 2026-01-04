import { getSections } from "@/data/rules";
import type { MetadataRoute } from "next";
import slugify from "slugify";

const BASE_URL = "https://sub-agents.directory";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sections = getSections();

  const routes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/agents`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/learn`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/mcp`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/advertise`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  for (const section of sections) {
    for (const rule of section.rules) {
      routes.push({
        url: `${BASE_URL}/${rule.slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.7,
      });
    }
  }

  const mcpData = (await import("@/data/mcp")).default;
  for (const mcp of mcpData) {
    routes.push({
      url: `${BASE_URL}/mcp/${slugify(mcp.name, { lower: true })}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    });
  }

  return routes;
}
