#!/usr/bin/env node
/**
 * Pass HS verification — hub + five brands + Survey spectrum + shelves
 */
import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PORT = 8765;

function contentType(f) {
  if (f.endsWith(".html")) return "text/html; charset=utf-8";
  if (f.endsWith(".css")) return "text/css; charset=utf-8";
  if (f.endsWith(".js")) return "application/javascript; charset=utf-8";
  if (f.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

const server = http.createServer((req, res) => {
  let url = decodeURIComponent(req.url.split("?")[0]);
  if (url === "/") url = "/index.html";
  if (url.endsWith("/")) url += "index.html";
  const file = path.join(ROOT, url);
  if (!file.startsWith(ROOT) || !fs.existsSync(file)) {
    res.writeHead(404);
    res.end("missing");
    return;
  }
  res.writeHead(200, { "Content-Type": contentType(file) });
  fs.createReadStream(file).pipe(res);
});

const brands = [
  "lumen-press",
  "cedar-drift",
  "salt-loom",
  "forge-table",
  "pair-registry",
];

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const results = [];

  const check = (name, ok, detail = "") => {
    results.push({ name, ok, detail });
    console.log(`${ok ? "PASS" : "FAIL"} · ${name}${detail ? " · " + detail : ""}`);
  };

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle" });
  const hubLinks = await page.locator(".hub-card").count();
  const hubText = await page.locator("body").innerText();
  check("HUB_OK", hubLinks === 5, `cards=${hubLinks}`);
  check(
    "HUB_SURVEY",
    /Survey|Hour 1|Spectrum|Cycle HS/i.test(hubText) &&
      (await page.locator("[data-survey]").count()) >= 1 &&
      (await page.locator("[data-spectrum]").count()) >= 1
  );
  check(
    "HUB_SHELVES",
    (await page.locator("[data-canon-shelves] [data-shelf]").count()) >= 6
  );

  for (const b of brands) {
    await page.goto(`http://127.0.0.1:${PORT}/${b}/`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(1600);
    const stake = await page.locator("[data-stakes]").count();
    const logo = await page.locator(".brand-lockup img").count();
    const place = await page.locator(".place-credit").count();
    const fitts = await page.evaluate(() => {
      const btn = document.querySelector("[data-primary-cta]");
      if (!btn) return false;
      const r = btn.getBoundingClientRect();
      return r.height >= 48;
    });
    const ail = await page.locator("[data-ail]").count();
    const stream = await page
      .locator("[data-stream-rail]")
      .getAttribute("data-state");
    const seal = await page
      .locator("[data-practice-seal]")
      .getAttribute("data-state");
    const example = await page.locator("[data-example='true']").count();
    const pathLabel = await page.locator("[data-path-label]").count();
    const twoWays = await page.locator(".two-ways").count();
    const bridges = await page.locator("[data-crosslink] [data-bridge]").count();
    const joints = await page.locator("[data-practice-drill] [data-joint]").count();
    const stamped = await page
      .locator('[data-practice-drill] [data-joint][data-stamped="true"]')
      .count();
    const drillState = await page
      .locator("[data-practice-drill]")
      .getAttribute("data-state");
    const survey = await page.locator("[data-survey]").count();
    const spectrum = await page.locator("[data-spectrum]").count();
    const shelves = await page.locator("[data-canon-shelves] [data-shelf]").count();
    const telemetry = await page.locator("[data-telemetry]").count();
    const brandOk =
      stake >= 1 &&
      logo >= 1 &&
      place >= 1 &&
      fitts &&
      ail >= 1 &&
      (stream === "complete" || stream === "fallback") &&
      seal === "ready" &&
      example >= 1 &&
      pathLabel >= 1 &&
      twoWays >= 1 &&
      bridges >= 6 &&
      joints >= 6 &&
      stamped === 6 &&
      drillState === "sealed" &&
      survey >= 1 &&
      spectrum >= 1 &&
      shelves >= 6 &&
      telemetry >= 1;
    check(
      `${b.toUpperCase()}_STAKE+LOGO+PLACE+FITTS+AIL+STREAM+SEAL+EXAMPLE+PATH+WAYS+BRIDGES+JOINTS+SURVEY+SPECTRUM+SHELVES+TELEMETRY`,
      brandOk,
      `stream=${stream} seal=${seal} stamped=${stamped}/6 drill=${drillState} shelves=${shelves}`
    );
  }

  await page.goto(`http://127.0.0.1:${PORT}/pair-registry/`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1400);
  const body = await page.locator("body").innerText();
  check("PAIR_RESELLER", /independent reseller|not affiliated with Nike/i.test(body));
  check("PAIR_HOLD", /24h hold|24-hour hold/i.test(body));
  check(
    "PAIR_MARK",
    /PR seal|monogram|no Nike/i.test(body) &&
      !(await page.locator('img[alt*="Nike swoosh" i]').count())
  );
  const holdAil = await page.locator("#hold [data-ail], #hold .ail, #hold-ail").count();
  check("PAIR_HOLD_AIL_OK", holdAil >= 1);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${PORT}/lumen-press/`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1400);
  const stakeBox = await page.locator("[data-stakes]").boundingBox();
  const heroBox = await page.locator(".hero").boundingBox();
  const mobileStake =
    stakeBox && heroBox && stakeBox.y < heroBox.y + heroBox.height;
  check("LUMEN_MOBILE_STAKE", Boolean(mobileStake));

  const passed = results.filter((r) => r.ok).length;
  const total = results.length;
  console.log(`\nALL_${passed === total ? "PASS" : "FAIL"} ${passed}/${total}`);

  await browser.close();
  server.close();
  process.exit(passed === total ? 0 : 1);
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
