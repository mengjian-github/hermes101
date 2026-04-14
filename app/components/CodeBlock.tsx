"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
}

export default function CodeBlock({ code }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="relative bg-[#1e1e1e] rounded-xl px-5 py-4 overflow-x-auto">
      <button
        onClick={handleCopy}
        className="absolute top-3 right-3 bg-white/10 hover:bg-white/20 text-white text-xs px-2.5 py-1.5 rounded-md transition-colors"
      >
        {copied ? "已复制" : "复制"}
      </button>
      <pre className="font-mono text-[#e5e5e5] text-sm leading-relaxed whitespace-pre">
        {code}
      </pre>
    </div>
  );
}
