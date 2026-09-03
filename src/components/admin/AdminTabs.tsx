export type TabKey = "overview" | "lives" | "bosses" | "questions" | "story" | "results";

export const TABS: { key: TabKey; label: string }[] = [
  { key: "overview", label: "總覽" },
  { key: "lives", label: "人生" },
  { key: "bosses", label: "關主" },
  { key: "questions", label: "題庫" },
  { key: "story", label: "劇情" },
  { key: "results", label: "結果" },
];

export function AdminTabs({ active, onChange }: { active: TabKey; onChange: (key: TabKey) => void }) {
  return (
    <nav className="sticky top-0 z-30 flex gap-1 overflow-x-auto border-b border-border bg-bg pb-2 pt-2 -mx-4 px-4 -mt-2 sm:mx-0 sm:px-0">
      {TABS.map((tab) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onChange(tab.key)}
            aria-current={isActive ? "page" : undefined}
            className={`shrink-0 whitespace-nowrap rounded-btn px-4 py-2 text-sm font-medium transition ${
              isActive ? "bg-primary text-on-primary" : "bg-surface-2 text-text-muted border border-border"
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </nav>
  );
}
