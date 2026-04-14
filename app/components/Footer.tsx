import Link from "next/link";

const footerLinks = [
  { href: "/setup", label: "安装" },
  { href: "/7-days", label: "7天教程" },
  { href: "/migrate", label: "迁移" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "博客" },
  { href: "/privacy", label: "隐私" },
  { href: "/terms", label: "条款" },
];

export default function Footer() {
  return (
    <footer className="bg-[#fafafa] border-t border-black/[0.06] py-10 mt-auto">
      <div className="max-w-[960px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <span className="font-semibold text-lg tracking-tight">hermes101</span>
            <p className="text-xs text-[#888] mt-2">
              本站为社区独立入门指南，内容仅供参考
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-5">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#666666] hover:text-[#0d0d0d] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <p className="text-[13px] text-[#666666]">
            © 2026 hermes101.site
          </p>
        </div>
      </div>
    </footer>
  );
}
