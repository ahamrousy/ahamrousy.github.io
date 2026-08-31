import type { APIRoute, GetStaticPaths } from 'astro';
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

import { locales, brand, type Locale } from '~/site.config';
import { person } from '~/data/person';
import { allRoutes } from '~/lib/routes';
import { ogName } from '~/lib/og';

/**
 * Open Graph card generation, at build time, one PNG per page per language.
 *
 * Running this as an Astro endpoint rather than a standalone script means
 * getStaticPaths reads the *same* route registry the sitemap and llms.txt read.
 * Add a course and its two cards appear automatically; there is no separate
 * list to maintain and no possibility of a page pointing at a card that was
 * never rendered.
 *
 * Fonts are loaded from IBM Plex Sans Arabic, which ships Latin *and* Arabic
 * subsets as .woff — the one format satori accepts without decompression, and
 * a single family that covers both sides of the site.
 */

const require = createRequire(import.meta.url);

function fontFile(subset: 'latin' | 'arabic', weight: 400 | 600 | 700): Buffer {
  const pkg = require.resolve('@fontsource/ibm-plex-sans-arabic/package.json');
  const file = path.join(
    path.dirname(pkg),
    'files',
    `ibm-plex-sans-arabic-${subset}-${weight}-normal.woff`,
  );
  return fs.readFileSync(file);
}

/** The official Menova mark, embedded so satori needs no network access. */
const markPng = fs.readFileSync(path.resolve('public/images/menova-mark.png'));
const markUri = `data:image/png;base64,${markPng.toString('base64')}`;
// scale the mark to 40px tall in the header, preserving its aspect
const MARK_H = 40;
const MARK_W = Math.round((160 / 103) * MARK_H);

/**
 * The headshot, inlined as a data URI. Satori cannot fetch over the network,
 * so the bytes have to be embedded. Read once at module scope rather than per
 * card — there are 50+ cards per build.
 */
const headshot = (() => {
  const file = path.resolve(process.cwd(), 'public', 'images', 'ahmed-amrousy-headshot.jpg');
  return `data:image/jpeg;base64,${fs.readFileSync(file).toString('base64')}`;
})();

const fonts = [
  { name: 'Plex', data: fontFile('latin', 400), weight: 400 as const, style: 'normal' as const },
  { name: 'Plex', data: fontFile('latin', 700), weight: 700 as const, style: 'normal' as const },
  { name: 'PlexAr', data: fontFile('arabic', 400), weight: 400 as const, style: 'normal' as const },
  { name: 'PlexAr', data: fontFile('arabic', 700), weight: 700 as const, style: 'normal' as const },
];

export const getStaticPaths: GetStaticPaths = async () => {
  const routes = await allRoutes();
  // 404 is noindex and absent from the registry, but it still needs a card if
  // anyone shares the URL.
  const keys = [...routes.map((route) => ({ key: route.key, title: route.title })), {
    key: '404',
    title: { en: 'Page not found', ar: 'الصفحة غير موجودة' } as Record<Locale, string>,
  }];

  return keys.flatMap((entry) =>
    locales.map((lang) => ({
      params: { name: ogName(entry.key, lang) },
      props: {
        title: entry.title[lang] || entry.title.en,
        lang,
        // The homepage and the About page are the links Ahmed actually shares,
        // so those two get the profile card — portrait plus bio — rather than
        // the generic title card every other page uses.
        profile: entry.key === '' || entry.key === 'about',
      },
    })),
  );
};

/** Satori accepts a plain element tree — no JSX runtime needed here. */
const el = (type: string, props: Record<string, unknown>) => ({ type, props });

/**
 * Right-to-left layout for satori.
 *
 * Satori implements no part of the Unicode bidirectional algorithm. It shapes
 * and joins Arabic letterforms correctly *within a word*, but it then places
 * the words themselves in logical order from left to right — so an Arabic
 * reader, scanning right to left, gets the sentence backwards. The usual
 * escape hatches do not help either: U+202B and U+200F render as tofu boxes
 * rather than being honoured.
 *
 * The fix is to do the reordering here. Reverse the word order, and satori's
 * left-to-right placement then produces the correct right-to-left reading:
 *
 *   'تدريب الذكاء الاصطناعي'  →  reversed: 'الاصطناعي الذكاء تدريب'
 *   placed L→R:  الاصطناعي  الذكاء  تدريب
 *   read   R→L:  تدريب  الذكاء  الاصطناعي   ✓
 *
 * Line breaking has to be done here too, for the same reason. If satori wrapped
 * the reversed string itself, the first visual line would hold the *last* words
 * of the sentence. So `rtlLines` pre-wraps greedily and reverses within each
 * line, and the caller renders one element per line in a column.
 *
 * Numbers survive intact: '65 تنفيذيًا' → 'تنفيذيًا 65', which reads correctly
 * and keeps '65' itself left-to-right.
 */

