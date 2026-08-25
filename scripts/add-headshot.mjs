/**
 * Prepares a photograph for use as the site headshot.
 *
 *   node scripts/add-headshot.mjs "C:/path/to/your-photo.jpg"
 *   node scripts/add-headshot.mjs "C:/path/to/your-photo.jpg" --gravity=north
 *
 * Takes any image, crops it to the 4:5 portrait ratio the layout expects,
 * resizes to 640×800, compresses it, and writes it to
 * public/images/ahmed-amrousy-headshot.jpg.
 *
 * Why this exists rather than "just copy the file in": the hero image is the
 * Largest Contentful Paint element on the homepage, so its file size directly
 * sets the performance score. A 4 MB phone photo dropped in unchanged is the
 * single most common way a Lighthouse 100 becomes an 80. This keeps it under
 * ~120 kB without a visible quality loss.
 *
 * `--gravity` controls which part of the frame survives the crop when the
 * source is not already 4:5. Default is `attention`, which finds the most
 * visually significant region — usually the face. Use `north` if the crop is
 * cutting the top of the head.
 */
import { readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const TARGET = path.join(ROOT, 'public', 'images', 'ahmed-amrousy-headshot.jpg');
const WIDTH = 640;
const HEIGHT = 800;

const args = process.argv.slice(2);
const source = args.find((arg) => !arg.startsWith('--'));
const gravityArg = args.find((arg) => arg.startsWith('--gravity='));
const gravity = gravityArg ? gravityArg.split('=')[1] : 'attention';

if (!source) {
  console.error('Usage: node scripts/add-headshot.mjs "path/to/photo.jpg" [--gravity=north]');
  console.error('Gravity options: attention (default), north, centre, south');
  process.exit(1);
}

try {
  await stat(source);
} catch {
  console.error(`Could not find: ${source}`);
  process.exit(1);
}

const input = await readFile(source);
const meta = await sharp(input).metadata();

console.log(`Source : ${path.basename(source)}`);
console.log(`         ${meta.width} × ${meta.height} ${meta.format}, ${(input.length / 1024 / 1024).toFixed(2)} MB`);

if (meta.width < WIDTH || meta.height < HEIGHT) {
  console.warn(
    `\n⚠  Source is smaller than ${WIDTH}×${HEIGHT}. It will be upscaled and may look soft.\n` +
      `   A larger original will look noticeably better.\n`,
  );
}

const output = await sharp(input)
  .rotate() // honour EXIF orientation — phone photos are frequently sideways without it
  .resize(WIDTH, HEIGHT, {
    fit: 'cover',
    position: gravity === 'attention' ? sharp.strategy.attention : gravity,
  })
  .jpeg({ quality: 82, mozjpeg: true, progressive: true })
  .toBuffer();

await writeFile(TARGET, output);

console.log(`\nWritten: public/images/ahmed-amrousy-headshot.jpg`);
console.log(`         ${WIDTH} × ${HEIGHT}, ${(output.length / 1024).toFixed(1)} kB (crop: ${gravity})`);

if (output.length > 150 * 1024) {
  console.warn(`\n⚠  Over 150 kB — consider a simpler background or a smaller source.`);
}

console.log(`\nNext: commit and push in GitHub Desktop. The site rebuilds automatically.`);
console.log(`If the crop cut off part of your head, re-run with --gravity=north`);
