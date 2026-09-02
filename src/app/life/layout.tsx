import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "選擇人生",
  description: "開局前挑一種人生：職業、家庭結構、人生階段與居住地各異，決定你對哪些親戚更強、更弱。",
};

export default function LifeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
