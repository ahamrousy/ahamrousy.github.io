# Website, SEO, AEO and GEO audit — ahamrousy.github.io

**Audited:** 25 October 2026
**Scope:** the repository at `MENOVA/Website` and the live site at <https://ahamrousy.github.io/>
**Method:** source inspection, a production build, HTTP checks against the live origin, automated
JSON-LD and internal-link validation, and web research with a US-based search tool.

Throughout this report:

- **Verified** — observed directly in the source, the build output, or an HTTP response.
- **Research finding** — observed in a third-party source, with the source named.
- **Inference** — a reasoned conclusion, labelled as such.
- **Recommendation** — a proposed action.

---

## 1. Executive summary

The on-page work on this site is essentially finished, and it is better than that of every
competitor examined. The constraint on visibility is not the website. It is that nothing outside
the website says the person exists.

**Verified.** 56 indexable pages, fully bilingual with reciprocal hreflang, 254 JSON-LD nodes
across 14 schema types with zero parse errors, a hand-rolled sitemap with per-URL alternates, an
`llms.txt` and an `llms-full.txt`, every major search and AI crawler explicitly allowed in
`robots.txt`, no client-side rendering of content, and — after this session — zero broken internal
links.

**Research finding.** Searches on 25 October 2026 for `"ahamrousy.github.io"`, for
`"Ahmed Amrousy" AI training Egypt Menova`, and for `"Ahmed Amrousy" Nile Air AUC marketing`
returned **no result referring to this site or this person**. Not a low ranking — no result at all.
The LinkedIn profile recorded in `src/site.config.ts` did not surface either.

**Inference.** An answer engine assembles a person from corroborating sources. Here there is one
source, and it is the person's own site. That is why the highest-priority items in this report are
not code changes, and why most of them cannot be done by an agent.

**What was implemented in this session** (detail in §14 and in `reports/implementation-roadmap.md`):

| Change | Type |
|---|---|
| Three new bilingual guides — pricing, ROI measurement, and AI data boundaries at work | Content gaps closed |
| Internal links between the buyer-intent guides and all six geo pages | Information architecture |
| Two new FAQs on all six geo pages — non-technical audience, and what happens to client documents | Content + dialect coverage |
| `ProfilePage` structured data on `/about/` and `/ar/about/` | Entity |
| IndexNow key + automatic submission on deploy | Crawl / Copilot |
| Fixed: the 404 page emitted a canonical and two hreflang links to URLs that do not exist | Technical defect |
| Fixed: the language switch on the 404 page pointed at a non-existent `/ar/404/` | Technical defect |
| Fixed: the Lighthouse harness did not gzip, so it reported a 300 ms problem production does not have | Measurement defect |
| Outstanding content `todos` now reported in the build log instead of being silently invisible | Process defect |

The site went from 56 to **60 indexable pages**, and from three articles to **six**.

---

## 2. Website and repository overview

**Verified.**

| Item | Finding |
|---|---|
| Framework | Astro 5.14, static output, no UI framework |
| Hosting | GitHub Pages via `.github/workflows/deploy.yml`, built on push to `main` |
| Origin | `https://ahamrousy.github.io`, `BASE = '/'`, `trailingSlash: 'always'` |
| Pages built | 61 (60 indexable + 404) |
| Languages | English at root, Arabic under `/ar/`, mirrored by shared content slugs |
| Content model | Astro content collections: `courses` (8), `caseStudies` (4), `geo` (3), `insights` (6) — each in both languages |
| Client JS | A chatbot widget, a consent banner and a motion script. **No page content depends on JavaScript** |
| CSS | One stylesheet, inlined at build time |
| Build gates | `check-seo-lengths.mjs`, then `astro check`, then `astro build` — all three must pass to deploy |

The repository already contains `DECISIONS.md`, `SEO-KEYWORD-MAP.md`, `LAUNCH-CHECKLIST.md` and
`IMAGE-BRIEF.md`. The strategy in those documents is sound and this audit does not re-litigate it.

