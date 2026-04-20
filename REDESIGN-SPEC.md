# Hermes101 站点大改设计规格

> 目标：从模板感升级到 Vercel/Linear 级文档站品质
> 技术栈：Astro 6 + Tailwind v4 + TypeScript
> 项目路径：/root/projects/hermes101-site/

---

## 一、设计系统

### 1. 色彩体系

```
Light Mode:
  --bg-primary: #ffffff
  --bg-secondary: #f8f9fa
  --bg-tertiary: #f1f3f5
  --text-primary: #1a1a2e
  --text-secondary: #4a4a6a
  --text-muted: #8888a0
  --border: rgba(0,0,0,0.08)
  --border-strong: rgba(0,0,0,0.15)

Dark Mode (默认):
  --bg-primary: #0a0a0f
  --bg-secondary: #12121a
  --bg-tertiary: #1a1a25
  --text-primary: #e8e8f0
  --text-secondary: #a0a0b8
  --text-muted: #6a6a82
  --border: rgba(255,255,255,0.08)
  --border-strong: rgba(255,255,255,0.15)

品牌色（双模式通用）:
  --brand: #18E299
  --brand-deep: #0fa76e
  --brand-glow: rgba(24,226,153,0.15)
  --brand-gradient: linear-gradient(135deg, #18E299 0%, #0ea5e9 100%)

代码块:
  --code-bg: #0d0d14 (dark) / #1e1e2e (code block always dark)
  --code-text: #cdd6f4
  --code-comment: #6c7086
  --code-keyword: #cba6f7
  --code-string: #a6e3a1
  --code-function: #89b4fa
```

### 2. 字体

```css
/* 标题用 Geist Sans（Vercel 风格），正文用 Inter */
--font-display: "Geist Sans", "Inter", system-ui, -apple-system, sans-serif;
--font-body: "Inter", system-ui, -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
--font-mono: "Geist Mono", "JetBrains Mono", ui-monospace, monospace;
```

引入方式：
```html
<link href="https://cdn.jsdelivr.net/npm/geist@1/dist/fonts/geist-sans/style.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Geist+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### 3. 排版系统

```
Display: 56px/64px font-semibold tracking-tight -0.5px (Hero 标题)
H1: 40px/48px font-semibold tracking-tight -0.3px (页面标题)
H2: 28px/36px font-semibold tracking-tight -0.2px (章节标题)
H3: 20px/28px font-semibold (卡片/子标题)
Body: 16px/28px font-normal (正文)
Small: 14px/22px (辅助文字)
Code: 14px/24px font-mono
```

### 4. 间距与圆角

```
spacing-scale: 4px base
max-width: 1200px (从 960px 扩大)
section-padding: 80px-120px vertical
card-radius: 16px
button-radius: 12px (从 full 改为更现代的圆角)
code-radius: 12px
```

### 5. 阴影与光效

```
/* Dark mode 使用 glow 而非 shadow */
--glow-sm: 0 0 20px rgba(24,226,153,0.08)
--glow-md: 0 0 40px rgba(24,226,153,0.12)
--glow-lg: 0 0 80px rgba(24,226,153,0.15)

/* Light mode 使用传统 shadow */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.04)
--shadow-md: 0 4px 12px rgba(0,0,0,0.06)
--shadow-lg: 0 8px 30px rgba(0,0,0,0.08)
```

---

## 二、全局组件重写

### 1. Nav（导航栏）

**设计**：
- 背景：dark mode `rgba(10,10,15,0.8)` + `backdrop-blur-xl`，light mode 同理
- 左侧：hermes101 logo 文字 + 绿色 brand 点
- 中间：导航链接，hover 时有底部绿色滑条动画
- 右侧：GitHub 星标数 badge | Dark/Light 切换按钮 | "开始安装" CTA 按钮
- 移动端：汉堡菜单 + 全屏 overlay 菜单
- 高度：64px

**交互**：
- 滚动时背景 blur 增强 + 细边框出现
- Dark/Light 切换有平滑过渡（transition on html）
- 导航链接 hover 有 brand 色下划线滑入动画

### 2. Footer

**设计**：
- 深色背景（dark: `#06060a`，light: `#0a0a0f`）
- 三列布局：品牌+描述 | 导航链接 | 社区链接
- 底部版权行 + 分隔线
- 移除 "非官方站点" 免责到 nav 的 version badge

### 3. VersionBadge（替代 VersionBanner）

**设计**：
- 小胶囊 badge，显示版本号
- 位置：Nav 左侧 logo 旁边，小号字
- 不再用大段 Banner 占用页面空间

### 4. DarkModeToggle

**设计**：
- 太阳/月亮图标切换
- 尊重 `prefers-color-scheme`，默认 dark
- 状态存 localStorage
- 切换时整个页面有 200ms transition

### 5. CodeBlock（重写）

**设计**：
- 深色背景始终不变（dark/light 模式都暗色）
- 顶部有语言标签 + 复制按钮
- 复制按钮 hover 显示品牌绿色，点击后变 ✓
- 行号可选显示
- 命令行前缀 `$` 用品牌色高亮

