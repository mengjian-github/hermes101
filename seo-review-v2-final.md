# hermes101 SEO 复验报告 v2 Final

> 验收时间：2026-04-15  
> 验收站点：https://hermes101.site  
> 构建目录：`/root/hermes101-site/dist`  
> 对比 PRD：`PRD-v2.md` (Hermes v0.9.x 大升级)

---

## 总体结论

**有条件通过**。核心 SEO 技术基础（Title、Meta、Schema、Canonical、Sitemap、内链主干）均已到位，v0.9 内容也已同步。存在 **2 个中等风险** 和 **1 个低风险**需要修复。

---

## 1. Title / Meta Description

| 页面 | Title | Meta Description | 状态 |
|------|-------|------------------|------|
| 首页 | Hermes Agent 小白入门第一站 — hermes101 | 5 分钟安装 Hermes Agent，7 天跟练入门... | ✅ |
| /setup | Hermes Agent 安装教程（Mac/Linux/Windows/Termux）— hermes101 | 保姆级 5 分钟安装指南... | ✅ |
| /7-days | Hermes Agent 教程：7 天入门路径 — hermes101 | 从安装到机器人上线，7 天跟练计划... | ✅ |
| /migrate | OpenClaw 迁移 Hermes 完整指南 — hermes101 | 使用 hermes claw migrate 一键迁移... | ✅ |
| /faq | Hermes Agent 常见问题 FAQ — hermes101 | 安装失败、WSL2 报错...v0.9 新功能等高频问题速查。 | ✅ |

**判断**：所有 5 个页面 title/description 独立、语义准确，与 v0.9 内容同步。setup 页已补充 Termux 关键词。

---

## 2. Schema.org 结构化数据

| 页面 | Schema 类型 | 状态 |
|------|-------------|------|
| 首页 | WebSite | ✅ |
| /setup | TechArticle（datePublished=2026-04-15, keywords 含 v0.9） | ✅ |
| /7-days | LearningResource（educationalLevel=Beginner） | ✅ |
| /migrate | HowTo（含 3 个 HowToStep） | ✅ |
| /faq | FAQPage（14 组 Q&A） | ✅ |

---

## 3. 内链结构

### 已验证的活链
- 首页 → /setup, /migrate ✅
- /setup 底部 → /7-days#day-1 ✅
- /7-days Day 1 → /setup ✅
- /7-days Day 7 → /migrate ✅
- /migrate 底部 → /7-days ✅
- 全局 Nav / Footer → 5 个主要页面 ✅

### 风险点
⚠️ **7-days Day 3 中存在死链**：
- `/blog/feishu-bot-setup`
- `/blog/telegram-bot-setup`

同时全站 Nav 和 Footer 均有 `/blog` 链接，但 `dist/` 中**不存在 blog 目录**。访问会返回 404。

**建议**：
1. 如果 blog 内容尚未上线，建议从 Nav、Footer、Day 3 中删除 `/blog` 相关链接；
2. 或者在 `dist` 中生成一个简单的 blog/index.html 占位页，并将 `/blog/feishu-bot-setup` 等做 302 跳转。

---

## 4. 关键词覆盖（v0.9 新功能）

| 关键词 | 覆盖状态 | 详情 |
|--------|----------|------|
| **Dashboard** | ✅ 良好 | index、7-days Day 3、migrate 均有详细说明 |
| **backup / import** | ✅ 良好 | index、migrate、7-days Day 6、faq 多处覆盖 |
| **debug** | ✅ 良好 | migrate、7-days Day 7、faq 均有专门解释 |
| **watch patterns** | ✅ 良好 | 7-days Day 6、faq 有介绍 |
| **Cron** | ✅ 良好 | 7-days Day 7、migrate 对照表有覆盖 |
| **MCP / Skill** | ✅ 良好 | 7-days Day 5、migrate 对照表有覆盖 |
| **Fast Mode** | ⚠️ 弱覆盖 | 仅在首页 FeatureCard 中被动提及一次，**setup、7-days、migrate、faq 中均无任何展开说明**。 |

**风险**：“Fast Mode”作为 v0.9 新功能关键词，缺乏内容支撑会导致搜索引擎无法理解该页面与此功能相关，也不利于 GEO 引用。

