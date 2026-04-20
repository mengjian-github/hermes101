# hermes101 站点 PRD v2
> 版本：Hermes v0.9.x  
> 目标：降低小白认知负荷，把 0.9 新功能自然融入学习路径，让安装→上线→迁移每一步都有可验证成果。

---

## 一、全站内容结构

| 页面 | 定位 | 核心目标 |
|------|------|----------|
| **index** | 首屏转化 | 3 秒说清价值：5 分钟安装、7 天跟练、无忧迁移。CTA 指向 Setup 或 Migrate。 |
| **setup** | 安装落地 | 按 OS 分 Tab（Mac / Linux / Windows WSL2）。每步可复制命令，每个坑都有“失败分支”。 |
| **7-days** | 教程主阵地 | 7 天每天一个可验证成果，步骤拆到 15 分钟能完成。失败引导内嵌在当天内容中。 |
| **migrate** | OpenClaw 迁移 | 一键迁移命令 + 0.9 功能对照表 + 具体报错修复。让迁移决策无摩擦。 |
| **faq** | 问题收口 | 高频报错、平台差异、版本升级。问题按场景分类，答案先给命令再给解释。 |

---

## 二、全局版本号与 Banner

所有页面顶部 VersionBanner 统一改为：

```
📌 本指南基于 Hermes v0.9.x | 最后更新：2026-04-15 | ⚠️ 非官方站点
```

index 页 Hero 区底部小字同步改为 `Hermes v0.9.x`。

---

## 三、7-Day 教程大纲（v2 重写）

### 设计原则
1. **每天一个可验证成果**：标题直接写产出，用户能截图发朋友圈。
2. **步骤粒度 ≤ 15 分钟**：超过 15 分钟的步骤必须再拆分。
3. **失败分支内嵌**：每一步后面紧跟「如果这一步失败了怎么办」折叠块（Accordion）。
4. **0.9 功能自然融入**：不突兀地介绍新功能，而是作为解决当天问题的最佳实践出现。

---

### Day 1｜安装成功，并在终端说出第一句话
**当日成果**：运行 `hermes --version` 有输出，且在终端完成第一次对话。

**步骤**：
1. 选择你的操作系统（Mac / Linux / Windows WSL2），进入对应 Tab。
2. 检查 Python 版本：`python3 --version`（需 ≥ 3.10）。
3. 安装 Hermes：`pip3 install --user hermes-agent`。
4. 验证安装：`hermes --version`（应显示 v0.9.x）。
5. 初始化配置：`hermes setup`（交互式向导，生成 `~/.hermes/config.yaml`）。
6. 运行第一次对话：在终端输入 `hermes`，发送 `你好`。

**失败分支**：
- **Python 版本过低** → 安装 pyenv 或去 python.org 下载 3.11。
- **`hermes: command not found`** → 检查 `~/.local/bin` 是否在 PATH；Linux 用户可执行 `export PATH="$HOME/.local/bin:$PATH"`。
- **`pip install` 权限失败** → 改用 `--user` 参数，或使用 `python3 -m venv venv && source venv/bin/activate` 在虚拟环境中安装。
- **`hermes setup` 卡住** → 检查网络是否能访问 api.openai.com（或其他模型提供商），如不能，先跳过 provider 配置，Day 2 再补。

---

### Day 2｜配置模型与 API key，让 Hermes 能正常回复
**当日成果**：发送消息后，Hermes 能调用 LLM 并返回有意义的回答。

**步骤**：
1. 打开 `~/.hermes/config.yaml`，确认 `model` 字段（默认 `anthropic/claude-sonnet-4`）。
2. 配置 API key：
   - 方式 A：写入 `~/.hermes/.env`（`OPENAI_API_KEY=sk-...`）
   - 方式 B：运行 `hermes auth add openai`（0.9 推荐，支持加密存储）
3. 测试模型连通性：`hermes` 进入对话，输入 `/provider` 查看当前 provider 状态。
4. 发送一条需要推理的消息（如"9.8 和 9.11 哪个大"），验证回复质量。
5. （可选）切换模型体验差异：`/model claude-sonnet-4 --global` 或 `/model gpt-4.1`。

**失败分支**：
- **提示 API key 无效** → 检查 key 是否过期；国产模型用户需同步修改 `base_url`。
- **回复为空或报错 429** → 表示速率限制，建议换 provider 或开启 fallback model（config.yaml 中设置 `fallback_model`）。
- **`/provider` 显示未配置** → 确认 `.env` 文件无 BOM 头、无多余空格；或改用 `hermes auth list` 查看是否写入成功。

---

### Day 3｜连接第一个渠道机器人（飞书 / Telegram / Discord）
**当日成果**：在真实聊天应用里 @机器人，它能回复你。