/** Reverses word order for a string that fits on one line. */
function rtlLine(text: string): string {
  return text.trim().split(/\s+/).reverse().join(' ');
}

/**
 * Greedy wrap to `maxChars`, then reverse each line's words independently.
 * Returns lines in top-to-bottom reading order.
 */
function rtlLines(text: string, maxChars: number): string[] {
  const words = text.trim().split(/\s+/);
  const lines: string[] = [];
  let line: string[] = [];
  let length = 0;

  for (const word of words) {
    const next = length === 0 ? word.length : length + 1 + word.length;
    if (line.length > 0 && next > maxChars) {
      lines.push(line.reverse().join(' '));
      line = [word];
      length = word.length;
    } else {
      line.push(word);
      length = next;
    }
  }
  if (line.length) lines.push(line.reverse().join(' '));
  return lines;
}

export const GET: APIRoute = async ({ props }) => {
  const { title, lang, profile } = props as { title: string; lang: Locale; profile?: boolean };
  const isRtl = lang === 'ar';
  const family = isRtl ? 'PlexAr, Plex' : 'Plex, PlexAr';

  const text = (value: string) => (isRtl ? rtlLine(value) : value);

  const byline = isRtl
    ? text(`${person.nameAr} · مِنوفا`)
    : `${person.name} · ${brand.name}`;
  const kicker = isRtl
    ? text('تدريب الذكاء الاصطناعي للأعمال')
    : 'AI-for-Business training';
  const footer = isRtl
    ? text('الجامعة الأمريكية بالقاهرة · نايل إير · مصر والخليج')
    : 'AUC · Nile Air · Egypt & the GCC';

  // Long titles need a smaller size or they overflow the card.
  const titleSize = title.length > 64 ? 52 : title.length > 40 ? 62 : 72;

  // Arabic at bold weights averages ~0.58em advance. Deliberately conservative:
  // the line divs are nowrap, so if this estimate ran long satori would clip
  // rather than re-wrap — and a re-wrap would break the per-line reversal.
  const maxChars = Math.floor(1000 / (titleSize * 0.58));
  // English wraps natively; Arabic is pre-wrapped so the reversal stays
  // per-line. Both end up as an array of lines rendered in a column.
  const headingLines = isRtl ? rtlLines(title, maxChars) : [title];

  // ── Profile card: portrait left, biography right ───────────────────────
  if (profile) {
    // English uses the first two sentences of the medium bio — the exact
    // wording Ahmed asked to appear when the link is shared. Arabic uses the
    // short bio instead: Arabic sentences here are much longer, and slicing
    // the medium one overflowed the card.
    const shortened = isRtl
      ? person.bios.ar.short
      : person.bios.en.medium.split('. ').slice(0, 2).join('. ') + '.';
    const bioLines = isRtl ? rtlLines(shortened, 44) : [shortened];

    const profileSvg = await satori(
      el('div', {
        style: {
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: isRtl ? 'row-reverse' : 'row',
          backgroundColor: brand.colors.ink,
          fontFamily: family,
        },
        children: [
          // Portrait — full-bleed on its side, with a brand edge
          el('div', {
            style: { display: 'flex', width: 430, height: 630, position: 'relative' },
            children: [
              el('img', {
                src: headshot,
                width: 430,
                height: 630,
                style: { width: 430, height: 630, objectFit: 'cover' },
              }),
              el('div', {
                style: {
                  display: 'flex',
                  position: 'absolute',
                  top: 0,
                  [isRtl ? 'left' : 'right']: 0,
                  width: 8,
                  height: 630,
                  backgroundColor: brand.colors.coral,
                },
              }),
            ],
          }),

          // Text column
          el('div', {
            style: {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 18,
              padding: '56px 60px',
              width: 770,
            },
            children: [
              el('div', {
                style: {
                  display: 'flex',
                  flexDirection: isRtl ? 'row-reverse' : 'row',
                  alignItems: 'center',
                  gap: 12,
                },
                children: [
                  el('div', {
                    style: { display: 'flex', width: 34, height: 6, backgroundColor: brand.colors.green },
                  }),
                  el('div', {
                    style: {
                      color: brand.colors.coral,
                      fontSize: 22,
                      fontWeight: 700,
                      letterSpacing: isRtl ? '0' : '0.08em',
                    },
                    children: isRtl ? 'مِنوفا' : 'MENOVA',
                  }),
                ],
              }),
              el('div', {
                style: {
                  display: 'flex',
                  color: '#fff',
                  fontSize: 52,
                  fontWeight: 700,
                  letterSpacing: isRtl ? '0' : '-0.02em',
                  textAlign: isRtl ? 'right' : 'left',
                  justifyContent: isRtl ? 'flex-end' : 'flex-start',
                },
                children: isRtl ? person.nameAr : person.name,
              }),
              el('div', {
                style: {
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  color: 'rgba(255,255,255,0.82)',
                  fontSize: isRtl ? 21 : 23,
                  lineHeight: isRtl ? 1.5 : 1.45,
                  alignItems: isRtl ? 'flex-end' : 'flex-start',
                },
                children: bioLines.map((line) => el('div', { style: { display: 'flex' }, children: line })),
              }),
            ],
          }),
        ],
      }) as Parameters<typeof satori>[0],
      { width: 1200, height: 630, fonts },
    );

    const profilePng = new Resvg(profileSvg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
    return new Response(new Uint8Array(profilePng), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  }

  const svg = await satori(
    el('div', {
      style: {
        width: 1200,
        height: 630,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        backgroundImage:
          'linear-gradient(135deg, rgba(11,215,151,0.10) 0%, rgba(255,255,255,0) 42%), linear-gradient(315deg, rgba(245,105,101,0.10) 0%, rgba(255,255,255,0) 38%)',
        padding: '64px 72px',
        fontFamily: family,
        direction: isRtl ? 'rtl' : 'ltr',
      },
      children: [
        // ── Header: mark + wordmark ──────────────────────────────────────
        // `direction: rtl` alone does not flip flex order in satori, so the
        // row direction is set explicitly.
        el('div', {
          style: {
            display: 'flex',
            flexDirection: isRtl ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: 16,
          },
          children: [
            el('img', { src: markUri, width: MARK_W, height: MARK_H }),
            el('div', {
              style: { color: brand.colors.coral, fontSize: 30, fontWeight: 700, letterSpacing: '0.06em' },
              children: 'MENOVA',
            }),
            el('div', {
              style: { color: 'rgba(20,21,26,0.45)', fontSize: 24, marginInlineStart: 8 },
              children: kicker,
            }),
          ],
        }),

        // ── Title ────────────────────────────────────────────────────────
        el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            color: brand.colors.ink,
            fontSize: titleSize,
            fontWeight: 700,
            lineHeight: isRtl ? 1.4 : 1.15,
            letterSpacing: isRtl ? '0' : '-0.025em',
            maxWidth: 1000,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
          },
          children: headingLines.map((line) =>
            el('div', {
              // nowrap only for Arabic: the lines are already wrapped above and
              // letting satori re-wrap would scramble the reversed word order.
              style: { display: 'flex', ...(isRtl ? { whiteSpace: 'nowrap' } : {}) },
              children: line,
            }),
          ),
        }),

        // ── Footer: accent rule + byline ─────────────────────────────────
        el('div', {
          style: {
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            alignItems: isRtl ? 'flex-end' : 'flex-start',
          },
          children: [
            el('div', {
              style: { display: 'flex', height: 6, width: 220 },
              children: [
                el('div', { style: { display: 'flex', flex: 1, backgroundColor: brand.colors.green } }),
                el('div', { style: { display: 'flex', flex: 1, backgroundColor: brand.colors.greenBright } }),
                el('div', { style: { display: 'flex', flex: 1, backgroundColor: brand.colors.coral } }),
              ],
            }),
            el('div', {
              style: {
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                alignItems: isRtl ? 'flex-end' : 'flex-start',
              },
              children: [
                el('div', {
                  style: { color: brand.colors.ink, fontSize: 28, fontWeight: 700 },
                  children: byline,
                }),
                el('div', {
                  style: { color: 'rgba(20,21,26,0.5)', fontSize: 22 },
                  children: footer,
                }),
              ],
            }),
          ],
        }),
      ],
    }) as Parameters<typeof satori>[0],
    { width: 1200, height: 630, fonts },
  );

  const png = new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
