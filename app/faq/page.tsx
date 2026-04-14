"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";
import SchemaJsonLd from "../components/SchemaJsonLd";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Windows 一定要装 WSL2 吗？（直装版可行吗？）",
    a: "Native Windows is not supported，请使用 WSL2。",
  },
  {
    q: "没有 OpenAI API key 怎么办？（国产模型接入方案）",
    a:
      "你可以在 ~/.hermes/.env 中配置国产模型（如 DeepSeek、豆包、通义千问）的 API key。格式与 OpenAI 兼容，只需修改 base_url 和 model 名称即可。",
  },
  {
    q: "迁移后 Telegram bot 为什么不回复？",
    a:
      "请检查三点：1) BotFather 中是否设置了 webhook；2) token 是否已过期；3) Hermes 日志中是否有连接报错。常见修复方式是重新获取 token 并重启 Hermes。",
  },
  {
    q: "飞书机器人配置时 webhook 报错怎么办？",
    a:
      "飞书 webhook 需要正确的 IP 白名单和事件订阅配置。请确认你的服务器地址可以被公网访问，并在飞书开发者后台开启「机器人」和「事件订阅」权限。",
  },
  {
    q: "如何更新 Hermes 到最新版本？",
    a: "运行 hermes update 即可升级到最新版本。升级后建议执行 hermes --version 确认版本号。",
  },
  {
    q: "本指南内容多久更新一次？",
    a:
      "我们承诺在 Hermes 发版后 7 天内检查并更新命令和截图。同时每月进行一次全站内容巡检，确保教程与最新版本保持一致。",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: f.a,
    },
  })),
};

export default function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <SchemaJsonLd schema={faqSchema} />
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />

          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-3">
            常见问题
          </h1>
          <p className="text-base md:text-lg text-[#3d4947] mb-8">
            安装失败、WSL2 报错、API key 配置、飞书/Telegram 不回复等高频问题速查。
          </p>

          <div className="space-y-4">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  id={`faq-${i + 1}`}
                  className="bg-white border border-[#e4e2de] rounded-2xl overflow-hidden scroll-mt-32"
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-[#fbf9f5] transition-colors"
                  >
                    <span className="text-[17px] font-bold text-[#1b1c1a] pr-4">{f.q}</span>
                    <ChevronDown
                      size={20}
                      className={`text-[#6d7a77] shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 text-[15px] text-[#3d4947] leading-7 border-t border-[#e4e2de] pt-4">
                      {f.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
