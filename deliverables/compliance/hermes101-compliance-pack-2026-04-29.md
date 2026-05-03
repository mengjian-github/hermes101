# Hermes 101 合规交付包

版本：2026-04-29  
依据：`/mnt/HC_Volume_105300089/projects/hermes101-site/PRD-v2.md`、当前代码结构、当前会话信息  
站点：Hermes 101 / Hermes Agent 中文入门指南  
域名：[待确认：当前会话出现 `hermes101.dev`，代码 schema 仍有 `hermes101.site`]  
运营主体：Nextfield Labs LLC  
管辖地：Wyoming, USA  
联系邮箱：[待确认]  
声明：以下为日常合规审查与模板草稿，不构成正式法律意见；上线前如涉及收费、账户、用户投稿或敏感数据，应找执业律师复核。

---

## 1. 风险等级

结论：🟢 低风险，接近“静态教程/资源站”。

理由：
- PRD 显示核心功能是 Hermes Agent 安装、7 天教程、迁移指南、FAQ、资源整理。
- 未看到注册、登录、上传、站内 AI 生成、支付、订阅、用户内容发布。
- 当前代码主要是 Astro 静态页面；未发现 Stripe、GA、Clarity、PostHog、newsletter 表单等明显集成。
- 有外链到 GitHub Issues，资源页收集推荐可能发生在 GitHub 平台，不在站内直接收集。

主要风险点：
1. **非官方站点风险**：PRD 已写“⚠️ 非官方站点”，应在首页、页脚、Terms 中持续保留，避免用户误认为官方 Hermes Agent 文档。
2. **商标/品牌风险**：Hermes / Hermes Agent 可能涉及第三方项目名或商标权益。[待确认：Hermes Agent 官方项目授权/许可、名称使用边界]
3. **命令教程风险**：站内包含安装、迁移、备份、导入、终端命令。需要明确用户自行执行风险，避免对数据安全作绝对保证。
4. **API key 安全风险**：教程指导配置 API key，应提醒不要公开提交、不要截图泄露、不要把 key 写进公开仓库。
5. **外链风险**：官方文档、GitHub、视频教程等外部资源可能变更或不可控，需要免责声明。
6. **Cookie/第三方字体风险**：使用 Google Fonts。访问者浏览器会请求 Google Fonts，可能涉及 IP、User-Agent 等技术数据传输。

---

## 2. 数据流

### 当前数据流判断

1. 用户访问 `hermes101` 网站
   - 浏览器请求站点页面、图片、CSS、JS。
   - 如果部署在 Cloudflare Pages，Cloudflare 会处理 IP 地址、User-Agent、请求路径、时间戳等访问日志。
   - 数据用途：页面交付、安全、防滥用、性能与错误排查。

2. 浏览器加载第三方字体
   - 当前 `Layout.astro` 引用：
     - `https://fonts.googleapis.com/css2?family=Inter...`
     - `https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined...`
   - 可能向 Google 发送 IP、User-Agent、Referer 等技术信息。
   - 建议：如想降低跨境与 Cookie 风险，改为自托管字体。

3. 用户点击 GitHub 外链
   - 首页和资源页存在 GitHub 仓库 / Issues 外链。
   - 点击后由 GitHub 按其政策处理用户数据。
   - 站点应在 Privacy/Terms 中说明第三方链接由第三方政策约束。

4. 站内脚本
   - 当前 `Layout.astro` 有 inline IntersectionObserver 动画脚本。
   - 未发现其收集或传输个人数据。

5. 搜索引擎 / 社交分享
   - 页面包含 sitemap、canonical、OG、Twitter card、Schema.org。
   - 不涉及用户输入数据。

### 未发现的数据流

- [未发现] 站内账户注册/登录
- [未发现] 站内表单提交
- [未发现] 邮箱订阅
- [未发现] 支付/订阅
- [未发现] 用户上传文件
- [未发现] AI API 调用处理用户输入
- [未发现] 广告像素/再营销
- [未发现] GA / Clarity / PostHog / Sentry

---

## 3. 第三方服务清单

