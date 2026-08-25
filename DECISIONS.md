# Decisions

What was decided while building this, and why. Where I made a judgement call you might disagree
with, the reasoning is here so you can reverse it knowingly.

---

## Answered before the build

| Question | Your answer | Consequence |
| --- | --- | --- |
| Where it publishes | Root — `username.github.io` | `BASE = '/'`. Links still go through base-aware helpers, so moving to a project subpath later is a one-line change |
| Arabic scope | Full mirror, every page | 26 routes × 2 languages = 52 pages + 404. Arabic is written, not machine-translated |
| Pricing | Not published — "Request a proposal" | Every course and geo page ends in a proposal CTA. `Course` JSON-LD carries no `offers` node |

---

## Stack

**Astro 5, static output, zero client framework.** The brief asked for Astro or Eleventy and named
Astro as preferred. Astro's content collections give schema-validated Markdown — a mistyped
frontmatter field fails the build with a precise message instead of shipping a broken page. That
matters on a site with 34 content files in two languages.

**No UI framework.** Nothing on this site needs one. The only JavaScript that ships is the chat
widget (~5 kB) and the consent gate, and the consent gate renders nothing at all until you set a
GA4 ID.

**Self-hosted fonts (IBM Plex Sans + IBM Plex Sans Arabic, via Fontsource).** Google Fonts would
add two extra connections on the critical path and a third-party dependency for a site whose whole
performance case is that it has none. Fontsource ships the same fonts as `woff2` with proper
`unicode-range` subsetting, so English pages never download the Arabic file.

---

## The bilingual mirror

**One component per page type, two thin routes.** `src/pages/about.astro` and
`src/pages/ar/about.astro` are five lines each; both render `<AboutPage lang="…" />`. The
alternative — duplicating page logic per language — guarantees the two drift apart. This way a
change to a page is a change to one file.

**RTL entirely through CSS logical properties.** `margin-inline-start`, `padding-inline`,
`border-inline-start`, `text-align: start`. The Arabic pages set `dir="rtl"` and everything flips.
There is no `[dir="rtl"]` override sheet to maintain, and no way for the two directions to
diverge. The handful of genuinely directional things — the `→` in link arrows, the send icon —
are explicit one-line exceptions.

**Latin slugs on Arabic pages.** `/ar/courses/ai-for-business/`, not
`/ar/courses/الذكاء-الاصطناعي-للأعمال/`. Three reasons: the shared slug is what mechanically pairs
an EN page with its AR mirror for hreflang and the language switch; percent-encoded Arabic URLs
look broken when shared in WhatsApp or LinkedIn; and Arabic-language ranking depends on the page
content, not the URL string. The *content* is fully Arabic — only the URL segment is Latin.

**The language switch preserves the page.** Switching from `/ar/courses/ai-for-executives/` lands
on `/courses/ai-for-executives/`, not the homepage. Small thing, disproportionately annoying when
sites get it wrong.

---

## SEO

**Hand-rolled sitemap instead of `@astrojs/sitemap`.** The integration does not emit per-URL
`xhtml:link` hreflang alternates in the shape this site needs. `src/pages/sitemap.xml.ts` reads
the same route registry the pages read, so the alternates are reciprocal by construction rather
than by discipline.

**One `@graph` per page, with stable `@id`s.** The Person is always `${SITE_URL}/#ahmed-amrousy`
and the Organization always `${SITE_URL}/#menova`, on every page in both languages; everything
else references those ids rather than repeating the objects. This is the mechanism behind goal #1:
it lets a crawler merge 54 pages into one knowledge-graph node instead of 54 loosely related ones.

**Title ≤ 60 and description ≤ 155 enforced by the build.** Zod enforces it for content
collections; `scripts/check-seo-lengths.mjs` covers the hand-written pages and runs in CI. This
caught 27 over-length descriptions during the build — every one would have shipped truncated.

**`robots.txt` explicitly allows every AI crawler.** GPTBot, ClaudeBot, PerplexityBot,
Google-Extended, CCBot and the rest are named individually. This is a strategic choice, not an
oversight: the brief's second goal is to be *cited* by generative engines, and a model that cannot
crawl the site cannot cite it. If you ever want to reverse this, `src/pages/robots.txt.ts` is the
one place to change.

**`trailingSlash: 'always'`.** GitHub Pages serves `/about/index.html` at `/about/`. Matching that
exactly means canonical URLs, hreflang and internal links are byte-identical to what the server
actually serves — no redirect chains, no duplicate-URL ambiguity.

---

## Content

**Nothing invented.** Every fact traces to what you supplied. Where the brief did not give a
number, the page carries a visible yellow `TODO` panel rather than a plausible guess. The
placeholders currently outstanding:

- Course durations for the five non-flagship programmes. I set defaults (12h / 6h / 12h / 9h /
  12h) so the pages, the `Course` JSON-LD and the chatbot are coherent, and flagged every one.
  The 16-hour flagship is the only duration you actually gave me.