---

## 3. Verified technical findings

Everything in this section was measured, not inferred.

| Check | Result |
|---|---|
| `GET /` | 200 |
| `GET /robots.txt` | 200, names the sitemap at the correct origin |
| `GET /llms.txt` | 200 |
| `GET /sitemap.xml` | 200. 56 URLs when audited; **60** after this session's work |
| `GET /ar/`, `/about/`, `/courses/` | 200 |
| `GET /nonexistent-page-test/` | **404** — correct status, not a soft 404 |
| JSON-LD | 60/60 pages carry a parseable `@graph`; 274 nodes; **0 invalid, 0 missing** |
| Internal links | 3,168 checked; **0 broken** (1 broken before this session — see below) |
| Type check | `astro check`: 0 errors, 0 warnings, 0 hints across 76 files |
| Build | Clean, 61 pages |

**JSON-LD node census (built output):**

```
Person 60 · Organization+EducationalOrganization 60 · BreadcrumbList 58 · FAQPage 48
Course 16 · Article 12 · Service 6 · ProfilePage 2 · ContactPage 2 · ItemList 2
WebSite 2 · Blog 2 · DefinedTermSet 2 · PodcastSeries 2
```

One `Person` and one `Organization` on every page, both referenced by a stable `@id`, is exactly
the construction that lets a crawler merge 60 pages into one entity rather than 60.

### Defects found and fixed

1. **Invalid canonical and hreflang on the 404 page.** `BaseLayout.astro` emitted
   `<link rel="canonical" href=".../404/">` plus hreflang links to `/404/` and `/ar/404/`. None of
   those URLs exist — GitHub Pages serves `404.html` at every unmatched path. Because Pages returns
   that file for *any* bad URL, every 404 on the site was advertising three non-existent URLs.
   Impact is bounded (the page is `noindex, nofollow`), but it is an error Search Console reports.
   **Fixed:** a `noindex` page now emits neither tag.

2. **Broken language switch on the 404 page.** The switch linked to `/ar/404/`, which does not
   exist, so switching language from a 404 produced another English 404. **Fixed:** it now goes to
   the other language's home page. This was the site's only broken internal link.

3. **`todos:` were invisible.** `src/content.config.ts` documents the field as rendering "a visible
   TODO panel so a placeholder can never quietly harden into a fact". No component renders it.
   Ten unconfirmed facts across eight files were therefore invisible everywhere — including
   participant counts and a delivery date on live case studies. Rendering them publicly would show
   buyers an unfinished page, so **the fix reports them in the build log** instead. They are listed
   in §19.

### Not defects, but worth stating

