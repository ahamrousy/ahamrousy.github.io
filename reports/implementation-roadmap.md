# Implementation roadmap — ahamrousy.github.io

Companion to [`website-aeo-geo-audit.md`](website-aeo-geo-audit.md). Written 25 October 2026.

## How tasks are scored

`priority = (impact × confidence) ÷ effort`, judged against one question: *does this make the
entity more findable or more corroborated?*

- **Impact** — expected effect on discovery, citation or conversion (1–5).
- **Confidence** — how well-evidenced the mechanism is. A documented requirement scores 5; a
  widely-repeated industry hypothesis scores 2.
- **Effort** — hours, including the parts only Ahmed can do.

The scoring is deliberately harsh on tactics with high impact *claims* and low evidence. That is
why no further schema work appears above P3.

---

## Done in this session

| # | Task | Problem it fixes | Files | Validation |
|---|---|---|---|---|
| D1 | Bilingual pricing guide | Every competitor hides pricing; the site's own FAQs deflected to "contact us". Answer engines cannot cite a deflection | `src/content/insights/{en,ar}/what-corporate-ai-training-costs.md` | Build: 57 pages, both routes + OG cards generated, Article JSON-LD valid |
| D2 | `ProfilePage` on `/about/` | Nothing named one page as authoritative for the Person entity | `src/lib/schema.ts`, `src/components/pages/AboutPage.astro` | `ProfilePage` present in both About pages; 254 JSON-LD nodes parse |
| D3 | IndexNow | Copilot grounds in Bing; a new `github.io` host is low in every crawl queue | `public/c5a7a8746c6e71271c5e21b7debfc993.txt`, `scripts/indexnow.mjs`, `package.json`, `.github/workflows/deploy.yml` | Dry run resolved 56 URLs from the sitemap |
| D4 | No canonical/hreflang on `noindex` | The 404 page advertised three URLs that do not exist, at every unmatched path | `src/layouts/BaseLayout.astro` | Both tags absent from `dist/404.html`, present on `/about/` |
| D5 | 404 language switch | Linked to `/ar/404/`, which does not exist | `src/components/SiteHeader.astro` | Internal link check: 3,168 links, 0 broken |
| D6 | Surface content `todos` | 10 unconfirmed facts were flagged in frontmatter that nothing rendered | `scripts/check-seo-lengths.mjs` | All 10 now print in the build log; never fails the build |
| D7 | ROI guide (EN + AR) | The standard CFO objection, unanswered on the site and by the competitive set. Absorbs the "why not buy online seats?" substitution argument | `src/content/insights/{en,ar}/measuring-roi-of-ai-training.md` | Build clean; Article JSON-LD valid in both languages |
| D8 | AI data-boundary guide (EN + AR) | The objection that stalls signatures. Also the one question buyers always ask: what happens to our documents | `src/content/insights/{en,ar}/ai-data-boundaries-at-work.md` | Build clean; both routes + OG cards generated |
| D9 | Internal linking between the buyer articles and the geo pages | **No article on the site linked to any other article.** The three buyer-intent guides were isolated pages | 2 insight pairs + 6 geo pages | 3,384 internal links checked, 0 broken |
| D10 | Two new FAQs on all six geo pages: non-technical audience, and what happens to client documents | Neither was answered anywhere. The Arabic versions use Egyptian phrasing — dialect coverage without a dialect page | `src/content/geo/{en,ar}/*.md` | AR Egypt FAQPage now carries 9 questions; JSON-LD valid |
| D11 | The audit server now gzips text, as GitHub Pages does | `uses-text-compression` was being reported as a 300 ms opportunity — an artefact of the test harness, not of production. It depressed the Arabic scores most, because inlined CSS makes those documents large | `scripts/lighthouse.mjs` | Arabic home 93 → 96; see audit §18 |

---

## P0 — Critical. Nothing else matters as much.

None of these are code. All of them are Ahmed.

| # | Task | Why | Effort | Dependency |
|---|---|---|---|---|
| P0-1 | Add the site URL to the LinkedIn profile website field | The only existing profile. Searches on 25 Oct 2026 surfaced neither the name nor the domain | 5 min | — |
| P0-2 | Verify Bing Webmaster Tools; paste the token into `analytics.bingSiteVerification` | Copilot grounds in Bing. Currently empty | 20 min | Bing account |
| P0-3 | Submit the sitemap in Search Console **and** Bing; read the coverage report | The only way to answer "is it indexed?", which this audit could not | 30 min | P0-2 |
| P0-4 | Ask AUC for the site link on the instructor bio page | A `.edu` link naming him as instructor is the strongest corroboration available | 1 email | AUC |
| P0-5 | Ask Nile Air for the link on any page that names him | Second-strongest | 1 email | Nile Air |