| 第三方 | 当前用途 | 可能处理的数据 | 风险 | 处理动作 |
|---|---|---|---|---|
| Cloudflare Pages / Cloudflare | 网站托管、CDN、安全、访问日志 | IP、User-Agent、请求 URL、时间戳、错误日志 | 低 | Privacy 中披露；确认日志保留期 |
| Google Fonts | 加载 Inter、Geist Mono、Material Symbols | IP、User-Agent、Referer、字体请求 | 低-中 | 建议自托管字体；否则 Cookie Policy 披露 |
| GitHub | 源码仓库、Issues 推荐入口、外链 | GitHub 账户信息、Issue 内容、访问日志 | 低 | 标明外链由 GitHub 政策约束 |
| Astro Sitemap | 生成站点地图 | 不直接处理用户数据 | 低 | 无需单独披露为数据接收方 |
| 搜索引擎/社交平台 | 抓取页面、分享预览 | 抓取公开页面内容 | 低 | Terms 中说明公开内容可被索引 |

[待确认] 是否使用：Cloudflare Web Analytics、Google Analytics、Microsoft Clarity、Sentry、PostHog、Ads/Pixel、Newsletter、客服插件。若新增，需要更新 Privacy/Cookie 并可能加 Cookie Banner。

---

## 4. 必需合规页面

必须上线：
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service
- `/cookie-policy` — Cookie Policy
- `/refund` — Refund Policy，即使当前免费，也写“当前无付费项目/无退款场景”；未来收费前更新。

建议补充：
- `/contact` 或页脚联系邮箱
- 页脚统一链接：Privacy / Terms / Cookie / Refund / GitHub
- 首页和页脚保留“非官方 Hermes Agent 中文教程站”说明

---

## 5. 数据处理表

| 数据类型 | 来源 | 用途 | Lawful Basis | 第三方 | 保留期限 | 用户可否删除 | 状态 |
|---|---|---|---|---|---|---|---|
| IP 地址、User-Agent、请求路径、时间戳 | 用户访问网站 | 页面交付、安全、防滥用、错误排查 | Legitimate Interests | Cloudflare | [待确认：Cloudflare 日志设置] | 通常不可逐条删除；可联系请求 | 当前适用 |
| 设备/浏览器技术信息 | 用户访问网站 | 兼容性、性能、安全 | Legitimate Interests | Cloudflare、Google Fonts | [待确认] | 可联系请求 | 当前适用 |
| GitHub Issue 内容 | 用户主动跳转 GitHub 提交 | 资源推荐、反馈 | 由 GitHub 处理；站点侧通常不直接处理 | GitHub | 由 GitHub 政策决定 | 通过 GitHub 删除/编辑 | 外部平台 |
| Cookie / 本地存储 | 当前站点 | [待确认：目前未发现非必要 Cookie；浏览器可能有第三方字体/托管必要数据] | Strictly Necessary / Legitimate Interests；非必要追踪需 Consent | Cloudflare、Google Fonts | [待确认] | 可清除浏览器数据 | 待技术确认 |
| 邮箱地址 | [待确认：当前未发现收集] | 联系、通知 | Contract / Legitimate Interests | [待确认] | [待确认] | 可删除 | 暂不适用 |
| 支付信息 | 当前无 | 订单、退款、税务 | Contract / Legal Obligation | Stripe 等 | 由支付商与法律要求决定 | 可请求，交易记录可能依法保留 | 暂不适用 |
| 用户输入/上传内容 | 当前无 | AI 处理/转换/生成 | Contract | AI API / 存储 | [待确认] | 可删除 | 暂不适用 |

---

## 6. 支付/订阅检查

当前结论：未发现支付、订阅、Credits、会员、试用期。

上线要求：
- 价格页如不存在，不要暗示付费权益。
- Refund Policy 写明“当前站点免费提供，不销售数字产品或订阅”。
- 如未来加课程、会员、付费资料、AI 工具额度，必须先补：
  1. 价格、周期、自动续费说明；
  2. Stripe Checkout / Customer Portal；
  3. 取消路径；
  4. 退款窗口；
  5. 税费/VAT 说明；
  6. Terms 和 Refund 同步更新。

建议默认策略：
- 免费静态站：无退款场景。
- 未来数字课程/资料：可设 7 天内未大量访问/下载可退，[待确认]。
- 未来订阅：续费后通常不退已开始周期，[待确认]，但保留个案处理空间。

