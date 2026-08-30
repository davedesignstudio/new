#!/usr/bin/env python3
"""A/B health + brand-signal checks for Philhower & Okrogly site."""
from __future__ import annotations
import json, re, time, urllib.request, urllib.error
from datetime import datetime, timezone
from pathlib import Path

BASE = "http://127.0.0.1:8765"
OUT = Path("/workspace/public/ab/results.json")
LOGDIR = Path("/tmp/ab-test")
LOGDIR.mkdir(parents=True, exist_ok=True)
ART = Path("/opt/cursor/artifacts/ab-test-results.json")

PAGES = [
    ("home", "/ab/a/home.html", "/ab/b/home.html"),
    ("library", "/ab/a/library.html", "/ab/b/library.html"),
    ("work", "/ab/a/work.html", "/ab/b/work.html"),
    ("about", "/ab/a/about.html", "/ab/b/about.html"),
]
LIVE = ["/", "/library/", "/work/", "/history-100/", "/history-100/process/", "/brands-500/", "/brands-500/process/", "/contact/", "/img/identity-kits/gilt-tap/logo.png"]

def fetch(path: str):
    url = BASE + path
    try:
        with urllib.request.urlopen(url, timeout=20) as r:
            body = r.read()
            return r.status, body, dict(r.headers)
    except Exception as e:
        return 0, str(e).encode(), {}

def brand_score(html: str, variant: str):
    text = html
    checks = {}
    if variant == "A":
        checks["has_legacy_brand"] = "D Philhower Studio" in text
        checks["no_okrogly"] = "Okrogly" not in text
        checks["no_sth"] = "Service The Hills" not in text
    else:
        checks["has_okrogly"] = ("Philhower and Okrogly" in text) or ("Philhower &amp; Okrogly" in text) or ("Philhower & Okrogly" in text)
        checks["has_design_build"] = ("Design and Build" in text) or ("design and build" in text.lower())
        checks["no_legacy_studio"] = "D Philhower Studio" not in text
        checks["no_sth"] = "Service The Hills" not in text and "STH text" not in text
    checks["has_nav_library"] = 'href="/library/"' in text or "Library" in text
    score = sum(1 for v in checks.values() if v) / max(len(checks), 1)
    return score, checks

def run_once(round_id: int):
    started = datetime.now(timezone.utc).isoformat()
    page_results = []
    for key, a, b in PAGES:
        sa, ba, _ = fetch(a)
        sb, bb, _ = fetch(b)
        ta = ba.decode("utf-8", "ignore") if sa == 200 else ""
        tb = bb.decode("utf-8", "ignore") if sb == 200 else ""
        score_a, checks_a = brand_score(ta, "A") if sa == 200 else (0.0, {"http": sa})
        score_b, checks_b = brand_score(tb, "B") if sb == 200 else (0.0, {"http": sb})
        page_results.append({
            "page": key,
            "a": {"http": sa, "score": round(score_a, 3), "checks": checks_a},
            "b": {"http": sb, "score": round(score_b, 3), "checks": checks_b},
            "winner": "B" if score_b >= score_a else "A",
        })
    live = []
    for path in LIVE:
        code, body, _ = fetch(path)
        item = {"path": path, "http": code, "bytes": len(body) if code == 200 else 0}
        if code == 200 and path.endswith(".html") or path.endswith("/"):
            t = body.decode("utf-8", "ignore")
            item["sth_leak"] = ("Service The Hills" in t)
            item["okrogly"] = ("Okrogly" in t)
            item["legacy"] = ("D Philhower Studio" in t)
        live.append(item)
    # Aggregate
    a_avg = sum(p["a"]["score"] for p in page_results) / len(page_results)
    b_avg = sum(p["b"]["score"] for p in page_results) / len(page_results)
    live_ok = sum(1 for x in live if x["http"] == 200)
    sth_leaks = [x["path"] for x in live if x.get("sth_leak")]
    legacy_on_live = [x["path"] for x in live if x.get("legacy")]
    result = {
        "round": round_id,
        "started": started,
        "finished": datetime.now(timezone.utc).isoformat(),
        "summary": {
            "variant_a_avg_score": round(a_avg, 3),
            "variant_b_avg_score": round(b_avg, 3),
            "preferred": "B" if b_avg >= a_avg else "A",
            "live_routes_ok": f"{live_ok}/{len(live)}",
            "sth_leaks_on_live": sth_leaks,
            "legacy_brand_on_live": legacy_on_live,
        },
        "pages": page_results,
        "live": live,
    }
    return result

def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--round", type=int, default=1)
    args = ap.parse_args()
    result = run_once(args.round)
    # merge history
    history = []
    if OUT.exists():
        try:
            prev = json.loads(OUT.read_text())
            history = prev.get("history", [])
        except Exception:
            history = []
    history.append(result)
    payload = {"session": "ab-45min", "latest": result, "history": history[-12:]}
    OUT.write_text(json.dumps(payload, indent=2))
    ART.write_text(json.dumps(payload, indent=2))
    (LOGDIR / f"round-{args.round}.json").write_text(json.dumps(result, indent=2))
    print(json.dumps(result["summary"], indent=2))

if __name__ == "__main__":
    main()
