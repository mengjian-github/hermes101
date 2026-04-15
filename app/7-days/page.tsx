"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <div className="flex gap-4">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#eae8e4] text-[#6d7a77] flex items-center justify-center text-xs font-bold">
        {n}
      </div>
      <div>
        <p className="font-semibold text-[#1b1c1a] mb-1">{title}</p>
        <div className="text-sm text-[#3d4947]">{children}</div>
      </div>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">{children}</code>;
}

const days = [
  {
    day: 1,
    id: "day-1",
    title: "安装成功，并在终端说出第一句话",
    result: "运行 hermes --version 有输出，且在终端完成第一次对话",
    steps: (
      <>
        <Step n={1} title="选择你的操作系统">
          进入对应 Tab（Mac / Linux / Windows WSL2 / Termux）。
        </Step>
        <Step n={2} title="检查 Python 版本">
          <Code>python3 --version</Code>（需 ≥ 3.10）。
        </Step>
        <Step n={3} title="安装 Hermes">
          <Code>pip3 install --user hermes-agent</Code>
        </Step>
        <Step n={4} title="验证安装">
          <Code>hermes --version</Code>（应显示 v0.9.x）。
        </Step>
        <Step n={5} title="初始化配置向导">
          运行 <Code>hermes setup</Code> 交互式向导，生成 <Code>~/.hermes/config.yaml</Code>。
        </Step>
        <Step n={6} title="第一次对话">
          在终端输入 <Code>hermes</Code>，发送 <Code>你好</Code>。
        </Step>
        <Step n={7} title="体验 Fast Mode">
          v0.9 新增 <Code>hermes --fast</Code>，绕过多余对话直接执行第一个任务，适合验证安装是否正常。
        </Step>
      </>
    ),
    errors: [
      { title: "Python 版本过低", text: "安装 pyenv 或去 python.org 下载 3.11。" },
      { title: "hermes: command not found", text: "检查 ~/.local/bin 是否在 PATH；Linux 用户可执行 export PATH=\"$HOME/.local/bin:$PATH\" 并写入 ~/.bashrc。" },
      { title: "pip install 权限失败", text: "改用 --user 参数，或使用 python3 -m venv venv && source venv/bin/activate 在虚拟环境中安装。" },
      { title: "hermes setup 卡住", text: "检查网络是否能访问 api.openai.com（或其他模型提供商），如不能，先跳过 provider 配置，Day 2 再补。" },
    ],
    links: [{ text: "去安装 →", href: "/setup" }],
  },
  {
    day: 2,
    id: "day-2",
    title: "配置模型与 API key，让 Hermes 能正常回复",
    result: "发送消息后，Hermes 能调用 LLM 并返回有意义的回答",
    steps: (
      <>
        <Step n={1} title="打开配置文件">
          确认 <Code>~/.hermes/config.yaml</Code> 中的 model 字段（默认 anthropic/claude-sonnet-4）。
        </Step>
        <Step n={2} title="配置 API key">
          方式 A：写入 <Code>~/.hermes/.env</Code>。方式 B（v0.9 推荐）：运行 <Code>hermes auth add openai</Code>，支持加密存储。
        </Step>
        <Step n={3} title="测试模型连通性">
          <Code>hermes</Code> 进入对话，输入 <Code>/provider</Code> 查看状态。
        </Step>
        <Step n={4} title="验证回复质量">
          发送一条需要推理的消息（如“9.8 和 9.11 哪个大”）。
        </Step>
        <Step n={5} title="（可选）切换模型">
          <Code>/model claude-sonnet-4 --global</Code> 或 <Code>/model gpt-4.1</Code>。
        </Step>
      </>
    ),
    errors: [
      { title: "API key 无效", text: "检查 key 是否过期；国产模型用户需同步修改 base_url。" },
      { title: "回复为空或报错 429", text: "表示速率限制，建议换 provider 或开含 fallback model（在 config.yaml 中设置 fallback_model）。" },
      { title: "/provider 显示未配置", text: "确认 .env 文件无 BOM 头、无多余空格；或改用 hermes auth list 查看是否写入成功。" },
    ],
    links: [],
  },
  {
    day: 3,
    id: "day-3",
    title: "连接第一个渠道机器人（飞书 / Telegram / Discord）",
    result: "在真实聊天应用里 @机器人，它能回复你",
    steps: (
      <>
        <Step n={1} title="选择渠道">
          推荐顺序：Telegram → 飞书 → Discord。
        </Step>
        <Step n={2} title="获取 token / webhook">
          按渠道文档获取必要的认证信息。
        </Step>
        <Step n={3} title="配置渠道">
          v0.9 交互式向导支持 8+ 平台：<Code>hermes gateway setup &lt;platform&gt;</Code>
        </Step>
        <Step n={4} title="启动 gateway">
          <Code>hermes gateway run</Code>
        </Step>
        <Step n={5} title="测试机器人回复">
          在对应 App 里发送一条消息确认回复。
        </Step>
        <Step n={6} title="v0.9 新功能：Dashboard">
          访问 <Code>http://localhost:18000/dashboard</Code> 查看实时消息流、在线 session 数和调用记录。
        </Step>
      </>
    ),
    errors: [
      { title: "hermes gateway setup 没有想要的平台", text: "升级 hermes 到最新版：pip install --upgrade hermes-agent。" },
      { title: "Telegram bot 不回复", text: "检查 webhook 是否被其他服务占用；运行 hermes gateway logs 查看推送日志。" },
      { title: "飞书 webhook 报错", text: "确认事件订阅里勾选了“消息”事件，且地址使用 HTTPS。" },
      { title: "Discord bot 显示离线", text: "确认在 Discord Developer Portal 开启了 MESSAGE CONTENT INTENT。" },
      { title: "Dashboard 打不开", text: "检查 gateway 是否加了 --dashboard 参数启动；默认端口 18000 是否被占用。" },
    ],
    links: [],
  },
  {
    day: 4,
    id: "day-4",
    title: "调用第一个内置工具，让 Hermes 不只是聊天",
    result: "Hermes 成功调用至少 1 个工具并返回结果",
    steps: (
      <>
        <Step n={1} title="查天气">
          例如发送“北京今天天气怎么样”。
        </Step>
        <Step n={2} title="搜索实时信息">
          例如“Hermes v0.9 新功能”。
        </Step>
        <Step n={3} title="执行安全终端命令">
          如 <Code>ls -la ~/.hermes</Code>。
        </Step>
        <Step n={4} title="体验浏览器工具">
          让 Hermes 打开一个网页并总结内容。
        </Step>
      </>
    ),
    errors: [
      { title: "工具没有触发", text: "检查 config.yaml 中 enabled_toolsets 是否包含对应工具集。" },
      { title: "终端命令被拒绝", text: "Hermes 会弹出 approval 提示，在 gateway 中回复 /approve 或在 CLI 中输入 y。" },
      { title: "浏览器工具报错 timeout", text: "检查网络是否可访问目标站点；或改用 web_search 工具。" },
      { title: "搜索没有结果", text: "确认 FIRECRAWL_API_KEY 或 EXA_API_KEY 已配置（取决于默认搜索后端）。" },
    ],
    links: [],
  },
  {
    day: 5,
    id: "day-5",
    title: "安装并使用第一个第三方技能（MCP / Skill）",
    result: "成功安装一个第三方技能，并通过对话触发它",
    steps: (
      <>
        <Step n={1} title="浏览技能市场">
          在 Hermes CLI 中输入 <Code>/skills</Code> 或 <Code>/skills search weather</Code>。
        </Step>
        <Step n={2} title="安装技能">
          例如：<Code>/skills install mcp/weather</Code>
        </Step>
        <Step n={3} title="查看已安装技能">
          <Code>/skills list</Code>
        </Step>
        <Step n={4} title="触发该技能">
          如“查一下上海天气”。
        </Step>
        <Step n={5} title="卸载（可选）">
          <Code>/skills uninstall mcp/weather</Code>
        </Step>
      </>
    ),
    errors: [
      { title: "/skills 命令不存在", text: "确保 Hermes 版本 ≥ v0.9.0；升级后重启 CLI / gateway。" },
      { title: "安装失败（网络超时）", text: "检查是否能访问 GitHub；必要时配置代理或手动把 skill 放到 ~/.hermes/skills/。" },
      { title: "安装成功但无法触发", text: "检查该 skill 的 SKILL.md 中 trigger 条件，可能需要特定关键词。" },
      { title: "与现有工具冲突", text: "使用 /tools 命令临时禁用冲突的内置工具。" },
    ],
    links: [],
  },
  {
    day: 6,
    id: "day-6",
    title: "后台进程监控 + 备份恢复",
    result: "启动一个后台任务并通过 watch_patterns 监控输出；创建一个配置备份",
    steps: (
      <>
        <Step n={1} title="启动后台进程">
          例如让 Hermes 在后台运行 <Code>python3 -m http.server 8080</Code>，如果输出中出现 &quot;Serving&quot; 就通知你。
        </Step>
        <Step n={2} title="体验 watch_patterns">
          Hermes 会自动使用 <Code>watch_patterns=[&quot;Serving&quot;]</Code> 监控输出。
        </Step>
        <Step n={3} title="查看后台进程">
          <Code>/status</Code>
        </Step>
        <Step n={4} title="模拟崩溃恢复">
          关闭 terminal 再打开，运行 <Code>hermes</Code> 后输入 <Code>/status</Code> 查看进程是否仍在监控中。
        </Step>
        <Step n={5} title="创建备份">
          <Code>hermes backup</Code> 会在 Home 目录生成 <Code>hermes-backup-YYYY-MM-DD-HHMMSS.zip</Code>。
        </Step>
        <Step n={6} title="验证备份可恢复">
          运行 <Code>hermes import hermes-backup-XXXX.zip --dry-run</Code> 或直接在新机器上 <Code>hermes import</Code> 恢复。
        </Step>
      </>
    ),
    errors: [
      { title: "后台进程启动但 watch 没触发", text: "检查输出中是否真的有匹配字符串；大小写敏感；可用 .* 做正则模糊匹配。" },
      { title: "/status 看不到进程", text: "确认进程是在当前 task_id / session 下启动的；gateway 中不同 chat 的 session 是隔离的。" },
      { title: "hermes backup 报错权限不足", text: "检查 ~/.hermes 目录是否有可读权限；backup 会自动跳过过大的源码目录。" },
      { title: "hermes import 提示不是有效的备份", text: "确认 zip 内包含 config.yaml 或 .env；如果手动压缩的目录，确保前缀是 .hermes/ 或根目录。" },
    ],
    links: [],
  },
  {
    day: 7,
    id: "day-7",
    title: "进阶：自定义配置、迁移与排错",
    result: "能独立使用 /debug 诊断问题，并掌握从 OpenClaw 迁移的完整流程",
    steps: (
      <>
        <Step n={1} title="学习 /debug 命令">
          v0.9 新增：在对话中输入 <Code>/debug</Code>，查看模型状态、平台连接状态、最近 5 条错误日志摘要。
        </Step>
        <Step n={2} title="查看完整配置">
          <Code>/config</Code> 可以查看所有可自定义字段。
        </Step>
        <Step n={3} title="学习 Cron 自动化">
          <Code>hermes cron create --schedule &quot;0 9 * * *&quot; --prompt &quot;总结今天的新闻&quot;</Code>
        </Step>
        <Step n={4} title="输出自己的检查清单">
          回顾 7 天内容，整理一份自己的运行清单。
        </Step>
        <Step n={5} title="迁移 OpenClaw">
          如果有 OpenClaw 历史配置，阅读 migrate 页并执行 <Code>hermes claw migrate</Code>。
        </Step>
      </>
    ),
    errors: [
      { title: "/debug 无输出", text: "该命令需要 gateway v0.9.2+ 或 CLI v0.9.2+；升级后重试。" },
      { title: "Cron 任务没有触发", text: "检查 hermes cron list 中任务状态；确认 gateway 或 cron 守护进程正在运行。" },
      { title: "migrate 报错 “claw 不存在”", text: "先确认本机仍能运行 openclaw --version；如果已卸载，需手动迁移 ~/.openclaw/config.yaml。" },
    ],
    links: [{ text: "从 OpenClaw 迁移 →", href: "/migrate" }],
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
  const [expanded, setExpanded] = useState<Record<string, boolean>>({
    "day-1": true,
    "day-2": false,
    "day-3": false,
    "day-4": false,
    "day-5": false,
    "day-6": false,
    "day-7": false,
  });
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("hermes101-7days-v09");
      if (saved) {
        setDone(JSON.parse(saved));
      }
      const hash = window.location.hash.replace("#", "");
      if (hash && days.some((d) => d.id === hash)) {
        setExpanded((prev) => ({ ...prev, [hash]: true }));
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            const rect = el.getBoundingClientRect();
            const offset = window.pageYOffset + rect.top - 120;
            window.scrollTo({ top: offset, behavior: "smooth" });
          }
        }, 100);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hermes101-7days-v09", JSON.stringify(done));
    } catch {}
  }, [done]);

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleDone = (id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = days.filter((d) => done[d.id]).length;
  const progress = Math.round((completedCount / days.length) * 100);

  const expandDay = (index: number) => {
    if (index < 0) index = 0;
    if (index >= days.length) index = days.length - 1;
    const id = days[index].id;
    setExpanded((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const offset = window.pageYOffset + rect.top - 120;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 50);
  };

  const currentExpandedIndex = days.findIndex((d) => expanded[d.id]);

  return (
    <>
      <SchemaJsonLd schema={learningResourceSchema} />
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-40">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />

          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-3">
            7 天入门路径
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-8">
            从安装到上线机器人，每天一个可验证成果。点击卡片展开查看详情。
          </p>

          {/* Celebration Banner */}
          {completedCount === 7 && (
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#c5ebd9] to-[#7bfab9] p-8 text-center shadow-lg mb-10">
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-[#18E299]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M5 3h14v2H5V3zm0 16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-3H5v3zm14-8h-2V7h-2v4H9V7H7v4H5v2h2v4h2v-4h6v4h2v-4h2v-2z"/>
                  </svg>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-[#005234] mb-1">恭喜完成 7 天学习路径！</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 text-[#005234] font-bold text-sm tracking-wider">7/7 已完成</div>
              </div>
            </div>
          )}

          {/* Visual Timeline */}
          <section className="mb-10">
            <div className="flex justify-between items-center gap-1 h-1.5">
              {days.map((d, i) => (
                <div
                  key={d.id}
                  className={`flex-1 h-full rounded-full transition-colors ${
                    done[d.id] ? "bg-[#00685f]" : "bg-[#eae8e4]"
                  }`}
                />
              ))}
            </div>
            <div className="flex justify-between mt-4 px-1">
              {days.map((d, i) => {
                const isDone = done[d.id];
                const isExpanded = expanded[d.id];
                return (
                  <button
                    key={d.id}
                    onClick={() => expandDay(i)}
                    className="flex flex-col items-center gap-2"
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                        isDone
                          ? "bg-[#008378]/20 text-[#00685f]"
                          : isExpanded
                          ? "bg-[#00685f] text-white"
                          : "bg-[#eae8e4] text-[#6d7a77]"
                      }`}
                    >
                      {isDone ? "✓" : i + 1}
                    </div>
                    <span
                      className={`text-[11px] font-semibold ${
                        isDone ? "text-[#00685f]" : isExpanded ? "text-[#00685f]" : "text-[#6d7a77]"
                      }`}
                    >
                      Day {d.day}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Day Cards */}
          <div className="space-y-4">
            {days.map((d) => {
              const isExpanded = expanded[d.id];
              const isDone = done[d.id];
              return (
                <section
                  key={d.id}
                  id={d.id}
                  className="scroll-mt-32"
                >
                  {/* Header (collapsed) */}
                  {!isExpanded && (
                    <button
                      onClick={() => toggleExpand(d.id)}
                      className={`w-full rounded-xl p-5 flex items-center justify-between transition-colors border ${
                        isDone
                          ? "bg-[#008378]/5 border-[#00685f]/20"
                          : "bg-white border-[#e4e2de] hover:bg-[#fbf9f5]"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-white text-xs transition-all ${
                            isDone ? "bg-[#00685f] border-[#00685f]" : "border-[#e4e2de]"
                          }`}
                        >
                          {isDone ? "✓" : ""}
                        </div>
                        <div className="text-left">
                          <h3 className="font-semibold text-[#1b1c1a] text-sm">
                            Day {d.day}: {d.title}
                          </h3>
                          <p className="text-xs text-[#6d7a77] mt-0.5">{d.result}</p>
                        </div>
                      </div>
                      <span className="text-[#999] text-lg transition-transform">→</span>
                    </button>
                  )}

                  {/* Body (expanded) */}
                  {isExpanded && (
                    <div
                      className={`bg-white rounded-xl p-6 border-l-4 shadow-sm ${
                        isDone ? "border-l-[#00685f] border-[#e4e2de]" : "border-l-[#00685f] border-[#e4e2de]"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-5">
                        <div className="flex items-center gap-3">
                          <span className="bg-[#00685f] text-white text-xs font-black px-2 py-1 rounded">Day {d.day}</span>
                          <h2 className="text-xl font-bold tracking-tight text-[#1b1c1a]">{d.title}</h2>
                        </div>
                        {isDone && <span className="text-[#00685f] text-2xl">✓</span>}
                      </div>

                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#008378]/10 text-[#00685f] font-bold text-xs mb-5">
                        <span className="text-sm">🎯</span>
                        今日目标: {d.result}
                      </div>

                      <div className="space-y-5 mb-6">{d.steps}</div>

                      {d.errors.length > 0 && (
                        <div className="space-y-3 mb-6">
                          {d.errors.map((e, ei) => (
                            <div
                              key={ei}
                              className="bg-[#fffbeb] border-l-4 border-[#f59e0b] p-4 rounded-lg"
                            >
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[#f59e0b] text-sm">⚠️</span>
                                <span className="text-xs font-bold text-[#92400e]">常见错误：{e.title}</span>
                              </div>
                              <p className="text-sm text-[#92400e]">{e.text}</p>
                            </div>
                          ))}
                        </div>
                      )}

                      {d.links.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {d.links.map((l) => (
                            <Link
                              key={l.href}
                              href={l.href}
                              className="flex items-center gap-1 bg-[#fbf9f5] border border-[#e4e2de] px-3 py-1.5 rounded-full text-xs font-medium text-[#3d4947] hover:bg-[#eae8e4] transition-colors"
                            >
                              <span className="text-sm">→</span>
                              {l.text}
                            </Link>
                          ))}
                        </div>
                      )}

                      <div className="pt-5 border-t border-[#e4e2de] flex justify-between items-center">
                        <button
                          onClick={() => toggleDone(d.id)}
                          className="text-xs font-bold text-[#00685f] hover:underline"
                        >
                          {isDone ? "取消完成" : "标记为已完成"}
                        </button>
                        <button
                          onClick={() => toggleExpand(d.id)}
                          className="text-xs text-[#6d7a77] hover:text-[#1b1c1a]"
                        >
                          收起
                        </button>
                      </div>
                    </div>
                  )}
                </section>
              );
            })}
          </div>

          <p className="text-center text-[12px] text-[#6d7a77] mt-8">
            你的学习进度仅保存在当前浏览器中，不会上传到服务器。
          </p>
        </div>

        {/* Bottom sticky nav */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/98 border-t border-[#e4e2de] backdrop-blur-sm z-40">
          <div className="max-w-3xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => expandDay((currentExpandedIndex === -1 ? 0 : currentExpandedIndex) - 1)}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-[#e4e2de] text-[#6d7a77] hover:border-[#6d7a77] hover:text-[#1b1c1a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                ← 前一天
              </button>
              <button
                onClick={() => expandDay((currentExpandedIndex === -1 ? 0 : currentExpandedIndex) + 1)}
                className="px-5 py-2.5 rounded-full text-sm font-medium border border-[#e4e2de] text-[#6d7a77] hover:border-[#6d7a77] hover:text-[#1b1c1a] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                后一天 →
              </button>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[13px] text-[#6d7a77]">进度</span>
              <div className="w-24 md:w-28 h-1.5 bg-[#eae8e4] rounded-full overflow-hidden">
                <div className="h-full bg-[#00685f] transition-all duration-300" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[13px] text-[#6d7a77]">{completedCount}/7</span>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
