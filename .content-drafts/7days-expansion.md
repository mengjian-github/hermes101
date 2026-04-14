# /7-days 页 Day 2~Day 6 扩展内容

在 `app/7-days/page.tsx` 的 `days` 数组中，为 Day 2~Day 6 每项新增 `tasks: string[]` 字段，并在渲染逻辑中展开为无序列表。

---

## Day 2：配置模型和 API key
```ts
tasks: [
  "打开终端，运行 hermes config --edit 查看默认配置文件路径",
  "在 ~/.hermes/config.yaml 中填入 OpenAI / Anthropic 或其他兼容模型的 API key",
  "运行 hermes chat '\u4f60\u597d' 测试模型响应速度和回复质量",
  "（可选）如果访问国际接口不稳定，配置国内中转地址或代理",
]
```

## Day 3：连接飞书 / Telegram
```ts
tasks: [
  "选择一个渠道（飞书或 Telegram），按对应博客教程创建机器人并获取 token",
  "在 ~/.hermes/config.yaml 中添加 platform 配置段，填入 webhook 地址和验证参数",
  "本地运行 hermes serve 启动服务，向机器人发送第一条测试消息",
  "验证机器人能正确回复后，标记本日任务完成",
]
```
保留原有的两个 blog 内链（待墨界落地后即可点击）。

## Day 4：使用内置工具
```ts
tasks: [
  "运行 hermes tools list 查看当前已加载的内置工具列表",
  "尝试让 Hermes 查询天气或执行简单的终端命令",
  "观察 Hermes 如何自动选择工具、调用并返回结果",
  "阅读一个内置工具的源码，理解工具注册接口的结构",
]
```

## Day 5：技能系统入门
```ts
tasks: [
  "访问 MCP Hub 或社区技能仓库，挑选一个感兴趣的第三方技能",
  "使用 hermes skill install <name> 安装该技能",
  "在对话中触发新技能，验证功能是否按预期工作",
  "如果遇到报错，查看 ~/.hermes/skills/ 目录下的日志或文档进行排查",
]
```

## Day 6：记忆与 Cron 自动化
```ts
tasks: [
  "运行 hermes memory status 检查记忆存储状态和后端连接",
  "让 Hermes 记住一个个人偏好（如'我喜欢简洁回答'）并验证下次对话仍然生效",
  "在 ~/.hermes/cron.yaml 中配置一个定时任务（如每日早报摘要）",
  "重启 Hermes 后测试记忆和定时任务是否仍然有效",
]
```

---

## UI 展示建议
在 `days.map` 渲染中，在 `<p className="text-[15px]...">{d.desc}</p>` 下方增加：
```tsx
{d.tasks && d.tasks.length > 0 && (
  <ul className="mt-3 space-y-2">
    {d.tasks.map((t, ti) => (
      <li key={ti} className="flex items-start gap-2 text-sm text-[#3d4947]">
        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#6d7a77]" />
        <span>{t}</span>
      </li>
    ))}
  </ul>
)}
```
