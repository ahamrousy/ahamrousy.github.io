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
