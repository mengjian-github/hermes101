"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";

const days = [
  {
    day: 1,
    title: "安装 + 第一次对话",
    result: "成功运行 hermes 并得到第一个回复",
    desc: "今天完成 Hermes 的安装，配置你的第一个 API key，然后在终端里和 Hermes 说“你好”。",
    links: [{ href: "/setup", label: "去安装 →" }],
  },
  {
    day: 2,
    title: "配置模型和 API key",
    result: "让 Hermes 调用你选择的 LLM",
    desc: "学习如何在 ~/.hermes/config.yaml 中配置 OpenAI、Anthropic 或国内模型。测试不同模型的回复质量。",
    links: [],
  },
  {
    day: 3,
    title: "连接飞书 / Telegram",
    result: "拥有一个可回复消息的机器人",
    desc: "选择一个渠道（飞书或 Telegram），按图文步骤完成 webhook 配置，让 Hermes 能够在实际场景中与你对话。",
    links: [
      { href: "/blog/feishu-bot-setup", label: "飞书配置详情 →" },
      { href: "/blog/telegram-bot-setup", label: "Telegram 配置详情 →" },
    ],
  },
  {
    day: 4,
    title: "使用内置工具",
    result: "成功调用天气、搜索、终端等技能",
    desc: "了解 Hermes 的工具系统。让它帮你查天气、搜索网页、或者在终端里执行命令。",
    links: [],
  },
  {
    day: 5,
    title: "技能系统入门",
    result: "安装并使用一个第三方技能",
    desc: "学习如何从 MCP Hub 或其他源安装第三方技能，扩展 Hermes 的能力边界。",
    links: [],
  },
  {
    day: 6,
    title: "记忆与 Cron 自动化",
    result: "设置一个定时任务或持久记忆",
    desc: "让 Hermes 记住你的偏好和对话历史。配置一个定时任务，比如每天早上发送新闻摘要。",
    links: [],
  },
  {
    day: 7,
    title: "进阶与下一步",
    result: "了解 MCP、自定义技能和部署选项",
    desc: "回顾过去 7 天的学习，了解如何自定义技能、接入 MCP 服务器，以及常见的部署方案。",
    links: [{ href: "/migrate", label: "从 OpenClaw 迁移 →" }],
  },
];

const learningResourceSchema = {
  "@context": "https://schema.org",
  "@type": "LearningResource",
  name: "Hermes Agent 教程：7 天入门路径",
  description: "从安装到机器人上线，7 天跟练计划。",
  educationalLevel: "Beginner",
  teaches: "Hermes Agent 安装、配置、渠道接入、技能使用、迁移",
};

export default function SevenDaysPage() {
  const [completed, setCompleted] = useState<boolean[]>(Array(7).fill(false));
  const [activeDay, setActiveDay] = useState(1);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hermes101-7days");
      if (saved) {
        setCompleted(JSON.parse(saved));
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hermes101-7days", JSON.stringify(completed));
    } catch {}
  }, [completed]);

  const toggleDay = (idx: number) => {
    const next = [...completed];
    next[idx] = !next[idx];
    setCompleted(next);
  };

  const progress = Math.round(
    (completed.filter(Boolean).length / completed.length) * 100
  );
  const completedCount = completed.filter(Boolean).length;

  return (
    <>
      <SchemaJsonLd schema={learningResourceSchema} />
      <Navbar />
      <main className="flex-1 pb-40">
        <div className="max-w-[800px] mx-auto px-6">
          <VersionBanner />

          <h1 className="text-[32px] md:text-4xl font-semibold leading-tight tracking-tight mt-10 mb-2">
            7 天入门路径
          </h1>
          <p className="text-base text-[#666666] mb-8">
            从安装到上线机器人，每天一个可验证成果。点击日期前的方框可以标记完成状态。
          </p>

          {/* Timeline */}
          <div className="flex justify-between items-center gap-2 overflow-x-auto pb-2 mb-10">
            {days.map((d) => (
              <button
                key={d.day}
                onClick={() => setActiveDay(d.day)}
                className={`flex-1 min-w-[72px] text-center rounded-lg h-11 flex items-center justify-center text-[13px] font-semibold transition-colors ${
                  completed[d.day - 1]
                    ? "bg-[#d4fae8] text-[#0fa76e]"
                    : activeDay === d.day
                    ? "bg-[#18E299] text-white"
                    : "bg-[#e5e5e5] text-[#666666]"
                }`}
              >
                Day {d.day}
              </button>
            ))}
          </div>

          {/* Day sections */}
          <div className="space-y-6">
            {days.map((d, idx) => (
              <section
                key={d.day}
                id={`day-${d.day}`}
                className={`relative bg-white border border-black/[0.06] rounded-2xl p-7 scroll-mt-28 transition-all ${
                  completed[idx] ? "border-l-4 border-l-[#18E299]" : ""
                }`}
              >
                <button
                  onClick={() => toggleDay(idx)}
                  className={`absolute right-6 top-7 w-[22px] h-[22px] rounded-md border flex items-center justify-center text-[13px] transition-colors ${
                    completed[idx]
                      ? "bg-[#18E299] border-[#18E299] text-white"
                      : "border-black/10 hover:border-black/20"
                  }`}
                  aria-label={`标记 Day ${d.day} 完成`}
                >
                  {completed[idx] ? "✓" : ""}
                </button>

                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-[#0d0d0d] text-white px-3 py-1 rounded-full text-[13px] font-semibold">
                    Day {d.day}
                  </span>
                  <span className="text-xl font-semibold">{d.title}</span>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#d4fae8] text-[#0fa76e] px-3.5 py-2 rounded-lg text-[13px] font-medium mb-4">
                  成果：{d.result}
                </div>

                <p className="text-[15px] text-[#333333] mb-4">{d.desc}</p>

                {d.links.length > 0 && (
                  <div className="flex flex-wrap gap-3">
                    {d.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="text-sm text-[#0fa76e] underline underline-offset-2"
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>
        </div>

        {/* Bottom sticky nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/98 border-t border-black/[0.06] backdrop-blur-sm z-40">
          <div className="max-w-[800px] mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => setActiveDay((d) => Math.max(1, d - 1))}
                disabled={activeDay === 1}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-black/[0.06] text-[#666666] hover:border-black/10 hover:text-[#0d0d0d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← 前一天
              </button>
              <button
                onClick={() => setActiveDay((d) => Math.min(7, d + 1))}
                disabled={activeDay === 7}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-black/[0.06] text-[#666666] hover:border-black/10 hover:text-[#0d0d0d] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                后一天 →
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] text-[#666666]">进度</span>
              <div className="w-28 h-1.5 bg-[#e5e5e5] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#18E299] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-[13px] text-[#666666]">
                {completedCount}/7
              </span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
