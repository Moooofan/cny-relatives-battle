# Design System — 《過年大戰三姑六婆》 (MASTER)

Source of truth for every screen. Generated with ui-ux-pro-max (Retro-Futurism / Noto TC
recommendation) and adapted to a Lunar-New-Year palette. Page overrides go in `pages/<page>.md`.

## Direction
- **Mood**: 春聯紅 × 金箔 on a deep warm-black ground. Retro turn-based RPG (Dragon Quest style
  dialogue box) meets Taiwanese 年夜飯. Playful, not cute; sharp, not mean.
- **Style**: Dark-first only (single theme). Flat surfaces, hairline gold borders, one glow accent
  (the 暴擊 flash). No glassmorphism, no scanlines by default (optional on the title screen only).
- **Layout**: single column, `max-w-md` centered, `min-h-dvh`, safe-area padding. Portrait mobile
  first (375px), desktop just centers the column on a patterned ground.

## Color tokens (Tailwind v4 `@theme` in `src/app/globals.css`)
| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#1A0B0B` | page ground |
| `--color-surface` | `#2B1414` | cards, dialogue box |
| `--color-surface-2` | `#3A1C1C` | option buttons, HP track |
| `--color-border` | `rgba(255,214,170,0.18)` | hairlines |
| `--color-primary` | `#E63946` | 春聯紅 — primary CTA, boss HP fill |
| `--color-primary-strong` | `#C1121F` | pressed CTA |
| `--color-on-primary` | `#FFF8EE` | text on primary |
| `--color-gold` | `#F5C542` | headings, borders of dialogue box, crit |
| `--color-gold-deep` | `#D4A017` | gold pressed / secondary border |
| `--color-text` | `#FFF3E0` | body text (contrast on bg ≈ 15:1) |
| `--color-text-muted` | `#C9A98F` | captions (≈ 7:1 on surface) |
| `--color-hp-player` | `#4ADE80` | player HP fill |
| `--color-hp-boss` | `#F87171` | boss HP fill |
| `--color-damage` | `#FF5252` | floating damage numbers (player) |
| `--color-heal` | `#6EE7B7` | heal numbers |
| `--color-crit` | `#FFD54F` | 暴擊 number + flash |
| `--color-arch-perfect` | `#F5C542` | archetype badge 神回覆 |
| `--color-arch-deflect` | `#7DD3FC` | 四兩撥千斤 |
| `--color-arch-meek` | `#C4B5FD` | 乖乖回答 |
| `--color-arch-backfire` | `#FDBA74` | 反擊失敗 |
| `--color-arch-landmine` | `#F87171` | 踩雷 |

## Typography
- Display / headings: **Noto Serif TC** 600–700 (春聯感). Body / options: **Noto Sans TC** 400/500.
- Load via `next/font/google` with `display: "swap"`, subsets `["latin"]` + `preload: false` for TC
  (font files are large; rely on swap, reserve line-height).
- Scale: 12 / 14 / 16 / 18 / 22 / 28 / 36. Body 16px min on mobile. Line-height 1.6 for dialogue.
- Numbers (HP, timer, damage): `font-variant-numeric: tabular-nums`.

## Components
- **Dialogue box**: `surface` fill, 2px `gold` outer border + 1px `border` inset line (double-rule
  RPG frame), radius 6px, 16px padding, typewriter reveal 18ms/char (skippable on tap,
  disabled under reduced-motion).
- **Option button**: full width, min-height 48px, `surface-2` fill, 1px `border`, radius 8px,
  left-aligned text 16px, 8px gap between buttons; pressed = `scale(0.98)` + `primary` border.
  8 options → vertical list, no truncation, wraps to 2 lines max.
- **HP bar**: 12px tall track `surface-2`, fill animates `width` via `transform: scaleX` over 300ms
  ease-out; segmented ticks every 10%; label `名字 · 48/100` tabular.
- **Damage float**: absolutely positioned number, `translateY(-24px)` + fade over 600ms, red for
  player damage, gold + larger for crit, mint for heal. `aria-live="polite"` text mirror.
- **Timer**: thin 3px bar under the dialogue box shrinking left→right; turns `primary` under 5s.
- **Primary CTA**: `primary` fill, `on-primary` text, 52px tall, radius 10px, one per screen.
- **Icons**: Lucide only (no emoji as icons). Boss portraits are emoji placeholders inside a 96px
  gold-ringed circle until real art lands.

## Motion
- 150–300ms micro; enter ease-out, exit ease-in (60–70% of enter). Boss hit = 120ms shake
  (`translateX ±4px`), player hit = 150ms red vignette flash. Crit = 250ms gold flash + shake.
- Respect `prefers-reduced-motion`: no shake/flash/typewriter; damage numbers appear instantly.

## Accessibility & touch
- Contrast ≥ 4.5:1 everywhere (verified for text/muted above). Focus ring 2px `gold`.
- Touch targets ≥ 44px, 8px spacing. `touch-action: manipulation`. Never disable zoom.
- HP and timer changes announced via a visually-hidden `aria-live` region.

## Anti-patterns
- No emoji icons in chrome; no light theme half-done; no horizontal scroll; no animation on
  width/height; no auto-playing sound before first tap.
