/**
 * Prepares the client logo wall from the supplied artwork.
 *
 *   node scripts/add-client-logos.mjs
 *
 * Reads ../Sources for Website/Logos for Clients/, trims surrounding
 * whitespace, fits each mark inside a common box without ever enlarging it,
 * and writes PNGs (plus the one SVG, copied verbatim) to public/images/logos/.
 *
 * Two deliberate decisions:
 *
 * 1. **No background removal.** Several marks are opaque on white and a few
 *    contain white *inside* the artwork — the USAID seal and the AUC lockup
 *    both do. A blanket "make white transparent" pass would punch holes
 *    through them. The wall tiles are white, so an opaque white background is
 *    already invisible; nothing needs cutting out.
 *
 * 2. **Never upscale.** The supplied files are 74–298 px wide, below the
 *    320 px a retina 160 px slot would want. Enlarging them would only add
 *    blur, so they are capped at their native size and the wall displays them
 *    small enough to stay crisp. Higher-resolution or vector originals would
 *    look sharper — that is a source-file limit, not a layout one.
 */
import { readFile, writeFile, readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'Sources for Website', 'Logos for Clients');
const OUT = path.join(ROOT, 'public', 'images', 'logos');

/** source filename → output slug (kebab-case, matching src/data/person.ts). */
const slugs = {
  'AATSMT.jpg': 'arab-academy',
  'AUC.jpg': 'auc',
  'BUE.png': 'bue',
  'Cairo Univesity.png': 'cairo-university',
  'EECE.png': 'eece',
  'Kahraba.png': 'kahraba',
  'LOGIC Consulting.png': 'logic-consulting',
  'Nile Univesity.png': 'nile-university',
  'Train.png': 'train',
  'USAID.png': 'usaid',
  'Vodafone.svg': 'vodafone',
};

const BOX = { width: 320, height: 110 };

await mkdir(OUT, { recursive: true });

for (const file of (await readdir(SRC)).sort()) {
  const slug = slugs[file];
  if (!slug) {
    console.warn(`  ? unmapped source file, skipped: ${file}`);
    continue;
  }

  // Vector: copy through untouched — it already scales perfectly.
  if (file.toLowerCase().endsWith('.svg')) {
    await writeFile(path.join(OUT, `${slug}.svg`), await readFile(path.join(SRC, file)));
    console.log(`  ✓ ${slug}.svg`.padEnd(28) + 'vector, copied as-is');
    continue;
  }

  const input = await readFile(path.join(SRC, file));
  const before = await sharp(input).metadata();

  const output = await sharp(input)
    .trim({ threshold: 12 }) // drop uniform padding so every mark fills its slot evenly
    .resize({ ...BOX, fit: 'inside', withoutEnlargement: true })
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();

  const after = await sharp(output).metadata();
  await writeFile(path.join(OUT, `${slug}.png`), output);

  const soft = after.width < 200 ? '  ← low-res source' : '';
  console.log(
    `  ✓ ${slug}.png`.padEnd(28) +
      `${before.width}×${before.height} → ${after.width}×${after.height}  ` +
      `${(output.length / 1024).toFixed(1)} kB${soft}`,
  );
}

console.log('\nLogos written. The wall renders them in full colour on white tiles.');
