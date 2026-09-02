import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "親戚圖鑑",
  description: "8 位關主的介紹與難度總覽，依闖關順序排列。",
};

export default function BossesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