---

## P1 — High

| # | Task | Why | Effort | Files |
|---|---|---|---|---|
| P1-1 | Run the AI visibility baseline | There is no "before" number yet. Without one, nothing later can be claimed | 2 h | `research/ai-visibility-test-set.csv` |
| P1-2 | **Resolve the domain contradiction.** `README.md` is titled "Menova — menova.website"; `src/site.config.ts` says `ahamrousy.github.io`; there is no `public/CNAME`. Decide which is real | Every canonical, hreflang, sitemap entry, JSON-LD `@id` and OG URL derives from that one constant. A `github.io` subdomain also cannot accumulate domain authority. Migrating later costs every link earned in between | 1 h | `src/site.config.ts`, `public/CNAME`, DNS |
| P1-3 | Confirm the five outstanding content facts | They sit on live case-study pages. Unconfirmed numbers on a credibility page are worse than no numbers | 1 h | See audit §19 |
| P1-4 | Decide whether to publish an indicative price band | The highest-value remaining content change. Answer engines quote numbers | 30 min | `src/content/insights/{en,ar}/what-corporate-ai-training-costs.md` |
| P1-5 | Ask Kahraba, EECE and Logic Consulting for (a) a quotable testimonial and (b) a link to the case study | Converts four undocumented engagements into third-party evidence | 3 emails | — |

---

## P2 — Medium

| # | Task | Why | Effort |
|---|---|---|---|
| P2-1 | Google Scholar + ORCID, then paste into `src/site.config.ts` | They join `sameAs` automatically; appropriate for a DBA candidate | 1 h |
| P2-2 | Wikidata item for Ahmed Amrousy | Read by several knowledge systems. **Do this after P0-4/P0-5**, or it will be deleted for lack of references | 1 h |
| P2-3 | Add the speaking history and podcast episode list | Two pages currently assert activity without evidence | 2 h |

---

## P3 — Experimental, lower confidence

| # | Task | Caveat |
|---|---|---|
| P3-1 | Tool comparison article (ChatGPT / Claude / Gemini / Copilot for business) | High AEO value, ages in weeks. Only with a visible review date and a maintenance commitment |
| P3-2 | Ask to be considered for provider listicles (Edstellar and similar) | Honest inclusion requests only |
| P3-3 | YouTube: short Arabic explainers | Real reach, real production cost. Only if it is sustainable |
| P3-4 | Levantine / North African content | **No action.** No evidence of demand and no service presence. Revisit only if enquiries appear |

---

## 30-day plan

| Week | Ahmed | Repository |
|---|---|---|
| 1 | P0-1 … P0-5 | Deploy this session's changes; confirm IndexNow accepted |
| 2 | P1-1 baseline; P1-3 confirm facts | Clear the `todos:` fields the build now lists |
| 3 | P1-2 domain decision; P1-5 client emails | P1-4 price band, if approved |
| 4 | Read the first Search Console coverage data | P2-1 Scholar + ORCID into `site.config.ts` |

## 90-day plan

| Month | Focus |
|---|---|
| 1 | Corroboration and measurement (above) |
| 2 | Wikidata once references exist (P2-2); one LinkedIn post per week drawn from the five existing articles rather than written fresh |
| 3 | Re-run the identical visibility baseline; compare; P2-3 speaking and podcast history; decide on P3-1 |

**One rule for month 3.** When the numbers are compared, do not attribute a change to a specific
code edit. The honest statement is "these changes were made, and these numbers moved." Crawl,
index and answer-engine behaviour lag by weeks, and the sample is 24 prompts.

---

## Measurement

| Metric | Source | Cadence |
|---|---|---|
| Pages indexed | Search Console + Bing coverage | Weekly for a month, then monthly |
| Impressions and queries | Search Console → Performance | Weekly |
| Name-query position ("Ahmed Amrousy") | Logged-out incognito check | Monthly |
| Referring domains | Search Console → Links | Monthly |
| Brand mention rate / citation rate / recommendation rate | `research/ai-visibility-test-set.csv`, identical prompt set | Monthly |
| Enquiries | Inbox and WhatsApp, tagged by source | Continuous |

The last row is the only one that pays. The others are leading indicators for it.
