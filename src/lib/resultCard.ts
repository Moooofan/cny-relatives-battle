import type { ContentBundle, GameState } from "@/engine/types";
import { findLife } from "@/content/lives";
import { formatDateTime } from "@/lib/dates";

const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1350;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cny-relatives-battle.vercel.app";

const COLOR_BG = "#1A0B0B";
const COLOR_GOLD = "#F5C542";
const COLOR_TEXT = "#FFF3E0";
const COLOR_TEXT_MUTED = "#C9A98F";
const COLOR_SURFACE = "#2B1414";
const COLOR_BORDER = "rgba(255,214,170,0.35)";
const COLOR_PRIMARY = "#E63946";

/** Resolves the loaded Noto Serif TC font family name via `document.fonts`,
 * falling back to a system CJK stack when the web font hasn't registered
 * (e.g. it failed to load, or this runs before the font settled). */
async function resolveSerifFamily(): Promise<string> {
  const fallback = '"PingFang TC", "Microsoft JhengHei", serif';
  if (typeof document === "undefined" || !document.fonts) return fallback;
  try {
    await document.fonts.ready;
    for (const face of document.fonts) {
      if (face.family.toLowerCase().includes("noto serif tc") && face.status === "loaded") {
        return `"${face.family}", ${fallback}`;
      }
    }
  } catch {
    // ignore — fall back below
  }
  return fallback;
}

function loadImage(src: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Word-wraps CJK-friendly text (breaks on any character, no dictionary
 * needed) to fit `maxWidth`, drawing each line centered at `x`. Returns the
 * y coordinate just past the last line drawn. */
function drawWrappedText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
  maxLines = 3
): number {
  const chars = Array.from(text);
  const lines: string[] = [];
  let current = "";
  for (const ch of chars) {
    const test = current + ch;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = ch;
      if (lines.length === maxLines - 1) {
        // Last allowed line: fill the rest, ellipsis if it still overflows.
        const rest = chars.slice(chars.indexOf(ch)).join("");
        let last = "";
        for (const c2 of rest) {
          if (ctx.measureText(last + c2 + "…").width > maxWidth && last) break;
          last += c2;
        }
        lines.push(last.length < rest.length ? `${last}…` : last);
        current = "";
        break;
      }
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);

  let cy = y;
  for (const line of lines) {
    ctx.fillText(line, x, cy);
    cy += lineHeight;
  }
  return cy;
}

export interface RenderResultCardArgs {
  state: GameState;
  content: ContentBundle;
}

/** Renders the shareable 1080×1350 result card for the current run onto an
 * off-screen canvas and resolves it as a PNG Blob. Pure browser API (canvas +
 * Image + document.fonts) — never called during SSR/build. */
