# hermes101.site — Hermes Agent 中文入门第一站

[![GitHub](https://img.shields.io/badge/GitHub-mengjian--github%2Fhermes101-18E299?logo=github)](https://github.com/mengjian-github/hermes101)
[![Site](https://img.shields.io/badge/Site-hermes101.site-18E299?logo=cloudflare)](https://hermes101.site)
[![License](https://img.shields.io/badge/License-MIT-18E299)]()

> Hermes Agent 中文入门指南站 — 5 分钟安装，7 天跟练，从零到上线。

## 站点包含

| 页面 | 说明 |
|------|------|
| [首页](https://hermes101.site) | 项目概览、核心能力、快速入口 |
| [安装指南](https://hermes101.site/setup) | 60 秒安装脚本，Mac/Linux/WSL2/Termux 全平台 |
| [7天教程](https://hermes101.site/7-days) | 从安装到自动化，每天一个可验证成果 |
| [迁移指南](https://hermes101.site/migrate) | OpenClaw → Hermes 一键迁移 |
| [资源汇总](https://hermes101.site/resources) | 官方文档、视频教程、社区资源 |
| [FAQ](https://hermes101.site/faq) | 高频问题与排错方案 |

## 技术栈

- **框架**: [Astro](https://astro.build/) — 静态站点，极速加载
- **样式**: Tailwind CSS — 全站暗色主题，品牌色 `#18E299`
- **部署**: Cloudflare Pages — CDN 全球分发
- **域名**: `hermes101.site`

## 快速开始

```bash
# 克隆
git clone https://github.com/mengjian-github/hermes101.git
cd hermes101

# 安装依赖
npm install

# 本地开发
npm run dev

# 构建
npm run build

# 部署（需要 CLOUDFLARE_API_TOKEN）
npx wrangler pages deploy dist --branch main --project-name hermes101
```

## 项目结构

```
├── public/              # 静态资源（图片、infographic、headers）
├── src/
│   ├── components/      # 复用组件（Nav、Footer、VersionBanner...）
│   ├── layouts/         # 页面布局
│   └── pages/           # 路由页面
│       ├── index.astro  # 首页
│       ├── setup.astro  # 安装指南
│       ├── 7-days.astro # 7天教程
│       ├── migrate.astro# 迁移指南
│       ├── resources.astro # 资源汇总
│       └── faq.astro    # FAQ
├── astro.config.mjs
└── package.json
```

## 核心定位

hermes101 是一个**社区驱动的中文入门指南**，非官方文档。所有命令均与 [Hermes 官方 CLI 参考](https://hermes-agent.nousresearch.com/docs/reference/cli-commands/) 逐一核对。

对比市面上零散的信息，hermes101 提供：
- 完整的中文翻译与本土化说明
- 经过验证的命令与步骤
- 常见错误的排错方案
- 适合中文用户的网络环境提示

## 贡献

发现内容有误？有新的优质资源？欢迎通过 [GitHub Issues](https://github.com/mengjian-github/hermes101/issues) 反馈。

## 关于

由 [孟健](https://github.com/mengjian-github) 创建和维护。

## License

MIT
