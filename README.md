# Menova — menova.website

The website for **Menova**, the AI-for-Business training practice of Eng. Ahmed Amrousy.
Static site, built with [Astro](https://astro.build), deployed to GitHub Pages, fully mirrored
in English and Arabic.

- **53 pages** — 26 routes, each in English and Arabic, plus a 404
- **Zero client-side framework.** The only JavaScript that ships is the chat widget (~5 kB)
  and the analytics consent gate, both of which are optional
- **Lighthouse 100 / 100 / 100 / 100** on English pages, 97+ on Arabic

---

## ⚠️ Do this before your first deploy

Open [`src/site.config.ts`](src/site.config.ts) and set two values:

```ts
export const SITE_URL = 'https://ahamrousy.github.io';  // ← your live origin, no trailing slash
export const BASE = '/';                                    // ← '/' for a root repo
```

| Where you publish | Repo name | `SITE_URL` | `BASE` |
| --- | --- | --- | --- |
| `username.github.io` | `username.github.io` | `https://username.github.io` | `/` |
| `username.github.io/menova` | `menova` | `https://username.github.io` | `/menova/` |
| A custom domain later | anything | `https://menova.ai` | `/` |

Everything else derives from those two lines — canonical URLs, hreflang, the sitemap, JSON-LD,
OG image URLs, `llms.txt`. **Nothing else in the codebase hardcodes a URL.** `astro.config.ts`
imports them directly, so the two can never drift apart.

Internal links never hardcode a leading `/` either — they go through `path()` and `asset()` in
[`src/i18n/routing.ts`](src/i18n/routing.ts), which prepend `BASE` automatically. If you add a
link by hand, use those helpers.

---

## Running it

```bash
npm install
```

```bash
npm run dev
```

Then open <http://localhost:4321>.

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Production build into `dist/` — also renders the 54 OG cards and the profile PDF |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run check` | TypeScript + Astro diagnostics. Should always report 0 errors |
| `npm run audit` | Lighthouse over 7 representative pages. Needs `npm run build` first, and Chrome installed |
| `npm run placeholders` | Regenerates the placeholder images. You will rarely need this |

`node scripts/check-seo-lengths.mjs` verifies every `<title>` is ≤ 60 characters and every meta
description ≤ 155. It runs in CI on every push.

---

## Publishing

1. Create the GitHub repo and push to `main`.
2. In the repo, go to **Settings → Pages → Build and deployment**, and set **Source** to
   **GitHub Actions**. (Not "Deploy from a branch" — the workflow publishes the built output,
   not the source.)
3. Push. [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) type-checks, verifies
   SEO field lengths, builds, and deploys.

The first deploy takes about two minutes. Subsequent ones are faster.

`public/.nojekyll` is committed and **must stay**. Without it GitHub Pages runs Jekyll, which
silently deletes any directory starting with an underscore — including Astro's `_astro/` bundle,
which would take the entire stylesheet and all the fonts with it.

---

## Editing content

Everything below lives in Markdown under `src/content/`. Frontmatter is validated by a Zod schema
in [`src/content.config.ts`](src/content.config.ts), so a typo or a missing field fails the build
with a precise message rather than shipping broken.

```
src/content/
├── courses/       en/ · ar/     six programmes
├── geo/           en/ · ar/     three country landing pages
├── case-studies/  en/ · ar/     five engagements
└── insights/      en/ · ar/     three articles
```

**The English file and the Arabic file share a slug.** That shared slug is the join key for the
hreflang pair, the language switch and the "related" links. `en/ai-for-business.md` and
`ar/ai-for-business.md` are the same page in two languages — the slug stays Latin in both, so
URLs never contain percent-encoded Arabic.

### Add a course

Create `src/content/courses/en/<slug>.md` and `src/content/courses/ar/<slug>.md`. Copy an existing
file as a starting point — every field is required unless the schema marks it optional.

On the next build you automatically get: both routes, both sitemap entries with the hreflang pair,
two OG cards, `Course` + `CourseInstance` JSON-LD, `FAQPage` JSON-LD, a catalogue card, a footer
link, and an entry in `llms.txt` and `llms-full.txt`. Nothing needs registering anywhere.

Two frontmatter fields deserve attention:

- **`summary`** — 2–3 self-contained sentences that define the thing without needing the rest of
  the page. This is what a generative engine quotes. Write it so it reads correctly in isolation.
- **`todos`** — anything you have not confirmed. It renders as a visible yellow panel on the page.
  That is intentional: a placeholder that is invisible becomes a fact by accident.

### Add a case study or an article

Same pattern, in `src/content/case-studies/` or `src/content/insights/`. Articles additionally
take `published`, `readingTime` and an `answers` array listing the question-style queries the
piece is written to answer.

### Edit the pages that aren't Markdown

Home, About, Method, Speaking, Podcast, Contact and the three hub pages are in
[`src/data/pages.ts`](src/data/pages.ts) — copy and FAQs, both languages, one file.

### Edit Ahmed's biography, roles, or the logo wall

[`src/data/person.ts`](src/data/person.ts) is the single source of truth. It feeds the About page,
the media kit, `Person` JSON-LD, `llms.txt`, the downloadable PDF and the chatbot. Change it once
and all six update. **Do not** restate a credential anywhere else — one record is what lets search
and AI engines resolve a single entity rather than several.

### Edit the chatbot's answers

[`src/data/chatbot.ts`](src/data/chatbot.ts). Each intent has keyword patterns per language, an
answer per language, and optional follow-up links. Anything the matcher does not recognise, and
anything after two consecutive misses, routes to WhatsApp.

It is a deterministic keyword matcher, not a language model — deliberately. GitHub Pages is
static, so there is no server to hold an API key, and a key shipped inside a static page is a key
handed to the public. The trade-off is that the bot cannot improvise; the benefit is that it
cannot invent a price, a date or a credential.

---

## Images

Full specification in [`public/images/README.md`](public/images/README.md) — exact filenames,
dimensions and aspect ratios.

Every image path currently resolves to a committed placeholder, so nothing 404s and nothing shifts
layout. **Replace a placeholder by dropping a real file at the same path with the same name.** No
code changes.

The one to do first is `public/images/ahmed-amrousy-headshot.jpg` (640 × 800). It appears on the
home hero and the About page, and it is the LCP element on the home page.

---

## Contact form

The form on `/contact/` works with no backend and no configuration: a small script composes a
`mailto:` from the entered values and hands it to the visitor's mail client. Nothing is sent to any
third party.

To collect submissions properly instead:

1. Create a free form at [formspree.io](https://formspree.io) using `ahmedamrousy@aucegypt.edu`.
2. Copy the form ID — the part after `formspree.io/f/`, e.g. `xdorwkqz`.
3. Put it in `src/site.config.ts`:
   ```ts
   formspreeId: 'xdorwkqz',
   ```

The form then POSTs to Formspree instead. No other change. The honeypot field and `_subject` are
already wired up. Formspree's free tier is 50 submissions/month.

The primary CTA everywhere on the site remains `mailto:` and WhatsApp — the form is a
progressive enhancement, not the main path.

---

## Analytics

`src/site.config.ts` → `analytics.ga4MeasurementId`. **While it is empty, no banner renders and
nothing is requested from Google.** Set it to your `G-XXXXXXXXXX` ID and a consent banner appears;
GA4 loads only after the visitor accepts, and the choice is stored in `localStorage`.

The same object holds `googleSiteVerification` and `bingSiteVerification` for the HTML-tag
verification method in Search Console and Bing Webmaster Tools. Empty values render no tag.

---

## How the bilingual mirror works

There is no duplicated page logic. Each route is a five-line file that renders a shared component
with `lang="en"` or `lang="ar"`:

```
src/pages/about.astro       →  <AboutPage lang="en" />
src/pages/ar/about.astro    →  <AboutPage lang="ar" />
```

RTL is handled entirely by CSS **logical properties** — `margin-inline-start`, `padding-inline`,
`border-inline-start`, `text-align: start`. The Arabic pages set `dir="rtl"` on `<html>` and
everything flips on its own. There is no separate Arabic stylesheet to keep in sync.

UI chrome strings are in [`src/i18n/ui.ts`](src/i18n/ui.ts). Page copy is in `src/data/pages.ts`
and the Markdown collections.

---

## Project layout

```
├── .github/workflows/deploy.yml   GitHub Pages deployment
├── public/
│   ├── .nojekyll                  required — see Publishing above
│   ├── favicon.svg
│   └── images/                    placeholders + README with exact specs
├── scripts/
│   ├── check-seo-lengths.mjs      title ≤ 60, description ≤ 155 (runs in CI)
│   ├── lighthouse.mjs             audit script
│   └── generate-placeholders.mjs  one-off placeholder generator
├── src/
│   ├── site.config.ts             ★ the two lines you must set
│   ├── content.config.ts          content schemas
│   ├── content/                   all Markdown, en/ + ar/
│   ├── data/                      person, pages, nav, chatbot knowledge base
│   ├── i18n/                      routing helpers, UI strings, collection helpers
│   ├── lib/                       JSON-LD builders, route registry, OG naming
│   ├── layouts/BaseLayout.astro   <head>, SEO, hreflang, JSON-LD
│   ├── components/                shared UI + one component per page type
│   ├── pages/                     thin routes + sitemap, robots, llms, OG, PDF
│   └── styles/global.css          the whole design system
├── DECISIONS.md                   what was decided and why
├── SEO-KEYWORD-MAP.md             page → keyword → intent → CTA
└── LAUNCH-CHECKLIST.md            what to do after the first deploy
```

### Generated at build time, not committed

- `dist/og/*.png` — 54 Open Graph cards, rendered with satori + resvg
- `dist/downloads/ahmed-amrousy-profile.pdf` — the one-page media-kit profile, from pdfkit
- `dist/sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`

All four read from the same route registry ([`src/lib/routes.ts`](src/lib/routes.ts)) that the
pages use, so they cannot fall out of sync with the site.

---

## After you deploy

Work through [`LAUNCH-CHECKLIST.md`](LAUNCH-CHECKLIST.md). Submitting the sitemap to Search
Console and getting the LinkedIn / AUC / Nile Air profile links pointing back here matters more
for the "Ahmed Amrousy" search goal than anything left to change in the code.
