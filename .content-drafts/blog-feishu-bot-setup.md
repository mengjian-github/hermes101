# Hermes Agent 飞书机器人配置教程

## SEO 元信息
- **title**: Hermes Agent 飞书机器人配置教程 | hermes101
- **description**: 从创建飞书应用到 webhook 对接，10 分钟完成 Hermes Agent 飞书机器人部署，含完整配置参数和常见报错排查。

## 正文

### 前置条件
- 已安装 Hermes Agent（参考 [安装教程](/setup)）
- 拥有可被飞书服务器访问的公网 IP 或域名
- 本地开发环境可使用 ngrok / Cloudflare Tunnel 等内网穿透工具

### 第一步：创建飞书应用
1. 登录 [飞书开发者平台](https://open.feishu.cn/)，点击“创建企业自建应用”。
2. 填写应用名称和描述，点击确定创建。
3. 进入应用详情页，点击“能力” → “机器人” → 开启机器人能力。
4. 记录页面上的 **App ID** 和 **App Secret**。

### 第二步：配置事件与回调
1. 在应用后台进入“事件与回调”。
2. 设置 **Encrypt Key**、**Verification Token**。
3. 填写请求 URL：`https://<your-domain>/webhook/feishu`
4. 订阅以下事件：
   - 接收消息 v2.0 (`im.message.receive_v1`)
   - 机器人进群 (`im.chat.member.bot.added_v1`)

### 第三步：配置 Hermes
打开 `~/.hermes/config.yaml`，添加如下配置：
```yaml
platforms:
  feishu:
    app_id: "cli_xxxxxxxxxx"
    app_secret: "xxxxxxxxxx"
    encrypt_key: "xxxxxxxxxx"
    verification_token: "xxxxxxxxxx"
```

### 第四步：启动并测试
1. 在终端运行 `hermes serve`。
2. 确保服务器可以被飞书服务器访问到 `/webhook/feishu` 路径。
3. 在飞书群聊或单聊中 @机器人，发送一条测试消息。
4. 如果配置正确，Hermes 会在终端显示接收到的消息，并返回结果。

### 常见问题
- **Webhook 地址验证失败**：飞书要求地址必须是 `https://`。本地开发请使用 ngrok 等工具生成临时 https 地址。
- **配置保存后提示无权限**：检查应用是否已发布到企业，未发布的应用只能在测试企业中使用。
- **Hermes 未响应**：检查终端日志中是否显示 webhook 请求；如果没有，说明飞书服务器无法访问你的地址。
