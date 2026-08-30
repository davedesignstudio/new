import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const BASE = 'http://127.0.0.1:8765';
const OUT = '/opt/cursor/artifacts';
const brands = ['lumen-press','cedar-drift','salt-loom','forge-table','pair-registry'];
const results = [];

function ok(name, pass, detail='') {
  results.push({ name, pass, detail });
  console.log(`${pass ? 'PASS' : 'FAIL'} · ${name}${detail ? ' · ' + detail : ''}`);
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });

// Hub
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
const hubLinks = await page.locator('.hub-card').count();
ok('HUB_OK', hubLinks === 5, `cards=${hubLinks}`);
await page.screenshot({ path: path.join(OUT, 'hl-hub.png'), fullPage: true });

for (const slug of brands) {
  await page.goto(BASE + '/' + slug + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1100); // allow stream to ready

  const stake = await page.locator('[data-stakes]').count();
  const logo = await page.locator('[data-logo]').count();
  const place = await page.locator('[data-place-credit]').count();
  const brand = await page.locator('[data-hero-brand]').innerText();
  const cta = page.locator('[data-hold-cta]');
  const box = await cta.boundingBox();
  const fitts = box && box.height >= 47;
  const action = (await page.locator('[data-ail="action"]').innerText()).trim();
  const item = (await page.locator('[data-ail="item"]').innerText()).trim();
  const limit = (await page.locator('[data-ail="limit"]').innerText()).trim();
  const ail = action.length > 0 && item.length > 0 && limit.length > 0 && !/panic|error!|fail!/i.test(action+item);
  const streamState = await page.locator('[data-stream-board]').getAttribute('data-stream-state');
  const streamOk = streamState === 'ready' || streamState === 'fallback';
  const seal = await page.locator('[data-practice-seal][data-stamped="true"]').count();

  ok(`${slug.toUpperCase()}_STAKE`, stake >= 1);
  ok(`${slug.toUpperCase()}_LOGO`, logo >= 1 && brand.length > 0, brand);
  ok(`${slug.toUpperCase()}_PLACE`, place >= 1);
  ok(`${slug.toUpperCase()}_FITTS`, !!fitts, `h=${box?.height}`);
  ok(`${slug.toUpperCase()}_AIL`, ail, `${action} | ${item} | ${limit}`);
  ok(`${slug.toUpperCase()}_STREAM`, streamOk, streamState);
  ok(`${slug.toUpperCase()}_SEAL`, seal >= 1, `stamped=${seal}`);

  await page.screenshot({ path: path.join(OUT, `hl-${slug}.png`), fullPage: false });
}

// Pair-specific
await page.goto(BASE + '/pair-registry/', { waitUntil: 'networkidle' });
await page.waitForTimeout(1100);
const body = await page.locator('body').innerText();
const reseller = /independent reseller/i.test(body) && /not (affiliated with|Nike)/i.test(body);
const hold = /24 hour/i.test(body);
const mark = await page.locator('[data-logo]').getAttribute('alt');
const noNikeInMark = mark && !/nike/i.test(mark);
ok('PAIR_RESELLER', reseller);
ok('PAIR_HOLD', hold);
ok('PAIR_MARK', noNikeInMark, mark);

// Click hold and verify A+I+L
await page.locator('[data-hold-cta]').click();
await page.waitForTimeout(200);
const a2 = await page.locator('[data-ail="action"]').innerText();
const i2 = await page.locator('[data-ail="item"]').innerText();
const l2 = await page.locator('[data-ail="limit"]').innerText();
ok('PAIR_HOLD_AIL_OK', /Hold/i.test(a2) && /Dunk/i.test(i2) && /24/i.test(l2), `${a2} | ${i2} | ${l2}`);
await page.screenshot({ path: path.join(OUT, 'hl-pair-hold.png'), fullPage: false });

// Mobile lumen
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(BASE + '/lumen-press/', { waitUntil: 'networkidle' });
await page.waitForTimeout(300);
await page.screenshot({ path: path.join(OUT, 'hl-lumen-mobile.png'), fullPage: false });
const mStake = await page.locator('[data-stakes]').count();
ok('LUMEN_MOBILE_STAKE', mStake >= 1);

await browser.close();

const failed = results.filter(r => !r.pass);
console.log('\n' + (failed.length ? 'ALL_FAIL' : 'ALL_PASS') + ` · ${results.length - failed.length}/${results.length}`);
fs.writeFileSync(path.join(OUT, 'hl-verify.json'), JSON.stringify(results, null, 2));
process.exit(failed.length ? 1 : 0);