**步骤**：
1. 选择一个渠道（推荐顺序：Telegram → 飞书 → Discord）。
2. 按渠道文档获取 token / webhook 地址。
3. 运行配置命令：`hermes gateway setup <platform>`（0.9 交互式向导支持 8+ 平台）。
4. 启动 gateway：`hermes gateway run`。
5. 在对应 App 里发送一条消息，确认机器人回复。
6. **0.9 新功能**：访问 `http://localhost:18000/dashboard`（或 `--dashboard` 参数启动）查看实时消息流、在线 session 数和最近调用记录。

**失败分支**：
- **`hermes gateway setup` 没有我想要的平台** → 升级 hermes 到最新版：`pip install --upgrade hermes-agent`。
- **Telegram bot 不回复** → 检查 webhook 是否被其他服务占用；运行 `hermes gateway logs` 查看推送日志。
- **飞书 webhook 报错** → 确认事件订阅里勾选了「消息」事件，且地址使用 HTTPS。
- **Discord bot 显示离线** → 确认在 Discord Developer Portal 开启了 `MESSAGE CONTENT INTENT`。
- **Dashboard 打不开** → 检查 gateway 是否加了 `--dashboard` 参数启动；默认端口 18000 是否被占用。

---

### Day 4｜调用第一个内置工具，让 Hermes 不只是聊天
**当日成果**：Hermes 成功调用至少 1 个工具（天气 / 搜索 / 终端 / 浏览器），并把结果返回给你。

**步骤**：
1. 在对话中让 Hermes 查天气（如"北京今天天气怎么样"）。
2. 让它搜索一个实时信息（如"Hermes v0.9 新功能"）。
3. 授权它执行一条安全的终端命令（如`ls -la ~/.hermes`）。
4. 体验浏览器工具：让 Hermes 打开一个网页并总结内容。

**失败分支**：
- **工具没有触发** → 检查 `config.yaml` 中 `enabled_toolsets` 是否包含对应工具集。
- **终端命令被拒绝** → Hermes 会弹出 approval 提示，在 gateway 中回复 `/approve` 或在 CLI 中输入 `y`。
- **浏览器工具报错 timeout** → 检查网络是否可访问目标站点；或改用 `web_search` 工具。
- **搜索没有结果** → 确认 `FIRECRAWL_API_KEY` 或 `EXA_API_KEY` 已配置（取决于默认搜索后端）。

---

### Day 5｜安装并使用第一个第三方技能（MCP / Skill）
**当日成果**：成功安装一个第三方技能，并通过对话触发它。

**步骤**：
1. 浏览技能市场：在 Hermes CLI 中输入 `/skills`（或 `/skills search weather`）。
2. 安装一个技能：`/skills install mcp/weather`（示例）。
3. 查看已安装技能：`/skills list`。
4. 在对话中触发该技能（如"查一下上海天气"）。
5. 如果不需要了，卸载：`/skills uninstall mcp/weather`。

**失败分支**：
- **`/skills` 命令不存在** → 确保 Hermes 版本 ≥ v0.9.0；升级后重启 CLI / gateway。
- **安装失败（网络超时）** → 检查是否能访问 GitHub；必要时配置代理或手动把 skill 放到 `~/.hermes/skills/`。
- **安装成功但无法触发** → 检查该 skill 的 `SKILL.md` 中 trigger 条件，可能需要特定关键词。
- **与现有工具冲突** → 使用 `/tools` 命令临时禁用冲突的内置工具。

---

### Day 6｜后台进程监控 + 备份恢复
**当日成果**：启动一个后台任务（如本地服务器），通过 `watch_patterns` 监控输出；并创建一个配置备份。

**步骤**：
1. 启动一个后台进程（示例）：
   ```
   hermes
   > 请在后台运行 `python3 -m http.server 8080`，如果输出中出现 "Serving" 就通知我
   ```
2. 在 terminal tool 调用中，Hermes 会自动使用 `watch_patterns=["Serving"]` 监控输出。
3. 进程启动后，使用 `/status` 查看后台进程列表。
4. 模拟崩溃恢复：关闭 terminal 再打开，运行 `hermes`，输入 `/status` 查看进程是否仍在监控中（0.9 支持 checkpoint 恢复）。
5. **创建备份**：运行 `hermes backup`，会在 `~/.hermes/` 同级目录（或默认 Home）生成 `hermes-backup-YYYY-MM-DD-HHMMSS.zip`。
6. **验证备份可恢复**：运行 `hermes import hermes-backup-XXXX.zip --dry-run`（如果支持）或直接在新机器上 `hermes import` 恢复。

