#!/usr/bin/env python3
"""Download a unique Wikimedia Commons photo for every Bville menu item."""

from __future__ import annotations

import json
import time
import urllib.parse
import urllib.request
from io import BytesIO
from pathlib import Path

from PIL import Image, ImageOps

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "assets" / "photos" / "menu"
CREDITS_PATH = OUT_DIR / "CREDITS.json"
UA = "BvillePizzaGrill/1.0 (https://github.com/davedesignstudio/new; menu photography)"
API = "https://commons.wikimedia.org/w/api.php"

# Local restaurant photos already on disk — prefer these when they match the dish.
LOCAL = ROOT / "public" / "assets" / "photos"

# slug, preferred Commons filenames, search queries
ITEMS = [
    # Garden
    {"slug": "garden-house", "local": "salad.jpg", "files": ["Garden salad.jpg", "Green salad.jpg"], "q": ["garden salad bowl", "mixed green salad tomatoes cucumber"]},
    {"slug": "garden-greek", "files": ["Greek salad.jpg", "Horiatiki.jpg"], "q": ["Greek salad feta olives", "horiatiki salad"]},
    {"slug": "garden-caesar", "files": ["Caesar salad.jpg", "Chicken caesar salad.jpg"], "q": ["Caesar salad croutons parmesan"]},
    {"slug": "garden-spinach", "files": ["Spinach salad.jpg", "Strawberry spinach salad.jpg"], "q": ["spinach strawberry salad goat cheese", "baby spinach salad"]},
    {"slug": "garden-arugula", "files": ["Arugula salad.jpg", "Rocket salad.jpg"], "q": ["arugula salad parmesan", "rocket salad roasted peppers"]},
    {"slug": "garden-cobb", "files": ["Cobb salad.jpg"], "q": ["Cobb salad bacon avocado egg", "cobb salad"]},
    {"slug": "garden-mixed-greens", "files": ["Caprese salad.jpg", "Insalata caprese.jpg"], "q": ["mixed greens fresh mozzarella salad", "green salad mozzarella tomato"]},
    # Starters
    {"slug": "starters-wings", "files": ["Buffalo wings.jpg", "Chicken wings.jpg"], "q": ["buffalo chicken wings", "fried chicken wings"]},
    {"slug": "starters-mozzarella-sticks", "files": ["Mozzarella sticks.jpg", "Fried mozzarella.jpg"], "q": ["mozzarella sticks marinara", "fried mozzarella sticks"]},
    {"slug": "starters-fried-calamari", "files": ["Fried calamari.jpg", "Calamari fritti.jpg"], "q": ["fried calamari", "calamari fritti"]},
    {"slug": "starters-mac-bites", "files": ["Macaroni and cheese.jpg"], "q": ["fried mac and cheese bites", "macaroni cheese balls"]},
    {"slug": "starters-hummus", "files": ["Hummus.jpg", "Hummus from The Nile.jpg"], "q": ["hummus tahini pita", "bowl of hummus"]},
    {"slug": "starters-falafel", "files": ["Falafel.jpg", "Falafel balls.jpg"], "q": ["falafel balls tahini", "fried falafel"]},
    {"slug": "starters-dumplings", "files": ["Gyoza by stu spivack.jpg", "Gyoza.jpg"], "q": ["fried dumplings gyoza", "chicken dumplings"]},
    {"slug": "starters-buffalo-mac", "files": ["Buffalo chicken mac and cheese.jpg"], "q": ["buffalo chicken mac and cheese", "macaroni cheese chicken"]},
    {"slug": "starters-nuggets", "files": ["Chicken nuggets.jpg"], "q": ["chicken nuggets fries", "chicken nuggets"]},
    {"slug": "starters-tenders", "files": ["Chicken tenders.jpg", "Chicken fingers.jpg"], "q": ["chicken tenders fries", "fried chicken tenders"]},
    {"slug": "starters-rice", "files": ["Steamed rice.jpg", "White rice.jpg"], "q": ["bowl steamed white rice", "cooked rice bowl"]},
    {"slug": "starters-sweet-potato-fries", "files": ["Sweet potato fries.jpg"], "q": ["sweet potato fries", "baked sweet potato fries"]},
    {"slug": "starters-french-fries", "files": ["French fries.jpg", "Frites.jpg"], "q": ["french fries", "crispy french fries"]},
    {"slug": "starters-disco-fries", "files": ["Cheese fries.jpg", "Disco fries.jpg"], "q": ["disco fries gravy cheese", "cheese fries"]},
    {"slug": "starters-onion-rings", "files": ["Onion rings.jpg"], "q": ["onion rings fried", "beer battered onion rings"]},
    {"slug": "starters-sauteed-veggie", "files": ["Grilled vegetables.jpg", "Ratatouille.jpg"], "q": ["sauteed vegetables", "grilled mixed vegetables"]},
    # Shakes
    {"slug": "shakes-milkshake", "local": "cafe-dining.jpg", "files": ["Chocolate milkshake.jpg", "Milkshake.jpg"], "q": ["chocolate milkshake", "strawberry milkshake"]},
    # Burgers
    {"slug": "burgers-classic", "local": "burger.jpg", "files": ["Hamburger.jpg"], "q": ["hamburger lettuce tomato onion", "classic burger"]},
    {"slug": "burgers-cheese-deluxe", "files": ["Cheeseburger.jpg"], "q": ["cheeseburger lettuce tomato", "american cheeseburger"]},
    {"slug": "burgers-the-fry", "files": ["Fried chicken sandwich.jpg"], "q": ["fried chicken sandwich pickles", "breaded chicken sandwich"]},
    {"slug": "burgers-boom-boom", "files": ["Lettuce wrapped burger.jpg"], "q": ["lettuce wrap burger avocado bacon", "protein style burger"]},
    {"slug": "burgers-chetzel", "files": ["Pretzel bun burger.jpg"], "q": ["pretzel bun burger bacon cheddar", "pretzel cheeseburger"]},
    {"slug": "burgers-shroom", "files": ["Mushroom swiss burger.jpg"], "q": ["mushroom swiss burger", "burger sauteed mushrooms"]},
    {"slug": "burgers-falafel", "files": ["Falafel burger.jpg", "Falafel sandwich.jpg"], "q": ["falafel burger", "falafel sandwich pita"]},
    # Wraps
    {"slug": "wraps-chicken-caesar", "local": "wraps.jpg", "files": ["Chicken caesar wrap.jpg"], "q": ["chicken caesar wrap", "grilled chicken wrap caesar"]},
    {"slug": "wraps-buffalo-chicken", "files": ["Buffalo chicken wrap.jpg"], "q": ["buffalo chicken wrap", "buffalo chicken tortilla wrap"]},
    {"slug": "wraps-gyro", "files": ["Gyros.jpg", "Gyro.jpg"], "q": ["gyro pita tzatziki", "lamb gyro wrap"]},
    {"slug": "wraps-shawarma", "files": ["Chicken shawarma.jpg", "Shawarma.jpg"], "q": ["chicken shawarma wrap", "shawarma pita garlic sauce"]},
    {"slug": "wraps-falafel", "files": ["Falafel wrap.jpg", "Falafel in pita.jpg"], "q": ["falafel wrap hummus pita", "falafel pita wrap"]},
    {"slug": "wraps-kebab", "files": ["Shish taouk.jpg"], "q": ["chicken kebab wrap pita", "shish taouk wrap"]},
    {"slug": "wraps-milanese", "files": ["Chicken milanese.jpg"], "q": ["chicken milanese sandwich", "breaded chicken arugula wrap"]},
    {"slug": "wraps-honey-chicken", "files": ["Chicken bacon wrap.jpg"], "q": ["chicken bacon wrap honey mustard", "grilled chicken bacon wrap"]},
    # Pasta
    {"slug": "pasta-penne-vodka", "files": ["Penne alla vodka.jpg"], "q": ["penne alla vodka", "penne pink vodka sauce"]},
    {"slug": "pasta-bolognese", "files": ["Spaghetti bolognese.jpg", "Tagliatelle al ragu.jpg"], "q": ["pasta bolognese", "spaghetti bolognese"]},
    {"slug": "pasta-marinara", "files": ["Penne pomodoro.jpg", "Pasta marinara.jpg"], "q": ["penne marinara", "penne pomodoro"]},
    {"slug": "pasta-cajun-alfredo", "files": ["Fettuccine alfredo.jpg", "Cajun pasta.jpg"], "q": ["cajun alfredo pasta", "fettuccine alfredo bacon"]},
    {"slug": "pasta-tortellini-leo", "files": ["Tortellini.jpg", "Cheese tortellini.jpg"], "q": ["cheese tortellini cream sauce", "tricolor tortellini"]},
    # Cheesesteak
    {"slug": "cheesesteak-philly", "files": ["Cheesesteak.jpg", "Philly cheesesteak.jpg"], "q": ["philly cheesesteak", "cheesesteak onions peppers"]},
    {"slug": "cheesesteak-jersey", "files": ["Cheesesteak sandwich.jpg"], "q": ["cheesesteak mozzarella gravy", "philly cheesesteak cheese wiz"]},
    {"slug": "cheesesteak-california", "files": ["Steak sandwich.jpg"], "q": ["cheesesteak lettuce tomato", "california cheesesteak"]},
    {"slug": "cheesesteak-chicken", "files": ["Chicken cheesesteak.jpg"], "q": ["chicken cheesesteak", "chicken philly sandwich"]},
    # Sandwiches
    {"slug": "sandwiches-chicken-parm", "files": ["Chicken parmesan sandwich.jpg", "Chicken parmigiana.jpg"], "q": ["chicken parmesan sandwich", "chicken parm sub"]},
    {"slug": "sandwiches-meatball-parm", "files": ["Meatball sub.jpg", "Meatball sandwich.jpg"], "q": ["meatball parmesan sandwich", "meatball sub"]},
    {"slug": "sandwiches-fried-chicken", "files": ["Nashville hot chicken sandwich.jpg"], "q": ["buttermilk fried chicken sandwich", "crispy chicken sandwich lettuce tomato"]},
    {"slug": "sandwiches-grilled-chicken", "local": "sandwich.jpg", "files": ["Grilled chicken sandwich.jpg"], "q": ["grilled chicken sandwich lettuce tomato", "grilled chicken mayo sandwich"]},
    {"slug": "sandwiches-reuben", "files": ["Reuben sandwich.jpg"], "q": ["pastrami reuben sandwich", "reuben sandwich rye"]},
    {"slug": "sandwiches-buffalo-chicken", "files": ["Buffalo chicken sandwich.jpg"], "q": ["buffalo chicken sandwich blue cheese", "buffalo chicken sandwich"]},
    {"slug": "sandwiches-italian-hot-dog", "files": ["Italian hot dog.jpg", "Hot dog.jpg"], "q": ["italian hot dog peppers potatoes", "hot dog peppers onions"]},
    {"slug": "sandwiches-hot-pastrami", "files": ["Pastrami sandwich.jpg", "Pastrami on rye.jpg"], "q": ["hot pastrami sandwich rye", "pastrami swiss mustard"]},
    {"slug": "sandwiches-tuna-melt", "files": ["Tuna melt.jpg", "Tuna sandwich.jpg"], "q": ["tuna melt sandwich", "tuna melt toast cheese"]},
    {"slug": "sandwiches-turkey-club", "files": ["Club sandwich.jpg", "Turkey club.jpg"], "q": ["turkey club sandwich bacon", "club sandwich toast"]},
    # Panini
    {"slug": "panini-chipotle-chicken", "files": ["Chicken avocado panini.jpg"], "q": ["chipotle chicken panini avocado", "chicken avocado panini"]},
    {"slug": "panini-chicken", "local": "panini.jpg", "files": ["Chicken panini.jpg", "Panini.jpg"], "q": ["grilled chicken panini mozzarella", "chicken roasted pepper panini"]},
    {"slug": "panini-veggie", "files": ["Vegetable panini.jpg", "Eggplant panini.jpg"], "q": ["vegetable panini eggplant mozzarella", "veggie panini roasted peppers"]},
    {"slug": "panini-milano", "files": ["Pesto chicken panini.jpg", "Pesto panini.jpg"], "q": ["pesto chicken panini mozzarella", "chicken pesto panini"]},
    {"slug": "panini-turkey", "files": ["Turkey panini.jpg"], "q": ["turkey panini mozzarella roasted peppers", "turkey panini"]},
    # Pizza
    {"slug": "pizza-classic", "local": "pizza.jpg", "files": ["Cheese pizza.jpg"], "q": ["cheese pizza mozzarella"]},
    {"slug": "pizza-margherita", "files": ["Margherita Originale.JPG", "Pizza Margherita 01.jpg"], "q": ["neapolitan margherita pizza basil mozzarella"]},
    {"slug": "pizza-meat-lovers", "files": ["Pizza (meat deluxe).jpg", "Pepperoni Salami & Sausage Bacon Pizza (15864752153).jpg"], "q": ["meat deluxe pizza pepperoni sausage"]},
    {"slug": "pizza-white-pie", "files": ["White Pizza (No Sauce) - Large 8 slices. Mozzarella, ricotta, grated pecorino Romano cheese, garlic infused oil, oregano, black pepper & basil.jpg"], "q": ["white pizza ricotta mozzarella"]},
    {"slug": "pizza-chicken-parm", "files": ['"Marry Me" Chicken - PizzaExpress, Stanford Cottage, Worthing 2026-06-16.jpg'], "q": ["chicken tomato mozzarella pizza"]},
    {"slug": "pizza-bbq-buffalo", "files": ["BBQ CHICKEN PIZZA.jpg"], "q": ["BBQ chicken pizza drizzle"]},
    {"slug": "pizza-veggie", "files": ["Vegetarian pizza platter.jpg"], "q": ["vegetarian pizza olives mushrooms peppers onions"]},
    {"slug": "pizza-philly", "files": ["Papa John's Philly Cheesesteak Pizza Slice (15891055528).jpg"], "q": ["philly cheesesteak pizza steak peppers"]},
    {"slug": "pizza-bville-special", "files": ["Round Table chicken & garlic pizza.JPG"], "q": ["chicken garlic pizza tomato onion"]},
    {"slug": "pizza-thai-chili", "files": ["Kotipizza Pollo Americana.jpg"], "q": ["spicy chicken pizza orange sauce"]},
    {"slug": "pizza-don-pomodoro", "files": ["Pizza with tomatoes.jpg"], "q": ["fresh tomato basil pizza mozzarella"]},
    {"slug": "pizza-combination", "files": ["Pizza with sausage, onion, pepperoni, olives and cheeses.jpg"], "q": ["pepperoni sausage onion pepper pizza"]},
    # Platters
    {"slug": "platters-shrimp-kababs", "files": ["Grilled shrimp skewers.jpg", "Shrimp kebab.jpg"], "q": ["grilled shrimp kabab skewer", "shrimp kebab"]},
    {"slug": "platters-salmon", "files": ["Grilled salmon.jpg", "Salmon fillet.jpg"], "q": ["grilled salmon fillet", "norwegian salmon grilled"]},
    {"slug": "platters-gyro", "files": ["Gyro platter.jpg", "Gyros plate.jpg"], "q": ["gyro platter rice salad tzatziki", "lamb gyro plate"]},
    {"slug": "platters-falafel", "files": ["Falafel platter.jpg", "Falafel plate.jpg"], "q": ["falafel platter rice hummus", "falafel plate tahini"]},
    {"slug": "platters-chicken-kabab", "local": "handhelds.jpg", "files": ["Chicken kebab.jpg", "Shish kebab.jpg"], "q": ["chicken kabab platter rice", "chicken shish kebab"]},
    {"slug": "platters-chicken-gyro", "files": ["Chicken gyro.jpg"], "q": ["chicken gyro platter", "chicken gyro rice salad"]},
    {"slug": "platters-shawarma", "files": ["Chicken shawarma plate.jpg", "Shawarma plate.jpg"], "q": ["chicken shawarma platter rice", "shawarma plate garlic sauce"]},
    {"slug": "platters-chicken-parm", "files": ["Chicken parmigiana.jpg", "Chicken parmesan.jpg"], "q": ["chicken parmesan pasta marinara", "chicken parmigiana mozzarella"]},
    {"slug": "platters-quesadilla", "files": ["Chicken quesadilla.jpg", "Quesadilla.jpg"], "q": ["chicken quesadilla peppers onions", "quesadilla chicken"]},
    {"slug": "platters-sausage-peppers", "files": ["Sausage and peppers.jpg", "Italian sausage peppers.jpg"], "q": ["sausage peppers onions parmesan", "italian sausage and peppers"]},
    {"slug": "platters-eggplant-parm", "files": ["Eggplant parmesan.jpg", "Melanzane alla parmigiana.jpg"], "q": ["eggplant parmesan", "melanzane alla parmigiana"]},
    # Kids
    {"slug": "kids-grilled-cheese", "files": ["Grilled cheese.jpg", "Grilled cheese sandwich.jpg"], "q": ["grilled cheese sandwich", "grilled cheese fries"]},
    {"slug": "kids-tenders", "files": ["Chicken fingers with fries.jpg"], "q": ["kids chicken tenders fries", "chicken strips fries"]},
    {"slug": "kids-hot-dog", "files": ["Hot dog with fries.jpg", "Corn dog.jpg"], "q": ["hot dog fries", "hot dog bun"]},
    {"slug": "kids-mac-cheese", "files": ["Kraft Dinner.jpg", "Macaroni cheese.jpg"], "q": ["bowl macaroni and cheese", "creamy mac and cheese"]},
    {"slug": "kids-pasta", "files": ["Butter noodles.jpg", "Pasta with butter.jpg"], "q": ["buttered noodles kids", "penne marinara kids pasta"]},
]

