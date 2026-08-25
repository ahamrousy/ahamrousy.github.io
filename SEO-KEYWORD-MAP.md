# SEO keyword map — Menova

One row per page. `primaryKeyword` and `secondaryKeywords` in each Markdown file's frontmatter
must match this table; the singleton pages are in `src/data/pages.ts`.

**A note on realism before the table.** A `github.io` subdomain inherits none of the parent
domain's authority and carries a generic-hostname penalty in competitive commercial verticals. It
will not outrank Coursera, Google or DataCamp for the bare term "AI courses", and nothing in this
build changes that. What it *can* win, and what this map is engineered around:

1. **The name entity** — "Ahmed Amrousy", "Eng Ahmed Amrousy", "أحمد عمروسي". Low competition,
   high intent, and the single highest-value term on the list. This should be #1 within weeks.
2. **Geo-qualified long-tail** — "corporate AI training Egypt", "AI course for executives Cairo",
   "تدريب الذكاء الاصطناعي للشركات". Modest volume, high conversion, genuinely winnable.
3. **Generative engine citation (GEO)** — being the source an AI assistant quotes when asked
   "who is Ahmed Amrousy" or "best AI course for executives in Egypt". Not a ranking, and not
   measured by rank trackers, but increasingly where this audience actually asks the question.

Moving to a real domain (`menova.ai` or similar) is the single biggest lever available. See
DECISIONS.md § Domain.

---

## Priority 1 — the name entity

The About page is the hub. Every other page links to it, it carries the fullest `Person` JSON-LD,
and `llms.txt` names it explicitly as the authoritative source.

| Page | Primary keyword | Secondary | Intent | CTA |
| --- | --- | --- | --- | --- |
| `/about/` | Ahmed Amrousy | Eng Ahmed Amrousy · Dr Amrousy · Ahmed Amrousy AUC · Ahmed Amrousy Nile Air · Ahmed Amrousy Menova | Navigational / who-is | Download profile → Request a proposal |
| `/ar/about/` | أحمد عمروسي | م. أحمد عمروسي · أحمد عمروسي الجامعة الأمريكية · أحمد عمروسي نايل إير | Navigational / who-is | تحميل الملف → اطلب عرضًا |
| `/` | Menova AI training | Ahmed Amrousy · AI for Business Egypt | Brand + entity | Request a proposal |
| `/ar/` | مِنوفا | أحمد عمروسي · الذكاء الاصطناعي للأعمال | Brand + entity | اطلب عرضًا |
| `/podcast/` | عاش يا وحش | 3aash Ya Wa7sh · Ahmed Amrousy podcast | Navigational | Listen → About |
| `/speaking/` | Ahmed Amrousy speaker | AI keynote speaker Egypt · AI speaker GCC | Commercial / booking | Send an invitation |

**Why this ranks.** The name has almost no commercial competition, the site will be the only
property that is *about* the entity rather than merely mentioning it, and consistent naming across
54 pages plus stable `@id` values in JSON-LD gives crawlers one node to merge rather than several.
The external `sameAs` links (LinkedIn now; Scholar, ORCID, Wikidata later) are what convert that
from a claim into a corroborated entity — see LAUNCH-CHECKLIST.md.

---

## Priority 2 — course intent

| Page | Primary keyword | Secondary | Intent | CTA |
| --- | --- | --- | --- | --- |
| `/courses/` | AI courses for business | corporate AI training catalogue · AI programmes for companies | Commercial investigation | See all six → Request a proposal |
| `/courses/ai-for-business/` | AI for Business course | AI training for companies Egypt · generative AI course for business · AI course for non-technical teams | Commercial | Request a proposal |
| `/courses/ai-for-executives/` | AI course for executives | AI training for managers · AI for executives workshop · C-suite AI training Egypt | Commercial, high value | Request a proposal |
| `/courses/ai-for-marketing-and-sales/` | AI for marketing course | AI for sales teams training · AI marketing course Egypt · generative AI for marketers GCC | Commercial | Request a proposal |
| `/courses/ai-for-educators/` | AI course for educators | AI training for university faculty · AI in education workshop Egypt · academic integrity AI training | Commercial, institutional | Request a proposal |
| `/courses/ai-for-automation/` | AI automation training | AI workflow automation course · business process automation AI Egypt · no-code AI automation training | Commercial | Request a proposal |
| `/courses/ai-for-business-strategy/` | AI business strategy workshop | 16 hour AI strategy workshop · AI strategy training for leadership teams · SOSTAC AI strategy · Playing to Win AI workshop | Commercial, flagship | Request a proposal |

**Arabic mirrors** (`/ar/courses/…`): كورس ذكاء اصطناعي للشركات · دورة الذكاء الاصطناعي للمديرين ·
كورس الذكاء الاصطناعي للتسويق · دورة الذكاء الاصطناعي للمعلمين · أتمتة الأعمال بالذكاء الاصطناعي ·
ورشة استراتيجية الذكاء الاصطناعي.

