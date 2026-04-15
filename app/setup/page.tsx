"use client";

import { useState, useEffect } from "react";
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
  { key: "termux", label: "Termux / Android" },
];

const checklist = [
  "有一台能联网的电脑或手机",
  "已注册 LLM API（OpenAI / Anthropic）",
  "有 5 分钟跟着操作",
];

const installData: Record<string, { title: string; desc: string; code?: string }[]> = {
  mac: [
    {
      title: "安装 Python 环境",
      desc: "Hermes 需要 Python 3.10 或更高版本。首先确认你的系统已经安装。",
      code: "python3 --version",
    },
    {
      title: "安装 Hermes Agent",
      desc: "使用 pip 一键安装。如果提示权限不足，可以加上 --user 参数。",
      code: "pip3 install --user hermes-agent",
    },
    {
      title: "运行安装验证",
      desc: "安装完成后，运行以下命令确认版本。",
      code: "hermes --version",
    },
    {
      title: "初始化配置向导",
      desc: "v0.9 新增的交互式配置向导，会自动生成 ~/.hermes/config.yaml。",
      code: "hermes setup",
    },
  ],
  linux: [
    {
      title: "安装 Python 环境",
      desc: "大多数 Linux 发行版已带 Python3。检查版本，不足时请通过包管理器安装。",
      code: "python3 --version",
    },
    {
      title: "安装 pip（如果没有）",
      desc: "例如在 Ubuntu/Debian 上。",
      code: "sudo apt update && sudo apt install python3-pip -y",
    },
    {
      title: "安装 Hermes Agent",
      desc: "建议使用 --user 避免权限问题。",
      code: "pip3 install --user hermes-agent",
    },
    {
      title: "验证安装",
      desc: "如果命令不在 PATH，请将 pip 的本地 bin 目录加入 PATH。",
      code: "hermes --version",
    },
    {
      title: "初始化配置向导",
      desc: "运行 v0.9 交互式向导生成配置文件。",
      code: "hermes setup",
    },
  ],
  windows: [
    {
      title: "启用 WSL2",
      desc: "以管理员身份打开 PowerShell，运行以下命令并重启电脑。",
      code: "wsl --install",
    },
    {
      title: "进入 Ubuntu 终端",
      desc: "在开始菜单搜索并打开 Ubuntu，设置用户名和密码。",
    },
    {
      title: "更新系统并安装 Python",
      desc: "",
      code: "sudo apt update && sudo apt install python3 python3-pip -y",
    },
    {
      title: "安装 Hermes Agent",
      desc: "",
      code: "pip3 install --user hermes-agent",
    },
    {
      title: "验证安装",
      desc: "",
      code: "hermes --version",
    },
    {
      title: "初始化配置向导",
      desc: "",
      code: "hermes setup",
    },
  ],
  termux: [
    {
      title: "安装 Termux",
      desc: "从 F-Droid 或 GitHub 发行版下载安装 Termux（建议不要使用应用宝版本）。",
    },
    {
      title: "更新包列表并安装 Python",
      desc: "",
      code: "pkg update && pkg install python python-pip -y",
    },
    {
      title: "安装 Hermes Agent",
      desc: "Termux 环境完全兼容，直接使用 pip 安装即可。",
      code: "pip install hermes-agent",
    },
    {
      title: "验证安装",
      desc: "",
      code: "hermes --version",
    },
    {
      title: "初始化配置向导",
      desc: "",
      code: "hermes setup",
    },
  ],
};