# Desserts already have dedicated PNGs — copy/link mapping only.
DESSERTS = {
    "desserts-yogurt-berries": "gelato-yogurt-berries.png",
    "desserts-creme-brulee": "gelato-creme-brulee.png",
    "desserts-mascarpone": "gelato-mascarpone.png",
    "desserts-limoncello": "gelato-limoncello.png",
    "desserts-hazelnut": "gelato-hazelnut.png",
    "desserts-spagnola": "gelato-spagnola.png",
    "desserts-stracciatella": "gelato-stracciatella.png",
    "desserts-pistachio": "gelato-pistachio.png",
    "desserts-guava": "gelato-guava.png",
    "desserts-cafe": "gelato-cafe.png",
    "desserts-catalana": "gelato-espresso.png",
}


def api(params: dict) -> dict:
    params = {**params, "format": "json"}
    url = API + "?" + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as resp:
        return json.loads(resp.read().decode("utf-8"))


def file_info(title: str) -> dict | None:
    if not title.lower().startswith("file:"):
        title = "File:" + title
    data = api(
        {
            "action": "query",
            "titles": title,
            "prop": "imageinfo",
            "iiprop": "url|mime|size|extmetadata",
            "iiurlwidth": "1280",
        }
    )
    pages = data.get("query", {}).get("pages", {})
    for page in pages.values():
        if page.get("missing") or int(page.get("pageid", 0)) < 0:
            return None
        infos = page.get("imageinfo") or []
        if not infos:
            return None
        info = infos[0]
        mime = (info.get("mime") or "").lower()
        if not mime.startswith("image/") or mime in {"image/svg+xml", "image/gif"}:
            return None
        meta = info.get("extmetadata") or {}
        return {
            "title": page.get("title") or title,
            "url": info.get("thumburl") or info.get("url"),
            "page_url": info.get("descriptionurl"),
            "mime": mime,
            "artist": (meta.get("Artist") or {}).get("value") or "",
            "license": (meta.get("LicenseShortName") or {}).get("value") or "",
            "credit": (meta.get("Credit") or {}).get("value") or "",
        }
    return None