export async function renderResultCard({ state, content }: RenderResultCardArgs): Promise<Blob> {
  const result = state.result;
  if (!result) throw new Error("renderResultCard: state has no result yet");

  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("renderResultCard: 2D canvas context unavailable");

  const serifFamily = await resolveSerifFamily();
  const sansFamily = '"PingFang TC", "Microsoft JhengHei", sans-serif';

  // --- background -----------------------------------------------------
  ctx.fillStyle = COLOR_BG;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);
  ctx.strokeStyle = COLOR_BORDER;
  ctx.lineWidth = 4;
  ctx.strokeRect(24, 24, CARD_WIDTH - 48, CARD_HEIGHT - 48);

  // --- title ------------------------------------------------------------
  ctx.textAlign = "center";
  ctx.fillStyle = COLOR_GOLD;
  ctx.font = `700 56px ${serifFamily}`;
  ctx.fillText("過年大戰三姑六婆", CARD_WIDTH / 2, 130);

  // --- portrait -----------------------------------------------------
  const isMultiBoss = state.mode === "gauntlet" || state.mode === "story";
  const lastBossId = state.bossQueue[Math.min(state.bossIndex, state.bossQueue.length - 1)];
  const boss = content.bosses.find((b) => b.id === lastBossId);
  const portraitSrc = isMultiBoss || !boss ? "/portraits/player.svg" : `/portraits/${boss.id}.svg`;
  const portrait = await loadImage(portraitSrc);

  const ringCenterX = CARD_WIDTH / 2;
  const ringCenterY = 340;
  const ringRadius = 180; // 360px diameter ring

  ctx.save();
  ctx.beginPath();
  ctx.arc(ringCenterX, ringCenterY, ringRadius, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fillStyle = COLOR_SURFACE;
  ctx.fill();
  if (portrait) {
    ctx.clip();
    ctx.drawImage(
      portrait,
      ringCenterX - ringRadius,
      ringCenterY - ringRadius,
      ringRadius * 2,
      ringRadius * 2
    );
  }
  ctx.restore();
  ctx.beginPath();
  ctx.arc(ringCenterX, ringCenterY, ringRadius, 0, Math.PI * 2);
  ctx.lineWidth = 6;
  ctx.strokeStyle = COLOR_GOLD;
  ctx.stroke();

  // --- life name + code badge -----------------------------------------
  const life = state.lifeId ? findLife(state.lifeId) : undefined;
  let y = ringCenterY + ringRadius + 60;
  if (life) {
    ctx.font = `500 34px ${sansFamily}`;
    ctx.fillStyle = COLOR_TEXT_MUTED;
    ctx.fillText(`${life.name}（${life.code}）`, CARD_WIDTH / 2, y);
    y += 56;
  }

  // --- rank title (big) -------------------------------------------------
  ctx.font = `700 64px ${serifFamily}`;
  ctx.fillStyle = COLOR_GOLD;
  y += 20;
  y = drawWrappedText(ctx, result.rank.title, CARD_WIDTH / 2, y, CARD_WIDTH - 160, 76, 2);

  // --- story ending title, when present ---------------------------------
  if (result.storyEndingId) {
    const ending = content.storyEndings.find((e) => e.id === result.storyEndingId);
    if (ending) {
      ctx.font = `500 32px ${sansFamily}`;
      ctx.fillStyle = COLOR_PRIMARY;
      ctx.fillText(`結局：${ending.title}`, CARD_WIDTH / 2, y + 16);
      y += 64;
    }
  }

  // --- score / turns / max combo row ------------------------------------
  const statsY = y + 60;
  const statBoxW = (CARD_WIDTH - 160 - 2 * 24) / 3;
  const stats: Array<[string, string | number]> = [
    ["分數", result.score],
    ["回合數", state.turns],
    ["最大連擊", state.maxCombo],
  ];
  ctx.textAlign = "center";
  stats.forEach(([label, value], i) => {
    const boxX = 80 + i * (statBoxW + 24);
    roundRect(ctx, boxX, statsY, statBoxW, 150, 16);
    ctx.fillStyle = COLOR_SURFACE;
    ctx.fill();
    ctx.strokeStyle = COLOR_BORDER;
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = COLOR_TEXT;
    ctx.font = `700 48px ${sansFamily}`;
    ctx.fillText(String(value), boxX + statBoxW / 2, statsY + 70);

    ctx.fillStyle = COLOR_TEXT_MUTED;
    ctx.font = `400 26px ${sansFamily}`;
    ctx.fillText(label, boxX + statBoxW / 2, statsY + 112);
  });

  // --- result code + date -----------------------------------------------
  const footerY = CARD_HEIGHT - 150;
  ctx.font = `400 30px ${sansFamily}`;
  ctx.fillStyle = COLOR_TEXT_MUTED;
  ctx.fillText(`結果代碼：${result.resultCode}`, CARD_WIDTH / 2, footerY);
  ctx.fillText(formatDateTime(new Date().toISOString()), CARD_WIDTH / 2, footerY + 44);

  // --- site url -----------------------------------------------------
  ctx.font = `500 30px ${sansFamily}`;
  ctx.fillStyle = COLOR_GOLD;
  const displayUrl = SITE_URL.replace(/^https?:\/\//, "");
  ctx.fillText(displayUrl, CARD_WIDTH / 2, CARD_HEIGHT - 60);

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) resolve(blob);
      else reject(new Error("renderResultCard: canvas.toBlob returned null"));
    }, "image/png");
  });
}