### 6. AnimatedTerminal（新组件）

**设计**：
- macOS 风格终端窗口（三色圆点 + 标题栏）
- 打字机效果逐行显示命令和输出
- 输出有绿色成功标记
- 背景有微弱 glow 效果
- 首屏使用，3-4 行命令循环播放

### 7. FeatureGrid（替代 FeatureCard）

**设计**：
- 3 列网格，移动端 1 列
- 每个卡片：图标区域（渐变背景圆形）+ 标题 + 描述 + 可选链接
- Hover：卡片微微上浮 + 边框变 brand 色 + glow 效果
- 卡片间有微妙连线感（通过 border 和 gap 配合）

### 8. StepCard（替代 step section）

**设计**：
- 左侧竖线连接各步骤（时间线风格）
- 步骤编号圆形用 brand 色填充
- 每步：编号 + 标题 + 描述 + CodeBlock
- 失败分支折叠在每步下方

---

## 三、页面设计

### 1. 首页 (index.astro)

**结构（从上到下）**：

```
Hero Section:
  左侧（60%）:
    - 小号 badge: "开源 AI Agent · 22+ 平台 · 200+ 技能"
    - 大标题: "你的 AI 编程助手，\n从安装到上线"
    - 副标题: "5 分钟安装，7 天掌握。Hermes Agent 中文入门指南。"
    - 双 CTA: [开始安装 →] [查看文档 →]
    - 底部统计: "2,000+ GitHub Stars · 22+ 接入平台 · v0.9 稳定版"
  右侧（40%）:
    - AnimatedTerminal 组件
    - 显示安装 → 验证 → 对话 的完整流程

Brand Bar (横向滚动 logos):
  - "支持 22+ 平台" 小标题
  - 平台图标行: Telegram · Discord · Slack · 飞书 · WhatsApp · GitHub · ...

Core Features Section:
  - 标题: "9 大核心能力"
  - 副标题: "不只是一个聊天机器人"
  - 3x3 网格，每个能力一个卡片：
    1. 🧠 智能记忆 — 跨 session 记忆，越用越懂你
    2. 🔌 22+ 平台 — Telegram/Discord/飞书/Slack/WhatsApp/...
    3. 🤖 多 Agent 协作 — Profile 隔离，独立 bot token
    4. ⏰ 定时自动化 — 自然语言创建 cron，投递到任意平台
    5. 🛠 MCP 生态 — 200+ 技能包，一键安装
    6. 🔒 安全沙箱 — 危险命令审批，容器隔离
    7. 🎯 多模型 — OpenAI/Claude/GLM/Kimi/MiniMax/Ollama...
    8. ⚡ 并行执行 — 多 subagent 并发，后台进程监控
    9. 🌍 随处部署 — Linux/Mac/WSL2/Termux/Cloud/Server

7-Day Path Preview:
  - 标题: "7 天从零到上线"
  - 横向 7 个步骤卡片（可滚动），每个含 Day 号 + 成果名 + 简述
  - CTA: "查看完整 7 天路径 →"

Migration Teaser:
  - 左侧: "从 OpenClaw 迁移？3 步搞定"
  - 右侧: `hermes claw migrate` 代码块
  - CTA: "查看迁移指南 →"

CTA Section:
  - 大标题: "准备好开始了吗？"
  - 描述: "5 分钟完成安装，立刻体验 AI Agent 的力量"
  - 大号 CTA 按钮
  - 版本号小字
```

### 2. 安装页 (setup.astro)

**重大内容变更**：
- **主推一键安装脚本**（官方推荐）: `curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash`
- 次要手动安装方式放在折叠面板中
- 安装后验证用 `hermes doctor`（官方推荐）而非仅 `hermes --version`
- 补充 `hermes version` / `hermes status` / `hermes doctor` 验证命令
- API key 推荐用 `hermes config set OPENROUTER_API_KEY xxx` 方式

**设计**：
- 顶部大号标题 + 描述
- 前置检查清单（CheckItem 保留）
- OS Tab 切换（保留，视觉升级）
- 时间线风格步骤（StepCard）
- 每步含 CodeBlock + 失败分支 Accordion
- 底部 CTA → 7-days

### 3. 7天教程 (7-days.astro)

**内容更新**：
- Day 1 安装命令改为一键脚本
- Day 2 补充国产模型 provider (zai/kimi/minimax) 配置方法
- Day 2 补充 `hermes model` 交互式选择器
- Day 3 补充 `hermes gateway install` 持久化服务
- Day 4 补充 `hermes doctor` 排查
- Day 5 补充 `hermes update` 同步技能
- Day 6 补充 Profile 多 agent 概念
- Day 7 补充 TUI (`hermes --tui`) 介绍

**设计**：
- 左侧固定步骤导航（sticky sidebar）
- 右侧内容区
- 每个 Day 一个大卡片
- 进度保存到 localStorage
- 每日完成打 ✓ 动效

### 4. 迁移页 (migrate.astro)

