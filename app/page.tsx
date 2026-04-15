import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import SchemaJsonLd from "./components/SchemaJsonLd";
import { Zap, CalendarDays, RefreshCw, CheckCircle2 } from "lucide-react";

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "hermes101",
  url: "https://hermes101.pages.dev",
  description:
    "Hermes Agent 小白入门站，5 分钟安装、7 天教程、OpenClaw 迁移指南。",
};

export default function Home() {
  return (
    <>
      <SchemaJsonLd schema={websiteSchema} />
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 md:mb-24">
          <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-center">
            {/* Left Content */}
            <div className="flex-1 text-left w-full">
              <h1 className="font-sans font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#1b1c1a] tracking-tight mb-6 leading-[1.1]">
                Hermes Agent<br />
                <span className="text-[#00685f]">小白入门第一站</span>
              </h1>
              <p className="text-lg md:text-xl text-[#3d4947] mb-8 md:mb-10 leading-relaxed max-w-xl">
                5 分钟安装 · 7 天跟练 · OpenClaw 一键迁移。
                <br className="hidden sm:block" />
                我们为每一位开发者提供最清晰的 Hermes 学习路径。
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <Link
                  href="/setup"
                  className="inline-flex items-center justify-center bg-[#00685f] text-white px-8 py-4 rounded-full font-bold text-base hover:shadow-lg transition-all active:scale-95"
                >
                  5 分钟安装 Hermes
                </Link>
                <Link
                  href="/migrate"
                  className="inline-flex items-center justify-center bg-[#eae8e4] text-[#1b1c1a] px-8 py-4 rounded-full font-bold text-base hover:bg-[#e4e2de] transition-all active:scale-95"
                >
                  从 OpenClaw 迁移
                </Link>
              </div>
            </div>

            {/* Right Visual - Terminal */}
            <div className="flex-1 w-full relative">
              <div className="bg-[#1b1c1a] rounded-xl p-5 md:p-6 shadow-2xl overflow-hidden font-mono text-[13px] md:text-sm transform md:rotate-1 hover:rotate-0 transition-transform duration-500 border border-white/10">
                <div className="flex gap-1.5 md:gap-2 mb-4">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500" />
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 text-[#6bd8cb]">
                  <p className="opacity-60">$ curl -sSL https://hermes.install | bash</p>
                  <p className="text-white/90">Installing hermes-core v0.9.x...</p>
                  <p className="text-white/90">#################################### 100%</p>
                  <p className="opacity-60">$ hermes --version</p>
                  <div className="flex items-center gap-2 pt-1">
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-[#6bd8cb]" />
                    <span className="text-[#6bd8cb]">Hermes Agent version 0.9.2 (stable)</span>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 -bottom-6 -right-6 w-48 h-48 md:w-64 md:h-64 bg-[#00685f]/5 rounded-full blur-3xl" />
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 mb-20 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Card 1 */}
            <div className="bg-[#008378]/10 p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:bg-[#008378]/15 transition-colors">
              <div>
                <Zap className="w-10 h-10 text-[#00685f] mb-5" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-xl md:text-2xl mb-2 text-[#1b1c1a]">5 分钟安装</h3>
                <p className="text-[#3d4947] leading-relaxed text-sm md:text-base">
                  支持 Mac、Linux、Windows WSL2 和 Termux/Android。每步都有可复制命令和截图说明，预设小白可能遇到的每个坑。
                </p>
              </div>
            </div>
            {/* Card 2 */}
            <div className="bg-[#fea619]/10 p-6 md:p-8 rounded-2xl flex flex-col justify-between hover:bg-[#fea619]/15 transition-colors">
              <div>
                <CalendarDays className="w-10 h-10 text-[#855300] mb-5" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-xl md:text-2xl mb-2 text-[#1b1c1a]">7 天入门路径</h3>
                <p className="text-[#3d4947] leading-relaxed text-sm md:text-base">
                  从第一次对话到接入飞书/Telegram 机器人，每天一个可验证成果。v0.9 新增 Dashboard、Fast Mode 和 backup/import。
                </p>
              </div>
            </div>
            {/* Card 3 Large */}
            <div className="bg-[#eae8e4] p-6 md:p-8 rounded-2xl flex flex-col justify-between group overflow-hidden relative">
              <div className="relative z-10">
                <RefreshCw className="w-10 h-10 text-[#924628] mb-5" strokeWidth={1.5} />
                <h3 className="font-sans font-bold text-xl md:text-2xl mb-2 text-[#1b1c1a]">OpenClaw 无忧迁移</h3>
                <p className="text-[#3d4947] leading-relaxed mb-5 text-sm md:text-base">
                  使用 <code>hermes claw migrate</code> 一键迁移，配置不会丢。v0.9 新增 backup/import 与 <code>/debug</code> 诊断，迁移更安心。
                </p>
                <Link
                  href="/migrate"
                  className="text-[#00685f] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  了解迁移指南 <span className="text-base">→</span>
                </Link>
              </div>
              <div className="absolute -right-8 -bottom-8 opacity-5">
                <RefreshCw className="w-32 h-32" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <div className="bg-[#efeeea]/70 py-10 md:py-12 rounded-2xl border border-[#e4e2de]/50">
            <p className="text-[#6d7a77] font-bold text-[10px] md:text-xs tracking-widest uppercase mb-3 opacity-70">
              基于 Hermes v0.9.x | 最后更新：2026-04-15
            </p>
            <p className="text-[#3d4947] text-xs md:text-sm max-w-md mx-auto leading-relaxed px-4">
              本站为社区独立入门指南，非官方站点。所有教程均经过社区验证，确保安全可靠。
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
