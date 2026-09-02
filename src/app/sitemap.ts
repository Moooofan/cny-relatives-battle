import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cny-relatives-battle.vercel.app";

/** Static, indexable routes only — /result, /review and /admin are per-run or
 * private and are excluded on purpose (see robots.ts). */
const ROUTES = ["/", "/life", "/random", "/daily", "/story", "/gauntlet", "/bosses"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "/daily" ? "daily" : "weekly",
    priority: route === "/" ? 1 : 0.7,
  }));
}
