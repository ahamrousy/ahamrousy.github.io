/**
 * Prepares real engagement photographs for the case-study pages.
 *
 *   node scripts/add-case-photos.mjs
 *
 * Reads the originals from ../Sources for Website/Photos/, corrects EXIF
 * rotation, resizes to a sensible web width, compresses, and writes them to
 * public/images/case-studies/. Prints the final dimensions so they can be
 * copied into each case study's frontmatter — the layout uses them to reserve
 * space, which is what keeps Cumulative Layout Shift at zero.
 *
 * Aspect ratios are deliberately *preserved* rather than forced to 3:2. The
 * FEPS photo is a 2.4:1 panorama; cropping it to 3:2 would cut people off at
 * both edges. Card thumbnails crop to a fixed tile in CSS, where a crop is
 * unobjectionable; the detail page shows the whole frame.
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.resolve(ROOT, '..', 'Sources for Website', 'Photos');
const OUT = path.join(ROOT, 'public', 'images', 'case-studies');

/** source file → output slug. Two photos belong to the Copilot engagement. */
const jobs = [
  { from: 'Copilot Training.jpeg', to: 'kahraba-1.jpg', maxWidth: 1600 },
  { from: 'Kahraba Cohort 2.jpg.jpeg', to: 'kahraba-2.jpg', maxWidth: 1000 },
  { from: 'Kahraba Cohort 3.jpg.png', to: 'kahraba-3.jpg', maxWidth: 1000 },
  { from: 'EEC Training.jpeg', to: 'eece.jpg', maxWidth: 1600 },
  { from: 'FEPS Logic Training.png', to: 'feps-logic.jpg', maxWidth: 1600 },
];

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const source = path.join(SRC, job.from);
  try {
    await stat(source);
  } catch {
    console.error(`  ✗ missing source: ${job.from}`);
    continue;
  }

  const input = await readFile(source);
  const output = await sharp(input)
    .rotate() // honour EXIF orientation before anything else
    .resize({ width: job.maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toBuffer();

  const meta = await sharp(output).metadata();
  await writeFile(path.join(OUT, job.to), output);

  console.log(
    `  ✓ ${job.to.padEnd(18)} ${meta.width}×${meta.height}  ${(output.length / 1024).toFixed(0)} kB` +
      `   →  width: ${meta.width}  height: ${meta.height}`,
  );
}

console.log('\nCopy the width/height into each case study\'s `photos:` frontmatter.');
