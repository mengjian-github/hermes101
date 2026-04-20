#!/usr/bin/env python3
"""Batch generate 8 Hermes101 tutorial infographics."""
import json
import os
import sys
import time

# Set up paths and env
os.environ['FAL_KEY'] = '41450777-aa3b-46f3-9ef1-cd8c9f28d04f:e4b5a8a07e3ec24789f8bc21ee5544ab'
sys.path.insert(0, '/root/.hermes/hermes-agent')

from tools.image_generation_tool import image_generate_tool

# Base style prompt shared by all images
STYLE_BLOCK = """
Style: hand-drawn-edu infographic
- Background: Warm cream (#F5F0E8) with subtle paper grain texture
- Primary text: Deep charcoal (#2D2D2D)
- Macaron pastel rounded cards: Blue #A8D8EA, Mint #B5E5CF, Lavender #D5C6E0, Peach #FFD5C2
- Accent green: #18E299
- Hand-drawn wavy connection lines and arrows with slight wobble
- Simple stick-figure characters and cartoon icons
- Doodle decorations: small stars, underlines, sparkles
- Bold hand-lettered title with organic strokes
- All text in Chinese
- Layout: linear-progression (steps left to right with connecting path)
- Aspect: landscape (16:9)
"""

PROMPTS = []

