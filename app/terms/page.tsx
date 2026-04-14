import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import VersionBanner from "../components/VersionBanner";

export const metadata = {
  title: "使用条款",
  description: "hermes101.site 使用条款",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 md:pt-32 pb-20">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <VersionBanner />
          <h1 className="text-3xl md:text-4xl font-bold text-[#1b1c1a] tracking-tight mt-10 mb-6">
            使用条款
          </h1>
          <div className="max-w-none text-[15px] leading-7 text-[#3d4947] space-y-5">
            <p>
              <strong>最后更新日期：</strong>2026-04-14
            </p>
            <p>
              欢迎访问 hermes101.site。请在使用本站前仔细阅读以下条款。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">1. 非官方声明</h2>
            <p>
              <strong>本站为社区独立入门指南</strong>，与 Nous Research 或 Hermes Agent 官方无任何关联。站点内容仅供学习参考，不代表官方立场。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">2. 内容免责</h2>
            <p>
              我们尽力确保指南内容准确，但不对因使用本站内容而导致的任何直接或间接损失承担责任。特别是迁移、API 配置等操作可能因个人环境差异而产生不同结果，请谨慎操作并做好备份。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">3. 知识产权</h2>
            <p>
              本站原创内容受版权保护。未经授权，不得用于商业目的大规模复制、转载或再发布。
            </p>
            <h2 className="text-xl font-bold text-[#1b1c1a] mt-8">4. 修订</h2>
            <p>
              我们可能会不时更新本使用条款。任何重大变更将在站点内公布，建议您定期回顾本页面。
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
