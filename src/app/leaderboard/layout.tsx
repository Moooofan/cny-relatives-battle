import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "排行榜",
  description: "全球玩家的隨機挑戰、每日挑戰、故事模式、闖關模式戰績排行，以及各人生的平均分數。",
};

export default function LeaderboardLayout({ children }: { children: React.ReactNode }) {
  return children;
}
