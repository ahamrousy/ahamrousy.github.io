# Question research — summary

**Research date:** 25 October 2026.
Structured records: [`ai-training-questions.csv`](ai-training-questions.csv) — 47 questions across
English, Modern Standard Arabic, Egyptian Arabic, Gulf Arabic and Levantine Arabic.

## Read this before using the file

**No search volume in this file is real.** Every `search_volume` cell reads `unverified`, because no
keyword tool was available in this session. A question appearing here means it is a plausible or
observed buying question — not that anyone has measured demand for it.

Each row is marked:

- **Observed** — the question, or a near-identical phrasing, appeared in a search result, a
  competitor page, or the site's own existing FAQ content.
- **Inferred** — a reasoned phrasing based on how buyers in this category ask. Honest guesswork.

Most Arabic dialect rows are inferred. That is a limitation, not a finding.

---

## What the research changed

### Closed

**"How much does corporate AI training cost?"** — in English and Arabic. This was the clearest gap
in the set: high commercial intent, asked by every buyer, answered by nobody in the competitive set
(see [`competitor-analysis.md`](competitor-analysis.md)), and deflected to a contact form on this
site's own pages. Now answered at `/insights/what-corporate-ai-training-costs/` and
`/ar/insights/what-corporate-ai-training-costs/`.

**"How do I measure the ROI of AI training?"** — in both languages, at
`/insights/measuring-roi-of-ai-training/`. The standard CFO objection, and the one that decides
whether a second programme is ever booked. It is written against the grain of the category: most of
it is about what *cannot* honestly be measured.

**"What are the risks of using AI at work?"** — in both languages, at
`/insights/ai-data-boundaries-at-work/`. The objection that stalls signatures. It also carries the
one question a buyer always asks and no provider answers well — *what happens to our documents?* —
which is now a FAQ on all six geo pages too.

**"Why not just buy online course seats?"** — answered inside the ROI article, in both languages.
This mattered more in Arabic than in English, because the Arabic SERP is dominated by Udemy and
Coursera, so it is the unspoken alternative in every Arabic buyer's head.

**"Will this work for a team with no technical background?"** — added as a dialect-phrased FAQ to
all six geo pages (`فريقنا مالوش خلفية تقنية — التدريب هيفيد معاه؟`).

### Still open, in priority order

1. **An indicative price band** on the pricing article. Not a writing task — a decision only Ahmed
   can make. It is the single change most likely to get that page quoted by an answer engine.
2. **Tool comparison** (ChatGPT / Claude / Gemini / Copilot) — strong answer-engine value, but it
   ages in weeks. Only worth writing with a visible review date and a commitment to maintain it.
3. **Speaking history and podcast episode list** — needs Ahmed's facts, not research.
4. **Testimonials** — needs client permission.

---

## On dialects — and the page that was deliberately not built

Egyptian, Gulf and Levantine speakers ask the same buying question in different words:

| Dialect | "How much does it cost?" |
|---|---|
| MSA | كم تكلفة تدريب الذكاء الاصطناعي للشركات؟ |
| Egyptian | تدريب الذكاء الاصطناعي بكام؟ |
| Gulf / Saudi | كم يكلف تدريب الذكاء الاصطناعي؟ |
| Levantine | شو سعر تدريب الذكاء الاصطناعي؟ |

These are four queries and one intent. **No dialect pages were created.** A page per wording
produces near-duplicate thin content — the thing the brief rules out, and the thing search engines
are most reliable at detecting. Dialect phrasings belong in the FAQ blocks of pages that already
exist, which is where they have been put: the Arabic pricing article carries
`تدريب الذكاء الاصطناعي بكام` among its secondary keywords, and further candidates are marked
`P2 / سؤال شائع` in the CSV.

**No Levantine or North African content is recommended at all** at this stage. There is no evidence
of demand, and no service presence in those markets. The honest entry is "no action until enquiries
appear" — which is what the CSV says.

---

## The two questions that matter most

**"Who is Ahmed Amrousy?"** — in both languages. `/about/` answers it completely and now carries
`ProfilePage` markup naming it as the authoritative page for the entity. The on-page work is done.
The gap is that, on 25 October 2026, searching the name surfaced nothing about him at all. No
article closes that gap. See audit §8 and the P0 block of the roadmap.

**"Who can train our leadership team in Arabic?"** — the question that actually produces revenue.
The site answers it on the geo pages. Whether an answer engine reaches those pages depends on
corroboration, not on more content.
