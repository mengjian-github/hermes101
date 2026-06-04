# t_cf08ef20 nested repo isolation patch backup

Nested repo path: /root/projects/hermes101/hermes101
Reason: nested repo is an older embedded gitlink without .gitmodules; duplicate domain-only changes are already applied in the root repo. Backup recorded before restoring nested worktree to tracked state.

```diff
diff --git a/README.md b/README.md
index 9e6ec4a..97be248 100644
--- a/README.md
+++ b/README.md
@@ -1,7 +1,7 @@
-# hermes101.site — Hermes Agent 中文入门第一站
+# hermes101.dev — Hermes Agent 中文入门第一站
 
 [![GitHub](https://img.shields.io/badge/GitHub-mengjian--github%2Fhermes101-18E299?logo=github)](https://github.com/mengjian-github/hermes101)
-[![Site](https://img.shields.io/badge/Site-hermes101.site-18E299?logo=cloudflare)](https://hermes101.site)
+[![Site](https://img.shields.io/badge/Site-hermes101.dev-18E299?logo=cloudflare)](https://hermes101.dev)
 [![License](https://img.shields.io/badge/License-MIT-18E299)]()
 
 > Hermes Agent 中文入门指南站 — 5 分钟安装，7 天跟练，从零到上线。
@@ -10,19 +10,19 @@
 
 | 页面 | 说明 |
 |------|------|
-| [首页](https://hermes101.site) | 项目概览、核心能力、快速入口 |
-| [安装指南](https://hermes101.site/setup) | 60 秒安装脚本，Mac/Linux/WSL2/Termux 全平台 |
-| [7天教程](https://hermes101.site/7-days) | 从安装到自动化，每天一个可验证成果 |
-| [迁移指南](https://hermes101.site/migrate) | OpenClaw → Hermes 一键迁移 |
-| [资源汇总](https://hermes101.site/resources) | 官方文档、视频教程、社区资源 |
-| [FAQ](https://hermes101.site/faq) | 高频问题与排错方案 |
+| [首页](https://hermes101.dev) | 项目概览、核心能力、快速入口 |
+| [安装指南](https://hermes101.dev/setup) | 60 秒安装脚本，Mac/Linux/WSL2/Termux 全平台 |
+| [7天教程](https://hermes101.dev/7-days) | 从安装到自动化，每天一个可验证成果 |
+| [迁移指南](https://hermes101.dev/migrate) | OpenClaw → Hermes 一键迁移 |
+| [资源汇总](https://hermes101.dev/resources) | 官方文档、视频教程、社区资源 |
+| [FAQ](https://hermes101.dev/faq) | 高频问题与排错方案 |
 
 ## 技术栈
 
 - **框架**: [Astro](https://astro.build/) — 静态站点，极速加载
 - **样式**: Tailwind CSS — 全站暗色主题，品牌色 `#18E299`
 - **部署**: Cloudflare Pages — CDN 全球分发
-- **域名**: `hermes101.site`
+- **域名**: `hermes101.dev`
 
 ## 快速开始
 
diff --git a/astro.config.mjs b/astro.config.mjs
index 823fe37..d5c9066 100644
--- a/astro.config.mjs
+++ b/astro.config.mjs
@@ -5,7 +5,7 @@ import tailwindcss from '@tailwindcss/vite';
 
 // https://astro.build/config
 export default defineConfig({
-  site: 'https://hermes101.site',
+  site: 'https://hermes101.dev',
   integrations: [sitemap()],
   vite: {
     plugins: [tailwindcss()]
diff --git a/public/llms.txt b/public/llms.txt
index d3f02e8..a9d5162 100644
--- a/public/llms.txt
+++ b/public/llms.txt
@@ -1,4 +1,4 @@
-# hermes101.site
+# hermes101.dev
 > Hermes Agent 中文入门指南。5 分钟安装，7 天跟练，OpenClaw 一键迁移。
 
 ## 站点定位
diff --git a/src/pages/index.astro b/src/pages/index.astro
index 6326bb8..4a6bac7 100644
--- a/src/pages/index.astro
+++ b/src/pages/index.astro
@@ -9,7 +9,7 @@ const schema = {
   "@context": "https://schema.org",
   "@type": "WebSite",
   "name": "hermes101",
-  "url": "https://hermes101.site",
+  "url": "https://hermes101.dev",
   "description": description
 };
 
diff --git a/src/pages/robots.txt.ts b/src/pages/robots.txt.ts
index 7859e71..ecef38c 100644
--- a/src/pages/robots.txt.ts
+++ b/src/pages/robots.txt.ts
@@ -1,7 +1,7 @@
 import type { APIRoute } from 'astro';
 
 export const GET: APIRoute = ({ site }) => {
-  const origin = site?.origin || 'https://hermes101.site';
+  const origin = site?.origin || 'https://hermes101.dev';
   const body = `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap-index.xml\n\n# LLM-friendly site summary\nLLMs-txt: ${origin}/llms.txt\n`;
   return new Response(body, {
     headers: {
```
