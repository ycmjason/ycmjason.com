#!/usr/bin/env node
// Render /cv to a single-page PDF.
//
// Output is written to BOTH `public/cv.pdf` and `dist/cv.pdf`:
//   - `dist/cv.pdf` keeps the current deploy artifact fresh.
//   - `public/cv.pdf` (gitignored) means `astro dev` / `astro preview` also
//     serve a working /cv.pdf in subsequent runs.
import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { setTimeout as sleep } from 'node:timers/promises';
import puppeteer from 'puppeteer';

const PORT = 4173;
const URL = `http://127.0.0.1:${PORT}/cv`;
const OUTPUTS = ['dist/cv.pdf', 'public/cv.pdf'];
const A4_WIDTH_PX = 794;
const ZOOM = 0.7;
const log = (m) => console.log(`[build-cv] ${m}`);

if (!existsSync('dist/index.html')) {
  console.error('[build-cv] dist/ not found — run `astro build` first.');
  process.exit(1);
}

// `detached: true` so we can kill the whole process group (the `pnpm exec`
// wrapper + the actual astro node process) on cleanup. Without this the
// grandchild can outlive us and leak on CI.
const preview = spawn(
  'pnpm',
  ['exec', 'astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { stdio: ['ignore', 'inherit', 'inherit'], detached: true },
);

let cleanedUp = false;
const cleanup = () => {
  if (cleanedUp) return;
  cleanedUp = true;
  try {
    process.kill(-preview.pid, 'SIGTERM');
  } catch {
    /* already gone */
  }
};
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});
process.on('SIGTERM', () => {
  cleanup();
  process.exit(143);
});

log(`launching astro preview on :${PORT}`);
let ready = false;
for (let i = 0; i < 40; i++) {
  await sleep(500);
  try {
    const res = await fetch(URL);
    if (res.ok) {
      ready = true;
      log('server ready');
      break;
    }
  } catch {
    /* not ready yet */
  }
}
if (!ready) {
  cleanup();
  throw new Error('server never became ready');
}

const browser = await puppeteer.launch({ headless: true, defaultViewport: null });
const page = await browser.newPage();
await page.emulateMediaType('print');
await page.goto(URL, { waitUntil: 'networkidle2' });
await page.setViewport({ width: A4_WIDTH_PX, height: 0 });
await page.evaluate((z) => {
  document.body.style.zoom = `${z}`;
}, ZOOM);
const [h, w] = await Promise.all([
  page.evaluate(() => document.documentElement.scrollHeight),
  page.evaluate(() => document.documentElement.clientWidth),
]);
const pdf = await page.pdf({
  waitForFonts: true,
  printBackground: true,
  width: `${w}px`,
  height: `${h}px`,
});
await browser.close();

for (const out of OUTPUTS) {
  await mkdir(dirname(out), { recursive: true });
  await writeFile(out, pdf);
  log(`wrote ${out}`);
}

cleanup();
process.exit(0);
