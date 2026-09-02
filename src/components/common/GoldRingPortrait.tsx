interface Props {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

/** Portrait inside a gold ring, per design-system MASTER.md §Components. */
export function GoldRingPortrait({ src, alt, size = 112, className = "" }: Props) {
  return (
    <div
      className={`rounded-full ring-2 ring-gold bg-surface-2 overflow-hidden shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={size} height={size} className="h-full w-full object-cover" />
    </div>
  );
}
