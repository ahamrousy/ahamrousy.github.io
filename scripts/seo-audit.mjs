/**
 * Live SEO + GEO audit.
 *
 *   npm run seo                          audits the production site
 *   npm run seo -- http://localhost:4321 audits a local preview
 *
 * Crawls every URL in the published sitemap and checks the things that
 * actually break rankings in practice — not a generic checklist. Everything
 * here is verifiable from the served HTML, so it tests what Google and the AI
 * crawlers really receive, not what the source code intends.
 *
 * Exits non-zero if any ERROR-level check fails, so it can gate a deploy.
 */

const BASE = (process.argv[2] ?? 'https://ahamrousy.github.io').replace(/\/$/, '');
const CONCURRENCY = 6;

const errors = [];
const warnings = [];
const notes = [];
const fail = (url, msg) => errors.push(`${url} — ${msg}`);
const warn = (url, msg) => warnings.push(`${url} — ${msg}`);

const text = (html, re) => (html.match(re)?.[1] ?? '').trim();
const all = (html, re) => [...html.matchAll(re)].map((m) => m[1]);

async function get(url) {
  const res = await fetch(url, { redirect: 'follow' });
  return { status: res.status, body: res.headers.get('content-type')?.includes('image') ? '' : await res.text() };
}

/** Runs `worker` over `items` with a fixed concurrency cap. */
async function pool(items, worker) {
  const results = [];
  let index = 0;
  await Promise.all(
    Array.from({ length: Math.min(CONCURRENCY, items.length) }, async () => {
      while (index < items.length) {
        const i = index++;
        results[i] = await worker(items[i]);
      }
    }),
  );
  return results;
}

// ── 1. Machine-readable endpoints ──────────────────────────────────────────
console.log(`\nAuditing ${BASE}\n${'─'.repeat(60)}`);

const sitemapRes = await get(`${BASE}/sitemap.xml`);
if (sitemapRes.status !== 200) {
  console.error(`FATAL: /sitemap.xml returned ${sitemapRes.status}. Cannot continue.`);
  process.exit(1);
}
const urls = all(sitemapRes.body, /<loc>([^<]+)<\/loc>/g);
console.log(`sitemap.xml       ${urls.length} URLs`);

for (const [file, label] of [
  ['/robots.txt', 'robots.txt'],
  ['/llms.txt', 'llms.txt'],
  ['/llms-full.txt', 'llms-full.txt'],
  ['/404.html', '404.html'],
]) {
  const res = await get(`${BASE}${file}`);
  console.log(`${label.padEnd(18)}${res.status === 200 ? `OK (${(res.body.length / 1024).toFixed(1)} kB)` : `MISSING (${res.status})`}`);
  if (res.status !== 200) fail(file, `returned ${res.status}`);
}

const robots = (await get(`${BASE}/robots.txt`)).body;
if (!robots.includes(`Sitemap: ${BASE}/sitemap.xml`)) fail('/robots.txt', 'sitemap URL missing or wrong origin');
for (const bot of ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended', 'CCBot']) {
  if (!robots.includes(bot)) warn('/robots.txt', `${bot} not named — it may not crawl`);
}

// ── 2. Per-page checks ─────────────────────────────────────────────────────
console.log(`\nChecking ${urls.length} pages…`);

const seenTitles = new Map();
const seenDescriptions = new Map();
const hreflangMap = new Map();

