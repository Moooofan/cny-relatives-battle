import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "結算",
  description: "戰鬥結算：分數、稱號、回合數，並可分享戰績圖卡到 LINE / IG。",
};

export default function ResultLayout({ children }: { children: React.ReactNode }) {
  return children;
}
