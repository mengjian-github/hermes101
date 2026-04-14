import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hermes Agent 常见问题 FAQ",
  description:
    "安装失败、WSL2 报错、API key 配置、飞书/Telegram 不回复等高频问题速查。",
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