---

## 7. AI 内容安全检查

当前结论：站点本身不是 AI 生成服务，但内容涉及 AI Agent、工具调用、终端命令、API key、自动化和迁移，属于“AI 使用教程安全”风险。

必须加的安全边界：
- 不保证 Hermes Agent、OpenClaw 迁移、备份、导入在所有环境下无风险。
- 执行终端命令前，用户应理解命令含义，并自行备份重要文件。
- API key、token、配置文件、`.env`、`config.yaml` 不应提交到公开仓库或截图公开。
- 涉及 `rm`、`--force`、覆盖导入、迁移、备份恢复的命令，应加醒目警示。
- 不鼓励用 Agent 从事违法、侵权、滥发垃圾信息、绕过平台限制、盗取账号、抓取受限数据等行为。
- 教程中的第三方平台接入，如 Telegram、Discord、飞书、GitHub，应遵守各平台 Terms 和 API 政策。
- 避免绝对承诺：不用“100% 成功”“无风险迁移”“永久免费”“官方认证”“不会丢配置”等绝对表达。建议用“尽量降低风险”“按步骤备份后再迁移”。

需改文案点：
- PRD 中“你的配置不会丢，迁移只需 3 步。”建议改为：“先备份，再迁移；大多数配置可按步骤迁移。”
- “OpenClaw 无忧迁移”建议改为：“OpenClaw 迁移指南”或“备份优先的迁移流程”。

---

## 8. 上线 Checklist

### 法律页面
- [ ] `/privacy` 已上线，页脚可访问
- [ ] `/terms` 已上线，页脚可访问
- [ ] `/cookie-policy` 已上线，页脚可访问
- [ ] `/refund` 已上线，页脚可访问
- [ ] 每页有 Last updated
- [ ] 联系邮箱已填充，不再是 `[待确认]`
- [ ] 域名统一为最终域名，不混用 `hermes101.dev` / `hermes101.site`

### 数据与 Cookie
- [ ] 确认是否启用 Cloudflare Web Analytics
- [ ] 确认是否启用 Cloudflare 日志、保留期
- [ ] 确认是否添加 GA/Clarity/PostHog/Sentry/广告像素
- [ ] 如有非必要分析/广告 Cookie，欧盟/英国访问前先展示 Cookie Banner
- [ ] Google Fonts 是否改自托管；如不改，Cookie Policy 披露

### 品牌与内容
- [ ] 首页、页脚、Terms 明确“非官方站点”
- [ ] 不使用 Hermes 官方 Logo，除非有授权
- [ ] 不写“官方认证/官方推荐/官方教程”
- [ ] 外链资源标明为第三方内容
- [ ] 命令教程加入安全提示，尤其涉及 token、备份、导入、force、删除

### 支付/订阅
- [ ] 当前无支付入口
- [ ] Refund Policy 明确当前免费
- [ ] 未来收费前重新审查价格页、Checkout、取消路径、税费、退款条款

### 技术实现
- [ ] 页脚加入 Privacy / Terms / Cookie / Refund
- [ ] Sitemap 包含法律页面，或至少可从页脚访问
- [ ] robots 不屏蔽法律页面
- [ ] 404、FAQ、资源页不出现误导性承诺

---

# Privacy Policy 草稿

Last updated: 2026-04-29

Hermes 101（“Site”, “we”, “us”）is operated by Nextfield Labs LLC. This Site provides Chinese-language tutorials, guides, migration notes, FAQs, and resources for learning Hermes Agent. This Site is an independent, unofficial educational website and is not an official Hermes Agent website unless expressly stated otherwise.

## 1. Information We Collect

Based on the current Site design, we do not require account registration and do not intentionally collect payment information, uploaded files, or user-generated content through the Site.

We may process the following limited information:

- **Technical and usage information**: IP address, browser type, device information, request URL, timestamps, and similar server log data when you visit the Site.
- **Security and diagnostic information**: information needed to protect the Site, prevent abuse, and troubleshoot errors.
- **Third-party interaction information**: if you click links to GitHub or other third-party websites, those third parties may collect and process information according to their own privacy policies.

[待确认] If we add contact forms, newsletter subscriptions, analytics tools, error tracking, payment, user accounts, or AI features, this policy must be updated before launch.

