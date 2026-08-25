/**
 * Guards the two SEO limits that actually change what a searcher sees:
 * a <title> over ~60 characters gets truncated in the SERP, and a meta
 * description over ~155 gets cut mid-sentence.
 *
 * The content collections enforce this at build time via Zod. This script
 * covers the same ground for the hand-written singleton pages in
 * src/data/pages.ts, which Zod never sees, and reports everything in one pass.
 *
 *   node scripts/check-seo-lengths.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const LIMITS = { seoTitle: 60, metaDescription: 155 };
let problems = 0;

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return entry.name.endsWith('.md') ? [full] : [];
  });
}

function report(label, key, value) {
  const max = LIMITS[key];
  if (value.length > max) {
    problems += 1;
    console.log(`  ✗ [${value.length}/${max}] ${key} — ${label}`);
    console.log(`      ${value}`);
  }
}

// ── Markdown collections ───────────────────────────────────────────────────
console.log('Content collections:');
for (const file of walk(path.join('src', 'content'))) {
  const text = fs.readFileSync(file, 'utf8');
  const frontmatter = text.split('---')[1] ?? '';
  const label = file.split(path.sep).join('/');

  for (const key of Object.keys(LIMITS)) {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
    if (!match) {
      problems += 1;
      console.log(`  ✗ missing ${key} — ${label}`);
      continue;
    }
    report(label, key, match[1].trim().replace(/^['"]|['"]$/g, ''));
  }
}

// ── Singleton pages ────────────────────────────────────────────────────────
console.log('\nSingleton pages (src/data/pages.ts):');
const pagesSrc = fs.readFileSync(path.join('src', 'data', 'pages.ts'), 'utf8');
for (const key of Object.keys(LIMITS)) {
  // Values are single-quoted string literals, possibly wrapped across lines by
  // the formatter — join continuation lines before measuring.
  const pattern = new RegExp(`${key}:\\s*\\n?\\s*'((?:[^'\\\\]|\\\\.)*)'`, 'g');
  let match;
  while ((match = pattern.exec(pagesSrc)) !== null) {
    report(`pages.ts → ${key}`, key, match[1].replace(/\\'/g, "'"));
  }
}

console.log(
  problems === 0
    ? '\n✓ All titles ≤ 60 and descriptions ≤ 155 characters.'
    : `\n✗ ${problems} field(s) over limit.`,
);
process.exit(problems === 0 ? 0 : 1);
