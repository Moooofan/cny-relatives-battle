import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "故事模式",
  description: "三幕、共 8 場戰鬥的完整劇情：除夕圍爐、初一拜年、初二家族聚餐，含轉折與多種結局。",
};

export default function StoryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
