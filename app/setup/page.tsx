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
      desc: "使用官方脚本一键安装。",
      code: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash",
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
      desc: "使用官方脚本一键安装。",
      code: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash",
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
      desc: "在 WSL2 中使用官方脚本一键安装。",
      code: "curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash",
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
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />

          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-3">
            5 分钟安装 Hermes Agent
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-6">
            选择你的操作系统，每步都有可复制命令。即使你是第一次打开终端，也能顺利跑通。
          </p>

          {/* Safety tip */}
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl px-5 py-3 mb-8 text-[13px] text-[#92400e]">
            <strong>⚠️ 操作提醒：</strong>Windows 用户安装 WSL2 涉及系统级设置变更，建议操作前备份重要数据。
          </div>

          {/* Pre-checklist */}
          <h2 className="text-xl font-bold text-[#1b1c1a] mb-4">前置检查清单</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {checklist.map((item, i) => (
              <button
                key={i}
                onClick={() => toggleCheck(i)}
                className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm border transition-all ${
                  checks[i]
                    ? "bg-[#008378]/15 border-[#00685f] text-[#00685f]"
                    : "bg-white border-[#e4e2de] text-[#3d4947] hover:border-[#6d7a77]"
                }`}
              >
                <span
                  className={`w-4 h-4 rounded flex items-center justify-center text-[11px] border transition-colors ${
                    checks[i]
                      ? "bg-[#00685f] border-[#00685f] text-white"
                      : "border-[#e4e2de]"
                  }`}
                >
                  {checks[i] ? "✓" : ""}
                </span>
                {item}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="flex flex-col md:flex-row md:gap-8 border-b border-[#e4e2de] mb-8">
            {tabs.map((t) => (
              <button
                key={t.key}
                onClick={() => setActiveTab(t.key)}
                className={`text-left md:text-center text-[15px] font-medium pb-3 md:pb-3 border-b-2 mb-[-1px] transition-colors ${
                  activeTab === t.key
                    ? "text-[#00685f] border-[#00685f]"
                    : "text-[#6d7a77] border-transparent hover:text-[#1b1c1a]"
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
                  <span className="w-7 h-7 rounded-full bg-[#00685f] text-white text-[13px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[17px] font-semibold text-[#1b1c1a]">{step.title}</span>
                </div>
                <p className="text-[15px] text-[#3d4947] mb-3">{step.desc}</p>
                <CodeBlock code={step.code} />
                {idx === installData[activeTab].length - 1 && (
                  <div className="mt-4 border-2 border-dashed border-[#e4e2de] rounded-xl p-10 text-center text-sm text-[#6d7a77] bg-[#fbf9f5]">
                    [截图位] 运行 hermes --version，应看到 v0.8.0
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <h2 className="text-xl font-bold text-[#1b1c1a] mb-4">常见安装错误速查</h2>
          <div className="space-y-3 mb-10">
            {faqs.map((f, i) => (
              <div
                key={i}
                className="border border-[#e4e2de] rounded-xl overflow-hidden bg-white"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#fbf9f5] transition-colors text-left"
                >
                  <span className="text-[15px] font-semibold text-[#1b1c1a]">{f.q}</span>
                  <ChevronDown
                    size={18}
                    className={`text-[#6d7a77] transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === i && (
                  <div className="px-5 py-4 bg-[#fbf9f5] text-sm text-[#3d4947] border-t border-[#e4e2de]">
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
              className="inline-flex items-center justify-center bg-[#00685f] text-white px-8 py-3 rounded-full text-[15px] font-bold hover:shadow-lg transition-all active:scale-95"
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
