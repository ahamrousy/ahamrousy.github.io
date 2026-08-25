/**
 * Lighthouse audit against the built site.
 *
 *   npm run build && npm run audit
 *
 * Serves ./dist on a local port, runs Lighthouse over a representative sample
 * of routes — an English page, an Arabic RTL page, a content-heavy course page
 * and an article — and prints a table of the four category scores.
 *
 * Exits non-zero if any category on any page falls below THRESHOLD, so it can
 * be wired into CI later if you want it to gate deploys.
 *
 * Needs Chrome installed locally. If chrome-launcher cannot find one, the
 * script says so and exits 0 rather than failing a build for a missing
 * browser.
 */
import { createServer } from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');
const REPORT_DIR = path.join(ROOT, 'lighthouse-report');
const THRESHOLD = 95;
const PORT = 4321;

/** Routes chosen to exercise every distinct template and both directions. */
const ROUTES = [
  { label: 'Home (EN)', url: '/' },
  { label: 'About (EN)', url: '/about/' },
  { label: 'Course detail (EN)', url: '/courses/ai-for-business-strategy/' },
  { label: 'Geo landing (EN)', url: '/corporate-ai-training-egypt/' },
  { label: 'Article (EN)', url: '/insights/pocab-vs-gcse-f/' },
  { label: 'Home (AR, RTL)', url: '/ar/' },
  { label: 'About (AR, RTL)', url: '/ar/about/' },
];

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.pdf': 'application/pdf',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
};

async function resolveFile(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]);
  const candidates = clean.endsWith('/')
    ? [path.join(DIST, clean, 'index.html')]
    : [path.join(DIST, clean), path.join(DIST, clean, 'index.html')];

  for (const candidate of candidates) {
    try {
      const info = await stat(candidate);
      if (info.isFile()) return candidate;
    } catch {
      /* try the next candidate */
    }
  }
  return null;
}

function startServer() {
  const server = createServer(async (req, res) => {
    const file = await resolveFile(req.url ?? '/');
    if (!file) {
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(await readFile(path.join(DIST, '404.html')).catch(() => 'Not found'));
      return;
    }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] ?? 'application/octet-stream' });
    res.end(await readFile(file));
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function main() {
  try {
    await stat(path.join(DIST, 'index.html'));
  } catch {
    console.error('dist/ not found. Run `npm run build` first.');
    process.exit(1);
  }

  let lighthouse;
  let chromeLauncher;
  try {
    ({ default: lighthouse } = await import('lighthouse'));
    chromeLauncher = await import('chrome-launcher');
  } catch (error) {
    console.error('Lighthouse is not installed. Run `npm install` first.');
    process.exit(1);
  }

  let chrome;
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: ['--headless=new', '--no-sandbox', '--disable-gpu'],
    });
  } catch {
    console.log('\n⚠  No Chrome installation found — skipping the Lighthouse run.');
    console.log('   Install Google Chrome, then re-run `npm run audit`.\n');
    process.exit(0);
  }

  const server = await startServer();
  await mkdir(REPORT_DIR, { recursive: true });

  const rows = [];
  let failed = false;

  try {
    for (const route of ROUTES) {
      const result = await lighthouse(
        `http://localhost:${PORT}${route.url}`,
        {
          port: chrome.port,
          output: ['html'],
          logLevel: 'error',
          // Mobile-first: this is the profile the brief targets.
          formFactor: 'mobile',
          screenEmulation: { mobile: true, width: 412, height: 823, deviceScaleFactor: 1.75 },
          throttlingMethod: 'simulate',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        },
      );

      const categories = result.lhr.categories;
      const score = (key) => Math.round((categories[key]?.score ?? 0) * 100);
      const row = {
        page: route.label,
        performance: score('performance'),
        accessibility: score('accessibility'),
        bestPractices: score('best-practices'),
        seo: score('seo'),
        lcp: result.lhr.audits['largest-contentful-paint']?.displayValue ?? '—',
        cls: result.lhr.audits['cumulative-layout-shift']?.displayValue ?? '—',
      };
      rows.push(row);

      if ([row.performance, row.accessibility, row.bestPractices, row.seo].some((v) => v < THRESHOLD)) {
        failed = true;
      }

      const slug = route.url.replace(/\//g, '_').replace(/^_|_$/g, '') || 'home';
      await writeFile(path.join(REPORT_DIR, `${slug}.html`), result.report[0]);
    }
  } finally {
    // On Windows, chrome-launcher's temp-profile cleanup regularly throws
    // EPERM because the browser has not fully released the directory yet.
    // That is a teardown detail — it must not discard the results we just
    // spent a minute collecting.
    try {
      await chrome.kill();
    } catch (error) {
      if (error?.code !== 'EPERM') throw error;
    }
    server.close();
  }

  console.log('\nLighthouse — mobile, simulated throttling\n');
  console.table(
    rows.map((row) => ({
      Page: row.page,
      Perf: row.performance,
      A11y: row.accessibility,
      'Best pr.': row.bestPractices,
      SEO: row.seo,
      LCP: row.lcp,
      CLS: row.cls,
    })),
  );
  console.log(`Full reports: ${path.relative(ROOT, REPORT_DIR)}/\n`);

  if (failed) {
    console.error(`✗ At least one category scored below ${THRESHOLD}.`);
    process.exit(1);
  }
  console.log(`✓ All categories at or above ${THRESHOLD}.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