const faqsByTab: Record<string, { q: string; a: React.ReactNode }[]> = {
  mac: [
    {
      q: "Python 版本过低",
      a: (
        <>
          访问 <a href="https://python.org" className="text-[#00685f] underline">python.org</a> 下载 Python 3.11，或使用 Homebrew 安装：<code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">brew install python@3.11</code>。
        </>
      ),
    },
    {
      q: "pip 安装权限失败",
      a: (
        <>
          尝试 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">pip3 install --user hermes-agent</code>，或使用虚拟环境 venv 进行安装。
        </>
      ),
    },
    {
      q: "hermes 命令找不到",
      a: (
        <>
          运行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">export PATH=&quot;$HOME/.local/bin:$PATH&quot;</code>，并添加到 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">~/.zshrc</code> 或 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">~/.bashrc</code>。
        </>
      ),
    },
  ],
  linux: [
    {
      q: "Python 版本过低",
      a: (
        <>
          Ubuntu/Debian 用户可运行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">sudo apt install python3.11 python3.11-pip -y</code>，然后用 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">python3.11 -m pip install --user hermes-agent</code> 安装。
        </>
      ),
    },
    {
      q: "pip 安装权限失败",
      a: (
        <>
          优先使用 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">pip3 install --user hermes-agent</code>；次选在 venv 虚拟环境中安装。
        </>
      ),
    },
    {
      q: "hermes 命令找不到",
      a: (
        <>
          执行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">export PATH=&quot;$HOME/.local/bin:$PATH&quot;</code> 并写入 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">~/.bashrc</code>，然后 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">source ~/.bashrc</code>。
        </>
      ),
    },
  ],
  windows: [
    {
      q: "WSL2 未启用",
      a: (
        <>
          在 PowerShell 中以管理员身份运行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">wsl --install</code>，重启后继续安装。如仍失败，在 BIOS 开启虚拟化（Intel VT-x / AMD-V）。
        </>
      ),
    },
    {
      q: "hermes 命令找不到",
      a: (
        <>
          在 WSL2 Ubuntu 中运行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">export PATH=&quot;$HOME/.local/bin:$PATH&quot;</code>，并写入 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">~/.bashrc</code>。
        </>
      ),
    },
    {
      q: "WSL2 网络无法访问模型 API",
      a: (
        <>
          检查 Windows 防火墙是否阻止了 WSL2 网络访问；必要时在 WSL2 中配置代理（如 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">export https_proxy=http://host.docker.internal:7890</code>）。
        </>
      ),
    },
  ],
  termux: [
    {
      q: "pip 安装失败或编译错",
      a: (
        <>
          运行 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">pkg install clang libffi openssl -y</code> 后重试。
        </>
      ),
    },
    {
      q: "Android 杀后台导致 Hermes 断连",
      a: (
        <>
          进入 Android 设置 → 电池 → 应用省电策略，将 Termux 设为无限制。如果运行了 gateway，建议使用 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">termux-wake-lock</code> 保持唤醒。
        </>
      ),
    },
    {
      q: "hermes setup 卡住",
      a: (
        <>
          Termux 中某些键盘输入法可能与交互式向导不兼容，尝试换用 Hacker&apos;s Keyboard 或直接手动编辑 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">~/.hermes/config.yaml</code>。
        </>
      ),
    },
  ],
};

const techArticleSchema = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  headline: "Hermes Agent 安装教程（Mac/Linux/Windows/Termux）",
  author: { "@type": "Organization", name: "hermes101" },
  datePublished: "2026-04-15",
  dateModified: "2026-04-15",
  keywords: "Hermes Agent 安装, Hermes Agent Windows 安装, Hermes Agent WSL2, Hermes Agent Termux, Hermes v0.9",
};

export default function SetupPage() {
  const [activeTab, setActiveTab] = useState("mac");
  const [checks, setChecks] = useState<boolean[]>([false, false, false]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hermes101-setup-tab");
      if (saved && tabs.some((t) => t.key === saved)) {
        setActiveTab(saved);
      }
    } catch {}
  }, []);

  const handleTabChange = (key: string) => {
    setActiveTab(key);
    setOpenFaq(null);
    try {
      localStorage.setItem("hermes101-setup-tab", key);
    } catch {}
  };

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
                onClick={() => handleTabChange(t.key)}
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
                {step.code && <CodeBlock code={step.code} />}
              </div>
            ))}
          </div>

          {/* FAQ accordion */}
          <h2 className="text-xl font-bold text-[#1b1c1a] mb-4">常见安装错误速查</h2>
          <div className="space-y-3 mb-10">
            {faqsByTab[activeTab].map((f, i) => (
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
