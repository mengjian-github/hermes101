import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hermes Agent 教程：7 天入门路径",
  description:
    "从安装到机器人上线，7 天跟练计划。每天一个可验证成果，适合纯小白。",
};

export default function SevenDaysLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