- **`llms.txt`.** Google documented on 15 June 2026 that it ignores `llms.txt` and that the file
  neither helps nor harms visibility; John Mueller has separately argued the discovery use case is
  a dead end because the file is self-reported
  ([Search Engine Journal](https://www.searchenginejournal.com/googles-mueller-says-llms-txt-cant-help-llms-differentiate-sites/579304/)).
  **Recommendation: keep both files.** They cost nothing, they are honest, and they are useful to an
  agent already on the site. But do not count them as a visibility mechanism, and do not add more
  files of this class.
- **`ar` rather than `ar-EG` in hreflang.** Correct. One Arabic version serves all markets; a
  regional code would claim a distinction the content does not make.
- **No `AggregateRating` or `Review` markup.** Correct, and it should stay that way until there are
  real, attributable testimonials.

---

## 4. Positioning analysis

**Verified from the live site.** The H1 is *"I teach leaders how to think with AI — not how to use
it."* The first paragraph names Menova as an AI-for-Business training practice founded by Ahmed
Amrousy, delivering executive programmes in Arabic or English across Egypt, Saudi Arabia and the
UAE, 70% hands-on, taught on the client's own data.

This is a strong, specific, non-generic position. A first-time visitor knows within one screen who
this is for and what is being sold. Credentials are present without crowding the offer. **No change
recommended.**

**One ambiguity, for confirmation.** The site presents two entities: *Menova* (the practice) and
*Ahmed Amrousy* (the person). The schema handles this correctly, but off-site the name will carry
further than the brand — the brand is new, the person has an AUC appointment and a named employer.
**Recommendation: corroborate the person first** and let the brand follow. That is already how
`/about/` is built; it should also be how the LinkedIn and directory work is sequenced.

---

## 5. Research methodology, and what it cannot tell you

Research was run on 25 October 2026 using the web-search tool available in this session, which is
US-based. The following distinctions are maintained throughout:

- A page that **loads** — verified by HTTP status.
- A page that is **crawlable** — verified from `robots.txt` and the absence of `noindex`.
- A page that is **indexed** — **not verified.** This requires Search Console or Bing Webmaster
  Tools, neither of which is accessible from this session.
- A page that **ranks** — not verified.
- A page that is **cited by an answer engine** — not verified. See §9.

A query returning nothing is not proof that a page is unindexed. It is evidence of absence from one
search index as surfaced by one tool, from one region, on one date. That is how the findings below
should be read.

---

## 6. Competitors

Full records in [`research/competitor-analysis.csv`](../research/competitor-analysis.csv). Fourteen
organisations, each with a verifiable source. Direct competitors:

| Competitor | Market | Why it competes |
|---|---|---|
| [Guru Academy](https://egyptinnovate.com/en/entities/profile/guru-academy) | Egypt | "AI-native training institution" for the Arab world; strategy through engineering |
| [EduDelphi Egypt](https://edudelphi.com/eg/) | Egypt | Delphi AI Academy; in-person, live online, blended, private cohort |
| [CLS Learning Solutions](https://www.cls-learning.com/) | Egypt | Established since 1995; AI and data-science tracks |
| [LEORON](https://www.leoron.com/ar/aaipl-ai-at-work-the-complete-applied-artificial-intelligence-program-for-leaders) | GCC | "AI at Work — applied AI program for leaders", with an Arabic landing page |
| [GLOMACS](https://glomacs.com/) | GCC | Open-enrolment AI courses in Riyadh with published dates and fees |
| [Ahmed Abdel Razek (Zoka)](https://sessionize.com/izoka) | GCC/MENA | The closest individual peer — Arabic AI speaker and educator, Dubai |

Indirect but competing for the same queries: ALX Enterprise, AI Superior, Improving, Edstellar,
ClickUp's Arabic blog, AUC Executive Education, and the Udemy/Coursera layer.

**One claim not verified.** Guru Academy's directory listing states it is "Certified by Anthropic."
That was not verifiable from the source available and is recorded as unverified.

**One correction to the record.** A search summary attributed a published Riyadh course fee to
GLOMACS. Fetching that URL returned **HTTP 404**, so no competitor price is cited anywhere in this
audit or in the new pricing article.

---

## 7. Competitor comparison

| Competitor | Audience | Positioning | Strongest content | Search visibility | AI citation | Opportunity |
|---|---|---|---|---|---|---|
| Guru Academy | Orgs + professionals | Institutional, AI-native | Breadth of catalogue | Ranked first in the Egypt provider query | Not tested | Named instructor with a verifiable appointment beats an institutional claim |
| EduDelphi | Teams | Flexible formats | Delivery options | Ranked in the same query | Not tested | No named client proof — Menova has four documented engagements |
| LEORON | Leaders | Gulf institute, catalogue | Structured leader programme, Arabic page | Ranked in the Arabic executive query | Not tested | They sell a catalogue; Menova sells the principal in the room |
| GLOMACS | Managers | Open-enrolment | **Published dates and prices** | Ranked for Riyadh | Not tested | Their price transparency is their edge — this is why §13 recommends a price band |
| Zoka | Arabic tech community | Community-led educator | Community + speaking | Top result for the Arabic trainer query | Not tested | His visibility comes from speaking and community, not his site. That is the lesson |
| Udemy / Coursera | Individuals | Cheap, self-paced | Enormous indexed catalogue | **Dominates the Arabic course SERP** | Not tested | A different product. The argument against it now exists on the pricing page |

**The structural finding.** Searching `أفضل كورس تعلم الذكاء الاصطناعي` returns self-paced
technical courses — Python, LangChain, agentic AI — aimed at individual learners. Searching for
corporate executive AI training in Arabic returns UAE government programmes, a SaaS company's
translated listicle, and training institutes. **No Arabic-language, practitioner-written content
about buying corporate AI training appeared in either result set.** That is an open lane, and it is
the lane this site is already built for.

---

## 8. Search visibility findings

| Query | Date | Result |
|---|---|---|
| `"ahamrousy.github.io"` | 2026-10-25 | No result referring to the site |
| `"Ahmed Amrousy" AI training Egypt Menova` | 2026-10-25 | No result containing the surname or the brand |
| `"Ahmed Amrousy" Nile Air AUC marketing` | 2026-10-25 | No result; the tool surfaced other Nile Air executives instead |

**Inference, stated as such.** Three facts make this unsurprising rather than alarming: the site is
new, it lives on a shared `github.io` host with no domain authority of its own, and — per §1 —
almost nothing links to it. Search Console will say whether the pages are *indexed*; these searches
cannot.

**A contradiction worth resolving first.** `README.md` is titled **"Menova — menova.website"**, but
`src/site.config.ts` sets `SITE_URL = 'https://ahamrousy.github.io'` and there is **no `public/CNAME`
file**. Either the domain was chosen and never wired up, or the README is stale. This matters more
than it looks: every canonical, hreflang, sitemap entry, JSON-LD `@id` and OG URL on the site derives
from that one constant, so the two cannot both be right. **Confirm which is intended before
submitting anything to Search Console** — a migration afterwards costs far more than doing it now.
(`README.md` also still says "53 pages"; the build now produces 57.)

**The `github.io` question.** `DECISIONS.md` already flags the domain as the one thing worth
reconsidering, and this audit agrees, with a reason: a subdomain of `github.io` cannot accumulate
domain-level authority, cannot be verified as an entity's official website in the way a brand
domain can, and reads as provisional to a procurement officer comparing three proposals. Moving is
cheap now and expensive later, because every acquired link would have to be re-earned. **This is a
decision for Ahmed, not an action to take unilaterally.**

---

## 9. AI answer-engine baseline

**Not run.** This session has no logged-in access to ChatGPT, Claude's consumer product, Gemini,
Copilot, Kimi or Perplexity. Reporting a baseline from a proxy would be dishonest, so none is
reported.

What exists instead is a **reusable, scored prompt set** at
[`research/ai-visibility-test-set.csv`](../research/ai-visibility-test-set.csv) — 24 prompts across
English, MSA, Egyptian and Gulf Arabic, covering entity, provider-recommendation, pricing,
method-ownership and case-study intents, with neutral phrasing that does not presuppose a
recommendation.

**Scoring method**, so the test is repeatable:

| Metric | Definition |
|---|---|
| Brand mention rate | Answers naming "Menova" or "Ahmed Amrousy" ÷ prompts run |
| Site citation rate | Answers linking to `ahamrousy.github.io` ÷ prompts run |
| Relevant recommendation rate | Recommendation prompts (P-04 to P-10) where the entity is recommended ÷ those prompts |
| Citation accuracy | Of answers that mention the entity, the share describing role, affiliation and services correctly |
| Share of mentions | Entity mentions ÷ all provider mentions in the same sample |
| Language coverage | The above, split by English / MSA / Egyptian / Gulf |

**Rules for running it.** Fresh session per prompt. Record whether web search was on. Record the
sample size with every number. Re-run the identical set — not a similar one. Expect the first
baseline to be close to zero on every metric; that is the point of a baseline.

---

## 10. English question database

Twenty-five English questions in
[`research/ai-training-questions.csv`](../research/ai-training-questions.csv), each marked
**observed** or **inferred**, with no fabricated volumes — every volume cell reads `unverified`,
because no keyword tool was available.

Highest-priority English questions, by business relevance against ability to answer well:

1. *How much does corporate AI training cost?* — **gap closed this session.**
2. *Who is Ahmed Amrousy?* — on-page answer complete; the gap is off-site.
3. *How do I choose an AI training provider?* — covered.
4. *How do I measure the ROI of AI training?* — **open.**
5. *What are the risks of using AI at work?* — **open.**

## 11. Arabic question database

Ten MSA questions plus dialect variants, in the same file. The two open gaps mirror the English
ones: ROI measurement and workplace AI governance, neither of which exists in Arabic on the site.

A third Arabic-specific gap: **the substitution objection**. Because the Arabic SERP is dominated by
self-paced online courses (§7), the Arabic buyer's unspoken question is "why not just buy Udemy
seats for the team?" The new pricing article answers it, but it deserves fuller treatment in Arabic.

## 12. Dialect findings

**Research finding.** Egyptian, Gulf, Levantine and North African phrasings differ enough to be
distinct queries (`بكام` vs `كم يكلف` vs `شو سعر`), but they resolve to the same buying question.

**Recommendation, and what was deliberately *not* done.** No dialect pages were created. Building
one page per wording would produce near-duplicate thin content, which the brief rules out and which
search engines treat as exactly what it is. Instead, dialect phrasings belong in the FAQ blocks of
the pages that already exist — the new Arabic pricing article carries `تدريب الذكاء الاصطناعي بكام`
among its secondary keywords. Candidate additions are in the questions CSV marked `P2 / سؤال شائع`.

**No Levantine or North African content is recommended** at this stage. There is no evidence of
demand and no service presence in those markets; the honest entry is "no action until demand
appears."

---

## 13. Content gap analysis

| Gap | Evidence | Status |
|---|---|---|
| Pricing / how training is quoted | Every competitor found hides price; GLOMACS's transparency is its differentiator; the site's own FAQs deflected to "contact us" | **Closed** — `/insights/what-corporate-ai-training-costs/` (EN + AR) |
| ROI measurement | Standard CFO objection; nothing on the site addressed it | **Closed** — `/insights/measuring-roi-of-ai-training/` (EN + AR) |
| Workplace AI governance and data boundaries | Recurring executive concern; partly in `/method/`, never addressed directly | **Closed** — `/insights/ai-data-boundaries-at-work/` (EN + AR), plus a FAQ on all six geo pages |
| Self-paced course substitution, in Arabic | Arabic SERP dominated by Udemy/Coursera | **Closed** — a full section of the ROI article, in both languages |
| Tool comparison (ChatGPT / Claude / Gemini / Copilot) | High-volume informational pattern | Open — P3 **with a caveat**: it ages in weeks. Only write it with a visible review date and a commitment to maintain it |
| Speaking history, podcast episode list | `LAUNCH-CHECKLIST.md` §4 | Open — needs Ahmed's facts |
| Testimonials | Four case studies, zero attributable quotes | Open — needs client permission |

**An indicative price band is the single highest-value remaining content change.** The new article
is written to stand without one. Adding a from–to figure per programme day would make it the only
page in this competitive set that answers the question an answer engine is actually asked — and
answer engines quote numbers.

---

## 14. Technical SEO recommendations

Implemented this session:

- `ProfilePage` on `/about/` and `/ar/about/`, with `mainEntity` pointing at the existing Person
  `@id`. It names one page as authoritative for the entity instead of leaving a crawler to infer it
  from 56 pages carrying the same Person
  ([Google documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page)).
- Canonical and hreflang suppressed on `noindex` pages (§3, defect 1).
- Language switch fixed on the 404 page (§3, defect 2).
- IndexNow (§15).

Recommended, requiring Ahmed:

- **Bing Webmaster Tools verification.** `analytics.bingSiteVerification` is empty. Copilot grounds
  in Bing. This is a five-minute task with a direct line to one of the six target platforms.
- **Submit the sitemap in Search Console and Bing**, then read the coverage report. That is the only
  way to settle the indexation question in §5.
- **Fill `contact.googleScholar`, `contact.orcid`, `contact.github`.** They join `sameAs`
  automatically; `sameAs` currently carries four entries.

Not recommended:

- Adding more AI-specific text files. `llms.txt` is already present and already ignored by Google.
- Any further schema. Fourteen types with zero errors is already past the point of diminishing
  returns; more markup on an uncorroborated entity changes nothing.

---

## 15. AEO/GEO strategy

**What is documented, versus what is claimed.**

| Tactic | Status | Evidence |
|---|---|---|
| Crawler access for AI bots | **Documented requirement.** GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot and others are explicitly allowed | `src/pages/robots.txt.ts` — already correct |
| Content in server-delivered HTML | **Documented requirement.** Verified present | Build output |
| Structured data | **Documented** for Google rich results. Its role in LLM citation is **a reasonable hypothesis, not a documented fact** | schema.org / Google docs |
| Direct-answer formatting | **Reasonable hypothesis**, widely reported, not vendor-documented | Industry sources |
| `llms.txt` | **Documented as ignored by Google** (15 June 2026) | [SEJ](https://www.searchenginejournal.com/googles-mueller-says-llms-txt-cant-help-llms-differentiate-sites/579304/) |
| Third-party corroboration | **The mechanism most consistent with how these systems work**, and the site's weakest axis | §8 |
| IndexNow → Bing → Copilot | **Documented protocol** for faster crawling. A discovery mechanism, **not** a ranking or citation signal | [indexnow.org](https://www.indexnow.org/documentation) |

**The strategy in one line:** the site is already built to be quotable; the work now is to make it
findable and corroborated. No technique guarantees that any AI platform will recommend any website,
and nothing in this report should be read as promising that.

---

## 16. Priority backlog

In [`reports/implementation-roadmap.md`](implementation-roadmap.md).

---

## 17. Distribution strategy

Summarised here, scheduled in the roadmap. The ranked list for an individual with no team and no
budget:

1. **LinkedIn profile website field + a weekly post.** Free, immediate, and the one profile that
   already exists.
2. **The AUC instructor bio link.** A `.edu` link naming him as instructor is the highest-authority
   corroboration available, and it costs one email.
3. **Nile Air corporate or press page.** Second-highest authority, same cost.
4. **Wikidata item.** Occupation, employer, educated-at, official website. Wikidata is read by
   several knowledge systems. Requires that the sources in §8 exist first — an item with no
   references will not survive.
5. **Google Scholar and ORCID.** Appropriate for a DBA candidate; both feed `sameAs`.
6. **Client case-study links.** Kahraba, EECE, Logic Consulting — ask each whether they will link to
   the matching case study.
7. **Podcast episode descriptions** linking to `/podcast/`.
8. **Provider listicles** (Edstellar and similar) — ask to be considered, honestly.

**Not recommended:** seeded Reddit threads, manufactured reviews, fake questions, reciprocal link
schemes. Beyond being against the brief, an uncorroborated entity caught manufacturing corroboration
is worse off than one with none.

---

## 18. Validation results

| Check | Result |
|---|---|
| `node scripts/check-seo-lengths.mjs` | Pass — all titles ≤ 60, descriptions ≤ 155. Now also reports 10 outstanding content todos. It caught one over-length description on a new article during this session, which is the gate working |
| `npm run check` (`astro check`) | 0 errors, 0 warnings, 0 hints, 76 files |
| `npm run build` | Clean, 57 pages |
| JSON-LD parse (all built pages) | 56/56 valid, 254 nodes, 0 errors |
| Internal link check (3,168 links) | 0 broken (1 before this session) |
| IndexNow dry run | URLs resolved from the sitemap; submission format accepted by the script |
| Live HTTP checks | All key URLs 200; unmatched path correctly returns 404 |

### Lighthouse — measured, mobile, simulated throttling

| Page | Perf | A11y | Best pr. | SEO | LCP | CLS |
|---|---|---|---|---|---|---|
| Home (EN) | 99 | 100 | 100 | 100 | 2.0 s | 0.002 |
| About (EN) | 100 | 100 | 100 | 100 | 1.9 s | 0 |
| Course detail (EN) | 100 | 100 | 100 | 100 | 1.4 s | 0 |
| Geo landing (EN) | 100 | 100 | 100 | 100 | 1.4 s | 0.007 |
| Article (EN) | 100 | 100 | 100 | 100 | 1.4 s | 0 |
| Home (AR, RTL) | **96** | 100 | 100 | 100 | 2.7 s | 0.001 |
| About (AR, RTL) | **98** | 100 | 100 | 100 | 2.3 s | 0 |

All categories at or above the repository's own 95 threshold.

**The first run did not pass, and the reason is worth recording.** Arabic pages scored 93 and 94,
against 99–100 in English. The only opportunity Lighthouse flagged with any saving was
`uses-text-compression`, at 300 ms — because `scripts/lighthouse.mjs` served `dist/` without gzip,
while GitHub Pages serves compressed. Inlining the stylesheet makes every document large and highly
compressible, so the artefact hit hardest exactly where the real pages are fastest. Adding gzip to
the harness moved Arabic home 93 → 96 and Arabic About 94 → 98, with no change to the site itself.

What remains is real and is not a defect: an Arabic page downloads four font files (Latin variable
45 kB plus Arabic 400/600/700 at ~43 kB each) against one on an English page, because Arabic pages
legitimately render both scripts. The LCP element on `/ar/` is the `<p class="lede">` paragraph, and
its font is already preloaded. Dropping a weight would cut ~45 kB but would change the design, so it
is a decision for Ahmed rather than a fix to apply.

---

## 19. Limitations and outstanding items

**Access not available in this session:** Google Search Console, Bing Webmaster Tools, any keyword
tool, and any logged-in AI assistant. Consequently: indexation is unverified, all search volumes are
marked `unverified`, and the AI baseline is unrun.

**Facts only Ahmed can confirm** — now reported by the build, previously invisible:

| File | Outstanding |
|---|---|
| `case-studies/{en,ar}/eece.md` | Number of participating companies |
| `case-studies/{en,ar}/feps-logic.md` | Number of participating faculty |
| `case-studies/{en,ar}/kahraba-cowork-fable.md` | Delivery date |
| `case-studies/{en,ar}/kahraba.md` | A quotable testimonial, if Kahraba approves |
| `courses/{en,ar}/ai-for-entrepreneurs.md` | Session-by-session content before first public delivery |

**Decisions requiring Ahmed:** the custom domain (§8); whether to publish an indicative price band
(§13); whether to keep the IndexNow ping on every deploy (§15).

---

## 20. Next steps

1. Verify Bing Webmaster Tools; submit the sitemap in both Search Console and Bing. *(Ahmed, 1 hour)*
2. Add the site URL to the LinkedIn profile website field. *(Ahmed, 5 minutes)*
3. Email AUC and Nile Air asking for the site link on the pages that already name him. *(Ahmed)*
4. Run the baseline in `research/ai-visibility-test-set.csv` and record the results. *(Ahmed, ~2 hours)*
5. Decide the domain question.
6. Clear the five outstanding content facts in §19.
7. Then, and only then, write the next two articles (ROI, governance).

Steps 1–3 are worth more than any further change to this repository.
