import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cny-relatives-battle.vercel.app";

export default function robots(): MetadataRoute.Robots {
  const disallow = ["/admin", "/result", "/review"];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow },
      // AI / GEO crawlers — explicitly allowed for citation in AI answers.
      { userAgent: "GPTBot", allow: "/", disallow },
      { userAgent: "ClaudeBot", allow: "/", disallow },
      { userAgent: "PerplexityBot", allow: "/", disallow },
      { userAgent: "Google-Extended", allow: "/", disallow },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