const pages = await pool(urls, async (url) => {
  const { status, body } = await get(url);
  if (status !== 200) {
    fail(url, `HTTP ${status}`);
    return null;
  }

  const title = text(body, /<title>([^<]*)<\/title>/);
  const description = text(body, /<meta name="description" content="([^"]*)"/);
  const canonical = text(body, /<link rel="canonical" href="([^"]*)"/);
  const robotsMeta = text(body, /<meta name="robots" content="([^"]*)"/);
  const ogImage = text(body, /<meta property="og:image" content="([^"]*)"/);
  const h1s = all(body, /<h1[^>]*>([\s\S]*?)<\/h1>/g);
  const htmlTag = text(body, /(<html[^>]*>)/);
  const alternates = all(body, /<link rel="alternate" hreflang="[^"]*" href="([^"]*)"/g);
  const hreflangs = all(body, /<link rel="alternate" hreflang="([^"]*)"/g);

  // Title / description
  if (!title) fail(url, 'no <title>');
  else if (title.length > 60) warn(url, `title ${title.length} chars (>60, will truncate in the SERP)`);
  if (!description) fail(url, 'no meta description');
  else if (description.length > 155) warn(url, `description ${description.length} chars (>155)`);

  // Uniqueness — duplicate titles are the classic silent ranking killer
  if (title) {
    if (seenTitles.has(title)) fail(url, `duplicate title, also on ${seenTitles.get(title)}`);
    else seenTitles.set(title, url);
  }
  if (description) {
    if (seenDescriptions.has(description)) warn(url, `duplicate description, also on ${seenDescriptions.get(description)}`);
    else seenDescriptions.set(description, url);
  }

  // Canonical must be self-referencing
  if (!canonical) fail(url, 'no canonical');
  else if (canonical !== url) fail(url, `canonical points elsewhere: ${canonical}`);

  // Indexability
  if (robotsMeta.includes('noindex')) warn(url, 'noindex');

  // Exactly one h1
  if (h1s.length === 0) fail(url, 'no <h1>');
  else if (h1s.length > 1) warn(url, `${h1s.length} <h1> elements`);

  // hreflang
  if (!hreflangs.includes('en') || !hreflangs.includes('ar') || !hreflangs.includes('x-default')) {
    fail(url, `incomplete hreflang set: [${hreflangs.join(', ')}]`);
  }
  hreflangMap.set(url, alternates);

  // Direction on Arabic pages
  const isArabic = url.includes('/ar/') || url.endsWith('/ar');
  if (isArabic && !/dir="rtl"/.test(htmlTag)) fail(url, 'Arabic page is not dir="rtl"');
  if (!isArabic && /dir="rtl"/.test(htmlTag)) fail(url, 'English page marked rtl');

  // JSON-LD
  const ld = text(body, /<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
  let types = [];
  if (!ld) {
    fail(url, 'no JSON-LD');
  } else {
    try {
      const graph = JSON.parse(ld)['@graph'] ?? [];
      types = graph.map((n) => (Array.isArray(n['@type']) ? n['@type'][0] : n['@type']));
      const person = graph.find((n) => String(n['@id'] ?? '').endsWith('#ahmed-amrousy'));
      if (!person) fail(url, 'JSON-LD missing the Person node');
      else if (person.name !== 'Ahmed Amrousy' && !person['@id']) {
        fail(url, `Person name inconsistent: "${person.name}"`);
      }
    } catch (error) {
      fail(url, `JSON-LD does not parse: ${error.message}`);
    }
  }

  // Open Graph
  if (!ogImage) fail(url, 'no og:image');

  // GEO: a substantial, self-contained opening paragraph
  const lede = text(body, /<p class="lede"[^>]*>([\s\S]*?)<\/p>/).replace(/<[^>]+>/g, '').trim();
  if (lede && lede.length < 100) warn(url, `lede only ${lede.length} chars — weak for AI citation`);

  // GEO: visible FAQ answers (not script-injected)
  const faqCount = (body.match(/<details class="faq__item"/g) ?? []).length;

  return { url, title, description, types, ogImage, faqCount, ledeLength: lede.length };
});

const ok = pages.filter(Boolean);

// ── 3. hreflang reciprocity ────────────────────────────────────────────────
// A page pointing at a partner that does not point back is the most common
// hreflang mistake, and Google silently ignores the whole cluster when it happens.
for (const [url, alternates] of hreflangMap) {
  for (const partner of alternates) {
    if (partner === url) continue;
    const back = hreflangMap.get(partner);
    if (!back) {
      warn(url, `hreflang points to ${partner}, which is not in the sitemap`);
    } else if (!back.includes(url)) {
      fail(url, `hreflang not reciprocal with ${partner}`);
    }
  }
}

// ── 4. OG images resolve ───────────────────────────────────────────────────
const ogUrls = [...new Set(ok.map((p) => p.ogImage))];
const ogResults = await pool(ogUrls, async (u) => ({ u, status: (await fetch(u, { method: 'HEAD' })).status }));
const brokenOg = ogResults.filter((r) => r.status !== 200);
for (const r of brokenOg) fail(r.u, `og:image returned ${r.status}`);

// ── 5. Report ──────────────────────────────────────────────────────────────
const typeCount = {};
for (const p of ok) for (const t of p.types) typeCount[t] = (typeCount[t] ?? 0) + 1;

console.log(`\n${'─'.repeat(60)}\nCOVERAGE`);
console.log(`  Pages audited          ${ok.length} / ${urls.length}`);
console.log(`  Unique titles          ${seenTitles.size}`);
console.log(`  Unique descriptions    ${seenDescriptions.size}`);
console.log(`  OG images resolving    ${ogUrls.length - brokenOg.length} / ${ogUrls.length}`);
console.log(`  Pages with FAQ blocks  ${ok.filter((p) => p.faqCount > 0).length}`);
console.log(`  Total FAQ Q&As         ${ok.reduce((sum, p) => sum + p.faqCount, 0)}`);

console.log(`\nSTRUCTURED DATA (pages carrying each type)`);
for (const [type, count] of Object.entries(typeCount).sort((a, b) => b[1] - a[1])) {
  console.log(`  ${type.padEnd(24)} ${count}`);
}

const banner = (label, list, symbol) => {
  console.log(`\n${symbol} ${label} (${list.length})`);
  if (!list.length) console.log('  none');
  for (const line of list.slice(0, 25)) console.log(`  ${line}`);
  if (list.length > 25) console.log(`  …and ${list.length - 25} more`);
};

banner('ERRORS', errors, '✗');
banner('WARNINGS', warnings, '⚠');

console.log(`\n${'─'.repeat(60)}`);
if (errors.length === 0) {
  console.log('✓ No errors. Technical SEO and GEO structure are sound.\n');
} else {
  console.log(`✗ ${errors.length} error(s) need fixing.\n`);
}
process.exit(errors.length ? 1 : 0);