def search_files(query: str, limit: int = 12) -> list[str]:
    data = api(
        {
            "action": "query",
            "list": "search",
            "srsearch": f"{query} filetype:bitmap",
            "srnamespace": "6",
            "srlimit": str(limit),
        }
    )
    return [hit["title"] for hit in data.get("query", {}).get("search", [])]


def download(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def save_jpeg(raw: bytes, dest: Path) -> None:
    img = Image.open(BytesIO(raw))
    img = ImageOps.exif_transpose(img)
    img = img.convert("RGB")
    w, h = img.size
    target_ratio = 4 / 3
    ratio = w / h if h else target_ratio
    if ratio > target_ratio:
        new_w = int(h * target_ratio)
        left = (w - new_w) // 2
        img = img.crop((left, 0, left + new_w, h))
    elif ratio < target_ratio:
        new_h = int(w / target_ratio)
        top = (h - new_h) // 2
        img = img.crop((0, top, w, top + new_h))
    img.thumbnail((960, 720), Image.Resampling.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=84, optimize=True)


def copy_local(src_name: str, dest: Path) -> bool:
    src = LOCAL / src_name
    if not src.is_file():
        return False
    raw = src.read_bytes()
    try:
        save_jpeg(raw, dest)
        return True
    except Exception:
        dest.write_bytes(raw)
        return True


def resolve_item(item: dict, used: set[str]) -> dict | None:
    dest = OUT_DIR / f"{item['slug']}.jpg"
    if dest.is_file() and dest.stat().st_size > 4000:
        return {"slug": item["slug"], "source": "cached", "file": dest.name}

    local_name = item.get("local")
    if local_name and copy_local(local_name, dest):
        used.add("local:" + local_name)
        return {
            "slug": item["slug"],
            "source": "local",
            "title": local_name,
            "license": "Restaurant photo",
            "page_url": "",
            "artist": "Bville Pizza & Grill",
        }

    candidates: list[str] = []
    for name in item.get("files") or []:
        candidates.append("File:" + name if not name.lower().startswith("file:") else name)
    for query in item.get("q") or []:
        try:
            candidates.extend(search_files(query))
            time.sleep(0.15)
        except Exception as exc:
            print(f"  search fail {item['slug']} {query!r}: {exc}")

    seen = set()
    for title in candidates:
        key = title.lower()
        if key in seen or key in used:
            continue
        seen.add(key)
        try:
            info = file_info(title)
        except Exception as exc:
            print(f"  info fail {title}: {exc}")
            continue
        if not info or not info.get("url"):
            continue
        used_key = info["title"].lower()
        if used_key in used:
            continue
        try:
            raw = download(info["url"])
            save_jpeg(raw, dest)
        except Exception as exc:
            print(f"  download fail {title}: {exc}")
            continue
        used.add(used_key)
        return {
            "slug": item["slug"],
            "source": "commons",
            "title": info["title"],
            "license": info["license"],
            "page_url": info["page_url"],
            "artist": info["artist"][:240],
        }
    return None


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    used: set[str] = set()
    credits: list[dict] = []
    missing: list[str] = []

    for item in ITEMS:
        print(f"→ {item['slug']}")
        result = resolve_item(item, used)
        if result:
            credits.append(result)
            print(f"  ok ({result.get('source')}) {result.get('title', '')}")
        else:
            missing.append(item["slug"])
            print("  MISSING")

    CREDITS_PATH.write_text(json.dumps({"items": credits, "missing": missing, "desserts": DESSERTS}, indent=2))
    print(f"\nSaved {len(credits)} photos, missing {len(missing)}")
    if missing:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
