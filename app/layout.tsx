import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hermes Agent 小白入门第一站 — hermes101",
    template: "%s — hermes101",
  },
  description:
    "5 分钟安装 Hermes Agent，7 天跟练入门，OpenClaw 一键无忧迁移。中文保姆级教程。",
  keywords: [
    "Hermes Agent",
    "Hermes 安装",
    "Hermes 教程",
    "OpenClaw 迁移",
    "小白入门",
    "Hermes v0.9",
    "Fast Mode",
    "Dashboard",
    "backup import",
    "watch_patterns",
    "MCP Skill",
  ],
  authors: [{ name: "hermes101" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: "hermes101",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "https://hermes101.pages.dev",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbf9f5] text-[#1b1c1a] font-sans">{children}</body>
    </html>
  );
}
