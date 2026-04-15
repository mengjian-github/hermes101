"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import MoodBanner from "../components/MoodBanner";
import TableWrap from "../components/TableWrap";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const preChecks = [
  { id: "mig-pre-1", text: "备份 OpenClaw 配置（cp -r ~/.openclaw ~/.openclaw.bak）" },
  { id: "mig-pre-2", text: "确认 Hermes 已安装且版本 ≥ v0.9.0" },
  { id: "mig-pre-3", text: "记录当前 API key（至少 1 个主 key）" },
  { id: "mig-pre-4", text: "检查网络可访问模型提供商" },
  { id: "mig-pre-5", text: "确认当前机器人 token 未过期" },
  { id: "mig-pre-6", text: "确保终端有 openclaw 命令或知道旧配置路径" },
];

const postChecks = [
  { id: "mig-post-1", text: "hermes --version 正常返回 v0.9.x" },
  { id: "mig-post-2", text: "hermes config 显示已迁移的配置" },
  { id: "mig-post-3", text: "渠道机器人能正常回复消息" },
  { id: "mig-post-4", text: "API 调用测试通过（发送消息看是否有回复）" },
  { id: "mig-post-5", text: "工具列表与迁移前一致（/tools list 对比）" },
];

const troubleshooting = [
  {
    key: "claw",
    title: '提示 "claw 不存在"',
    reason: "OpenClaw 未安装或未加入 PATH。",
    fix: <><code className="bg-[#fbf9f5] px-1 rounded text-sm">which openclaw</code> 检查路径；如已卸载，手动复制 <code className="bg-[#fbf9f5] px-1 rounded text-sm">~/.openclaw/config.yaml</code> 到 <code className="bg-[#fbf9f5] px-1 rounded text-sm">~/.hermes/</code></>,
  },
  {
    key: "channel",
    title: "渠道配置丢失 / 机器人不回复",
    reason: "Token 过期或 webhook 未更新。",
    fix: <>重新获取 Token；运行 <code className="bg-[#fbf9f5] px-1 rounded text-sm">hermes gateway setup &lt;platform&gt;</code> 重新配置；用 <code className="bg-[#fbf9f5] px-1 rounded text-sm">/debug</code> 检查连接状态。</>,
  },
  {
    key: "apikey",
    title: "API key 迁移后无法调用",
    reason: "Key 格式不兼容或 base_url 丢失。",
    fix: <><code className="bg-[#fbf9f5] px-1 rounded text-sm">hermes auth list</code> 查看是否导入成功；手动编辑 <code className="bg-[#fbf9f5] px-1 rounded text-sm">~/.hermes/config.yaml</code> 补全 base_url。</>,
  },
  {
    key: "stuck",
    title: "命令执行到一半卡住",
    reason: "网络不稳定或旧配置文件过大。",
    fix: "按 Ctrl+C 取消后重试；或分批迁移：先迁移 config.yaml，再迁移 .env 和 skills。",
  },
  {
    key: "zip",
    title: 'hermes import 报错 "not a valid zip"',
    reason: "压缩包格式不对。",
    fix: "确保是 .zip 格式；如为 .tar.gz，先解压再重新压缩为 zip。",
  },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "OpenClaw 迁移 Hermes 完整指南",
  step: [
    { "@type": "HowToStep", name: "迁移前检查", text: "确认已备份配置、记录 API key、检查网络和版本。" },
    { "@type": "HowToStep", name: "执行迁移命令", text: "在终端运行 hermes claw migrate，自动迁移配置。" },
    { "@type": "HowToStep", name: "迁移后验证", text: "确认 hermes --version 正常、渠道机器人可对话、API 测试通过。" },
  ],
};

