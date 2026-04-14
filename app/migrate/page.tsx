"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import SchemaJsonLd from "../components/SchemaJsonLd";
import Link from "next/link";

const preChecks = [
  "备份 OpenClaw 配置文件",
  "确认 Hermes 已正确安装",
  "记录当前 API key 列表",
  "确认网络连接稳定",
  "了解当前渠道机器人状态",
  "检查当前 OpenClaw 版本号",
  "确保有终端访问权限",
  "阅读迁移前注意事项",
  "检查磁盘空间是否充足",
  "通知团队成员迁移计划",
];

const postChecks = [
  "hermes --version 正常返回",
  "配置文件已迁移至 ~/.hermes/",
  "渠道机器人能正常回复",
  "API 调用测试通过",
  "工具列表与迁移前一致",
];

const failures = [
  {
    symptom: "提示 \"claw 不存在\"",
    reason: "OpenClaw 未正确安装或未加入 PATH",
    fix: "检查 openclaw --version 是否可用",
  },
  {
    symptom: "渠道配置丢失",
    reason: "机器人 token 可能已过期",
    fix: "重新获取 BotFather / 飞书 token",
  },
  {
    symptom: "API key 迁移后无法调用",
    reason: "key 格式不兼容",
    fix: "手动检查 ~/.hermes/config.yaml",
  },
  {
    symptom: "命令执行到一半卡住",
    reason: "网络不稳定或配置文件过大",
    fix: "重试或分批迁移",
  },
];

const compareData = [
  { dim: "功能丰富度", hermes: "富有的内置工具 + MCP 生态", openclaw: "基础工具集", yes: true },
  { dim: "安全与隐私", hermes: "开源可审计，本地优先", openclaw: "云端依赖", yes: true },
  { dim: "社区活跃度", hermes: "GitHub 73K+ stars，更新频繁", openclaw: "更新较缓", yes: true },
  { dim: "中文支持", hermes: "社区中文教程丰富", openclaw: "中文资料较少", yes: true },
];

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "OpenClaw 迁移 Hermes 完整指南",
  step: [
    { "@type": "HowToStep", name: "迁移前检查", text: "完成 10 项检查清单" },
    { "@type": "HowToStep", name: "执行迁移命令", text: "运行 hermes claw migrate" },
    { "@type": "HowToStep", name: "迁移后验证", text: "完成 5 项验证清单" },
  ],
  estimatedCost: { "@type": "MonetaryAmount", currency: "USD", value: "0" },
};

