# Portraits

Hand-authored flat-vector SVG portraits for the battle screen (boss portrait above the
dialogue box). Style: `viewBox="0 0 256 256"`, 4px `#2A1010` outlines, 2–3 tone cel shading,
warm Lunar-New-Year palette from `design-system/過年大戰三姑六婆/MASTER.md`. Every file shares
the same background convention — a `#3A1C1C` circle (r=120, centered) with a 6px `#F5C542`
gold ring — and uses only `<path>` / `<ellipse>` / `<rect>` primitives (no text, raster, or
script). All element `id`s are prefixed with a per-file character code so multiple portraits
can be inlined on one page without collisions.

| File | Character | Visual cues |
|---|---|---|
| `xiao-biaodi.svg` | 小表弟 (xiao-biaodi) | Cowlick tuft, big missing-front-tooth grin, blush, Nintendo Switch-style controller peeking up from the bottom edge. |
| `neighbor-chen.svg` | 陳太太 (neighbor-chen) | Bubbly permed bob, white pearl stud earrings, red-and-gold gift box held at shoulder, sly gossiping smirk. |
| `biaojie.svg` | 表姊 (biaojie) | Long soft-waved hair, elegant gold dangle earrings, diagonal teal baby-carrier strap with a baby peeking at the hem, phone in hand, gentle smile. |
| `dabo.svg` | 大伯 (dabo) | Bald dome with a shine highlight, grey hair at the sides, thick bushy raised eyebrows, mouth open mid-lecture, TV remote with colored buttons in hand. |
| `guzhang.svg` | 姑丈 (guzhang) | Teal flat cap, reading glasses slid low on the nose, phone showing a small sun-ray graphic, teacup with steam beside him. |
| `sanjiuma.svg` | 三舅媽 (sanjiuma) | Tight top-knot bun with a red tie, sharp rectangular glasses, confident KPI smirk, tablet displaying a rising bar chart. |
| `ama.svg` | 阿嬤 (ama) | White bun, soft wrinkle lines at eyes/cheeks, warm crescent-eyed smile, floral-dot blouse, chopsticks holding up a chicken drumstick. |
| `sangu.svg` | 三姑 (sangu, final boss) | Voluminous dyed auburn hair, red qipao with mandarin collar and gold frog buttons, gold dangle earrings, an open folding fan with pleat lines held near her cheek, sly one-brow smirk, scattered gold sparkle accents. |
| `player.svg` | Protagonist (player) | Gender-neutral 20–35 look, short swept hair, grey hoodie with drawstrings and a hood resting behind the shoulders, subtle under-eye shading for a tired-but-ready expression, straight determined brows, small closed-mouth resolve line. |

## Notes
- Every file is well under the 12 KB budget (largest is `sangu.svg` at ~5.4 KB).
- A "teal" accent color (`#2A9D8F` / `#1E6F68`) was added as a prop/clothing accent — MASTER.md's
  token table has no literal teal, so this is a desaturated blue-green chosen to sit comfortably
  next to the existing red/gold/cream tokens per the brief's "teal accents" instruction.
- Validate anytime with:
  `for f in public/portraits/*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse('$f')" && echo ok $f; done`
