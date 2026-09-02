import { ARCHETYPE_TABLE } from "@/engine/archetypes";
import type { Archetype } from "@/engine/types";

const COLOR_CLASS: Record<Archetype, string> = {
  perfect: "bg-arch-perfect/20 text-arch-perfect border-arch-perfect/50",
  deflect: "bg-arch-deflect/20 text-arch-deflect border-arch-deflect/50",
  meek: "bg-arch-meek/20 text-arch-meek border-arch-meek/50",
  backfire: "bg-arch-backfire/20 text-arch-backfire border-arch-backfire/50",
  landmine: "bg-arch-landmine/20 text-arch-landmine border-arch-landmine/50",
};

export function ArchetypeBadge({ archetype }: { archetype: Archetype }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium shrink-0 ${COLOR_CLASS[archetype]}`}
    >
      {ARCHETYPE_TABLE[archetype].label}
    </span>
  );
}
