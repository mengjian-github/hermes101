import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";

export const metadata = {
  title: "隐私政策",
  description: "hermes101.site 隐私政策",
};

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <div className="max-w-[800px] mx-auto px-6 pb-20">
          <VersionBanner />
          <h1 className="text-[32px] md:text-4xl font-semibold leading-tight tracking-tight mt-10 mb-6">
            隐私政策
          </h1>
          <div className="prose prose-neutral max-w-none text-[15px] leading-7 text-[#333333] space-y-4">
            <p>
              <strong>最后更新日期：</strong>2026-04-14
            </p>
            <p>
              hermes101.site（以下简称“本站”）重视您的隐私。本政策说明我们如何收集、使用和保护您的信息。
            </p>
            <h2 className="text-xl font-semibold text-[#0d0d0d] mt-8 mb-3">1. 信息收集</h2>
            <p>
              本站为静态入门指南网站，<strong>不收集任何个人身份信息</strong>（如姓名、邮箱、电话）。我们仅通过第三方分析工具（如 Plausible）匿名收集访问量和页面浏览数据，用于改进站点内容。
            </p>
            <h2 className="text-xl font-semibold text-[#0d0d0d] mt-8 mb-3">2. Cookies</h2>
            <p>
              v1.0 版本不使用任何追踪性 Cookie。站点内的检查清单和学习进度仅存储在您的浏览器本地（LocalStorage），不会上传到任何服务器。
            </p>
            <h2 className="text-xl font-semibold text-[#0d0d0d] mt-8 mb-3">3. 第三方链接</h2>
            <p>
              本站可能包含指向第三方网站（如 GitHub、Nous Research 官方文档）的链接。我们不对这些第三方网站的隐私政策负责。
            </p>
            <h2 className="text-xl font-semibold text-[#0d0d0d] mt-8 mb-3">4. 联系我们</h2>
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