**建议**：
- 在 7-days Day 1 或 Day 2 中增加一个小节：例如“使用 Fast Mode 快速跑通第一个任务”，解释 `hermes --fast` 或相关入口的使用场景；
- 或者在 FAQ 中增加一条：“Fast Mode 是什么？”。

---

## 5. 标题层级（h1/h2/h3）

| 页面 | h1 | h2 数量 | 状态 |
|------|-----|---------|------|
| 首页 | Hermes Agent 小白入门第一站 | 0 | ✅ 可接受（首页简洁导航型） |
| /setup | 5 分钟安装 Hermes Agent | ≥3 | ✅ 正常（前置清单、错误速查等） |
| /7-days | 7 天入门路径 | 1（庆祝横幅） | ⚠️ 待优化 |
| /migrate | OpenClaw 迁移指南 | 4 | ✅ 正常 |
| /faq | 常见问题 | 4（分类标题） | ✅ 正常 |

### 7-days 页面 h2 问题
当前 7 个 Day 的展开内容中，每个 Day 的主标题是 `h3`（如“安装成功，并在终端说出第一句话”）。从结构化标记角度，建议将 Day 标题提升为 `h2`，以便搜索引擎更清晰地理解页面章节结构。

**建议**：将 `7-days.astro` 中展开状态的 Day 主标题从 `h3` 改为 `h2`（收起状态可保持不变）。

---

## 6. 图片 alt 属性

全站未使用 `<img>` 标签（仅有 SVG 图标作为装饰元素），因此不存在 alt 缺失问题。

如后续添加截图或示意图，请为每张图片添加描述性 alt 文本。

---

## 7. URL 规范

| 检查项 | 结果 | 状态 |
|--------|------|------|
| Canonical | 每页均正确，含尾斜杠 | ✅ |
| Sitemap | 5 个 URL 完整 | ✅ |
| Robots.txt | Allow: / + Sitemap 指引 | ✅ |
| URL 层级 | 均为一级路径（`/{page}/`） | ✅ |
| 404 页面 | dist 中未生成 404.html | ⚠️ 建议补充 |

---

## 8. 移动端 SEO 与性能基础

| 检查项 | 结果 | 状态 |
|--------|------|------|
| Viewport | `width=device-width, initial-scale=1.0` | ✅ |
| 响应式断点 | `sm:` / `md:` 多处使用 | ✅ |
| 移动端导航 | 有汉堡菜单 + 移动端折叠菜单 | ✅ |
| CSS 压缩 | 仅一个打包后的 CSS 文件 `Footer.BwuGgk_e.css` | ✅ |
| 字体加载 | Google Fonts 从源加载 | ✅ |

---

## 问题清单与修复建议

### 🔴 中等风险（建议上线前修复）

| 序号 | 问题 | 影响 | 修复建议 |
|------|------|------|------------|
| 1 | **Blog 死链** | Nav、Footer、Day 3 共 9 处链接指向不存在的 `/blog` 路径，访问会 404。 | 上线前删除或替换这些链接；或者在服务器配置 blog 路径的重定向。 |
| 2 | **Fast Mode 缺乏内容支撑** | 仅首页提及一次，无深度解释，不利于长尾关键词排名。 | 在 7-days Day 1/2 或 FAQ 中增加 Fast Mode 的使用场景说明。 |

### 🟡 低风险（建议优化）

| 序号 | 问题 | 影响 | 修复建议 |
|------|------|------|------------|
| 3 | **404 页面未生成** | 用户误访时体验不好，也不利于搜索引擎爬取。 | 在 Astro 项目中创建 `src/pages/404.astro`，重新构建后会自动生成 `404.html`。 |
| 4 | **7-days 页面 h2 层级缺失** | 7 个 Day 的主标题均为 h3，可能影响章节结构化理解。 | 展开状态下将 Day 标题从 h3 升级为 h2。 |

---

## 验收结论

- **通过项**：Title/Meta、Schema.org、Canonical/Sitemap/Robots、版本号更新、大部分 v0.9 关键词覆盖、移动端基础。
- **需修复**：Blog 死链（9 处）、Fast Mode 内容补充。
- **建议优化**：生成 404 页面、调整 7-days 标题层级。

**复验结果：有条件通过。**
