"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/setup", label: "安装" },
  { href: "/7-days", label: "7天教程" },
  { href: "/migrate", label: "迁移" },
  { href: "/faq", label: "FAQ" },
  { href: "/blog", label: "博客" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-black/[0.06]">
      <div className="max-w-[960px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          hermes101
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[15px] font-medium text-[#333333] hover:text-[#0fa76e] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/setup"
            className="bg-[#0d0d0d] text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-92 transition-opacity"
          >
            开始安装
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black/[0.06] bg-white/98 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium text-[#333333] hover:text-[#0fa76e]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/setup"
            onClick={() => setMobileOpen(false)}
            className="inline-block w-fit bg-[#0d0d0d] text-white px-5 py-2 rounded-full text-sm font-medium"
          >
            开始安装
          </Link>
        </div>
      )}
    </nav>
  );
}
