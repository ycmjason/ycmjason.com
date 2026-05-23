#!/usr/bin/env node
// Boot `astro preview` against dist/, render /cv to a single-page PDF, write to dist/cv.pdf.
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';

const PORT = 4173;
const URL = `http://localhost:${PORT}/cv`;
const OUT = 'dist/cv.pdf';
const log = (msg) => console.log(`[build-cv] ${msg}`);

const preview = spawn(
  'pnpm',
  ['exec', 'astro', 'preview', '--port', String(PORT), '--host', '127.0.0.1'],
  { stdio: ['ignore', 'inherit', 'inherit'] },
);

const cleanup = () => {
  if (!preview.killed) preview.kill('SIGTERM');
};
process.on('exit', cleanup);
process.on('SIGINT', () => {
  cleanup();
  process.exit(130);
});

log(`launching astro preview on :${PORT}`);

for (let i = 0; i < 40; i++) {
  await sleep(500);
  try {
    const res = await fetch(URL);
    if (res.ok) {
      log(`server ready (status ${res.status})`);
      break;
    }
  } catch {
    /* not ready yet */
  }
  if (i === 39) {
    cleanup();
    console.error('[build-cv] server never became ready');
    process.exit(1);
  }
}

const pdf = spawn('pnpm', ['exec', 'one-page-pdf', '--zoom=0.7', URL, OUT], { stdio: 'inherit' });
pdf.on('exit', (code) => {
  cleanup();
  if (code === 0) log(`wrote ${OUT}`);
  else console.error(`[build-cv] one-page-pdf exited with code ${code}`);
  process.exit(code ?? 0);
});
