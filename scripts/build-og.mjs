#!/usr/bin/env node
/**
 * Rasterizes a hand-written 1200x630 SVG into public/og.png for the Open
 * Graph / Twitter card image.
 *
 * Run this LOCALLY (`pnpm og`) and commit the resulting PNG — the Vercel
 * build must NOT run this script (it depends on system CJK fonts that only
 * exist on the author's Mac, via fontconfig + sharp's librsvg backend).
 */
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PORTRAITS_DIR = path.join(ROOT, "public", "portraits");
const OUT_PATH = path.join(ROOT, "public", "og.png");

const WIDTH = 1200;
const HEIGHT = 630;

const COLOR_BG = "#1A0B0B";
const COLOR_GOLD = "#F5C542";
const COLOR_TEXT = "#FFF3E0";
const COLOR_BORDER = "rgba(255,214,170,0.35)";

// Chosen for macOS fontconfig availability (see docs/PLAN.md verify notes) —
// Songti TC is a serif CJK face installed on every Mac, matching the site's
// 春聯感 (couplet) serif direction described in design-system MASTER.md.
const SERIF_FONT = "Songti TC";
const SANS_FONT = "PingFang TC";

async function embeddedPortrait(bossId) {
  const svgPath = path.join(PORTRAITS_DIR, `${bossId}.svg`);
  const svg = await readFile(svgPath, "utf8");
  const base64 = Buffer.from(svg, "utf8").toString("base64");
  return `data:image/svg+xml;base64,${base64}`;
}

function escapeXml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function buildSvg() {
  const portraitIds = ["sangu", "ama", "sanjiuma"];
  const dataUris = await Promise.all(portraitIds.map(embeddedPortrait));

  const portraitSize = 210;
  const gap = 40;
  const totalWidth = portraitIds.length * portraitSize + (portraitIds.length - 1) * gap;
  const startX = (WIDTH - totalWidth) / 2;
  const portraitY = HEIGHT - portraitSize - 56;

  const portraitImages = dataUris
    .map((uri, i) => {
      const x = startX + i * (portraitSize + gap);
      const cx = x + portraitSize / 2;
      const cy = portraitY + portraitSize / 2;
      const r = portraitSize / 2;
      return `
        <g>
          <circle cx="${cx}" cy="${cy}" r="${r + 4}" fill="none" stroke="${COLOR_GOLD}" stroke-width="4" />
          <clipPath id="clip-${i}">
            <circle cx="${cx}" cy="${cy}" r="${r}" />
          </clipPath>
          <image href="${uri}" x="${x}" y="${portraitY}" width="${portraitSize}" height="${portraitSize}" clip-path="url(#clip-${i})" />
        </g>`;
    })
    .join("\n");

  return `<svg width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${WIDTH}" height="${HEIGHT}" fill="${COLOR_BG}" />
    <rect x="16" y="16" width="${WIDTH - 32}" height="${HEIGHT - 32}" fill="none" stroke="${COLOR_BORDER}" stroke-width="3" />

    <text x="${WIDTH / 2}" y="140" text-anchor="middle" font-family="${SERIF_FONT}" font-weight="700" font-size="76" fill="${COLOR_GOLD}">${escapeXml(
      "過年大戰三姑六婆"
    )}</text>
    <text x="${WIDTH / 2}" y="200" text-anchor="middle" font-family="${SANS_FONT}" font-weight="500" font-size="34" fill="${COLOR_TEXT}">${escapeXml(
      "回家過年，嗆爆三姑六婆"
    )}</text>

    ${portraitImages}
  </svg>`;
}

async function main() {
  const svg = await buildSvg();
  await sharp(Buffer.from(svg)).png().toFile(OUT_PATH);
  console.log(`Wrote ${path.relative(ROOT, OUT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
