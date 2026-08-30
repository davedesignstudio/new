#!/usr/bin/env node
/**
 * Pass HM Integrate — Playwright verification
 */
const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");
const { pathToFileURL } = require("url");

const ROOT = "/workspace/websites";
const PORT = 8765;
const brands = [
  "lumen-press",
  "cedar-drift",
  "salt-loom",
  "forge-table",
  "pair-registry",
];

function contentType(f) {
  if (f.endsWith(".html")) return "text/html; charset=utf-8";
  if (f.endsWith(".css")) return "text/css";
  if (f.endsWith(".js")) return "application/javascript";
  if (f.endsWith(".png")) return "image/png";
  return "application/octet-stream";
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  let file = path.join(ROOT, urlPath);
  if (file.startsWith(ROOT) && fs.existsSync(file) && fs.statSync(file).isDirectory()) {
    file = path.join(file, "index.html");
  }
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404);
    res.end("not found");
    return;
  }
  res.writeHead(200, { "Content-Type": contentType(file) });
  fs.createReadStream(file).pipe(res);
});

function assert(cond, msg, results) {
  results.push({ ok: !!cond, msg });
  console.log(cond ? "PASS" : "FAIL", msg);
}

(async () => {
  await new Promise((r) => server.listen(PORT, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const results = [];
  const outDir = "/opt/cursor/artifacts";

  // Hub
  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "domcontentloaded" });
  const hubOk =
    (await page.locator("h1").textContent())?.includes("Five joined brands") &&
    (await page.locator(".hub-card").count()) === 5;
  assert(hubOk, "HUB_OK", results);
  await page.screenshot({ path: path.join(outDir, "hm-hub.png"), fullPage: false });

  for (const id of brands) {
    await page.goto(`http://127.0.0.1:${PORT}/${id}/`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(1300);

    const stake = await page.locator(".stakes").count();
    assert(stake >= 1, `${id.toUpperCase()}_STAKE`, results);

    const logo = await page.locator("img.logo").count();
    assert(logo >= 1, `${id.toUpperCase()}_LOGO`, results);

    const place = await page.locator(".place-credit").count();
    assert(place >= 1, `${id.toUpperCase()}_PLACE`, results);

    const primary = page.locator(".btn-primary").first();
    const box = await primary.boundingBox();
    assert(box && box.height >= 47, `${id.toUpperCase()}_FITTS`, results);

    const ail = await page.locator(".ail").count();
    assert(ail >= 1, `${id.toUpperCase()}_AIL`, results);

    const streamReady = await page.locator(".stream-card.is-ready").count();
    assert(streamReady >= 1, `${id.toUpperCase()}_STREAM`, results);

    const sealed = await page.locator('.practice-seal[data-sealed="true"]').count();
    assert(sealed >= 1, `${id.toUpperCase()}_SEAL`, results);

    await page.screenshot({ path: path.join(outDir, `hm-${id}.png`), fullPage: false });
  }

  // Pair-specific
  await page.goto(`http://127.0.0.1:${PORT}/pair-registry/`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(1300);
  const body = await page.content();
  assert(/independent reseller/i.test(body), "PAIR_RESELLER", results);
  assert(/24-?hour hold|24h/i.test(body), "PAIR_HOLD", results);
  assert(!/nike.*swoosh|swoosh/i.test(await page.locator(".brand-name").textContent()) &&
    (await page.locator("img.logo").getAttribute("alt"))?.includes("Pair Registry"), "PAIR_MARK", results);

  const holdBtn = page.locator("[data-hold]").first();
  await holdBtn.click({ force: true });
  await page.waitForTimeout(200);
  const holdAil = await page.locator("[data-hold-status] .ail").count();
  assert(holdAil >= 1, "PAIR_HOLD_AIL_OK", results);
  await page.screenshot({ path: path.join(outDir, "hm-pair-hold.png"), fullPage: false });

  // Mobile lumen stakes
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${PORT}/lumen-press/`, { waitUntil: "domcontentloaded" });
  const stakesBox = await page.locator(".stakes").boundingBox();
  const heroBox = await page.locator(".hero").boundingBox();
  assert(
    stakesBox && heroBox && stakesBox.y < heroBox.y + 20,
    "LUMEN_MOBILE_STAKE",
    results
  );
  await page.screenshot({ path: path.join(outDir, "hm-lumen-mobile.png"), fullPage: false });

  const failed = results.filter((r) => !r.ok);
  const allPass = failed.length === 0;
  assert(allPass, `ALL_PASS ${results.filter((r) => r.ok).length}/${results.length}`, results);

  console.log(JSON.stringify({ allPass, total: results.length, failed: failed.map((f) => f.msg) }, null, 2));

  await browser.close();
  server.close();
  process.exit(allPass ? 0 : 1);
})().catch((e) => {
  console.error(e);
  server.close();
  process.exit(1);
});