## 2. How We Use Information

We use limited technical information to:

- deliver and operate the Site;
- keep the Site secure and reliable;
- diagnose technical issues;
- understand high-level Site performance and availability;
- maintain and improve tutorial content.

We do not sell personal information.

## 3. Third-Party Services

The Site may use or link to the following services:

- **Cloudflare**: hosting, CDN, security, and server logs.
- **Google Fonts**: web fonts and icon fonts loaded from Google servers, unless we later self-host fonts.
- **GitHub**: source repository, issues, and third-party feedback or resource submission links.

Each third-party service processes data according to its own terms and privacy policy.

[待确认] Whether Cloudflare Web Analytics, Google Analytics, Microsoft Clarity, PostHog, Sentry, ads pixels, email tools, or payment providers are enabled.

## 4. Cookies and Similar Technologies

The Site currently appears to use no user account cookies and no payment cookies. Hosting, browser, font, or security services may still use necessary technologies to deliver the Site.

If we add analytics, advertising, or remarketing tools, we will update the Cookie Policy and, where required, request consent before loading non-essential cookies.

## 5. Legal Bases for Processing

For visitors from the EEA/UK, we rely on:

- **Legitimate Interests** for Site delivery, security, diagnostics, and abuse prevention;
- **Consent** where legally required for non-essential analytics, advertising cookies, or similar tracking;
- **Legal Obligation** where we must retain information to comply with applicable law.

## 6. Data Retention

We retain technical logs only for as long as reasonably necessary for security, debugging, and operations, subject to the settings of our hosting and infrastructure providers.

[待确认] Cloudflare log retention settings.

## 7. International Transfers

We operate through service providers that may process information in the United States or other jurisdictions. By using the Site, you understand that technical information may be processed outside your country of residence.

## 8. Your Rights

Depending on your location, you may have rights to access, correct, delete, restrict, or object to certain processing of your personal information. You may also have the right to withdraw consent where processing is based on consent.

To exercise these rights, contact us at: [待确认：contact email]

## 9. Children

The Site is not directed to children under 13. We do not knowingly collect personal information from children.

## 10. Third-Party Links

The Site links to third-party websites and resources. We are not responsible for their privacy practices, content, or availability.

## 11. Changes

We may update this Privacy Policy from time to time. The “Last updated” date shows the latest version.

## 12. Contact

Nextfield Labs LLC  
Wyoming, USA  
Email: [待确认]

---

# Terms of Service 草稿

Last updated: 2026-04-29

These Terms of Service (“Terms”) govern your access to and use of Hermes 101 (the “Site”), operated by Nextfield Labs LLC.

## 1. Independent Educational Site

Hermes 101 is an independent educational website providing tutorials, guides, migration notes, FAQs, and curated resources for Hermes Agent. Unless expressly stated otherwise, the Site is not an official Hermes Agent website and is not endorsed by, sponsored by, or affiliated with any third-party project owner.

[待确认] Official relationship, authorization, or trademark permission for “Hermes Agent” naming.

## 2. Use of the Site

You may use the Site for lawful learning, reference, and educational purposes. You agree not to:

- use the Site to violate laws or third-party rights;
- misuse tutorials to attack, spam, scrape, bypass access controls, or compromise systems;
- copy content in a way that violates applicable copyright or license terms;
- misrepresent the Site as official documentation;
- interfere with the Site’s security or operation.

## 3. Tutorial and Command Disclaimer

The Site contains technical tutorials, command examples, configuration examples, migration steps, and troubleshooting advice. You are responsible for understanding commands before running them.

Before executing commands that modify files, import configurations, use `--force`, delete data, run background processes, or handle API keys, you should back up important data and review the command carefully.

We do not guarantee that any tutorial, command, migration step, or configuration will work in every environment, preserve every setting, or avoid every error.

## 4. API Keys and Secrets

You are responsible for protecting your API keys, tokens, `.env` files, configuration files, and other secrets. Do not publish secrets in public repositories, screenshots, shared logs, or issue reports.

## 5. Third-Party Services and Links

The Site may reference or link to Hermes Agent, OpenClaw, GitHub, model providers, messaging platforms, and other third-party tools or services. Your use of third-party services is governed by their own terms, policies, pricing, and availability.

