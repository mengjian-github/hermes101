# hermes101 Design V2 交付文档

> 生成工具：Google Stitch MCP  
> 项目 ID：`11557431963691083564`（hermes101）  
> 生成时间：2026-04-15

---

## 交付清单

### 7-days 教程页

| 文件 | 路径 | 说明 |
|------|------|------|
| 截图 | `design-v2/7-days/design-screenshot.jpg` | Day 3 进行中状态（折叠/展开、步骤高亮、错误提示卡片） |
| 代码 | `design-v2/7-days/design-code.html` | 对应 HTML/Tailwind 源码 |
| 截图 | `design-v2/7-days-full/design-screenshot.jpg` | 完整 7 天视图 + Day 7 完成庆祝横幅 |
| 代码 | `design-v2/7-days-full/design-code.html` | 对应完整页面源码 |

**设计要点（基于 PRD-v2 第三章）**
- 7 段式进度条：pending / current (#18E299) / completed (#d4fae8) 三色状态
- 手风琴 DayCard：当前步骤默认展开，带左侧品牌色高亮边框
- 失败分支：内嵌琥珀色 "常见错误" 提示卡片（#F59E0B 左边框）
- 完成庆祝：顶部横幅 + 几何 confetti + trophy icon + "恭喜完成 7 天学习路径！"
- 底部粘性导航：前一天 / 后一天 + 进度计数
- 移动端优先：单列 430px  feel，触摸目标 ≥ 44px

---

### migrate 迁移页

| 文件 | 路径 | 说明 |
|------|------|------|
| 截图 | `design-v2/migrate/design-screenshot.jpg` | 核心交互状态（timeline、命令块、troubleshooting 折叠卡片） |
| 代码 | `design-v2/migrate/design-code.html` | 对应源码 |
| 截图 | `design-v2/migrate-full/design-screenshot.jpg` | 完整长页面（含 0.9 功能对照表、全部 checklist 完成状态） |
| 代码 | `design-v2/migrate-full/design-code.html` | 对应完整页面源码 |

**设计要点（基于 PRD-v2 第四章）**
- 3 步时间线：迁移前 → 迁移中 → 迁移后，当前/完成步骤用 #18E299 高亮
- 可交互勾选清单：迁移前 6 项 + 迁移后 5 项，进度计数，完成项用 #d4fae8 背景
- 一键迁移命令：`hermes claw migrate` 代码块 + "复制" 按钮
- 步骤拆解动画：4 行命令执行过程（读取 → 迁移渠道 → 迁移工具 → 完成）
- Troubleshooting 卡片：5 个可展开卡片，首个默认展开展示原因+解决方案
- v0.9 功能对照表：Dashboard / Backup / 平台接入 / Debug / Watch Patterns / MCP / Cron 横向对比
- 移动端优先：单列堆叠，12px 圆角卡片，Material You 阴影层级

---

## 配色系统（与现有站点一致）

| Token | HEX | 用途 |
|-------|-----|------|
| Background | `#ffffff` | 页面底色 |
| Surface | `#fafafa` | 卡片、代码块背景 |
| Primary | `#18E299` | 品牌主色、进度、CTA |
| Primary Deep | `#0fa76e` | 链接、完成图标 |
| Primary Light | `#d4fae8` | 完成状态背景 |
| Text Primary | `#0d0d0d` | 标题、正文 |
| Text Secondary | `#333333` | 副标题 |
| Text Muted | `#666666` | 辅助说明 |
| Warning | `#fffbeb` / `#fde68a` | 错误提示卡片 |
| Error | `#d45656` | 错误文字 |

---

## 下一步建议

1. **墨码** 可从 `design-code.html` 中提取 Tailwind 类名和结构，迁移到 Astro 组件
2. 建议将 `7-days-full` 作为完整页面参考，`7-days` 作为单天交互细节参考
3. 建议将 `migrate-full` 作为完整页面参考，`migrate` 作为核心交互状态参考
