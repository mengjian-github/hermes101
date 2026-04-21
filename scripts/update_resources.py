#!/usr/bin/env python3
"""
hermes101 资源页每日更新脚本
- 搜索全网新增 Hermes Agent 教程
- 与现有资源比对去重
- 如有新资源，更新 resources.astro 并重新构建部署
"""
import json, re, os, sys
from datetime import datetime

SITE_DIR = "/mnt/HC_Volume_105300089/projects/hermes101-site"
RESOURCES_PAGE = f"{SITE_DIR}/src/pages/resources.astro"

def get_existing_titles():
    """从 resources.astro 提取已收录的标题"""
    with open(RESOURCES_PAGE, 'r') as f:
        content = f.read()
    titles = re.findall(r'title:\s*"([^"]+)"', content)
    return set(t.lower() for t in titles)

def search_new_resources():
    """通过 web_search 搜索新资源（由 hermes_tools 调用）"""
    try:
        from hermes_tools import web_search
    except ImportError:
        print("SKIP: hermes_tools not available in this context")
        return []

    queries = [
        "hermes agent tutorial 2026",
        "hermes agent guide new",
        "hermes agent 中文教程",
        "hermes agent youtube tutorial",
        "hermes agent skills MCP advanced",
    ]

    all_results = []
    seen_urls = set()
    for q in queries:
        try:
            res = web_search(q, limit=5)
            for item in res.get("data", {}).get("web", []):
                url = item.get("url", "")
                if url in seen_urls or "github.com/mengjian-github/hermes101" in url:
                    continue
                seen_urls.add(url)
                all_results.append({
                    "url": url,
                    "title": item.get("title", ""),
                    "desc": item.get("description", ""),
                })
        except Exception as e:
            print(f"Search error for '{q}': {e}")
    return all_results

def filter_new(existing_titles, results):
    """过滤出真正的新资源"""
    new = []
    for r in results:
        title_lower = r["title"].lower()
        # 简单去重：标题关键词匹配
        is_dup = any(t in title_lower for t in existing_titles if len(t) > 10)
        if not is_dup and title_lower not in existing_titles:
            new.append(r)
    return new

def main():
    existing = get_existing_titles()
    print(f"Existing titles: {len(existing)}")

    results = search_new_resources()
    print(f"Search results: {len(results)}")

    new = filter_new(existing, results)
    print(f"New resources found: {len(new)}")

    if new:
        for r in new[:10]:
            print(f"  NEW: {r['title']}")
            print(f"       {r['url']}")
        print(f"\nACTION_REQUIRED: {len(new)} new resources found. Manual review recommended before adding.")
    else:
        print("No new resources found. Page is up to date.")

    # 输出 JSON 供 cron 任务使用
    output = {
        "date": datetime.now().isoformat(),
        "existing_count": len(existing),
        "search_results": len(results),
        "new_count": len(new),
        "new_resources": new[:10],
    }
    print(f"\n---JSON---")
    print(json.dumps(output, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
