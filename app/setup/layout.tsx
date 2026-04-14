import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hermes Agent 安装教程（Mac/Linux/Windows）",
  description:
    "保姆级 5 分钟安装指南。支持 Mac、Linux、Windows WSL2。每步带可复制命令和常见报错修复。",
};

export default function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
