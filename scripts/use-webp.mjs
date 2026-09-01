/**
 * Repoints page references from .jpg to .webp, for photographs that have a
 * WebP twin produced by scripts/to-webp.mjs.
 *
 *   node scripts/use-webp.mjs
 *
 * Only rewrites a reference when the .webp actually exists on disk, so it is
 * safe to re-run and cannot produce a broken image. It deliberately leaves
 * src/pages/og/ alone: the card generator reads the headshot JPEG directly and
 * embeds it, which is a build-time concern rather than a delivery one.
 */
import { readFile, writeFile, readdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

const exists = async (p) => access(p).then(() => true).catch(() => false);

/** Every source file that might reference an image. */
async function sources(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'og') continue; // the card generator keeps the JPEG
      out.push(...(await sources(full)));
    } else if (/\.(astro|ts|md)$/.test(entry.name)) {
      out.push(full);
    }
  }
  return out;
}

const files = await sources(path.join(ROOT, 'src'));
let changed = 0;
let refs = 0;

for (const file of files) {
  const text = await readFile(file, 'utf8');
  let next = text;

  // images/… .jpg  →  images/… .webp, but only where the twin exists
  const matches = [...text.matchAll(/images\/[A-Za-z0-9/_-]+\.jpe?g/g)].map((m) => m[0]);
  for (const ref of [...new Set(matches)]) {
    const webpRef = ref.replace(/\.jpe?g$/, '.webp');
    if (!(await exists(path.join(PUBLIC, webpRef)))) continue;
    next = next.split(ref).join(webpRef);
    refs += 1;
  }

  if (next !== text) {
    await writeFile(file, next);
    changed += 1;
    console.log(`  ✓ ${path.relative(ROOT, file).split(path.sep).join('/')}`);
  }
}

console.log(`\n  ${refs} reference(s) repointed across ${changed} file(s).`);
