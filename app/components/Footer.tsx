import Link from "next/link";

const footerLinks = [
  { href: "/setup", label: "安装" },
  { href: "/7-days", label: "7天教程" },
  { href: "/migrate", label: "迁移" },
  { href: "/faq", label: "FAQ" },
  { href: "/privacy", label: "隐私" },
  { href: "/terms", label: "条款" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0f172a] w-full py-12 px-4 md:px-8 mt-auto">
      <div className="flex flex-col md:flex-row justify-between items-center max-w-7xl mx-auto gap-8">
        <div className="text-2xl font-black tracking-tight text-white">
          hermes101
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-3">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-400 hover:text-white transition-colors text-xs font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <p className="text-slate-500 text-[11px] max-w-[240px] leading-relaxed text-center md:text-right">
          © 2026 hermes101.site<br/>
          本站为社区独立入门指南，非官方站点
        </p>
      </div>
    </footer>
  );
}
