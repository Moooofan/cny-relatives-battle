import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "回顧",
  description: "回顧上一場戰鬥的每個回合：選了什麼、傷害多少、為什麼。",
};

export default function ReviewLayout({ children }: { children: React.ReactNode }) {
  return children;
}
