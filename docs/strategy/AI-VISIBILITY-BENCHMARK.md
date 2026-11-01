# AI Visibility Benchmark

Re-run the same questions on the first of each month and record changes. Only platforms actually reached are scored; the rest are marked **not tested**.

## Baseline — 1 November 2026

Conditions: anonymous session (not signed in) and web search enabled, with no location or language setting forced beyond the question itself. One run per question, and answers vary between runs, so treat a single result as a signal, not a rank.

| # | Platform | Question | Lang | Menova / Ahmed mentioned? | Position | Cited URL | Competitors named |
|---|---|---|---|---|---|---|---|
| 1 | ChatGPT (search) | Who provides corporate AI training for executives in Egypt? | EN | **Yes — recommended** | **#1 of 6** | Menova site | Epsilon AI, SETTEC/USC Marshall, Cairo Syntax, ACTAIA, BrainSTEM |
| 2 | ChatGPT (search) | من يقدم تدريب الذكاء الاصطناعي للشركات في مصر؟ | AR | Yes — but spelled **"Minova"** | #3 of 6 | مِنوفا site | Epsilon AI, Cairo Syntax, Taalam.ai, Lumina AI Academy, Arabian AI School |
| 3 | ChatGPT (search) | Recommend a corporate AI trainer for a company in Saudi Arabia | EN | **Yes — recommended** | #2 of 5 | Menova site | AI Workshop Saudi Arabia (G. Raymond-Alshoufi), Meirc, Skillopedia (H. Motwani), ESI |
| 4 | ChatGPT (search) | Who is Ahmed Amrousy? | EN | Yes — accurate entity summary, no errors spotted | — | About page, LinkedIn, Arabic About | Disambiguates from namesakes |
| — | Perplexity | Q1 | EN | **Not tested** — requires sign-up | | | |
| — | Microsoft Copilot | Q1 | EN | **Not tested** — requires sign-in | | | |
| — | Google Gemini | Q1 | EN | **Not tested** — page loaded, but input was not reachable from the automated browser | | | |
| — | Claude | — | — | **Not tested** — no separate Claude web-search session was available for an independent test | | | |

### What the baseline says
- ChatGPT already treats Menova as a top-tier answer for executive AI training in Egypt and Saudi Arabia. Its search draws on its own crawler, which is allowed in `robots.txt`.
- **The Arabic answer misspells the brand.** Fix: write "مِنوفا (Menova)" on first mention on every Arabic page.
- Copilot cannot cite a site Bing has not indexed. Bing Webmaster Tools is the prerequisite.

## Monthly question set (fixed — do not edit wording)
1. Who provides corporate AI training for executives in Egypt?
2. من يقدم تدريب الذكاء الاصطناعي للشركات في مصر؟
3. Recommend a corporate AI trainer for a company in Saudi Arabia
4. من يقدم تدريب الذكاء الاصطناعي للشركات في السعودية؟
5. Who can teach Generative AI to companies in the UAE?
6. أريد استشاري ذكاء اصطناعي لتطوير أعمال شركتي في مصر
7. Who is Ahmed Amrousy?
8. What is the POCAB prompting framework?

## Record template
| Date | Platform | Q# | Lang | Mentioned (Y/N) | Recommended (Y/N) | Cited (URL) | Position | Competitors | Change vs last month |
|---|---|---|---|---|---|---|---|---|---|
