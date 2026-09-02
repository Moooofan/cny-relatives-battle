import { JsonLd } from "@/components/seo/JsonLd";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cny-relatives-battle.vercel.app";
const SITE_NAME = "過年大戰三姑六婆";

/** VideoGame + WebSite structured data for the home page, rendered once from
 * the root layout body. Kept as its own server component (not inline in
 * layout.tsx) so the schema stays easy to find and update in isolation. */
export function HomeJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "VideoGame",
            name: SITE_NAME,
            url: SITE_URL,
            description:
              "回家過年，嗆爆三姑六婆。繁體中文回合制文字戰鬥遊戲，面對 8 位親戚關主用神回覆把靈魂拷問打回去。",
            inLanguage: "zh-Hant-TW",
            applicationCategory: "Game",
            operatingSystem: "Web",
            isAccessibleForFree: true,
            genre: ["Turn-based", "Word Game"],
            image: `${SITE_URL}/og.png`,
            author: { "@type": "Organization", name: SITE_NAME },
            publisher: { "@type": "Organization", name: SITE_NAME },
          },
          {
            "@type": "WebSite",
            name: SITE_NAME,
            url: SITE_URL,
            inLanguage: "zh-Hant-TW",
          },
        ],
      }}
    />
  );
}