- Delivery dates for all five case studies.
- Whether the Kahraba 65 split between executive and departmental cohorts.
- Whether any client will provide a quotable testimonial.
- Lead times and invoicing arrangements on the geo pages.

`grep -rn "todos:" src/content` lists every one.

**No former brand name, no former business partner appears anywhere.** Menova is presented as a
solo venture founded by you.

**Credentials ordered AUC → DBA → industry → training record**, as specified — in
`src/data/person.ts`, on the About page, in the PDF and in `llms.txt`.

**Logo wall ships as neutral placeholders carrying each organisation's name as text.** No logo is
fabricated, nothing 404s, and every slot is legible to a screen reader from day one. Drop a real
file at the same path and it appears.

---

## The chatbot

**Rule-based keyword matcher, not an LLM.** GitHub Pages is static — there is no server to hold an
API key, and a key shipped inside a static page is a key handed to the public. A proxy would mean
running a backend, which the brief rules out.

The trade-off is real: the bot cannot improvise, and an unusual phrasing will miss. The benefit is
that it **cannot hallucinate a price, a date, or a credential** — which matters when the entire SEO
strategy depends on one consistent set of facts. Every answer restates something that also appears
in the page copy.

Behaviour: answers basic questions (who Ahmed is, the courses, durations, languages, locations,
pricing policy, frameworks, tools, clients, booking), offers quick-reply chips, keeps a WhatsApp
button permanently visible, and escalates to WhatsApp on any miss or after two consecutive misses.
Arabic input is normalised for the alef/hamza and ta-marbuta variants, so `الإمارات` and `الامارات`
both match.

If you later want a real conversational bot, the honest options are a hosted widget (Intercom,
Crisp, Tidio) or moving the site to a host with serverless functions. Both are a different project.

---

## Open Graph cards

**Generated at build time by an Astro endpoint**, not a standalone script, so `getStaticPaths`
reads the same route registry the sitemap does. Add a course and its two cards appear
automatically; a page can never reference a card that was not rendered.

**Satori has no bidirectional text support**, which took some working around. It shapes and joins
Arabic letterforms correctly *within a word*, then places the words themselves left-to-right in
logical order — so an Arabic reader gets the sentence backwards. The standard escape hatches do
not help: U+202B and U+200F render as tofu boxes rather than being honoured.

The fix is in `src/pages/og/[name].png.ts`: reverse the word order and pre-wrap the lines here, so
satori's left-to-right placement produces the correct right-to-left reading. Word spacing on the
Arabic cards is slightly wider than ideal as a result. It reads correctly, which was the bar.

**PDF typeset in Helvetica.** Embedding IBM Plex would need a TTF; the only formats in the
dependency tree are `woff`/`woff2`, which pdfkit cannot read. A media-kit one-pager is not worth
committing a font binary to the repo for. The PDF is English-only — Arabic in pdfkit needs shaping
support that would mean the same font problem plus a bidi library.

---

## Performance

Measured on the built output, mobile emulation, simulated throttling:

| | Perf | A11y | Best practices | SEO | LCP | CLS |
| --- | --- | --- | --- | --- | --- | --- |
| English pages | 100 | 100 | 100 | 100 | ~1.5 s | 0 |
| Arabic pages | 97 | 100 | 100 | 100 | ~2.3 s | ≤0.01 |

Two things about those numbers:

- **The local audit understates performance.** The audit server sends no `Content-Encoding` and no
  cache headers. GitHub Pages gzips HTML and sets long cache lifetimes on hashed assets — worth
  roughly 300 ms on the Arabic pages, where the HTML is larger because Arabic is multi-byte.
- **CSS is inlined rather than linked** (`inlineStylesheets: 'always'`). The stylesheet is ~23 kB,
  ~5 kB gzipped, and nearly every page uses most of it. Removing the render-blocking request is
  the largest LCP win available on a site with no client JavaScript. The cost is that CSS is not
  cached across page loads; on a site this size that is the right trade.

**`--ink-3` was darkened from `#6b7280` to `#5f6673`.** The original measured 4.47:1 against the
tinted section background — under the 4.5:1 WCAG AA threshold for normal text by a hair. Caught by
the audit, not by eye.

---

## Domain — the one thing worth reconsidering

A `github.io` subdomain inherits none of the parent domain's authority and carries a
generic-hostname disadvantage in competitive commercial verticals. It is fine for the name entity,
which has little competition, and workable for geo-qualified long-tail. It is a real handicap for
anything broader.

Buying `menova.ai` (or `.com`, or `.eg`) and pointing it at the same Pages deployment is a
15-minute job and the single biggest lever available:

1. Add a `CNAME` file to `public/` containing the bare domain.
2. Point the domain's DNS at GitHub Pages.
3. Change `SITE_URL` in `src/site.config.ts`.

Nothing else changes — every URL in the site derives from that constant. Doing it *before*
submitting to Search Console avoids a migration later, which is worth an hour of your time now.
