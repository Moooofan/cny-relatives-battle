"use client";

import { useCallback, useEffect, useState } from "react";
import { AdminTabs, TABS, type TabKey } from "@/components/admin/AdminTabs";
import { OverviewTab } from "@/components/admin/overview/OverviewTab";
import { LivesTab } from "@/components/admin/lives/LivesTab";
import { BossesTab } from "@/components/admin/bosses/BossesTab";
import { QuestionsTab } from "@/components/admin/questions/QuestionsTab";
import { StoryTab } from "@/components/admin/story/StoryTab";
import { ResultsTab } from "@/components/admin/results/ResultsTab";

const TAB_KEYS = new Set<string>(TABS.map((t) => t.key));

function readHashTab(): TabKey {
  if (typeof window === "undefined") return "overview";
  const hash = window.location.hash.replace("#", "");
  return TAB_KEYS.has(hash) ? (hash as TabKey) : "overview";
}

export function AdminApp() {
  const [tab, setTab] = useState<TabKey>("overview");

  useEffect(() => {
    // Deferred (not a direct synchronous setState-in-effect): mirrors the
    // .finally()-wrapped rehydration in HydrationGate. Reads the hash once on
    // mount, then keeps listening for back/forward navigation.
    Promise.resolve().then(() => setTab(readHashTab()));
    const onHashChange = () => setTab(readHashTab());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const changeTab = useCallback((key: TabKey) => {
    setTab(key);
    window.location.hash = key;
  }, []);

  return (
    <main className="flex flex-1 flex-col mx-auto w-full max-w-6xl px-4 py-4 safe-pt safe-pb gap-4">
      <header className="flex flex-col gap-1">
        <h1 className="font-display text-2xl text-gold">後台管理</h1>
        <p className="text-xs text-text-muted">
          僅供內部檢視用；本頁不是真正的權限控管，只是靠 URL 不公開來防止誤入。
        </p>
      </header>

      <AdminTabs active={tab} onChange={changeTab} />

      {/* Page (not this div) is the scroll container — see AdminTabs/QuestionsTab
       * for why: `overflow-y-auto` here would make it a scroll-container of
       * record and break `position: sticky` on descendants (tab bar, filter
       * bar) even though it never grows a scrollbar of its own. */}
      <div className="flex-1 pb-8">
        {tab === "overview" && <OverviewTab />}
        {tab === "lives" && <LivesTab />}
        {tab === "bosses" && <BossesTab />}
        {tab === "questions" && <QuestionsTab />}
        {tab === "story" && <StoryTab />}
        {tab === "results" && <ResultsTab />}
      </div>
    </main>
  );
}