**内容更新**：
- 迁移命令增加 `hermes profile import` 方式
- 对照表增加 TUI、Profile、Session Search 等新功能
- 补充国产模型 provider 配置说明

**设计**：
- 三步流程可视化（横向步骤条）
- 迁移前/迁移后 check list 分区
- 代码演示区域增强
- 常见失败场景用卡片而非纯手风琴

### 5. FAQ (faq.astro)

**内容补充**：
- 新增: "Hermes 支持哪些国产模型？" → zai/GLM、kimi/Moonshot、minimax
- 新增: "TUI 和 CLI 有什么区别？"
- 新增: "Profile 是什么？"
- 新增: "如何配置 Ollama 本地模型？"
- 新增: "hermes doctor 能诊断什么？"
- 新增: "如何搜索历史对话？"

**设计**：
- 顶部搜索框（客户端 JS 过滤）
- 分类 Tab + 手风琴
- 每个 FAQ 卡片有图标

---

## 四、交互动效

### 1. 页面过渡
- 页面切换无闪烁（Astro SSG 天然支持）
- Dark/Light 切换: `transition: background-color 0.2s, color 0.2s` on `html`

### 2. 滚动动画
- 各 section 使用 Intersection Observer 触发 fade-in-up
- 卡片 stagger 入场（每张延迟 50ms）
- 使用 CSS animation + `animation-delay`，不用 JS 库

### 3. Hero 终端动效
- 纯 CSS/JS 打字机效果
- 3 行命令循环：
  ```
  $ curl -fsSL https://raw.githubusercontent.com/.../install.sh | bash
  Installing Hermes Agent...
  ✓ Installation complete!

  $ hermes doctor
  ✓ All systems operational

  $ hermes
  Hello! I'm your Hermes Agent. How can I help?
  ```
- 每行 30-50ms/字符速度，行间 500ms 延迟

### 4. 按钮微交互
- CTA 按钮 hover: scale(1.02) + glow 增强
- 点击: scale(0.98) 弹性效果
- 代码块复制按钮: 点击后 icon 变 ✓ + 颜色变绿

---

## 五、Dark Mode 实现方案

```astro
<!-- Layout.astro -->
<html lang="zh-CN" class="dark">
<script is:inline>
  // 在渲染前执行，避免闪烁
  const theme = localStorage.getItem('theme') || 
    (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark', theme === 'dark');
</script>
```

Tailwind v4 dark mode 用 `@variant dark` 或 `dark:` 前缀。
CSS 变量在 `:root` 和 `.dark` 中分别定义。

---

## 六、SEO 补强

### 1. OG Image
- 用 `<meta>` 标签指向静态 OG 图片（用 design-v2 里已有的或新建）
- 后续可接入 @vercel/og 做动态图

### 2. llms.txt
- 在 `public/llms.txt` 中输出站点的机器可读摘要
- 包含：站点定位、页面列表、核心内容摘要

### 3. Schema.org 增强
- 首页: WebSite + SearchAction
- 安装页: TechArticle + HowTo steps
- 7-days: TechArticle + ItemList
- FAQ: FAQPage（已有）
- 迁移页: TechArticle + HowTo

### 4. robots.txt
- 确保 crawlable
- 加 sitemap 和 llms.txt 引用

---

## 七、文件改动清单

### 新建文件
- `src/components/AnimatedTerminal.astro`
- `src/components/DarkModeToggle.astro`
- `src/components/StepCard.astro`
- `src/components/FeatureGrid.astro`
- `src/components/PlatformBar.astro`
- `src/components/DaySidebar.astro`
- `src/components/SearchBox.astro`
- `src/components/CTASection.astro`
- `src/components/HowItWorks.astro`
- `public/llms.txt`
- `public/og-image.png`

### 重写文件
- `src/layouts/Layout.astro` — 加 dark mode、新字体
- `src/styles/global.css` — 完整设计系统变量
- `src/components/Nav.astro` — 全新导航
- `src/components/Footer.astro` — 全新 footer
- `src/components/CodeBlock.astro` — 增强
- `src/components/Accordion.astro` — 视觉升级
- `src/components/FeatureCard.astro` → 删除，用 FeatureGrid 替代
- `src/components/VersionBanner.astro` → 简化为 VersionBadge
- `src/components/CommandDemo.astro` — 升级
- `src/pages/index.astro` — 完全重写
- `src/pages/setup.astro` — 内容+视觉重写
- `src/pages/7-days.astro` — 内容+视觉重写
- `src/pages/migrate.astro` — 内容+视觉重写
- `src/pages/faq.astro` — 内容+视觉重写

---

## 八、执行约束

1. **不改技术栈**：保持 Astro + Tailwind v4，不引入 React/Vue
2. **不引入新依赖**：动效用纯 CSS/JS，不用 Framer Motion
3. **构建必须通过**：`npm run build` 零错误
4. **移动端优先**：所有页面在 375px 上可用
5. **性能**：Lighthouse Performance > 90
6. **字体回退**：Geist Sans 加载失败时优雅降级到 Inter
