/**
 * One-off placeholder generator.
 *
 * Creates real JPG/PNG files at the exact paths and dimensions the site
 * expects, so nothing 404s and no layout shifts before Ahmed supplies the real
 * photography. The output is committed to the repo — you only need to re-run
 * this if you change the expected filenames in public/images/README.md.
 *
 *   node scripts/generate-placeholders.mjs
 *
 * Deliberately draws shapes only, never text: SVG text rasterisation depends on
 * whatever fonts happen to be installed, which makes it unreliable across
 * machines. The OG-card generator (generate-og.mjs) handles text properly by
 * embedding font files.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CRIMSON = '#9B1B30';
const GREEN = '#1B7A4A';
const INK = '#14151A';

/** A neutral portrait-style placeholder: brand wash plus an abstract figure. */
function portraitSvg(width, height) {
  const cx = width / 2;
  const headR = width * 0.15;
  const headCy = height * 0.36;
  const bodyRx = width * 0.26;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#F4F5F7"/>
      <stop offset="100%" stop-color="#E6E8EC"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#g)"/>
  <circle cx="${cx}" cy="${headCy}" r="${headR}" fill="#C9CDD6"/>
  <ellipse cx="${cx}" cy="${height * 0.92}" rx="${bodyRx}" ry="${height * 0.3}" fill="#C9CDD6"/>
  <rect x="0" y="${height - 8}" width="${width}" height="8" fill="${CRIMSON}"/>
  <rect x="0" y="${height - 8}" width="${width / 2}" height="8" fill="${GREEN}"/>
</svg>`;
}

/** A landscape placeholder for the gallery slots. */
function gallerySvg(width, height, accent) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="#EEF0F3"/>
  <rect x="${width * 0.12}" y="${height * 0.22}" width="${width * 0.36}" height="${height * 0.46}" rx="10" fill="#D6D9E0"/>
  <rect x="${width * 0.54}" y="${height * 0.34}" width="${width * 0.32}" height="${height * 0.34}" rx="10" fill="#DDE0E6"/>
  <rect x="0" y="${height - 10}" width="${width}" height="10" fill="${accent}"/>
</svg>`;
}

/** App icon: the Menova mark on the brand ink square. */
function iconSvg(size) {
  const s = size / 32;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="${INK}"/>
  <path d="M7 24V9l9 10" stroke="${CRIMSON}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M25 24V9l-9 10" stroke="${GREEN}" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
</svg>`.replace('viewBox="0 0 32 32"', `viewBox="0 0 32 32" transform="scale(${s})"`);
}

const jobs = [
  // The headshot the hero and About page both reference.
  { file: 'public/images/ahmed-amrousy-headshot.jpg', svg: portraitSvg(640, 800), format: 'jpeg' },
  // Gallery slots — trainings, events, podcast shoots.
  { file: 'public/images/gallery/training-01.jpg', svg: gallerySvg(1200, 800, CRIMSON), format: 'jpeg' },
  { file: 'public/images/gallery/training-02.jpg', svg: gallerySvg(1200, 800, GREEN), format: 'jpeg' },
  { file: 'public/images/gallery/event-01.jpg', svg: gallerySvg(1200, 800, CRIMSON), format: 'jpeg' },
  { file: 'public/images/gallery/podcast-01.jpg', svg: gallerySvg(1200, 800, GREEN), format: 'jpeg' },
  // Touch icon.
  { file: 'public/images/apple-touch-icon.png', svg: iconSvg(180), format: 'png', size: 180 },
];

for (const job of jobs) {
  const target = path.join(ROOT, job.file);
  await mkdir(path.dirname(target), { recursive: true });

  let pipeline = sharp(Buffer.from(job.svg));
  if (job.size) pipeline = pipeline.resize(job.size, job.size, { fit: 'contain' });

  const buffer =
    job.format === 'jpeg'
      ? await pipeline.jpeg({ quality: 82, mozjpeg: true }).toBuffer()
      : await pipeline.png({ compressionLevel: 9 }).toBuffer();

  await writeFile(target, buffer);
  console.log(`  ✓ ${job.file} (${(buffer.length / 1024).toFixed(1)} kB)`);
}

console.log('\nPlaceholders written. Replace them with real assets at the same paths —');
console.log('see public/images/README.md for exact dimensions.');