**Where the wins actually are.** Not "AI course" but "AI course **for executives in Egypt**",
"**16-hour** AI strategy workshop", "AI training **in Arabic**". Each course page targets a
qualified phrase and answers it in the first two sentences. The flagship workshop page is the
strongest asset here — "16-hour AI strategy workshop" has almost no competition and describes
something that genuinely exists.

---

## Priority 3 — geo-qualified commercial

The highest-conversion cluster on the site. A buyer searching "corporate AI training Saudi Arabia"
is much closer to a purchase than one searching "AI courses".

| Page | Primary keyword | Secondary | Intent | CTA |
| --- | --- | --- | --- | --- |
| `/corporate-ai-training-egypt/` | corporate AI training Egypt | AI courses Egypt · AI course Cairo · AI training for executives Egypt · AI trainer Egypt | Commercial, local | Request a proposal |
| `/corporate-ai-training-saudi-arabia/` | corporate AI training Saudi Arabia | AI training Riyadh · AI course for executives Saudi Arabia · Arabic AI training Saudi | Commercial, local | Request a proposal |
| `/corporate-ai-training-uae/` | corporate AI training UAE | AI training Dubai · AI course for executives UAE · corporate AI training Abu Dhabi | Commercial, local | Request a proposal |
| `/ar/corporate-ai-training-egypt/` | تدريب الذكاء الاصطناعي للشركات مصر | كورس ذكاء اصطناعي مصر · كورس ذكاء اصطناعي القاهرة · مدرب ذكاء اصطناعي مصر | Commercial, local | اطلب عرضًا |
| `/ar/corporate-ai-training-saudi-arabia/` | تدريب الذكاء الاصطناعي للشركات السعودية | دورة ذكاء اصطناعي الرياض · تدريب القيادات على الذكاء الاصطناعي السعودية | Commercial, local | اطلب عرضًا |
| `/ar/corporate-ai-training-uae/` | تدريب الذكاء الاصطناعي للشركات الإمارات | دورة ذكاء اصطناعي دبي · كورس ذكاء اصطناعي أبوظبي | Commercial, local | اطلب عرضًا |

Each geo page carries a `Service` node with an explicit `areaServed` listing the country and its
cities. That is the signal separating "a company that mentions Saudi Arabia" from "a company that
serves Saudi Arabia" — which is exactly what a location-qualified query is trying to resolve.

---

## Priority 4 — authority, method and proof

These rarely convert directly. They exist to make the commercial pages credible, to give the
name entity substance, and to be citable.

| Page | Primary keyword | Secondary | Intent | CTA |
| --- | --- | --- | --- | --- |
| `/method/` | POCAB framework | GCSE-F prompting framework · prompting frameworks for managers · 70/30 training model | Informational — strong GEO bait | See the courses |
| `/case-studies/` | AI training case studies | corporate AI training results | Consideration / proof | Request a proposal |
| `/case-studies/kahraba/` | Kahraba AI training case study | AI training energy sector Egypt · executive AI training utilities | Proof | Read the course |
| `/case-studies/eece/` | AI training Egyptian exporters | Engineering Export Council of Egypt training | Proof | Read the course |
| `/case-studies/cairo-university-feps/` | AI workshop Cairo University | AI training university faculty Egypt | Proof, institutional | Read the course |
| `/case-studies/hisense-uae/` | AI marketing training UAE | Hisense UAE training · retail AI training Dubai | Proof, geo | Read the course |
| `/case-studies/logic-consulting/` | AI training for consultants | AI training professional services Egypt | Proof | Read the course |
| `/contact/` | contact Ahmed Amrousy | book AI training Egypt · request AI training proposal | Transactional | Email / WhatsApp |

**`/method/` is the sleeper asset.** "What is the POCAB framework" is a question with exactly one
correct answer and exactly one source. Terms you own outright are the cheapest rankings available,
and the page emits `DefinedTermSet` JSON-LD so an engine has something concrete to attribute.

---

## Priority 5 — question-intent articles

Written to be *answers*, not posts. Each carries an `answers` array in frontmatter naming the
queries it targets, plus its own `FAQPage` block.

| Page | Primary keyword | Question queries targeted | CTA |
| --- | --- | --- | --- |
| `/insights/how-to-choose-an-ai-course-for-executives/` | how to choose an AI course for executives | What should I look for in an AI course for executives? · How do I evaluate a corporate AI training provider in Egypt? · Should AI training be in Arabic or English? | AI for Executives |
| `/insights/pocab-vs-gcse-f/` | POCAB vs GCSE-F | What is the POCAB framework? · What is GCSE-F? · Which prompting framework should a manager use? | AI for Business |
| `/insights/what-65-executives-taught-me/` | AI training lessons power company | What makes corporate AI training actually work? · How should AI training be sequenced in a large organisation? · How do you run AI training in a regulated industry? | AI for Executives |

