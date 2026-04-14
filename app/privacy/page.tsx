import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";

export const metadata = {
  title: "隐私政策 | hermes101 - Hermes Agent 入门指南",
  description: "hermes101.site 隐私政策：本站为静态入门指南，不收集个人身份信息，不使用追踪性 Cookie，学习进度仅存储在浏览器本地。",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-6">
            隐私政策
          </h1>
          <div className="max-w-none text-[15px] leading-7 text-[#3d4947] space-y-5">
            <p>
              <strong>最后更新日期：</strong>2026-04-14
            </p>
            <p>
              hermes101.site（以下简称“本站”）重视您的隐私。本政策说明我们如何收集、使用和保护您的信息。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">1. 信息收集</h2>
            <p>
              本站为静态入门指南网站，<strong>不收集任何个人身份信息</strong>（如姓名、邮箱、电话），也不使用任何第三方分析工具追踪访问行为。
            </p>
            <p>
              本站托管在 Cloudflare Pages 上，Cloudflare 作为基础设施提供商可能会记录访问日志（如 IP 地址、浏览器类型、访问时间戳），这些数据受 Cloudflare 隐私政策约束，本站无法直接访问或控制。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">2. Cookies</h2>
            <p>
              v1.0 版本不使用任何追踪性 Cookie。站点内的检查清单和学习进度仅存储在您的浏览器本地（LocalStorage），不会上传到任何服务器。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">3. 第三方链接</h2>
            <p>
              本站可能包含指向第三方网站（如 GitHub、Nous Research 官方文档）的链接。我们不对这些第三方网站的隐私政策负责。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">4. 联系我们</h2>
            <p>
              如果您对本隐私政策有任何疑问，请通过站点内的社区渠道与我们联系。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
