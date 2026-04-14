import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";

export const metadata = {
  title: "博客",
  description: "hermes101 博客 - Hermes Agent 入门指南与更新日志",
};

const upcoming = [
  {
    slug: "windows-wsl2-complete-guide",
    title: "Hermes Agent Windows WSL2 完整安装指南",
    desc: "从零开启 WSL2 到成功运行 hermes，完整截图步骤 + 常见报错排查。",
  },
  {
    slug: "feishu-bot-setup",
    title: "Hermes Agent 飞书机器人配置教程",
    desc: "图文 step-by-step：创建飞书机器人、配置 webhook、接入 Hermes。",
  },
  {
    slug: "telegram-bot-setup",
    title: "Hermes Agent Telegram Bot 配置教程",
    desc: "从 BotFather 到 Hermes 对话，完整配置流程和截图说明。",
  },
  {
    slug: "hermes-vs-openclaw",
    title: "Hermes 和 OpenClaw 区别对比",
    desc: "功能、安全、社区、中文支持四维度对比，以及迁移建议。",
  },
];

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-3">
            博客
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-8">
            深度教程、安装笔记和版本更新。每月至少 1 篇新文章。
          </p>

          <div className="grid gap-5">
            {upcoming.map((post) => (
              <div
                key={post.slug}
                className="bg-white border border-[#e4e2de] rounded-2xl p-6 hover:border-[#6d7a77] transition-colors"
              >
                <h2 className="text-lg font-bold text-[#1b1c1a] mb-2">{post.title}</h2>
                <p className="text-sm text-[#3d4947] leading-relaxed mb-3">
                  {post.desc}
                </p>
                <span className="inline-flex items-center text-xs font-bold text-[#00685f] bg-[#008378]/10 px-2.5 py-1 rounded-md">
                  即将发布
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
