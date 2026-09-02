import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "每日挑戰",
  description: "每天（台灣時間）全球玩家共用同一組隨機種子與題序，一天一次，累積連續天數紀錄。",
};

export default function DailyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
