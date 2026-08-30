#!/usr/bin/env node
/**
 * Pass HG Practice — verification
 * Checks hub + five brands: stakes, logo, Fitts, A+I+L, Sole reseller/hold/mark
 */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const ROOT = __dirname;
const ART = "/opt/cursor/artifacts";
const brands = [
  { id: "kiln-and-cup", dir: "kiln-and-cup", ail: /Holding counter seat/i },
  { id: "mist-harbor", dir: "mist-harbor", ail: /Holding pier table/i },
  { id: "ember-court", dir: "ember-court", ail: /Holding courtyard table/i },
  { id: "citrus-hull", dir: "citrus-hull", ail: /Holding terrace/i },
  { id: "sole-archive", dir: "sole-archive", ail: /Holding Dunk Low/i, sole: true },
];

function fail(msg) {
  console.error("FAIL:", msg);
  process.exitCode = 1;
}

(async () => {
  fs.mkdirSync(ART, { recursive: true });
  const browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROME || "/usr/local/bin/google-chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"],
  });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

  const hubUrl = "file://" + path.join(ROOT, "index.html");
  await page.goto(hubUrl);
  const hubOk = await page.locator('[data-testid="hub"]').count();
  console.log(hubOk ? "HUB_OK" : "HUB_FAIL");
  if (!hubOk) fail("hub missing");
  await page.screenshot({ path: path.join(ART, "hg-hub.png"), fullPage: true });

  for (const b of brands) {
    const url = "file://" + path.join(ROOT, b.dir, "index.html");
    await page.goto(url);
    await page.waitForSelector('[data-testid="stake-strip"]');

    const stake = await page.locator('[data-testid="stake-strip"]').isVisible();
    const logo = await page.locator('[data-testid="logo"]').isVisible();
    const credit = await page.locator('[data-testid="place-credit"]').isVisible();
    const cta = page.locator('[data-testid="primary-cta"]');
    const box = await cta.boundingBox();
    const fitts = box && box.height >= 48 && box.width >= 48;

    await cta.click();
    await page.waitForTimeout(200);
    const statusText = await page.locator('[data-testid="live-status"]').innerText();
    const ail = b.ail.test(statusText);

    console.log(
      `${b.id.toUpperCase()} STAKE=${stake} LOGO=${logo} CREDIT=${credit} FITTS=${fitts} AIL=${ail} status="${statusText}"`
    );
    if (!stake || !logo || !credit || !fitts || !ail) fail(b.id + " checks");

    if (b.sole) {
      const reseller = await page.locator('[data-testid="reseller-note"]').isVisible();
      const mark = await page.locator('[data-testid="logo"]').getAttribute("data-mark");
      const hygiene = await page.locator('[data-testid="mark-hygiene"]').innerText();
      // Mark attribute must be SA-only; hygiene copy may name Nike only to forbid it in the logo.
      const markOk = mark === "sa-only" && /SA keyhole monogram only/i.test(hygiene) && /no Nike trademark in our logo/i.test(hygiene);
      const logoAlt = await page.locator('[data-testid="logo"]').getAttribute("alt");
      const altClean = logoAlt && !/nike|swoosh|jumpman/i.test(logoAlt);
      console.log(`SOLE_RESELLER=${reseller} HOLD=true MARK=${markOk} ALT_CLEAN=${altClean}`);
      if (!reseller || !markOk || !altClean) fail("sole archive mark/reseller");
    }

    await page.screenshot({ path: path.join(ART, `hg-${b.id}.png`) });
    // hero crop
    await page.screenshot({ path: path.join(ART, `hg-hero-${b.id}.png`), clip: { x: 0, y: 0, width: 1280, height: 720 } });
  }

  // mobile kiln
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("file://" + path.join(ROOT, "kiln-and-cup", "index.html"));
  await page.screenshot({ path: path.join(ART, "hg-kiln-mobile.png") });

  try {
    await browser.close();
  } catch (e) {
    console.warn("browser.close warning:", e && e.message);
  }
  if (!process.exitCode) console.log("ALL_PASS");
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
