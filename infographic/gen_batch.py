#!/usr/bin/env python3
"""Generate all 8 infographics sequentially."""
import os, sys, json, time

os.environ['FAL_KEY'] = '41450777-aa3b-46f3-9ef1-cd8c9f28d04f:e4b5a8a07e3ec24789f8bc21ee5544ab'
sys.path.insert(0, '/root/.hermes/hermes-agent')

from tools.image_generation_tool import image_generate_tool

STYLE = "Style: hand-drawn-edu infographic. Background: Warm cream (#F5F0E8) with paper grain texture. Primary text: Deep charcoal (#2D2D2D). Macaron pastel rounded cards: Blue #A8D8EA, Mint #B5E5CF, Lavender #D5C6E0, Peach #FFD5C2. Accent green: #18E299. Hand-drawn wavy connection lines and arrows with slight wobble. Simple stick-figure characters and cartoon icons. Doodle decorations: small stars, underlines, sparkles. Bold hand-lettered title with organic strokes. All text in Chinese."

DATA = [
("day1-install", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 1 · 5 分钟安装 Hermes Agent
5 steps left to right with wavy hand-drawn arrows:
Step 1 (Blue card #A8D8EA): 💻 一键安装 — curl -fsSL install.sh | bash — 自动安装 Python 3.11 + Node.js v22
Step 2 (Mint card #B5E5CF): 🔄 重载 Shell — source ~/.bashrc
Step 3 (Lavender card #D5C6E0): ✅ 验证 — hermes version + hermes doctor
Step 4 (Peach card #FFD5C2): 🔑 配置 Key — hermes setup 或 hermes config set OPENROUTER_API_KEY 你的key
Step 5 (Mint card #B5E5CF): 💬 第一次对话 — hermes → 输入"你好"
Add stick figure celebrating at end. Sparkle doodles. Code in rounded rectangles."""),

("day2-models", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 2 · 选一个聪明的大脑
5 steps left to right with wavy arrows:
Step 1 (Blue card #A8D8EA): 🔍 查看 Provider — hermes chat --provider openrouter 或 /provider
Step 2 (Lavender card #D5C6E0): 🤖 交互式选模型 — hermes model → 弹出模型选择器
Step 3 (Peach card #FFD5C2): 🇨🇳 国产模型 — --provider zai --model glm-4-plus / --provider kimi-coding / --provider minimax
Step 4 (Mint card #B5E5CF): 🏠 本地模型 — Ollama OPENAI_BASE_URL=http://localhost:11434/v1
Step 5 (Blue card #A8D8EA): ⚡ 快速测试 — hermes chat -q "9.8和9.11哪个大"
Stick figure thinking. Star doodles."""),

("day3-platform", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 3 · 让 AI 走进你的聊天 App
5 steps left to right with wavy arrows:
Step 1 (Blue card #A8D8EA): 📱 选平台 — Telegram / Discord / 飞书 / Slack — 推荐 Telegram 先行
Step 2 (Mint card #B5E5CF): 🤖 创建 Bot — Telegram @BotFather /newbot 拿到 Token
Step 3 (Lavender card #D5C6E0): ⚙️ 配置 Gateway — hermes gateway setup telegram → 粘贴 Token
Step 4 (Peach card #FFD5C2): 🚀 启动 — hermes gateway run 或 hermes gateway install
Step 5 (Mint card #B5E5CF): 💬 测试 — 在 App 里给 Bot 发消息确认回复
Stick figure chatting on phone."""),

("day4-tools", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 4 · 不只是聊天，还能干活
2x3 bento grid of feature cards:
Card 1 (Blue #A8D8EA): 🌐 Web 搜索 — 问"最新 AI 新闻" → 自动搜索
Card 2 (Mint #B5E5CF): 💻 终端执行 — 跑 ls -la ~/.hermes（需审批）
Card 3 (Lavender #D5C6E0): 🌍 浏览器 — 打开网页并总结
Card 4 (Peach #FFD5C2): 📁 文件操作 — 读写文件、搜索内容
Card 5 (Blue #A8D8EA): 🔧 工具集 — --toolsets "web,terminal,skills" 可选启用
Card 6 (Mint #B5E5CF): 🛡️ 安全审批 — 危险命令需确认 /yolo 跳过审批
Stick figure at desk."""),

("day5-skills", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 5 · 给 AI 装上技能包
5 steps left to right, AI leveling up like game character:
Step 1 (Blue card #A8D8EA): 📦 浏览技能 — /skills 或 /skills search weather
Step 2 (Peach card #FFD5C2): ⬇️ 安装 — /skills install mcp/weather
Step 3 (Mint card #B5E5CF): ✅ 验证 — /skills list → 对话中触发
Step 4 (Lavender card #D5C6E0): 🔄 更新 — hermes update 同步新技能到所有 Profile
Step 5 (Blue card #A8D8EA): 🗑️ 管理 — /skills uninstall mcp/weather
Stick figure powering up left to right."""),

("day6-multiagent", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 6 · 多 Agent 协作 + 定时任务
Split into left and right halves with dashed divider:
LEFT "Profile 多 Agent":
L1 (Blue): 创建 — hermes profile create coder
L2 (Lavender): 独立配置 — coder setup 独立 config/skills/bot
L3 (Mint): 独立启动 — coder gateway start 独立进程
L4 (Peach): 统一管理 — hermes profile list / hermes profile use coder
RIGHT "Cron 定时任务":
R1 (Peach): 创建任务 — /cron 或 "每天早上9点总结新闻"
R2 (Mint): 查看 — hermes cron list
R3 (Blue): 自动投递 — 发到 Telegram/Discord
R4 (Lavender): 管理 — 暂停/恢复/删除
Multiple stick figure agents."""),

("day7-advanced", f"""Create a landscape 16:9 infographic. {STYLE}
Title: Day 7 · 成为 Hermes 高手
2x3 grid of feature cards:
Feature 1 (Blue #A8D8EA): 🖥️ TUI 界面 — hermes --tui → 现代终端界面
Feature 2 (Mint #B5E5CF): 🔍 会话搜索 — 跨所有历史对话 FTS5 全文搜索
Feature 3 (Lavender #D5C6E0): 💾 备份恢复 — hermes backup / hermes import
Feature 4 (Peach #FFD5C2): 🧠 智能记忆 — 跨 session 积累，越用越懂你
Feature 5 (Blue #A8D8EA): 🔄 上下文压缩 — 自动压缩中间轮次保持连续性
Feature 6 (Mint #B5E5CF): 🐛 诊断排错 — /debug + hermes doctor
Ninja-master stick figure."""),

("day8-migration", f"""Create a landscape 16:9 infographic. {STYLE}
Title: OpenClaw → Hermes · 3 步迁移
TOP 3 steps left to right:
Step 1 (Blue #A8D8EA): 📋 迁移前 — 备份 cp -r ~/.openclaw ~/.openclaw.bak + 确认版本
Step 2 (Mint #B5E5CF): 🚀 一键迁移 — hermes claw migrate → 自动导入配置/Token/技能
Step 3 (Lavender #D5C6E0): ✅ 迁移后 — hermes doctor 全面检查 + 验证 Bot 回复
BOTTOM comparison table with hand-drawn borders:
功能对照 | OpenClaw vs Hermes:
Dashboard: ❌ → ✅
Profile 多 Agent: ❌ → ✅
TUI 界面: ❌ → ✅
Session Search: ❌ → ✅
备份恢复: 手动 → ✅ 一键
Peach header for OpenClaw, Mint for Hermes. Stick figure moving happily left to right."""),
]

outdir = "/root/projects/hermes101-site/infographic"
os.makedirs(outdir, exist_ok=True)

print(f"🎨 Generating {len(DATA)} infographics...", flush=True)
results = []
for i, (name, prompt) in enumerate(DATA):
    print(f"\n[{i+1}/{len(DATA)}] {name} generating...", flush=True)
    t0 = time.time()
    ok = False
    url = None
    for attempt in range(2):
        try:
            r = json.loads(image_generate_tool(prompt=prompt, aspect_ratio="landscape"))
            if r.get("success"):
                url = r["image"]
                ok = True
                break
            print(f"  Attempt {attempt+1} failed: {r.get('error','?')}", flush=True)
        except Exception as e:
            print(f"  Attempt {attempt+1} error: {e}", flush=True)
        if attempt == 0:
            time.sleep(3)
    elapsed = time.time() - t0
    tag = "✅" if ok else "❌"
    print(f"  {tag} {name} ({elapsed:.0f}s): {url}", flush=True)
    results.append((name, url, ok))
    time.sleep(1)

with open(f"{outdir}/urls.txt", "w") as f:
    for name, url, ok in results:
        f.write(f"{'✅' if ok else '❌'} {name}: {url or 'FAILED'}\n")

print(f"\n{'='*60}", flush=True)
ok_count = sum(1 for _,_,o in results if o)
print(f"Done: {ok_count}/{len(results)} successful. Saved to {outdir}/urls.txt", flush=True)
for name, url, ok in results:
    print(f"  {'✅' if ok else '❌'} {name}: {url}", flush=True)
