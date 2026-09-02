import type { Metadata, Viewport } from "next";
import { Noto_Sans_TC, Noto_Serif_TC } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  preload: false,
});

const notoSerif = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "過年大戰三姑六婆",
    template: "%s｜過年大戰三姑六婆",
  },
  description:
    "回家過年，嗆爆三姑六婆。回合制文字戰鬥遊戲：面對 8 位親戚關主，用神回覆把「什麼時候結婚」打回去。",
  applicationName: "過年大戰三姑六婆",
  openGraph: {
    type: "website",
    locale: "zh_TW",
    siteName: "過年大戰三姑六婆",
    title: "過年大戰三姑六婆",
    description: "回家過年，嗆爆三姑六婆。你敢回家嗎？",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#1a0b0b",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-Hant-TW"
      className={`${notoSans.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-dvh flex flex-col">{children}</body>
    </html>
  );
}
