import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "闖關模式",
  description: "依序挑戰全部 8 位關主，血量延續到下一場，考驗續航力。",
};

export default function GauntletLayout({ children }: { children: React.ReactNode }) {
  return children;
}
