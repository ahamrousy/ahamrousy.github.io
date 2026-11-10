# Bilingual Website Architecture

*Decided 1 November 2026. Positioning: AI for business leaders ("think with AI, not just use it"). Markets: Egypt (home), Saudi Arabia, UAE, Kuwait, Oman.*

## URL scheme — keep the current one

| Option | Verdict |
|---|---|
| `/` = English, `/ar/` = Arabic (**current**) | **Keep.** Already indexed, hreflang reciprocal, x-default → English root |
| `/en/` + `/ar/` | Rejected. It would change every English URL, including the three pages Google has already indexed, for no ranking benefit; Google treats both schemes equally |
| Country subfolders (`/sa/`, `/ae/`…) | Rejected. Country targeting is done by dedicated landing pages, not duplicated sites — duplicating would create near-identical pages across five markets |

## Rules every page follows (enforced by `npm run seo`)
- One English and one Arabic version sharing a slug; each declares `hreflang="en"`, `hreflang="ar"` and `x-default` (English), reciprocally.
- Self-referencing canonical on each language version.
- `<html lang="ar" dir="rtl">` on Arabic; layout mirrors through CSS logical properties (no separate stylesheet).
- Separate localized title, description, Open Graph card and JSON-LD per language.
- Arabic is written for Arabic readers, not translated sentence by sentence; first brand mention on every Arabic page is **مِنوفا (Menova)**.
- Both versions listed in the single `sitemap.xml`.

## Site map

```
Home                              /                 /ar/
Ahmed Amrousy (About)             /about/           /ar/about/
Courses (catalogue — unchanged)   /courses/…        8 programmes × 2 languages
Method (POCAB, GCSE-F, SOSTAC…)   /method/
Case studies                      /case-studies/…   Kahraba, Kahraba Cowork & Fable, EECE, FEPS
Corporate AI training — markets
  Egypt                           /corporate-ai-training-egypt/
  Saudi Arabia                    /corporate-ai-training-saudi-arabia/
  UAE                             /corporate-ai-training-uae/
  Kuwait            NEW           /corporate-ai-training-kuwait/
  Oman              NEW           /corporate-ai-training-oman/
Insights (guides)                 /insights/…
  AI literacy training for employees   NEW
  Prompt engineering for managers (POCAB vs GCSE-F)   retargeted (AR → هندسة الأوامر)
  What corporate AI training costs · Measuring ROI · Data boundaries ·
  How to choose an executive AI course · What 65 executives taught me
Speaking · Podcast · Contact / Schedule a call
```

## Brief items deliberately not built (and why)
| Brief section | Decision |
|---|---|
| 7 separate "AI Training" tool pages (ChatGPT, agents, productivity…) | Covered inside existing programmes; separate pages would compete with each other and dilute the positioning you chose to keep |
| 8 industry pages | Build only where there is a real client: Energy/Utilities (Kahraba), Engineering exports (EECE), Education (FEPS, AI for Educators), Marketing (course + Nile Air). Healthcare, finance and customer service wait for a client |
| Qatar and Bahrain pages | Not in your selected markets |

## Adding a page later
Every page type is a template driven by one Markdown file per language — country (`src/content/geo/`), guide (`src/content/insights/`), case study (`src/content/case-studies/`). Adding a country or guide is two files; routing, hreflang, sitemap, schema, OG card and navigation update automatically.

## Country targeting, and why there is no `ar-IQ` (added 2026-11-09)

Iraq was added as a target market on 9 November 2026. It was added as a **page**, not as a
**locale**, and that distinction is deliberate.

The site serves one Arabic version to every Arabic-speaking market. Its hreflang set is therefore
`en`, `ar` and `x-default` on every route, and it is reciprocal by construction. Adding `ar-IQ`
would claim an Iraq-specific Arabic variant that does not exist: the Arabic on
`/ar/corporate-ai-training-iraq/` is the same Arabic served to Egypt, Saudi Arabia, the UAE, Kuwait
and Oman. A regional subtag that points at the same content as the generic `ar` tag tells a search
engine nothing true, and it invites a conflict with the existing `ar` annotation.

Country targeting is carried instead by signals that are actually true:

| Signal | Where |
|---|---|
| A dedicated page per country, in both languages | `src/content/geo/{en,ar}/corporate-ai-training-iraq.md` |
| `Service.areaServed` — the country plus its cities | `GeoPage.astro`, built from `region` + `cities` |
| `Organization.areaServed` — Iraq as its own `Country` node | `src/lib/schema.ts` |
| `ContactPoint.areaServed` and the `OfferCatalog` offers — ISO code `IQ` | `src/lib/schema.ts` |
| Local facts: cities, sectors, working week, lead time, legal context | the page frontmatter and body |
| Country-level copy in the site's own description | `pages.ts`, `chatbot.ts`, `llms.txt`, `llms-full.txt` |

**Iraq is not a GCC member.** It is a separate `Country` node in `areaServed` and must never be
folded into the `Gulf Cooperation Council` `Place` node that covers Saudi Arabia, the UAE, Kuwait
and Oman.

The same reasoning applies to any future market. Add a page, add the country to the six wiring
points above, and leave hreflang alone — unless a genuinely distinct Arabic version is written for
that market, at which point `ar-IQ` would become correct rather than decorative.
