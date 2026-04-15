"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";
import { CheckCircle2, Copy, Check } from "lucide-react";

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
    title: "提示 \"claw 不存在\"",
    reason: "OpenClaw 未安装或未加入 PATH。",
    fix: "which openclaw 检查路径；如已卸载，手动复制 ~/.openclaw/config.yaml 到 ~/.hermes/",
  },
  {
    key: "channel",
    title: "渠道配置丢失 / 机器人不回复",
    reason: "Token 过期或 webhook 未更新。",
    fix: "重新获取 Token；运行 hermes gateway setup <platform> 重新配置；用 /debug 检查连接状态。",
  },
  {
    key: "apikey",
    title: "API key 迁移后无法调用",
    reason: "Key 格式不兼容或 base_url 丢失。",
    fix: "hermes auth list 查看是否导入成功；手动编辑 ~/.hermes/config.yaml 补全 base_url。",
  },
  {
    key: "stuck",
    title: "命令执行到一半卡住",
    reason: "网络不稳定或旧配置文件过大。",
    fix: "按 Ctrl+C 取消后重试；或分批迁移：先迁移 config.yaml，再迁移 .env 和 skills。",
  },
  {
    key: "zip",
    title: "hermes import 报错 \"not a valid zip\"",
    reason: "压缩包格式不对。",
    fix: "确保是 .zip 格式；如为 .tar.gz，先解压再重新压缩为 zip。",
  },
];

