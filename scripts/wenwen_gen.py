#!/usr/bin/env python3
"""Generate Day 2-7 tutorial images via wenwen-ai (Gemini 3.1 Flash Image)."""

import requests
import json
import base64
import os
import re
import time
import sys

API_URL = "https://breakout.wenwen-ai.com/v1/chat/completions"
API_KEY = os.environ.get("WENWEN_API_KEY", "")
OUTPUT_DIR = "/root/hermes101-site/public/images/7days"

PROMPTS = {
    2: {
        "title": "Day 2 · 配置模型与 API Key",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: linear progression showing 4 connected steps from left to right.\n\n"
            "Title at top in bold mint green: 'Day 2 · 配置模型与 API Key'\n\n"
            "Step 1: 打开配置文件 (icon: a file with a gear) - Open config file\n"
            "Step 2: 选择模型提供商 (icon: multiple cloud logos) - Choose model provider\n"
            "Step 3: 填入 API Key (icon: a key entering a padlock) - Enter API Key\n"
            "Step 4: 测试连接 (icon: green checkmark with sparkles) - Test connection\n\n"
            "Each step has a numbered circle connected by a flowing dotted line. "
            "Chinese text labels. Clean, modern, educational feel. No photorealism, keep it flat illustration style."
        ),
    },
    3: {
        "title": "Day 3 · 连接消息平台",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: linear progression showing 4 connected steps from left to right.\n\n"
            "Title at top in bold mint green: 'Day 3 · 连接消息平台机器人'\n\n"
            "Step 1: 创建 Bot (icon: robot head with a plus sign) - Create bot on platform\n"
            "Step 2: 获取 Token (icon: key with platform logo) - Get bot token\n"
            "Step 3: 配置接入 (icon: puzzle pieces connecting) - Configure connection\n"
            "Step 4: 发送消息测试 (icon: speech bubble with checkmark) - Test messaging\n\n"
            "Show small logos of Telegram, Discord, Slack below the steps. "
            "Each step has a numbered circle connected by a flowing dotted line. "
            "Chinese text labels. Clean, modern, educational feel."
        ),
    },
    4: {
        "title": "Day 4 · 调用内置工具",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: bento grid showing 4 tool categories.\n\n"
            "Title at top in bold mint green: 'Day 4 · 调用内置工具'\n\n"
            "Grid of 4 cards:\n"
            "1. 🔍 搜索与提取 (Web Search) - icon: magnifying glass over webpage\n"
            "2. 💻 终端命令 (Terminal) - icon: terminal prompt with cursor\n"
            "3. 🌐 浏览器自动化 (Browser) - icon: browser window with cursor\n"
            "4. 📁 文件操作 (File Ops) - icon: folder with edit pen\n\n"
            "Each card has a subtle border in mint green. "
            "Chinese text labels. Clean, modern, educational feel."
        ),
    },
    5: {
        "title": "Day 5 · 安装并使用技能",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: linear progression showing 3 connected steps from left to right.\n\n"
            "Title at top in bold mint green: 'Day 5 · 安装并使用技能'\n\n"
            "Step 1: 浏览技能库 (icon: storefront with skill cards) - Browse skill library\n"
            "Step 2: 一键安装 (icon: download arrow into toolbox) - One-click install\n"
            "Step 3: 在对话中调用 (icon: chat bubble with skill icon inside) - Use in conversation\n\n"
            "Below steps, show a skill card example with: name, description, and a 'Install' button. "
            "Each step has a numbered circle connected by a flowing dotted line. "
            "Chinese text labels. Clean, modern, educational feel."
        ),
    },
    6: {
        "title": "Day 6 · 记忆、会话与备份",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: bento grid showing 3 feature areas.\n\n"
            "Title at top in bold mint green: 'Day 6 · 记忆、会话与备份'\n\n"
            "3 feature cards:\n"
            "1. 🧠 持久记忆 (Memory) - icon: brain with data streams - Agent remembers across sessions\n"
            "2. 💬 会话管理 (Sessions) - icon: chat windows stacked - Resume and search past conversations\n"
            "3. 💾 备份恢复 (Backup) - icon: cloud with download arrow - Export and restore agent state\n\n"
            "Each card has a subtle border in mint green. "
            "Chinese text labels. Clean, modern, educational feel."
        ),
    },
    7: {
        "title": "Day 7 · 自动化、诊断与迁移",
        "prompt": (
            "Generate an infographic illustration. Style: hand-drawn paper-craft aesthetic, "
            "warm dark theme with #0A0A0F background and #18E299 mint green accent color. "
            "Layout: linear progression showing 3 connected steps from left to right, with a bonus section.\n\n"
            "Title at top in bold mint green: 'Day 7 · 自动化、诊断与迁移'\n\n"
            "Step 1: ⏰ 定时任务 (icon: clock with gear) - Cron jobs & automation\n"
            "Step 2: 🔧 诊断排错 (icon: wrench over magnifying glass) - Diagnose issues\n"
            "Step 3: 🚀 从 OpenClaw 迁移 (icon: rocket with migration arrow) - Migrate from OpenClaw\n\n"
            "Bottom banner: '🎓 恭喜完成 7 天入门！' with confetti/sparkles. "
            "Each step has a numbered circle connected by a flowing dotted line. "
            "Chinese text labels. Clean, modern, educational feel."
        ),
    },
}


def generate_image(day: int) -> str | None:
    """Generate image for a given day, save to OUTPUT_DIR, return file path."""
    info = PROMPTS[day]
    print(f"[Day {day}] Generating: {info['title']}")

    payload = {
        "model": "gemini-3.1-flash-image-preview",
        "messages": [{"role": "user", "content": info["prompt"]}],
        "max_tokens": 8192,
    }
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    try:
        resp = requests.post(API_URL, headers=headers, json=payload, timeout=300)
        resp.raise_for_status()
        data = resp.json()
    except Exception as e:
        print(f"[Day {day}] API error: {e}")
        return None

    # Extract base64 image from response
    content = ""
    choices = data.get("choices", [])
    if choices:
        content = choices[0].get("message", {}).get("content", "")

    # Find base64 image data
    match = re.search(r'data:image/(png|jpeg|webp);base64,([A-Za-z0-9+/=]+)', content)
    if not match:
        # Try raw base64 in content
        match2 = re.search(r'([A-Za-z0-9+/=]{1000,})', content)
        if match2:
            b64 = match2.group(1)
            fmt = "png"
        else:
            print(f"[Day {day}] No image found in response")
            print(f"Content preview: {content[:500]}")
            return None
    else:
        fmt = match.group(1)
        b64 = match.group(2)

    # Save
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, f"day{day}.{fmt}")
    with open(out_path, "wb") as f:
        f.write(base64.b64decode(b64))

    size_kb = os.path.getsize(out_path) / 1024
    print(f"[Day {day}] Saved: {out_path} ({size_kb:.0f} KB)")
    return out_path


if __name__ == "__main__":
    days = [int(d) for d in sys.argv[1:]] if len(sys.argv) > 1 else [2, 3, 4, 5, 6, 7]
    results = {}
    for day in days:
        path = generate_image(day)
        results[day] = path
        if day != days[-1]:
            print("Waiting 5s...")
            time.sleep(5)

    print("\n=== Results ===")
    for day, path in results.items():
        print(f"  Day {day}: {'✅ ' + path if path else '❌ FAILED'}")