function CheckRow({ id, text }: { id: string; text: string }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setChecked(localStorage.getItem(`check:${id}`) === "1");
    } catch {}
  }, [id]);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      localStorage.setItem(`check:${id}`, next ? "1" : "0");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`check-item w-full flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
        checked
          ? "bg-[#d4fae8] border-[#18E299]/20"
          : "bg-white border-[#e4e2de] hover:border-[#6d7a77]"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-md border-2 flex items-center justify-center text-white text-xs transition-all ${
          checked ? "bg-[#18E299] border-[#18E299]" : "border-[#ccc]"
        }`}
      >
        {checked && (
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
          </svg>
        )}
      </div>
      <span className={`text-sm font-medium ${checked ? "text-[#00685f]" : "text-[#333]"}`}>{text}</span>
    </button>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <button
      onClick={copy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-black/[0.06] text-xs font-semibold hover:bg-[#fafafa] transition-colors ${
        copied ? "text-[#0fa76e]" : "text-[#666]"
      }`}
    >
      {copied ? (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z" />
        </svg>
      )}
      {copied ? "已复制" : "复制"}
    </button>
  );
}

export default function MigratePage() {
  const [openTrouble, setOpenTrouble] = useState<string | null>("claw");

  return (
    <>
      <SchemaJsonLd schema={howToSchema} />
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />
          <MoodBanner text="你的配置不会丢，迁移只需 3 步。我们帮你一条命令完成换仓。" />

          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-8 mb-3">
            OpenClaw 迁移指南
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-8">
            使用 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">hermes claw migrate</code> 一键迁移。附带完整检查清单、常见失败修复和迁移后验证步骤。
          </p>

          {/* Timeline */}
          <section className="mb-10">
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e5e5e5] -translate-y-1/2 z-0" />
              <div className="absolute top-1/2 left-0 w-[66%] h-0.5 bg-[#18E299] -translate-y-1/2 z-0" />
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#18E299] flex items-center justify-center text-white text-sm font-bold">✓</div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#666]">迁移前</span>
              </div>
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#18E299] flex items-center justify-center text-white text-sm font-bold">✓</div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#666]">迁移中</span>
              </div>
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#d4fae8] ring-4 ring-white flex items-center justify-center text-[#0fa76e]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#0fa76e]">迁移后</span>
              </div>
            </div>
          </section>

          {/* Pre-migration Checklist */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1b1c1a]">迁移前检查清单（6 项）</h2>
            </div>
            <div className="grid gap-3">
              {preChecks.map((c) => (
                <CheckRow key={c.id} id={c.id} text={c.text} />
              ))}
            </div>
          </section>

          {/* Command Blocks */}
          <section className="mb-10 space-y-4">
            <div className="bg-[#f3f3f3] rounded-xl p-5 space-y-4">
              <div className="flex justify-between items-start">
                <code className="font-mono text-[15px] text-[#0d0d0d] font-medium">hermes claw migrate</code>
                <CopyButton text="hermes claw migrate" />
              </div>
              <div className="space-y-2 border-t border-black/[0.06] pt-4">
                <div className="flex items-center gap-2 text-xs text-[#0fa76e] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  正在读取 OpenClaw 配置...
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0fa76e] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  正在迁移渠道设置...
                </div>
                <div className="flex items-center gap-2 text-xs text-[#0fa76e] font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  正在迁移工具配置...
                </div>
                <div className="flex items-center gap-2 text-[#18E299] mt-3 pt-3 border-t border-black/[0.06] text-sm font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                  迁移完成！共迁移 12 项配置。
                </div>
              </div>
            </div>

            <div className="bg-[#f3f3f3] rounded-xl p-5">
              <div className="flex justify-between items-start">
                <code className="font-mono text-[15px] text-[#0d0d0d] font-medium leading-tight">
                  hermes backup --output ~/hermes-migrated.zip
                </code>
                <CopyButton text="hermes backup --output ~/hermes-migrated.zip" />
              </div>
              <p className="text-xs text-[#666] mt-2">迁移后立即创建备份（推荐）</p>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1b1c1a] mb-5">Hermes v0.9 新功能对照表</h2>
            <TableWrap>
              <thead className="bg-[#fafafa]">
                <tr>
                  <th className="text-left py-3.5 px-4 font-bold border-b border-[#e4e2de]">功能</th>
                  <th className="text-left py-3.5 px-4 font-bold border-b border-[#e4e2de]">OpenClaw</th>
                  <th className="text-left py-3.5 px-4 font-bold border-b border-[#e4e2de]">Hermes v0.9.x</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">Dashboard</td>
                  <td className="py-3.5 px-4 text-[#999]">—</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ Web 实时状态面板</td>
                </tr>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">Backup / Import</td>
                  <td className="py-3.5 px-4 text-[#999]">手动拷贝</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ hermes backup / import</td>
                </tr>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">平台接入</td>
                  <td className="py-3.5 px-4 text-[#333]">Telegram / 飞书</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ 8+ 平台</td>
                </tr>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">Debug 命令</td>
                  <td className="py-3.5 px-4 text-[#999]">—</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ /debug 快速诊断</td>
                </tr>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">Watch Patterns</td>
                  <td className="py-3.5 px-4 text-[#999]">—</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ 后台进程输出监控</td>
                </tr>
                <tr className="border-b border-[#e4e2de]">
                  <td className="py-3.5 px-4 text-[#333] font-medium">MCP / Skill 市场</td>
                  <td className="py-3.5 px-4 text-[#333]">基础工具</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ /skills 丰富生态</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-[#333] font-medium">Cron 自动化</td>
                  <td className="py-3.5 px-4 text-[#999]">—</td>
                  <td className="py-3.5 px-4 text-[#0fa76e] font-medium">✓ 自然语言定时任务</td>
                </tr>
              </tbody>
            </TableWrap>
          </section>

          {/* Troubleshooting */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1b1c1a] mb-5">常见失败场景</h2>
            <div className="space-y-3">
              {troubleshooting.map((t) => (
                <div key={t.key} className="bg-white rounded-xl border border-[#e4e2de] overflow-hidden">
                  <button
                    onClick={() => setOpenTrouble(openTrouble === t.key ? null : t.key)}
                    className="w-full p-5 flex justify-between items-center text-left hover:bg-[#fafafa] transition-colors"
                  >
                    <span className="font-mono text-sm font-bold text-[#0d0d0d]">{t.title}</span>
                    <ChevronDown
                      size={18}
                      className={`text-[#999] transition-transform ${openTrouble === t.key ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openTrouble === t.key && (
                    <div className="px-5 pb-5 pt-0 space-y-4 border-l-4 border-[#18E299] ml-5">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#999] font-bold">原因</p>
                        <p className="text-sm text-[#666]">{t.reason}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#999] font-bold">解决方案</p>
                        <div className="text-sm text-[#666]">{t.fix}</div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Post-migration Checklist */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1b1c1a]">迁移后验证清单（5 项）</h2>
            </div>
            <div className="grid gap-3">
              {postChecks.map((c) => (
                <CheckRow key={c.id} id={c.id} text={c.text} />
              ))}
            </div>
          </section>

          <div className="text-center pt-4">
            <Link
              href="/7-days"
              className="inline-flex items-center justify-center bg-[#00685f] text-white px-8 py-3 rounded-full text-[15px] font-bold hover:shadow-lg transition-all active:scale-95"
            >
              开始 7 天 Hermes 学习路径 →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