export default function MigratePage() {
  const [pre, setPre] = useState<boolean[]>(Array(preChecks.length).fill(false));
  const [post, setPost] = useState<boolean[]>(Array(postChecks.length).fill(false));

  useEffect(() => {
    try {
      const savedPre = localStorage.getItem("hermes101-migrate-pre");
      const savedPost = localStorage.getItem("hermes101-migrate-post");
      if (savedPre) setPre(JSON.parse(savedPre));
      if (savedPost) setPost(JSON.parse(savedPost));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("hermes101-migrate-pre", JSON.stringify(pre));
      localStorage.setItem("hermes101-migrate-post", JSON.stringify(post));
    } catch {}
  }, [pre, post]);

  const togglePre = (i: number) => {
    const next = [...pre];
    next[i] = !next[i];
    setPre(next);
  };

  const togglePost = (i: number) => {
    const next = [...post];
    next[i] = !next[i];
    setPost(next);
  };

  return (
    <>
      <SchemaJsonLd schema={howToSchema} />
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-6 pb-20">
          <VersionBanner />

          {/* Mood banner */}
          <div className="bg-[#d4fae8] border border-[#18E299] rounded-xl px-6 py-4 mt-5 flex items-center gap-3.5 flex-wrap">
            <span className="text-2xl">👍</span>
            <span className="text-base font-medium text-[#0fa76e]">
              你的配置不会丢，迁移只需 3 步。我们帮你一条命令完成换仓。
            </span>
          </div>

          <h1 className="text-[32px] md:text-4xl font-semibold leading-tight tracking-tight mt-8 mb-2">
            OpenClaw 迁移指南
          </h1>
          <p className="text-base text-[#666666] mb-8">
            使用 <code>hermes claw migrate</code> 一键迁移。附带完整检查清单、常见失败修复和迁移后验证步骤。
          </p>

          {/* Pre checklist */}
          <h2 className="text-xl font-semibold mt-10 mb-4">迁移前检查清单（10 项）</h2>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {preChecks.map((item, i) => (
              <button
                key={i}
                onClick={() => togglePre(i)}
                className={`flex items-center gap-2.5 text-left rounded-xl px-4 py-3.5 text-sm border transition-all ${
                  pre[i]
                    ? "bg-[#d4fae8] border-[#18E299] text-[#0fa76e]"
                    : "bg-white border-black/[0.06] text-[#333333] hover:border-black/10"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center text-[11px] border ${
                    pre[i]
                      ? "bg-[#18E299] border-[#18E299] text-white"
                      : "border-black/10"
                  }`}
                >
                  {pre[i] ? "✓" : ""}
                </span>
                {item}
              </button>
            ))}
          </div>

          {/* Command demo */}
          <h2 className="text-xl font-semibold mt-10 mb-4">一键迁移命令</h2>
          <div className="bg-[#1e1e1e] rounded-2xl p-7 text-[#e5e5e5] mb-8">
            <div className="flex gap-2 mb-5">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
            </div>
            <div className="font-mono text-[15px] leading-7">
              <div>
                <span className="text-[#888]">$</span>{" "}
                <span className="text-[#18E299]">hermes claw migrate</span>
              </div>
              <div className="text-[#aaa] mt-2 space-y-1">
                <div>🔄 正在读取 OpenClaw 配置...</div>
                <div>📤 正在迁移渠道设置...</div>
                <div>💼 正在迁移工具配置...</div>
                <div>✅ 迁移完成！共迁移 12 项配置。</div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-5 text-[#18E299] text-sm font-medium">
              <span>✓</span> 迁移成功，你的配置毫无损失
            </div>
          </div>

          {/* Failures table */}
          <h2 className="text-xl font-semibold mt-10 mb-4">常见失败场景</h2>
          <div className="overflow-x-auto border border-black/[0.06] rounded-xl mb-8">
            <table className="w-full border-collapse text-sm min-w-[480px]">
              <thead className="bg-[#fafafa]">
                <tr>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">失败现象</th>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">原因</th>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">解决方案</th>
                </tr>
              </thead>
              <tbody>
                {failures.map((f, i) => (
                  <tr key={i} className="border-b border-black/[0.06] last:border-b-0">
                    <td className="px-4 py-3.5 text-[#333333]">{f.symptom}</td>
                    <td className="px-4 py-3.5 text-[#333333]">{f.reason}</td>
                    <td className="px-4 py-3.5 text-[#333333]">{f.fix}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Post checklist */}
          <h2 className="text-xl font-semibold mt-10 mb-4">迁移后验证清单（5 项）</h2>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            {postChecks.map((item, i) => (
              <button
                key={i}
                onClick={() => togglePost(i)}
                className={`flex items-center gap-2.5 text-left rounded-xl px-4 py-3.5 text-sm border transition-all ${
                  post[i]
                    ? "bg-[#d4fae8] border-[#18E299] text-[#0fa76e]"
                    : "bg-white border-black/[0.06] text-[#333333] hover:border-black/10"
                }`}
              >
                <span
                  className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center text-[11px] border ${
                    post[i]
                      ? "bg-[#18E299] border-[#18E299] text-white"
                      : "border-black/10"
                  }`}
                >
                  {post[i] ? "✓" : ""}
                </span>
                {item}
              </button>
            ))}
          </div>

          {/* Comparison table */}
          <h2 className="text-xl font-semibold mt-10 mb-4">Hermes vs OpenClaw 对比</h2>
          <div className="overflow-x-auto border border-black/[0.06] rounded-xl mb-10">
            <table className="w-full border-collapse text-sm min-w-[360px]">
              <thead className="bg-[#fafafa]">
                <tr>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">维度</th>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">Hermes</th>
                  <th className="text-left px-4 py-3.5 font-semibold border-b border-black/[0.06]">OpenClaw</th>
                </tr>
              </thead>
              <tbody>
                {compareData.map((row, i) => (
                  <tr key={i} className="border-b border-black/[0.06] last:border-b-0">
                    <td className="px-4 py-3.5 text-[#333333]">{row.dim}</td>
                    <td className={`px-4 py-3.5 font-medium ${row.yes ? "text-[#0fa76e]" : "text-[#333333]"}`}>
                      {row.hermes}
                    </td>
                    <td className="px-4 py-3.5 text-[#333333]">{row.openclaw}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="text-center pt-4">
            <Link
              href="/7-days"
              className="inline-flex items-center justify-center bg-[#0d0d0d] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:opacity-92 transition-opacity"
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
