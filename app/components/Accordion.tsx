"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-[#e4e2de] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 bg-white hover:bg-[#fbf9f5] transition-colors text-left"
      >
        <span className="text-[15px] font-semibold text-[#1b1c1a]">{title}</span>
        <ChevronDown
          size={18}
          className={`text-[#6d7a77] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 py-4 bg-[#fbf9f5] text-sm text-[#3d4947] border-t border-[#e4e2de]">
          {children}
        </div>
      )}
    </div>
  );
}
