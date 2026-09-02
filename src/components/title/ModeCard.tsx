import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface Props {
  href: string;
  icon: LucideIcon;
  title: string;
  description: string;
  badge?: string;
}

export function ModeCard({ href, icon: Icon, title, description, badge }: Props) {
  return (
    <Link href={href} className="rpg-box flex items-center gap-3 p-4 active:scale-[0.98] transition">
      <Icon className="text-gold shrink-0" size={28} />
      <div className="flex-1 min-w-0">
        <p className="font-display text-base text-text">{title}</p>
        <p className="text-xs text-text-muted leading-snug">{description}</p>
      </div>
      {badge && (
        <span className="tabular shrink-0 rounded-full bg-primary/20 border border-primary px-2 py-1 text-xs text-primary">
          {badge}
        </span>
      )}
    </Link>
  );
}
