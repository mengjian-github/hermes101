import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "OpenClaw 迁移 Hermes 完整指南",
  description:
    "使用 hermes claw migrate 一键迁移。附检查清单、常见失败修复、迁移后验证。",
};

export default function MigrateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
