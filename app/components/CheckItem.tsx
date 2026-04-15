"use client";

import { useState, useEffect } from "react";

interface CheckItemProps {
  id: string;
  text: string;
}

export default function CheckItem({ id, text }: CheckItemProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      setChecked(localStorage.getItem(`check:${id}`) === "1");
    } catch {}
  }, [id]);

  const toggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      localStorage.setItem(`check:${id}`, next ? "1" : "0");
    } catch {}
  };

  return (
    <button
      onClick={toggle}
      className={`flex items-center gap-2.5 text-left rounded-xl px-4 py-3.5 text-sm border transition-all w-full ${
        checked
          ? "bg-[#008378]/10 border-[#00685f] text-[#00685f]"
          : "bg-white border-[#e4e2de] text-[#3d4947] hover:border-[#6d7a77]"
      }`}
    >
      <span
        className={`w-[18px] h-[18px] rounded-[5px] flex items-center justify-center text-[11px] border transition-colors ${
          checked
            ? "bg-[#00685f] border-[#00685f] text-white"
            : "border-[#e4e2de]"
        }`}
      >
        {checked ? "✓" : ""}
      </span>
      {text}
    </button>
  );
}