# ─── Image 1: Day 1 ───
PROMPTS.append({
    "name": "day1-install",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 1 · 5 分钟安装 Hermes Agent"

Layout: 5 steps in a horizontal linear progression, connected by wavy hand-drawn arrows from left to right.

Step 1 (Blue card #A8D8EA): 💻 一键安装
- 命令: curl -fsSL .../install.sh | bash
- 自动安装 Python 3.11 + Node.js v22
- Icon: computer/laptop with download arrow

Step 2 (Mint card #B5E5CF): 🔄 重载 Shell
- 命令: source ~/.bashrc
- Icon: circular refresh arrow

Step 3 (Lavender card #D5C6E0): ✅ 验证安装
- 命令: hermes version + hermes doctor
- Icon: green checkmark with magnifying glass

Step 4 (Peach card #FFD5C2): 🔑 配置 API Key
- 命令: hermes setup 或 hermes config set OPENROUTER_API_KEY
- Icon: key with lock

Step 5 (Mint card #B5E5CF): 💬 第一次对话
- 命令: hermes → 输入"你好"
- Icon: chat bubble with smile

Include a small stick figure celebrating at the end. Add sparkle doodles around the title. Code commands should appear in rounded rectangles with monospace-style lettering. All text in Chinese.""",
})

# ─── Image 2: Day 2 ───
PROMPTS.append({
    "name": "day2-models",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 2 · 选一个聪明的大脑"

Layout: 5 steps in a horizontal linear progression, connected by wavy hand-drawn arrows.

Step 1 (Blue card #A8D8EA): 🔍 查看 Provider
- 命令: hermes chat --provider openrouter 或 /provider
- Icon: magnifying glass over a gear

Step 2 (Lavender card #D5C6E0): 🤖 交互式选模型
- 命令: hermes model → 弹出模型选择器
- Icon: robot face with list selector

Step 3 (Peach card #FFD5C2): 🇨🇳 国产模型
- --provider zai --model glm-4-plus
- --provider kimi-coding / --provider minimax
- Icon: Chinese flag with brain

Step 4 (Mint card #B5E5CF): 🏠 本地模型
- Ollama: OPENAI_BASE_URL=http://localhost:11434/v1
- Icon: house with server inside

Step 5 (Blue card #A8D8EA): ⚡ 快速测试
- 命令: hermes chat -q "9.8和9.11哪个大"
- Icon: lightning bolt with chat bubble

Include a small stick figure character thinking (hand on chin) near Step 2. Add star doodles and underlines for emphasis. Code commands in rounded rectangles. All text in Chinese.""",
})

# ─── Image 3: Day 3 ───
PROMPTS.append({
    "name": "day3-platform",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 3 · 让 AI 走进你的聊天 App"

Layout: 5 steps in a horizontal linear progression, connected by wavy hand-drawn arrows.

Step 1 (Blue card #A8D8EA): 📱 选平台
- Telegram / Discord / 飞书 / Slack
- 推荐 Telegram 先行
- Icon: smartphone with app logos

Step 2 (Mint card #B5E5CF): 🤖 创建 Bot
- Telegram → @BotFather → /newbot → 拿到 Token
- Icon: robot being created in a factory

Step 3 (Lavender card #D5C6E0): ⚙️ 配置 Gateway
- 命令: hermes gateway setup telegram → 粘贴 Token
- Icon: gear with plug/connection

Step 4 (Peach card #FFD5C2): 🚀 启动服务
- 命令: hermes gateway run
- 持久化: hermes gateway install
- Icon: rocket launching

Step 5 (Mint card #B5E5CF): 💬 测试
- 在 App 里给 Bot 发消息，确认回复
- Icon: chat bubble with checkmark

Include a stick figure character chatting on phone at Step 5. Add wavy connection path between steps. Code commands in rounded rectangles. All text in Chinese.""",
})

# ─── Image 4: Day 4 ───
PROMPTS.append({
    "name": "day4-tools",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 4 · 不只是聊天，还能干活"

Layout: A 2×3 bento grid of feature cards on warm cream background, with a central title at top. Connected by doodle lines.

Card 1 (Blue card #A8D8EA): 🌐 Web 搜索
- 问"最新 AI 新闻" → 自动搜索
- Icon: globe with search magnifier

Card 2 (Mint card #B5E5CF): 💻 终端执行
- 让它跑 ls -la ~/.hermes（需审批）
- Icon: terminal/command prompt

Card 3 (Lavender card #D5C6E0): 🌍 浏览器
- 让它打开网页并总结
- Icon: browser window with AI summary

Card 4 (Peach card #FFD5C2): 📁 文件操作
- 读写文件、搜索内容
- Icon: folder with pencil and magnifier

Card 5 (Blue card #A8D8EA): 🔧 工具集
- --toolsets "web,terminal,skills" 可选启用
- Icon: wrench with toggle switches

Card 6 (Mint card #B5E5CF): 🛡️ 安全审批
- 危险命令需确认，/yolo 跳过审批
- Icon: shield with approval checkmark

Include a stick figure character at a desk working happily. Add star and sparkle doodles. All text in Chinese.""",
})

# ─── Image 5: Day 5 ───
PROMPTS.append({
    "name": "day5-skills",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 5 · 给 AI 装上技能包"

Layout: 5 steps in a horizontal linear progression, connected by wavy hand-drawn arrows. Theme: AI character gaining new abilities like a game character.

Step 1 (Blue card #A8D8EA): 📦 浏览技能
- 命令: /skills 或 /skills search weather
- Icon: shopping bag with skill icons

Step 2 (Peach card #FFD5C2): ⬇️ 安装技能
- 命令: /skills install mcp/weather
- Icon: download arrow into a box

Step 3 (Mint card #B5E5CF): ✅ 验证安装
- 命令: /skills list → 对话中触发
- Icon: checklist with green checkmarks

Step 4 (Lavender card #D5C6E0): 🔄 更新同步
- 命令: hermes update 同步新技能到所有 Profile
- Icon: circular refresh with multiple profiles

Step 5 (Blue card #A8D8EA): 🗑️ 管理技能
- 命令: /skills uninstall mcp/weather
- Icon: trash can with organized items

Include a stick figure character progressively getting more "powered up" from left to right (like leveling up in a game). Add sparkle doodles around the title. All text in Chinese.""",
})

# ─── Image 6: Day 6 ───
PROMPTS.append({
    "name": "day6-multiagent",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 6 · 多 Agent 协作 + 定时任务"

Layout: Split into two equal halves (left and right), each with a subtitle and 4 steps flowing top to bottom. Connected by a central dashed vertical divider.

LEFT HALF - "Profile 多 Agent 管理" (Blue/Lavender cards):

Step L1 (Blue card #A8D8EA): 创建 Profile
- 命令: hermes profile create coder
- Icon: plus sign with agent character

Step L2 (Lavender card #D5C6E0): 独立配置
- 命令: coder setup → 独立 config/skills/bot
- Icon: gear with unique identifier

Step L3 (Mint card #B5E5CF): 独立启动
- 命令: coder gateway start（独立进程）
- Icon: rocket with unique color

Step L4 (Peach card #FFD5C2): 统一管理
- 命令: hermes profile list / hermes profile use coder
- Icon: list with selector arrow

RIGHT HALF - "Cron 定时任务" (Peach/Mint cards):

Step R1 (Peach card #FFD5C2): 创建定时任务
- 命令: /cron 或自然语言 "每天早上9点总结新闻"
- Icon: alarm clock with speech bubble

Step R2 (Mint card #B5E5CF): 查看任务
- 命令: hermes cron list
- Icon: calendar with checklist

Step R3 (Blue card #A8D8EA): 自动投递
- 自动发到 Telegram/Discord 等平台
- Icon: paper airplane to multiple platforms

Step R4 (Lavender card #D5C6E0): 管理任务
- 暂停 / 恢复 / 删除
- Icon: pause/play/trash icons

Include multiple small stick figure characters representing different agents. Add star doodles. All text in Chinese.""",
})

# ─── Image 7: Day 7 ───
PROMPTS.append({
    "name": "day7-advanced",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "Day 7 · 成为 Hermes 高手"

Layout: 2×3 grid of feature cards, each with an icon and brief description. Hub-spoke style with title at top center.

Feature 1 (Blue card #A8D8EA): 🖥️ TUI 界面
- 命令: hermes --tui → 现代终端界面
- Icon: terminal with modern UI elements

Feature 2 (Mint card #B5E5CF): 🔍 会话搜索
- 跨所有历史对话 FTS5 全文搜索
- Icon: magnifying glass over chat history

Feature 3 (Lavender card #D5C6E0): 💾 备份恢复
- 命令: hermes backup / hermes import
- Icon: cloud with backup arrow

Feature 4 (Peach card #FFD5C2): 🧠 智能记忆
- 跨 session 积累，越用越懂你
- Icon: brain with memory particles

Feature 5 (Blue card #A8D8EA): 🔄 上下文压缩
- 自动压缩中间轮次，保持连续性
- Icon: compressed spring/layers

Feature 6 (Mint card #B5E5CF): 🐛 诊断排错
- 命令: /debug + hermes doctor
- Icon: stethoscope on terminal

Include a stick figure "ninja master" character representing the advanced user. Add sparkle and star doodles around the title. All text in Chinese.""",
})

# ─── Image 8: Migration Guide ───
PROMPTS.append({
    "name": "day8-migration",
    "prompt": f"""Create a landscape infographic (16:9 ratio) with hand-drawn educational style.

{STYLE_BLOCK}

Title: "OpenClaw → Hermes · 3 步迁移"

Layout: Top section has 3 main steps in horizontal linear progression. Bottom section has a comparison table showing feature differences.

TOP SECTION - "3 步迁移流程":

Step 1 (Blue card #A8D8EA): 📋 迁移前准备
- 备份: cp -r ~/.openclaw ~/.openclaw.bak
- 确认 hermes 版本
- Icon: clipboard with backup symbol

Step 2 (Mint card #B5E5CF): 🚀 一键迁移
- 命令: hermes claw migrate
- 自动导入配置/Token/技能
- Icon: magic wand transforming old to new

Step 3 (Lavender card #D5C6E0): ✅ 迁移后验证
- 命令: hermes doctor 全面检查
- 验证 Bot 回复
- Icon: big checkmark with shield

BOTTOM SECTION - "功能对照表" (comparison table with hand-drawn borders):

| 功能 | OpenClaw | Hermes |
|------|----------|--------|
| Dashboard | ❌ | ✅ |
| Profile 多 Agent | ❌ | ✅ |
| TUI 界面 | ❌ | ✅ |
| Session Search | ❌ | ✅ |
| 备份恢复 | 手动 | ✅ 一键 |

The table should use peach (#FFD5C2) for OpenClaw column headers and mint (#B5E5CF) for Hermes column headers. Use red X marks and green checkmarks. Include a stick figure character happily moving from left (old) to right (new). Add sparkle doodles. All text in Chinese.""",
})


def generate_image(name: str, prompt: str, retries: int = 1) -> dict:
    """Generate a single image, optionally retrying on failure."""
    for attempt in range(retries + 1):
        try:
            print(f"  Generating '{name}' (attempt {attempt + 1})...")
            result_json = image_generate_tool(
                prompt=prompt,
                aspect_ratio="landscape",
            )
            result = json.loads(result_json)
            if result.get("success"):
                url = result.get("image")
                print(f"  ✅ '{name}' → {url}")
                return {"name": name, "url": url, "success": True}
            else:
                error = result.get("error", "unknown")
                print(f"  ❌ '{name}' failed: {error}")
                if attempt < retries:
                    print(f"    Retrying in 5s...")
                    time.sleep(5)
        except Exception as e:
            print(f"  ❌ '{name}' exception: {e}")
            if attempt < retries:
                print(f"    Retrying in 5s...")
                time.sleep(5)
    
    return {"name": name, "url": None, "success": False, "error": str(e)}


def main():
    print(f"🎨 Generating {len(PROMPTS)} Hermes101 infographics...")
    print(f"   Output: /root/projects/hermes101-site/infographic/urls.txt")
    print()
    
    results = []
    for i, item in enumerate(PROMPTS):
        print(f"[{i+1}/{len(PROMPTS)}] {item['name']}")
        result = generate_image(item["name"], item["prompt"], retries=1)
        results.append(result)
        # Brief pause between requests
        if i < len(PROMPTS) - 1:
            time.sleep(2)
    
    # Write URLs file
    output_dir = "/root/projects/hermes101-site/infographic"
    os.makedirs(output_dir, exist_ok=True)
    
    with open(os.path.join(output_dir, "urls.txt"), "w") as f:
        for r in results:
            status = "✅" if r["success"] else "❌"
            url = r.get("url", "FAILED")
            f.write(f"{status} {r['name']}: {url}\n")
    
    # Summary
    success_count = sum(1 for r in results if r["success"])
    print()
    print(f"{'='*60}")
    print(f"Done! {success_count}/{len(results)} images generated successfully.")
    print(f"URLs saved to: {output_dir}/urls.txt")
    print()
    for r in results:
        status = "✅" if r["success"] else "❌"
        print(f"  {status} {r['name']}: {r.get('url', 'FAILED')}")


if __name__ == "__main__":
    main()
