/**
 * IndexNow submission.
 *
 * Why this exists
 * ───────────────
 * Microsoft Copilot grounds its answers in Bing's index. Bing cannot ground an
 * answer in a page it has not crawled, and a brand-new site on a shared
 * github.io host is low in every crawler's queue. IndexNow is the protocol Bing
 * (and Yandex, Seznam, Naver) publish for *pushing* a URL list instead of
 * waiting to be discovered:
 *
 *   https://www.indexnow.org/documentation
 *   https://www.bing.com/indexnow
 *
 * It is free, needs no account and no credentials. Ownership is proved by
 * hosting a key file at the site root — public/<key>.txt — whose contents are
 * the key itself. That is why the key is committed: it is meant to be public.
 *
 * What it does NOT do: it is a discovery hint, not a ranking signal. It makes
 * crawling faster. It does not make anything rank or get cited.
 *
 *   node scripts/indexnow.mjs            # submit every URL in dist/sitemap.xml
 *   node scripts/indexnow.mjs --dry-run  # print what would be submitted
 *
 * Run it after a build. The deploy workflow calls it after Pages goes live;
 * a failure there is non-fatal by design, because a search-engine ping is never
 * a reason to fail a deployment.
 */
import fs from 'node:fs';
import path from 'node:path';

const KEY = 'c5a7a8746c6e71271c5e21b7debfc993';
const HOST = 'ahamrousy.github.io';
const ENDPOINT = 'https://api.indexnow.org/IndexNow';
const SITEMAP = path.join('dist', 'sitemap.xml');

const dryRun = process.argv.includes('--dry-run');
/** --live reads the published sitemap instead of dist/, for use after deploy. */
const live = process.argv.includes('--live');

if (!live && !fs.existsSync(SITEMAP)) {
  console.error(`✗ ${SITEMAP} not found. Run \`npm run build\` first, or pass --live.`);
  process.exit(1);
}

const keyFile = path.join('public', `${KEY}.txt`);
if (!live && !fs.existsSync(keyFile)) {
  console.error(`✗ ${keyFile} is missing. IndexNow verifies ownership through it.`);
  process.exit(1);
}

// <loc> appears once per URL; the xhtml:link alternates carry href, not loc,
// so this picks up each page exactly once rather than three times.
const xml = live
  ? await fetch(`https://${HOST}/sitemap.xml`).then((r) => {
      if (!r.ok) throw new Error(`live sitemap returned HTTP ${r.status}`);
      return r.text();
    })
  : fs.readFileSync(SITEMAP, 'utf8');
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);

if (!urls.length) {
  console.error('✗ No <loc> entries found in the sitemap.');
  process.exit(1);
}

console.log(`Submitting ${urls.length} URLs to IndexNow for ${HOST}`);

if (dryRun) {
  for (const url of urls) console.log(`  ${url}`);
  console.log('\n(dry run — nothing was sent)');
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: urls,
  }),
});

// 200 = accepted. 202 = accepted, key validation pending. Both are fine.
if (response.ok) {
  console.log(`✓ IndexNow accepted the submission (HTTP ${response.status}).`);
} else {
  const body = await response.text().catch(() => '');
  console.error(`✗ IndexNow returned HTTP ${response.status}. ${body}`.trim());
  console.error('  403 usually means the key file is not yet live at the key location.');
  process.exit(1);
}
