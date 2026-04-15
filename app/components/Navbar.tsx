"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/setup", label: "安装" },
  { href: "/7-days", label: "7天教程" },
  { href: "/migrate", label: "迁移" },
  { href: "/faq", label: "FAQ" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-[#e4e2de]/50">
      <div className="flex justify-between items-center px-4 md:px-8 py-4 max-w-7xl mx-auto w-full">
        <Link href="/" className="text-xl font-black tracking-tight text-[#0f172a]">
          hermes101
        </Link>

        <button
          className="md:hidden text-[#1b1c1a] p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-[#00685f] font-bold border-b-2 border-[#00685f]"
                    : "text-[#3d4947] hover:text-[#00685f]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/setup"
            className="bg-[#00685f] text-white px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all active:scale-95 ml-4"
          >
            开始安装
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-[#e4e2de]/50 bg-white/95 px-4 py-4 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`text-sm font-medium tracking-tight w-fit ${
                  isActive ? "text-[#00685f] font-bold" : "text-[#3d4947]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/setup"
            onClick={() => setMobileOpen(false)}
            className="inline-block w-fit bg-[#00685f] text-white px-5 py-2 rounded-full text-sm font-bold mt-2"
          >
            开始安装
          </Link>
        </div>
      )}
    </nav>
  );
}
