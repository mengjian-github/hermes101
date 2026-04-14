# Hermes Agent Telegram Bot 配置教程

## SEO 元信息
- **title**: Hermes Agent Telegram Bot 配置教程 | hermes101
- **description**: 从 BotFather 到 webhook 部署，完整步骤讲解如何将 Hermes Agent 对接到 Telegram，含常见报错排查。

## 正文

### 前置条件
- 已安装 Hermes Agent（参考 [安装教程](/setup)）
- 拥有可被 Telegram 服务器访问的公网 IP 或域名
- 本地开发可使用 ngrok / Cloudflare Tunnel 等内网穿透工具

### 第一步：创建 Bot
1. 在 Telegram 搜索并私聊 @BotFather。
2. 发送命令 `/newbot`。
3. 按提示输入 Bot 的显示名称和唯一 username（必须以 bot 结尾）。
4. 创建成功后，BotFather 会发送一段 **HTTP API Token**，请妥善保存。

### 第二步：设置 Webhook
Telegram Bot 接收消息必须通过 Webhook。运行以下命令将你的服务器地址绑定到 Bot：
```bash
curl -F "url=https://<your-domain>/webhook/telegram" \
  https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```
如果需要重置为轮询模式（仅建议本地开发时使用），可以发送：
```bash
curl -F "url=" https://api.telegram.org/bot<YOUR_BOT_TOKEN>/setWebhook
```

### 第三步：配置 Hermes
打开 `~/.hermes/config.yaml`，添加如下配置：
```yaml
platforms:
  telegram:
    bot_token: "YOUR_BOT_TOKEN"
```

### 第四步：启动并测试
1. 在终端运行 `hermes serve`。
2. 确保服务器能够接收到来自 Telegram 皈的 POST 请求。
3. 私聊或群聊中发送 `/start`、`/help` 或任意消息。
4. 如果配置正确，Hermes 会立即返回对话结果。

### 常见问题
- **Webhook 只支持 https**：Telegram 不接受 http 地址。本地测试请使用 ngrok 生成临时 https 隧道。
- **国内网络访问不了 Telegram**：确保你的服务器可以访问 `api.telegram.org`。如果服务器在国内，需要配置代理或使用海外服务器。
- **群聊中无响应**：Telegram 群聊机器人默认只能响应命令消息。如果需要回复普通消息，需要在 @BotFather 里关闭 Privacy Mode。
