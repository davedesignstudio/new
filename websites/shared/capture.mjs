import { chromium } from "playwright";
import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const OUT = "/opt/cursor/artifacts";
const PORT = 8766;

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
  const page = await browser.newPage({
    viewport: { width: 1280, height: 800 },
  });

  await page.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle" });
  await page.screenshot({ path: path.join(OUT, "hp-hub.png"), fullPage: false });

  for (const b of brands) {
    await page.goto(`http://127.0.0.1:${PORT}/${b}/`, {
      waitUntil: "networkidle",
    });
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: path.join(OUT, `hp-${b}.png`),
      fullPage: false,
    });
  }

  await page.goto(`http://127.0.0.1:${PORT}/pair-registry/`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(1400);
  await page.locator("#hold").scrollIntoViewIfNeeded();
  await page.screenshot({
    path: path.join(OUT, "hp-pair-hold.png"),
    fullPage: false,
  });

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`http://127.0.0.1:${PORT}/lumen-press/`, {
    waitUntil: "networkidle",
  });
  await page.waitForTimeout(800);
  await page.screenshot({
    path: path.join(OUT, "hp-lumen-mobile.png"),
    fullPage: false,
  });

  const ctx = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: path.join(OUT, "hp-video-tmp"),
      size: { width: 1280, height: 800 },
    },
  });
  const vp = await ctx.newPage();
  await vp.goto(`http://127.0.0.1:${PORT}/`, { waitUntil: "networkidle" });
  await vp.waitForTimeout(600);
  await vp.goto(`http://127.0.0.1:${PORT}/lumen-press/`, {
    waitUntil: "networkidle",
  });
  await vp.waitForTimeout(1600);
  await vp.locator("[data-crosslink]").scrollIntoViewIfNeeded();
  await vp.waitForTimeout(700);
  await vp.locator("#menu").scrollIntoViewIfNeeded();
  await vp.waitForTimeout(800);
  await vp.goto(`http://127.0.0.1:${PORT}/pair-registry/`, {
    waitUntil: "networkidle",
  });
  await vp.waitForTimeout(1600);
  await vp.locator("#vault").scrollIntoViewIfNeeded();
  await vp.waitForTimeout(800);
  const vpath = await vp.video().path();
  await ctx.close();
  fs.renameSync(vpath, path.join(OUT, "hp-walkthrough.webm"));
  try {
    fs.rmSync(path.join(OUT, "hp-video-tmp"), { recursive: true });
  } catch {}

  await browser.close();
  server.close();
  console.log("CAPTURE_OK");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
