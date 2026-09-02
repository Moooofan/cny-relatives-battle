interface Props {
  className?: string;
  flip?: boolean;
}

/** Decorative hanging lantern, inline SVG so it costs no extra request.
 * Sways via `.animate-sway` (CSS-only, disabled under reduced-motion by the
 * global rule in globals.css). Purely `aria-hidden` — never conveys info. */
export function Lantern({ className = "", flip = false }: Props) {
  return (
    <div
      aria-hidden
      className={`animate-sway origin-top ${flip ? "-scale-x-100" : ""} ${className}`}
    >
      <svg width="28" height="44" viewBox="0 0 28 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <line x1="14" y1="0" x2="14" y2="6" stroke="var(--color-gold)" strokeWidth="1.5" />
        <rect x="10" y="4" width="8" height="3" rx="1" fill="var(--color-gold)" />
        <ellipse
          cx="14"
          cy="22"
          rx="11"
          ry="15"
          fill="var(--color-primary)"
          stroke="var(--color-gold)"
          strokeWidth="1.5"
        />
        <line x1="4" y1="22" x2="24" y2="22" stroke="var(--color-gold-deep)" strokeWidth="1" opacity="0.6" />
        <rect x="11" y="35" width="6" height="3" rx="1" fill="var(--color-gold)" />
        <line x1="14" y1="38" x2="14" y2="44" stroke="var(--color-gold)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
