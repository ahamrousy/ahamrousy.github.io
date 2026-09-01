/**
 * Converts the site's photographs to WebP.
 *
 *   npm run webp
 *
 * WebP is typically 30–45% smaller than JPEG at the same visual quality and is
 * supported by every browser in current use, so this is close to free
 * performance. Photography is the largest thing the site downloads.
 *
 * The original .jpg files are kept, for two reasons: the Open Graph card
 * generator reads the headshot from disk with sharp and embeds it as a data
 * URI (satori's WebP handling is not worth risking for a build-time asset),
 * and keeping them makes the change trivially reversible.
 */
import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const IMAGES = path.join(ROOT, 'public', 'images');

/** Directories holding photographs. Logos and badges stay as they are — they
 *  are already tiny, and PNG suits flat artwork better than WebP. */
const dirs = ['', 'case-studies', 'courses', 'media'];

let before = 0;
let after = 0;
const converted = [];

for (const dir of dirs) {
  const full = path.join(IMAGES, dir);
  let entries;
  try {
    entries = await readdir(full);
  } catch {
    continue;
  }

  for (const name of entries) {
    if (!/\.jpe?g$/i.test(name)) continue;
    const source = path.join(full, name);
    if (!(await stat(source)).isFile()) continue;

    const input = await readFile(source);
    const output = await sharp(input).webp({ quality: 80, effort: 6 }).toBuffer();

    // Only keep the WebP if it is actually smaller — occasionally it is not.
    if (output.length >= input.length) {
      console.log(`  – ${path.join(dir, name)} skipped (WebP was larger)`);
      continue;
    }

    const target = source.replace(/\.jpe?g$/i, '.webp');
    await writeFile(target, output);

    before += input.length;
    after += output.length;
    converted.push(path.posix.join('images', dir, name).replace(/\\/g, '/'));

    console.log(
      `  ✓ ${path.join(dir, name).padEnd(38)} ${(input.length / 1024).toFixed(0)} kB → ${(output.length / 1024).toFixed(0)} kB`,
    );
  }
}

const saved = before - after;
console.log(
  `\n  ${converted.length} images · ${(before / 1024).toFixed(0)} kB → ${(after / 1024).toFixed(0)} kB ` +
    `· saved ${(saved / 1024).toFixed(0)} kB (${((saved / before) * 100).toFixed(0)}%)`,
);
console.log('\nNow run: node scripts/use-webp.mjs   to point the pages at the .webp files.');