const compareData = [
  { dim: "功能", openclaw: "—", hermes: "Web 实时状态面板" },
  { dim: "Backup / Import", openclaw: "手动拷贝", hermes: "hermes backup / import" },
  { dim: "平台接入", openclaw: "Telegram / 飞书", hermes: "8+ 平台" },
  { dim: "Debug 命令", openclaw: "—", hermes: "/debug 快速诊断" },
  { dim: "Watch Patterns", openclaw: "—", hermes: "后台进程输出监控" },
  { dim: "MCP / Skill 市场", openclaw: "基础工具", hermes: "/skills 丰富生态" },
  { dim: "Cron 自动化", openclaw: "—", hermes: "自然语言定时任务" },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "OpenClaw 迁移 Hermes 完整指南",
  step: [
    { "@type": "HowToStep", name: "迁移前检查", text: "确认已备份配置、记录 API key、检查网络和版本" },
    { "@type": "HowToStep", name: "执行迁移命令", text: "在终端运行 hermes claw migrate，自动迁移配置" },
    { "@type": "HowToStep", name: "迁移后验证", text: "确认 hermes --version 正常、渠道机器人可对话、API 测试通过" },
  ],
};

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#e4e2de] text-xs font-semibold hover:bg-[#fbf9f5] transition-colors ${
        copied ? "text-[#00685f]" : "text-[#3d4947]"
      }`}
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "已复制" : "复制"}
    </button>
  );
}

export default function MigratePage() {
  const [pre, setPre] = useState<Record<string, boolean>>({});
  const [post, setPost] = useState<Record<string, boolean>>({});
  const [openTrouble, setOpenTrouble] = useState<string | null>("claw");

  useEffect(() => {
    try {
      const savedPre = localStorage.getItem("hermes101-migrate-pre-v09");
      const savedPost = localStorage.getItem("hermes101-migrate-post-v09");
      if (savedPre) setPre(JSON.parse(savedPre));
      if (savedPost) setPost(JSON.parse(savedPost));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hermes101-migrate-pre-v09", JSON.stringify(pre));
      localStorage.setItem("hermes101-migrate-post-v09", JSON.stringify(post));
    } catch {}
  }, [pre, post]);

  const togglePre = (id: string) => setPre((p) => ({ ...p, [id]: !p[id] }));
  const togglePost = (id: string) => setPost((p) => ({ ...p, [id]: !p[id] }));

  const preDone = preChecks.filter((c) => pre[c.id]).length;
  const postDone = postChecks.filter((c) => post[c.id]).length;

  return (
    <>
      <SchemaJsonLd schema={howToSchema} />
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />

          {/* Mood banner */}
          <div className="bg-[#008378]/10 border border-[#00685f]/20 rounded-xl px-5 py-4 mt-5 flex items-center gap-3.5 flex-wrap">
            <CheckCircle2 className="w-6 h-6 text-[#00685f] shrink-0" />
            <span className="text-base font-bold text-[#00685f]">
              迁移通常只需 3 步。我们帮你一条命令完成换仓。建议迁移前先备份配置。
            </span>
          </div>

          {/* Disclaimer */}
          <div className="bg-[#fffbeb] border border-[#fde68a] rounded-xl px-5 py-3 mt-4 text-[13px] text-[#92400e]">
            <strong>免责提醒：</strong>迁移结果因环境而异，以下方案可解决大多数问题，但无法保证所有环境 100% 迁移成功。操作前请先备份重要数据。
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-8 mb-3">
            OpenClaw 迁移指南
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-8">
            使用 <code className="bg-[#fbf9f5] px-1.5 py-0.5 rounded text-sm">hermes claw migrate</code> 一键迁移。附带完整检查清单、常见失败修复和迁移后验证步骤。
          </p>

          {/* Timeline */}
          <section className="mb-10">
            <div className="flex items-center justify-between relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-[#e4e2de] -translate-y-1/2 z-0" />
              <div
                className="absolute top-1/2 left-0 h-0.5 bg-[#00685f] -translate-y-1/2 z-0"
                style={{ width: "66%" }}
              />
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00685f] flex items-center justify-center text-white text-sm font-bold">✓</div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#6d7a77]">迁移前</span>
              </div>
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-[#00685f] flex items-center justify-center text-white text-sm font-bold">✓</div>
                <span className="text-[11px] font-medium uppercase tracking-wider text-[#6d7a77]">迁移中</span>
              </div>
              <div className="z-10 flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-[#008378]/10 ring-4 ring-white flex items-center justify-center text-[#00685f]">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#00685f]">迁移后</span>
              </div>
            </div>
          </section>

          {/* Pre checklist */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1b1c1a]">迁移前检查清单（6 项）</h2>
              <span className="text-sm font-mono text-[#00685f] font-bold">
                {preDone} / {preChecks.length}
              </span>
            </div>
            <div className="grid gap-3">
              {preChecks.map((c) => {
                const checked = pre[c.id];
                return (
                  <button
                    key={c.id}
                    onClick={() => togglePre(c.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
                      checked
                        ? "bg-[#008378]/10 border-[#00685f]/20"
                        : "bg-white border-[#e4e2de] hover:border-[#6d7a77]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center text-white text-xs transition-all ${
                        checked ? "bg-[#00685f] border-[#00685f]" : "border-[#e4e2de]"
                      }`}
                    >
                      {checked ? "✓" : ""}
                    </div>
                    <span className={`text-sm font-medium ${checked ? "text-[#00685f]" : "text-[#3d4947]"}`}>
                      {c.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

          {/* Command Blocks */}
          <section className="mb-10 space-y-4">
            <div className="bg-[#1b1c1a] rounded-2xl p-6 md:p-7 text-[#e5e5e5] border border-white/10">
              <div className="flex justify-between items-start mb-4">
                <code className="font-mono text-[15px] text-[#6bd8cb] font-medium">hermes claw migrate</code>
                <CopyButton text="hermes claw migrate" />
              </div>
              <div className="space-y-2 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-xs text-[#6bd8cb] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  正在读取 OpenClaw 配置...
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6bd8cb] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  正在迁移渠道设置...
                </div>
                <div className="flex items-center gap-2 text-xs text-[#6bd8cb] font-medium">
                  <CheckCircle2 className="w-4 h-4" />
                  正在迁移工具配置...
                </div>
                <div className="flex items-center gap-2 text-[#6bd8cb] mt-3 pt-3 border-t border-white/10 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  迁移完成！共迁移 12 项配置。
                </div>
              </div>
            </div>

            <div className="bg-[#fbf9f5] rounded-xl p-5 border border-[#e4e2de]">
              <div className="flex justify-between items-start">
                <code className="font-mono text-[15px] text-[#1b1c1a] font-medium leading-tight">
                  hermes backup --output ~/hermes-migrated.zip
                </code>
                <CopyButton text="hermes backup --output ~/hermes-migrated.zip" />
              </div>
              <p className="text-xs text-[#6d7a77] mt-2">迁移后立即创建备份（推荐）</p>
            </div>
          </section>

          {/* Comparison Table */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1b1c1a] mb-5">Hermes v0.9 新功能对照表</h2>
            <div className="overflow-x-auto border border-[#e4e2de] rounded-xl bg-white">
              <table className="w-full border-collapse text-sm min-w-[360px]">
                <thead className="bg-[#fbf9f5]">
                  <tr>
                    <th className="text-left px-4 py-3.5 font-bold border-b border-[#e4e2de] text-[#1b1c1a]">功能</th>
                    <th className="text-left px-4 py-3.5 font-bold border-b border-[#e4e2de] text-[#1b1c1a]">OpenClaw</th>
                    <th className="text-left px-4 py-3.5 font-bold border-b border-[#e4e2de] text-[#1b1c1a]">Hermes v0.9.x</th>
                  </tr>
                </thead>
                <tbody>
                  {compareData.map((row, i) => (
                    <tr key={i} className="border-b border-[#e4e2de] last:border-b-0">
                      <td className="px-4 py-3.5 text-[#3d4947] font-medium">{row.dim}</td>
                      <td className="px-4 py-3.5 text-[#6d7a77]">{row.openclaw}</td>
                      <td className="px-4 py-3.5 text-[#00685f] font-medium">✓ {row.hermes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Troubleshooting */}
          <section className="mb-10">
            <h2 className="text-xl font-bold text-[#1b1c1a] mb-5">常见失败场景</h2>
            <div className="space-y-3">
              {troubleshooting.map((t) => (
                <div key={t.key} className="bg-white rounded-xl border border-[#e4e2de] overflow-hidden">
                  <button
                    onClick={() => setOpenTrouble(openTrouble === t.key ? null : t.key)}
                    className="w-full p-5 flex justify-between items-center text-left hover:bg-[#fbf9f5] transition-colors"
                  >
                    <span className="font-mono text-sm font-bold text-[#1b1c1a]">{t.title}</span>
                    <span
                      className={`text-[#999] transition-transform ${
                        openTrouble === t.key ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openTrouble === t.key && (
                    <div className="px-5 pb-5 pt-0 space-y-4 border-l-4 border-[#00685f] ml-5">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#999] font-bold">原因</p>
                        <p className="text-sm text-[#3d4947]">{t.reason}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-[#999] font-bold">解决方案</p>
                        <p className="text-sm text-[#3d4947]">{t.fix}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Post checklist */}
          <section className="mb-10">
            <div className="flex items-baseline justify-between mb-5">
              <h2 className="text-xl font-bold text-[#1b1c1a]">迁移后验证清单（5 项）</h2>
              <span className="text-sm font-mono text-[#00685f] font-bold">
                {postDone} / {postChecks.length}
              </span>
            </div>
            <div className="grid gap-3">
              {postChecks.map((c) => {
                const checked = post[c.id];
                return (
                  <button
                    key={c.id}
                    onClick={() => togglePost(c.id)}
                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors text-left ${
                      checked
                        ? "bg-[#008378]/10 border-[#00685f]/20"
                        : "bg-white border-[#e4e2de] hover:border-[#6d7a77]"
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-md border-2 flex items-center justify-center text-white text-xs transition-all ${
                        checked ? "bg-[#00685f] border-[#00685f]" : "border-[#e4e2de]"
                      }`}
                    >
                      {checked ? "✓" : ""}
                    </div>
                    <span className={`text-sm font-medium ${checked ? "text-[#00685f]" : "text-[#3d4947]"}`}>
                      {c.text}
                    </span>
                  </button>
                );
              })}
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

          <p className="text-center text-[12px] text-[#6d7a77] mt-6">
            你的迁移清单进度仅保存在当前浏览器中，不会上传到服务器。
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
