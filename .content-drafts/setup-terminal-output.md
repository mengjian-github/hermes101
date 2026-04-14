# /setup 页终端输出替换文案

## 替换目标
`app/setup/page.tsx` 第 195-198 行的截图占位 div：
```tsx
<div className="mt-4 border-2 border-dashed border-[#e4e2de] rounded-xl p-10 text-center text-sm text-[#6d7a77] bg-[#fbf9f5]">
  [截图位] 运行 hermes --version 的终端输出示例
</div>
```

## 替换为以下 JSX
```tsx
<div className="mt-4 rounded-xl overflow-hidden bg-[#1b1c1a] text-[#f3f0e9] font-mono text-[13px]">
  <div className="px-4 py-2.5 bg-[#2a2b28] text-[#9aa29f] text-xs flex items-center gap-2">
    <span>Terminal</span>
  </div>
  <div className="p-4 space-y-1">
    <div className="text-[#9aa29f]">$ hermes --version</div>
    <div>Hermes Agent v0.12.3</div>
  </div>
</div>
<p className="mt-2 text-xs text-[#6d7a77]">
  正常输出版本号即表示安装成功。若提示命令未找到，请检查 Python 的 Scripts / bin 目录是否在系统 PATH 中。
</p>
```