**失败分支**：
- **后台进程启动但 watch 没触发** → 检查输出中是否真的有匹配字符串；大小写敏感；可用 `.*` 做正则模糊匹配。
- **`/status` 看不到进程** → 确认进程是在当前 task_id / session 下启动的；gateway 中不同 chat 的 session 是隔离的。
- **`hermes backup` 报错权限不足** → 检查 `~/.hermes` 目录是否有可读权限；排除 `hermes-agent` 源码目录过大导致的问题（backup 会自动跳过源码目录）。
- **`hermes import` 提示不是有效的备份** → 确认 zip 内包含 `config.yaml` 或 `.env`；如果手动压缩的目录，确保前缀是 `.hermes/` 或根目录。

---

### Day 7｜进阶：自定义配置、迁移与排错
**当日成果**：能独立使用 `/debug` 诊断问题，并掌握从 OpenClaw 迁移的完整流程。

**步骤**：
1. 学习 `/debug` 命令（0.9 新增）：在对话中输入 `/debug`，查看当前模型状态、平台连接状态、最近 5 条错误日志摘要。
2. 使用 `/config` 查看完整配置，了解哪些字段可以自定义。
3. 学习 Cron 自动化：运行 `hermes cron create --schedule "0 9 * * *" --prompt "总结今天的新闻"`。
4. 回顾 7 天内容，输出一份自己的「Hermes 运行检查清单」。
5. 如果有 OpenClaw 历史配置，阅读 migrate 页并执行 `hermes claw migrate`。

**失败分支**：
- **`/debug` 无输出** → 该命令需要 gateway v0.9.2+ 或 CLI v0.9.2+；升级后重试。
- **Cron 任务没有触发** → 检查 `hermes cron list` 中任务状态；确认 gateway 或 cron 守护进程正在运行。
- **migrate 报错 "claw 不存在"** → 先确认本机仍能运行 `openclaw --version`；如果 OpenClaw 已卸载，需手动迁移 `~/.openclaw/config.yaml`。

---

## 四、迁移页（migrate）内容更新

### 1. Hero 区
保留情绪 Banner：「你的配置不会丢，迁移只需 3 步。」

### 2. 迁移前检查清单（精简为 6 项）
1. 备份 OpenClaw 配置（`cp -r ~/.openclaw ~/.openclaw.bak`）
2. 确认 Hermes 已安装且版本 ≥ v0.9.0：`hermes --version`
3. 记录当前 API key（至少 1 个主 key）
4. 检查网络可访问模型提供商
5. 确认当前机器人 token 未过期
6. 确保终端有 `openclaw` 命令（或知道旧配置路径）

### 3. 一键迁移命令（保留命令演示）
```bash
hermes claw migrate
```

增加 0.9 扩展命令：
```bash
# 迁移后立即创建备份（推荐）
hermes backup --output ~/hermes-migrated.zip

# 如果迁移失败，可手动导入旧配置
hermes import ~/.openclaw/config-export.zip --force
```

### 4. 0.9 新功能对照表

| 功能 | OpenClaw | Hermes v0.9.x | 说明 |
|------|----------|---------------|------|
| **Dashboard** | ❌ | ✅ | Web 实时状态面板，查看消息流/session/调用记录 |
| **Backup / Import** | 手动拷贝 | ✅ 原生支持 | `hermes backup` / `hermes import` 一键备份恢复 |
| **平台接入** | Telegram / 飞书 | 8+ 平台 | 新增 Discord、Slack、WhatsApp、Signal、Matrix、Email、Home Assistant、钉钉、企业微信等 |
| **Debug 命令** | ❌ | ✅ `/debug` | 快速输出模型状态、平台连接、错误摘要 |
| **Watch Patterns** | ❌ | ✅ | 后台进程输出监控，匹配关键字自动通知 |
| **MCP / Skill 市场** | 基础工具 | 丰富生态 | `/skills` 浏览安装第三方能力 |
| **Cron 自动化** | ❌ | ✅ | 自然语言创建定时任务，可投递到任意平台 |

### 5. 常见失败场景（增加具体命令）

| 失败现象 | 原因 | 解决方案 |
|----------|------|----------|
| `claw 不存在` | OpenClaw 未安装或未加入 PATH | `which openclaw` 检查路径；如已卸载，手动复制 `~/.openclaw/config.yaml` 到 `~/.hermes/` |
| 渠道配置丢失 / 机器人不回复 | Token 过期或 webhook 未更新 | 重新获取 Token；运行 `hermes gateway setup <platform>` 重新配置；用 `/debug` 检查连接状态 |
| API key 迁移后无法调用 | Key 格式不兼容或 base_url 丢失 | `hermes auth list` 查看是否导入成功；手动编辑 `~/.hermes/config.yaml` 补全 `base_url` |
| 命令执行到一半卡住 | 网络不稳定或旧配置文件过大 | `Ctrl+C` 取消后重试；或分批迁移：先迁移 `config.yaml`，再迁移 `.env` 和 skills |
| `hermes import` 报错 "not a valid zip" | 压缩包格式不对 | 确保是 `.zip` 格式；如为 `.tar.gz`，先解压再重新压缩为 zip |