We are not responsible for third-party content, policy changes, outages, pricing, or API behavior.

## 6. Intellectual Property

The Site content, unless otherwise stated, is owned by or licensed to Nextfield Labs LLC. You may not remove attribution, copy substantial parts of the Site for resale, or imply endorsement without permission.

Third-party names, trademarks, logos, and project names belong to their respective owners.

[待确认] Site content license, e.g. All rights reserved / CC BY-NC / MIT for code examples.

## 7. No Professional Advice

The Site is provided for general educational and informational purposes. It does not provide legal, security, financial, or professional advice.

## 8. No Warranty

The Site is provided “as is” and “as available.” We disclaim warranties of accuracy, availability, fitness for a particular purpose, and non-infringement to the maximum extent permitted by law.

## 9. Limitation of Liability

To the maximum extent permitted by law, Nextfield Labs LLC will not be liable for indirect, incidental, consequential, special, exemplary, or punitive damages, or for loss of data, revenue, profits, goodwill, API credits, accounts, or business opportunities arising from your use of the Site or third-party services.

## 10. Changes to the Site

We may update, remove, or modify Site content at any time. Third-party tools and APIs may change independently, and tutorials may become outdated.

## 11. Governing Law

These Terms are governed by the laws of the State of Wyoming, United States, without regard to conflict of law principles.

## 12. Contact

Nextfield Labs LLC  
Wyoming, USA  
Email: [待确认]

---

# Cookie Policy 草稿

Last updated: 2026-04-29

This Cookie Policy explains how Hermes 101 uses cookies and similar technologies.

## 1. Current Cookie Position

Based on the current PRD and code review, the Site does not appear to provide accounts, checkout, personalized dashboards, or advertising features. We have not identified Google Analytics, Microsoft Clarity, PostHog, Sentry, Stripe, or advertising pixels in the current code.

However, hosting, security, browser, and third-party font services may use necessary or technical requests to deliver the Site.

[待确认] Final production settings for Cloudflare analytics, logs, bot protection, and any added scripts.

## 2. Categories

### Strictly Necessary Technologies

Used to deliver the Site, maintain security, prevent abuse, and serve pages reliably. These may be provided by Cloudflare or similar infrastructure providers.

### Functional Technologies

Currently not intentionally used for user accounts or personalization. If we add theme preferences, language preferences, or saved settings, this section must be updated.

### Analytics Technologies

Currently not identified in code. If Cloudflare Web Analytics, Google Analytics, PostHog, Plausible, or similar tools are added, we will disclose them here and request consent where required.

### Advertising / Remarketing Technologies

Currently not used. If advertising pixels or remarketing tools are added, they must not load for EEA/UK visitors before consent where required.

## 3. Google Fonts

The Site currently loads fonts from Google Fonts. Your browser may request font files from Google, which can involve transmitting IP address, browser information, and referrer information.

Recommendation: self-host fonts to reduce third-party requests.

## 4. Managing Cookies

You can control or delete cookies through your browser settings. Blocking some technologies may affect Site functionality.

## 5. Updates

If we add analytics, ads, forms, login, payment, or user-generated content features, this Cookie Policy should be updated before those features go live.

## 6. Contact

Email: [待确认]

---

# Refund Policy 草稿

Last updated: 2026-04-29

Hermes 101 currently provides free educational content and does not sell subscriptions, paid accounts, digital products, credits, or services through the Site.

## 1. No Current Paid Products

Because the Site currently has no paid checkout or subscription, there are no purchases to refund.

## 2. Third-Party Payments

If you purchase products, tools, APIs, courses, or services through third-party links, those purchases are governed by the refund policies of the relevant third party. We are not responsible for third-party billing, refunds, subscription cancellations, or price changes.

## 3. Future Paid Features

If Hermes 101 later offers paid products, subscriptions, courses, memberships, downloads, AI credits, or services, we will update this Refund Policy before accepting payment. The updated policy should clearly state:

- price and billing cycle;
- whether billing is one-time or recurring;
- refund window;
- non-refundable scenarios;
- cancellation path;
- treatment of used credits or accessed digital content;
- tax and fee handling;
- support contact and processing time.

## 4. Contact

For billing or refund questions related to future paid features, contact: [待确认]
