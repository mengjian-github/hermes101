import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SchemaJsonLd from "./components/SchemaJsonLd";

export const metadata = {
  title: "Hermes Agent 小白入门第一站 — hermes101",
  description:
    "5 分钟安装 Hermes Agent，7 天跟练入门，OpenClaw 一键无忧迁移。中文保姆级教程。",
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "hermes101",
  url: "https://hermes101.pages.dev",
  description:
    "Hermes Agent 小白入门站，63分钟安装、7天教程、OpenClaw迁移指南。",
};

export default function Home() {
  return (
    <>
      <SchemaJsonLd schema={websiteSchema} />
      <Navbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="text-center pt-24 pb-16 px-6 bg-gradient-to-b from-[rgba(24,226,153,0.08)] to-white">
          <div className="max-w-[960px] mx-auto">
            <h1 className="text-[40px] md:text-5xl font-semibold leading-tight tracking-tight mb-5">
              Hermes Agent 小白入门第一站
            </h1>
            <p className="text-lg text-[#666666] mb-9">
              5 分钟安装 · 7 天跟练 · OpenClaw 一键迁移
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/setup"
                className="inline-flex items-center justify-center bg-[#0d0d0d] text-white px-8 py-3 rounded-full text-[15px] font-medium hover:opacity-92 transition-opacity"
              >
                5 分钟安装 Hermes
              </Link>
              <Link
                href="/migrate"
                className="inline-flex items-center justify-center bg-white text-[#0d0d0d] px-8 py-3 rounded-full text-[15px] font-medium border border-black/[0.08] hover:bg-[#fafafa] transition-colors"
              >
                从 OpenClaw 迁移
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 px-6">
          <div className="max-w-[960px] mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white border border-black/[0.06] rounded-2xl p-7 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:border-black/10 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#d4fae8] flex items-center justify-center text-xl mb-4">
                  ⚡
                </div>
                <h3 className="text-lg font-semibold mb-2">5 分钟安装</h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  支持 Mac、Linux 和 Windows WSL2。每步都有可复制命令和截图说明，预设小白可能遇到的每个坑。
                </p>
              </div>
              <div className="bg-white border border-black/[0.06] rounded-2xl p-7 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:border-black/10 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#d4fae8] flex items-center justify-center text-xl mb-4">
                  📅
                </div>
                <h3 className="text-lg font-semibold mb-2">7 天入门路径</h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  从第一次对话到接入飞书/Telegram机器人，每天一个可验证成果，跟着练就能跑通。
                </p>
              </div>
              <div className="bg-white border border-black/[0.06] rounded-2xl p-7 shadow-[0_2px_4px_rgba(0,0,0,0.03)] hover:border-black/10 hover:-translate-y-0.5 transition-all">
                <div className="w-11 h-11 rounded-xl bg-[#d4fae8] flex items-center justify-center text-xl mb-4">
                  🔄
                </div>
                <h3 className="text-lg font-semibold mb-2">OpenClaw 无忧迁移</h3>
                <p className="text-sm text-[#666666] leading-relaxed">
                  使用一条命令完成迁移，配置不会丢。附带完整检查清单和常见失败修复方案。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust */}
        <section className="text-center pb-20 px-6">
          <div className="max-w-[960px] mx-auto">
            <p className="text-[13px] text-[#666666] mb-1.5">
              📌 本指南基于 Hermes v0.8.x | 最后更新：2026-04-14
            </p>
            <p className="text-[13px] text-[#666666]">
              ⚠️ 本站为社区独立入门指南，非 Nous Research 官方文档
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
