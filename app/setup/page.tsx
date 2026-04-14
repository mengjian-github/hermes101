"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import CodeBlock from "../components/CodeBlock";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const tabs = [
  { key: "mac", label: "Mac" },
  { key: "linux", label: "Linux" },
  { key: "windows", label: "Windows WSL2" },
];

const checklist = [
  "有一台能联网的电脑",
  "已注册 LLM API（OpenAI / Anthropic）",
  "有 5 分钟跟着操作",
];

const installData: Record<string, { title: string; desc: string; code: string }[]> = {
  mac: [
    {
      title: "安装 Python 环境",
      desc: "Hermes 需要 Python 3.10 或更高版本。首先确认你的系统已经安装。",
      code: "python3 --version",
    },
    {
      title: "安装 Hermes Agent",
      desc: "使用 pip 一键安装。如果提示权限不足，可以加上 --user 参数。",
      code: "pip3 install hermes-agent",
    },
    {
      title: "运行安装验证",
      desc: "安装完成后，运行以下命令确认版本。",
      code: "hermes --version",
    },
  ],
  linux: [
    {
      title: "安装 Python 环境",
      desc: "Hermes 需要 Python 3.10 或更高版本。首先确认你的系统已经安装。",
      code: "python3 --version",
    },
    {
      title: "安装 Hermes Agent",
      desc: "使用 pip 一键安装。如果提示权限不足，可以加上 --user 参数。",
      code: "pip3 install hermes-agent",
    },
    {
      title: "运行安装验证",
      desc: "安装完成后，运行以下命令确认版本。",
      code: "hermes --version",
    },
  ],
  windows: [
    {
      title: "确认 WSL2 已启用",
      desc: "在 PowerShell 中以管理员身份运行 wsl --install，然后重启电脑。",
      code: "wsl --install",
    },
    {
      title: "安装 Python 环境",
      desc: "在 WSL2 终端中检查 Python 版本。",
      code: "python3 --version",
    },
    {
      title: "安装 Hermes Agent",
      desc: "使用 pip 一键安装。如果提示权限不足，可以加上 --user 参数。",
      code: "pip3 install hermes-agent",
    },
    {
      title: "运行安装验证",
      desc: "安装完成后，运行以下命令确认版本。",
      code: "hermes --version",
    },
    {
      title: "配置 Windows 终端访问",
      desc: "在 Windows Terminal 或 VS Code 中打开 WSL2，确保可以直接访问 hermes 命令。",
      code: "wsl hermes --version",
    },
  ],
};

const faqs = [
  {
    q: "WSL2 未启用（Windows 用户）",
    a: "在 PowerShell 中以管理员身份运行 wsl --install，重启后继续安装。",
  },
  {
    q: "Python 版本过低",
    a: "访问 python.org 下载 Python 3.10+，或使用 pyenv 切换版本。",
  },
  {
    q: "pip 安装权限失败",
    a: "尝试 pip install --user hermes-agent，或使用虚拟环境 venv 进行安装。",
  },
];

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Hermes Agent 安装教程（Mac/Linux/Windows）",
  author: { "@type": "Organization", name: "hermes101" },
  datePublished: "2026-04-14",
  dateModified: "2026-04-14",
  keywords: "Hermes Agent 安装, Hermes Agent Windows 安装, WSL2",
};

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState("mac");
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleCheck = (i: number) => {
    const next = [...checks];
    next[i] = !next[i];
    setChecks(next);
  };

  return (
    <>
      <SchemaJsonLd schema={techArticleSchema} />
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-6 pb-20">
          <VersionBanner />

          <h1 className="text-[32px] md:text-4xl font-semibold leading-tight tracking-tight mt-10 mb-2">
            5 分钟安装 Hermes Agent
          </h1>
          <p className="text-base text-[#666666] mb-8">
            选择你的操作系统，每步都有可复制命令。即使你是第一次打开终端，也能顺利跑通。
          </p>

          {/* Pre-checklist */}
          <h2 className="text-xl font-semibold mb-4">前置检查清单</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {checklist.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm border transition-all ${
                  checks[i]
                    ? "bg-[#d4fae8] border-[#18E299] text-[#0fa76e]"
                    : "bg-white border-black/[0.06] text-[#333333] hover:border-black/10"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[11px] border ${
                    checks[i]
                      ? "bg-[#18E299] border-[#18E299] text-white"
                      : "border-black/10"
                  }`}
                >
                  {checks[i] ? "✓" : ""}
                </span>
                {item}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row md:gap-6 border-b border-black/[0.06] mb-7">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`text-left md:text-center text-[15px] font-medium pb-3 md:pb-3 border-b-2 mb-[-1px] transition-colors ${
                  activeTab === t.key
                    ? "text-[#0d0d0d] border-[#18E299]"
                    : "text-[#666666] border-transparent hover:text-[#0d0d0d]"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-8 mb-10">
            {installData[activeTab].map((step, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-7 h-7 rounded-full bg-[#0d0d0d] text-white text-[13px] font-semibold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[17px] font-semibold">{step.title}</span>
                </div>
                <p className="text-[15px] text-[#333333] mb-3">{step.desc}</p>
                <CodeBlock code={step.code} />
                {activeTab === "windows" && idx === installData.windows.length - 1 && (
                  <div className="mt-4 border-2 border-dashed border-[#e5e5e5] rounded-xl p-10 text-center text-sm text-[#999] bg-[#fafafa]">
                    [截图位] 运行 hermes --version 的终端输出示例
                  </div>
                )}
                {activeTab !== "windows" && idx === installData[activeTab].length - 1 && (
                  <div className="mt-4 border-2 border-dashed border-[#e5e5e5] rounded-xl p-10 text-center text-sm text-[#999] bg-[#fafafa]">
                    [截图位] 运行 hermes --version 的终端输出示例
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <h2 className="text-xl font-semibold mb-4">常见安装错误速查</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border border-black/[0.06] rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#fafafa] transition-colors text-left"
                >
                  <span className="text-[15px] font-medium">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#666666] transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 py-4 bg-[#fafafa] text-sm text-[#333333] border-t border-black/[0.06]">
                    {f.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/7-days#day-1"
              className="inline-flex items-center justify-center bg-[#0d0d0d] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:opacity-92 transition-opacity"
            >
              继续 Day 1 学习路径 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
