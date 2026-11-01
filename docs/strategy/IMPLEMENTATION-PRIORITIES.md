# Implementation Priorities

*1 November 2026.*

## Decisions (Ahmed, 1 Nov 2026)
1. Custom domain — **yes** (purchase pending).
2. Positioning — **keep** "AI for business leaders".
3. Course catalogue — new pages **link to** courses, never change them.
4. Markets — Egypt plus **Saudi Arabia, UAE, Kuwait and Oman**.

## Status
- **Done (Me):** 1.3 IndexNow (was already live) · 1.5 lead events (needs GA4 ID) · 1.6 مِنوفا (Menova) · 1.8 pricing links + OfferCatalog · Kuwait + Oman pages · 3.1 AI literacy guide · 3.2 هندسة الأوامر retarget · 3.3 Arabic Egypt page.
- **Waiting on you:** 1.1 domain · 1.2 Bing · 1.4 indexing requests · 1.5 GA4 property · 1.7 Business Profile · all of Stage 2.

**Who does it:** **You** = needs your accounts or money · **Me** = code or content I can do once approved.

## Stage 1 — Foundations (weeks 1–2)

| # | Task | Who | Priority | Effort | Impact | Depends on | Done when |
|---|---|---|---|---|---|---|---|
| 1.1 | Buy a custom domain (e.g. ahmedamrousy.com) and point GitHub Pages at it | You (buy) · Me (DNS, CNAME, canonicals, sitemap) | Critical | 1 h + DNS wait | Every future link builds *your* asset | — | Old URL 301s to the new one; `npm run seo` clean on the new origin |
| 1.2 | Bing Webmaster Tools — import from Search Console | You (2 min) · Me (verification tag) | Critical | 15 min | Unlocks Copilot and Bing-fed engines | 1.1 ideally first | `site:` on Bing shows pages |
| 1.3 | IndexNow ping on every deploy (GitHub Action) | Me | High | 1 h | Bing/Yandex re-crawl within hours | 1.2 | Action log shows a 200/202 response |
| 1.4 | Request indexing for the 10 commercial pages in Search Console | You | Critical | 10 min/day × 2 | Moves pages from 3 to ~13 indexed | — | `site:` shows ≥ 13 |
| 1.5 | GA4 ID + lead events (WhatsApp click, mailto, schedule) | You (create property) · Me (events) | High | 1 h | Measure leads, not visits | consent banner (built) | Events visible in GA4 DebugView |
| 1.6 | "مِنوفا (Menova)" on first mention, every AR page | Me | High | 30 min | Fixes the "Minova" entity split seen in ChatGPT | — | Benchmark Q2 spells "Menova" |
| 1.7 | Google Business Profile (service-area, address hidden) | You (verification) | High | 30 min + postcard/video | Eligibility for the Maps pack competitors hold | — | Profile live |
| 1.8 | Link course pages → pricing guide; `OfferCatalog` schema on Home | Me | Medium | 1 h | Answers "price/cost" queries | — | Validator passes |

## Stage 2 — Authority (months 1–3)
The three top competitors win on reputation, not page count. This stage matters most, and most of it is in your hands.

| # | Task | Who | Priority | Done when |
|---|---|---|---|---|
| 2.1 | AUC faculty/instructor page linking to the site | You (ask AUC Exec Ed) | Critical | Live link from aucegypt.edu |
| 2.2 | Named quote in the next Nile Air release ("…said Ahmed Amrousy, Head of Marketing & PR") | You | High | Article naming you |
| 2.3 | 3 LinkedIn recommendations from Kahraba participants → testimonials on site (with permission) | You → Me | High | Quotes live with name + title |
| 2.4 | AmCham Egypt runs "AI for Leaders" — offer to speak or co-deliver | You | High | Speaker listing |
| 2.5 | 2 guest articles: one EN (e.g. Enterprise, Ahram Online), one AR | You (pitch) · Me (draft) | High | Published with a byline and link |
| 2.6 | Fill `sameAs`: Google Scholar, ORCID, Spotify podcast | You (create) · Me (add) | Medium | Profiles in JSON-LD |

## Stage 3 — Content (months 1–6)
Build only pages with a real search intent **and** real evidence behind them.

| # | Page | Lang | Targets | Priority |
|---|---|---|---|---|
| 3.1 | AI literacy training for employees (maps to AI for Business) | EN + AR | "ai literacy / awareness training for employees" | P1 |
| 3.2 | Arabic pillar: هندسة الأوامر للأعمال — POCAB & GCSE-F | AR (+EN) | هندسة الأوامر — strong demand; your own frameworks | P1 |
| 3.3 | Strengthen the Arabic Egypt landing for مدرب ذكاء اصطناعي للشركات في مصر | AR | Weakest competition found in the research | P1 |
| 3.4 | AI for HR (Saudi demand: دورة الذكاء الاصطناعي في الموارد البشرية) | AR + EN | HR cluster | P2 |
| 3.5 | AI and legal responsibility for companies (extend the data-boundaries guide) | AR + EN | الذكاء الاصطناعي والمسؤولية القانونية للشركات | P2 |
| 3.6 | Government/public-sector AI training | EN + AR | "ai training for government employees" | P2 — only with a public-sector reference |

## Stage 4 — Measure and iterate (monthly)
Re-run AI-VISIBILITY-BENCHMARK. Check Search Console (indexed pages, impressions by country and language) and GA4 lead events. Authorise Ahrefs, then add volumes to KEYWORD-RESEARCH.

## What I recommend NOT doing
| Brief item | Why not |
|---|---|
| Target "AI trainer Egypt", "ai trainer", "مدرب ذكاء اصطناعي" | Measured job-seeker intent (see KEYWORD-RESEARCH) |
| Country pages for Qatar and Bahrain | Outside the selected markets. Kuwait and Oman were built as substantive pages with honest "available for delivery" claims and country-specific data-law content, not doorway pages |
| Industry pages for healthcare, finance, customer service | No case evidence. Build Education, Energy/Utilities, Marketing first (real clients) |
| 7 separate tool pages (ChatGPT, agents, productivity…) | Splits authority and conflicts with "think with AI, not use it". One "AI tools at work" page that routes to existing programmes covers the intent |
| Copy the "Top 10 trainers in X" listicle model | Self-ranking listicles fall in Google's spam-policy territory and violate the brief's no-artificial-citation rule |

