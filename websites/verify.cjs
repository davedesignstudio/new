const { chromium } = require('playwright');
const http = require('http');
const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');

const ROOT = path.join(__dirname, '..', 'websites');

function contentType(f) {
  if (f.endsWith('.html')) return 'text/html; charset=utf-8';
  if (f.endsWith('.css')) return 'text/css; charset=utf-8';
  if (f.endsWith('.png')) return 'image/png';
  if (f.endsWith('.js')) return 'text/javascript';
  return 'application/octet-stream';
}

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  const file = path.normalize(path.join(ROOT, urlPath));
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found ' + urlPath); return; }
    res.writeHead(200, { 'Content-Type': contentType(file) });
    res.end(data);
  });
});

const brands = [
  { slug: 'kiln-and-cup', name: 'Kiln' },
  { slug: 'mist-harbor', name: 'Mist' },
  { slug: 'ember-court', name: 'Ember' },
  { slug: 'citrus-hull', name: 'Citrus' },
  { slug: 'sole-archive', name: 'Sole' },
];

(async () => {
  await new Promise((r) => server.listen(8765, r));
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const out = [];
  let fail = 0;

  await page.goto('http://127.0.0.1:8765/index.html', { waitUntil: 'networkidle' });
  const hubCards = await page.locator('.brand-card').count();
  const hubOk = hubCards === 5;
  out.push(hubOk ? 'HUB_OK' : 'HUB_FAIL');
  if (!hubOk) fail++;
  await page.screenshot({ path: '/opt/cursor/artifacts/hf-hub.png', fullPage: false });

  for (const b of brands) {
    await page.goto(`http://127.0.0.1:8765/${b.slug}/index.html`, { waitUntil: 'networkidle' });
    const stakes = await page.locator('[data-testid="stakes"]').count();
    const logo = await page.locator('[data-testid="logo"] img').count();
    const ctaBox = await page.locator('[data-testid="cta-primary"]').boundingBox();
    const ail = await page.locator('[data-testid="ail"]').count();
    const fitts = ctaBox && ctaBox.height >= 48;
    const ok = stakes && logo && fitts && ail;
    out.push(`${b.name}:${ok ? 'STAKE+LOGO+FITTS+AIL' : 'FAIL'}`);
    if (!ok) fail++;
    await page.screenshot({ path: `/opt/cursor/artifacts/hf-${b.slug}.png`, fullPage: false });
  }

  // Sole-specific
  await page.goto('http://127.0.0.1:8765/sole-archive/index.html', { waitUntil: 'networkidle' });
  const reseller = await page.locator('[data-testid="reseller"]').count();
  const hold = await page.locator('[data-testid="hold-panel"]').count();
  const mark = await page.locator('[data-testid="mark-hygiene"]').innerText();
  const soleOk = reseller && hold && /no swoosh/i.test(mark);
  out.push(soleOk ? 'SOLE_RESELLER+HOLD+MARK' : 'SOLE_FAIL');
  if (!soleOk) fail++;

  // Mobile kiln
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:8765/kiln-and-cup/index.html', { waitUntil: 'networkidle' });
  await page.screenshot({ path: '/opt/cursor/artifacts/hf-kiln-mobile.png', fullPage: false });

  // Hero crops
  await page.setViewportSize({ width: 1280, height: 800 });
  for (const b of brands) {
    await page.goto(`http://127.0.0.1:8765/${b.slug}/index.html`, { waitUntil: 'networkidle' });
    const hero = page.locator('.hero');
    await hero.screenshot({ path: `/opt/cursor/artifacts/hf-hero-${b.slug}.png` });
  }

  console.log(out.join(' · '));
  console.log(fail === 0 ? 'ALL_PASS' : `FAILS_${fail}`);
  await browser.close();
  server.close();
  process.exit(fail === 0 ? 0 : 1);
})().catch((e) => { console.error(e); process.exit(1); });