### 6. 迁移后验证清单（保留 5 项）
1. `hermes --version` 正常返回 v0.9.x
2. `hermes config` 显示已迁移的配置
3. 渠道机器人能正常回复消息
4. API 调用测试通过（发送一条消息看是否有回复）
5. 工具列表与迁移前一致（`/tools list` 对比）

---

## 五、Setup 页更新要点

### 版本号
所有 `v0.8.x` 替换为 `v0.9.x`。

### 新增步骤
- **Mac/Linux 安装后**：增加 `hermes setup` 交互式配置向导说明。
- **Windows WSL2**：增加 `hermes --version` 验证后，提示运行 `hermes setup`。

### 失败分支扩展
每个安装步骤下方增加 Accordion：
- **WSL2 未启用** → `wsl --install` 后重启；如仍失败，在 BIOS 开启虚拟化。
- **Python 版本过低** → 使用 `sudo apt install python3.11 python3.11-pip -y`（Ubuntu/Debian）。
- **pip 安装权限失败** → 优先使用 `pip3 install --user hermes-agent`；次选 venv。
- **hermes 命令找不到** → 给出 `export PATH="$HOME/.local/bin:$PATH"` 并提醒写入 `~/.bashrc` / `~/.zshrc`。
- **WSL2 网络无法访问模型 API** → 检查 Windows 防火墙；必要时在 WSL2 中配置代理。

---

## 六、FAQ 页更新

### 分类结构
按 4 个场景折叠：
1. **安装与启动**
2. **模型与 API**
3. **平台与机器人**
4. **迁移与升级**

### 新增问题
- **Q: `hermes backup` 会备份我的代码仓库吗？**  
  A: 不会。`hermes backup` 会自动跳过 `hermes-agent` 源码目录和 `__pycache__`，只备份配置、状态、技能和记忆。

- **Q: `watch_patterns` 支持正则吗？**  
  A: 支持子串匹配和部分正则。如果日志输出频繁，系统会自动限流（每 10 秒最多 8 条通知），持续过载会关闭 watch 以保护性能。

- **Q: `/debug` 能看到什么？**  
  A: 当前 session 使用的模型、provider 连接状态、各平台 gateway 是否在线、最近 5 条错误摘要和推荐修复命令。

- **Q: 如何从 v0.8.x 升级到 v0.9.x？**  
  A: 三步：1) `pip install --upgrade hermes-agent`；2) `hermes --version` 确认版本；3) 如配置文件格式有变化，运行 `hermes setup` 自动迁移。

- **Q: v0.9 新增了哪些平台？**  
  A: 除了 Telegram 和飞书，还支持 Discord、Slack、WhatsApp、Signal、Matrix、Email、Home Assistant、Mattermost、钉钉、企业微信、BlueBubbles、SMS。

### 保留并更新现有问题
- Windows / WSL2 相关问题 → 更新为 v0.9 语境。
- OpenAI API key 问题 → 补充 `hermes auth add` 命令说明。
- Telegram / 飞书不回复 → 补充 `/debug` 排查步骤。

---

## 七、Index 页更新

### Hero 文案微调
- 副标题保持：5 分钟安装 · 7 天跟练 · OpenClaw 一键迁移
- 底部版本号改为 `Hermes v0.9.x`

### FeatureCard 微调（第三张）
```
🔄 OpenClaw 无忧迁移
使用 hermes claw migrate 一键迁移，配置不会丢。
v0.9 新增 backup/import 与 /debug 诊断，迁移更安心。
```

---

## 八、组件与样式要求

- **DayCard 组件**：增加「失败分支」插槽，默认折叠（Accordion）。
- **VersionBanner**：全局统一为 `v0.9.x`。
- **CodeBlock**：迁移页和 7-days 中新增 `hermes backup`、`hermes import`、`/debug` 命令示例。
- **CommandDemo**：迁移页保留一键迁移命令演示，可考虑增加 `hermes backup` 的演示块。

---

## 九、SEO 与元信息

- 所有页面 `schema` 中的 `dateModified` 更新为 `2026-04-15`。
- `keywords` 增加 `Hermes v0.9, backup, import, watch_patterns, debug, dashboard`。

---

## 十、交付检查清单

- [ ] index.astro 版本号更新为 v0.9.x
- [ ] setup.astro 增加 `hermes setup` 步骤和失败分支
- [ ] 7-days.astro 重写为 7 天详细大纲，每天含失败分支和 0.9 功能融入
- [ ] migrate.astro 增加 0.9 功能对照表和具体命令示例
- [ ] faq.astro 增加 backup/import、watch_patterns、/debug、新平台问题
- [ ] PRD-v2.md 已输出到 `/root/projects/hermes101-site/PRD-v2.md`