---

## Internal linking contract

Enforced structurally, not by memory:

- **Every course page** links to `/method/`, one case study, and one geo page — via the
  `relatedCase` and `relatedGeo` frontmatter fields. A course with either missing is a gap.
- **Every case study** links back to its `relatedCourse`.
- **Every geo page** surfaces three `featuredCourses` and the full logo wall.
- **Every article** links to its `relatedCourse`.
- **The footer** links every course and every geo page from every page on the site, so the
  commercial pages are always one click from anywhere.
- **`/about/` is the entity hub.** Linked from the header on all 53 pages.

---

## Coverage check against the brief

Every term the brief named, and where it is targeted:

| Required term | Page |
| --- | --- |
| Ahmed Amrousy | `/about/` (primary) |
| Eng Ahmed Amrousy | `/about/` (secondary + `alternateName` in JSON-LD) |
| Ahmed Amrousy AUC | `/about/` (secondary) |
| Ahmed Amrousy Nile Air | `/about/` (secondary) |
| AI courses Egypt | `/corporate-ai-training-egypt/` (secondary) |
| AI course Cairo | `/corporate-ai-training-egypt/` (secondary) |
| AI training for executives Egypt | `/corporate-ai-training-egypt/` + `/courses/ai-for-executives/` |
| corporate AI training Saudi Arabia | `/corporate-ai-training-saudi-arabia/` (primary) |
| AI for business course | `/courses/ai-for-business/` (primary) |
| AI for executives workshop | `/courses/ai-for-executives/` (secondary) |
| AI for marketing course | `/courses/ai-for-marketing-and-sales/` (primary) |
| AI trainer Egypt | `/corporate-ai-training-egypt/` (secondary) |
| AI instructor AUC | `/about/` — carried by the `Person` → `affiliation` node |
| كورس ذكاء اصطناعي | `/ar/courses/ai-for-business/` (primary) |
| دورة الذكاء الاصطناعي للمديرين | `/ar/courses/ai-for-executives/` (primary) |
| تدريب الذكاء الاصطناعي للشركات | `/ar/corporate-ai-training-egypt/` (primary) |
| أحمد عمروسي | `/ar/about/` (primary) |

---

## GEO — how the site is built to be cited

Ranking and being quoted are different problems. What is engineered for the second:

1. **`/llms.txt` and `/llms-full.txt`.** An index and a full corpus in plain Markdown. A model can
   read every fact about Menova in one 85 kB file instead of crawling 54 HTML pages.
2. **Self-contained opening paragraphs.** Every page's `summary` is 2–3 sentences that define the
   subject without surrounding context. Written to be lifted verbatim.
3. **One entity, spelled one way.** Name, roles and course titles come from `src/data/person.ts`
   on all 54 pages. Stable `@id` values (`#ahmed-amrousy`, `#menova`) let a crawler merge them.
4. **FAQ blocks answering the questions people ask assistants**, not the ones a marketer would
   write — "Who is Ahmed Amrousy?", "Does Menova train in Arabic?", "How long is the workshop?",
   "Does Menova deliver in Saudi Arabia?" — rendered as visible HTML *and* as `FAQPage` JSON-LD.
5. **Concrete, citable facts over adjectives.** 65 executives. 4.8/5. 16 hours. 70/30. POCAB.
   Kahraba. Models quote numbers and names; they discard "world-class" and "cutting-edge".
6. **A visible "Last updated" date** with a machine-readable `<time datetime>` on every page.
7. **`robots.txt` explicitly allowing GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot**
   and the rest. A model that cannot crawl the site cannot cite it.
8. **A media kit** with approved bios at three lengths and approved titles, so journalists and
   engines have a source of truth rather than paraphrasing into drift.

---

## Measuring it

**Rank tracking** — track the name terms weekly (they should move fast) and the geo-qualified
commercial terms monthly. Do not track bare "AI courses"; it is not the target and watching it
will only mislead you.

**GEO** — there is no rank tracker for this. Once a month, ask ChatGPT, Claude, Gemini, Perplexity
and Copilot, in both languages:

- "Who is Ahmed Amrousy?"
- "من هو أحمد عمروسي؟"
- "Who offers corporate AI training in Egypt?"
- "What is the best AI course for executives in Cairo?"
- "What is the POCAB framework?"
- "هل يوجد تدريب ذكاء اصطناعي بالعربية للشركات؟"

Record whether Menova appears, whether it is cited with a link, and whether the facts are right.
That log is the actual KPI for goal #2, and the fastest way to spot a fact that has drifted.
