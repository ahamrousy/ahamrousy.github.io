# SEO Strategy — Google and Bing

*1 November 2026. Evidence: KEYWORD-RESEARCH.md and WEBSITE-SEO-AUDIT.md.*

## The diagnosis
The site is technically sound (0 audit errors, Lighthouse 96–100). It is **under-indexed** — Google 3 of 62 pages, Bing 0 — because a new `github.io` subdomain with almost no external links gets little crawl attention. So the strategy is, in order: **get indexed, earn authority, then add pages.** More pages before indexing only adds pages nobody can find.

## 1. Indexing (weeks 1–2)
| Action | Owner | Notes |
|---|---|---|
| Custom domain | You buy · I switch | One-line change in `src/site.config.ts` + a `CNAME` file. GitHub Pages then redirects `ahamrousy.github.io` to it automatically. Do it before authority-building starts, so every link builds your domain |
| Search Console: request indexing | You | Home, About, Courses, AI for Business, AI for Executives, Egypt, Saudi, UAE, Kuwait, Oman, AI literacy guide, pricing guide — ~5 per day |
| Bing Webmaster Tools | You | "Import from Google Search Console" — no code needed. Submit `sitemap.xml` |
| IndexNow | Done | Runs on every deploy; last run HTTP 202. Now reads the host from `site.config.ts`, so it follows the domain change |
| Google Business Profile | You | Service-area business (address hidden), category "Corporate training". Puts you in the Maps pack competitors hold for "corporate AI training Egypt" |

## 2. Keyword → page map (one primary keyword per page, no two pages competing)
| Page | Primary (EN) | Primary (AR) |
|---|---|---|
| Home | corporate AI training Egypt and GCC | تدريب الذكاء الاصطناعي للشركات |
| Egypt | corporate AI training Egypt | تدريب الذكاء الاصطناعي للشركات مصر · مدرب ذكاء اصطناعي للشركات في مصر |
| Saudi / UAE / Kuwait / Oman | corporate AI training + country | تدريب الذكاء الاصطناعي للشركات + الدولة |
| AI literacy guide | AI literacy training for employees | تدريب الموظفين على الذكاء الاصطناعي |
| POCAB vs GCSE-F | POCAB vs GCSE-F / prompt engineering for business | هندسة الأوامر للأعمال |
| Pricing guide | corporate AI training cost | تكلفة تدريب الذكاء الاصطناعي للشركات |
| AI for Executives | AI course for executives | دورة الذكاء الاصطناعي للقيادات |

**Excluded on evidence (job-seeker intent):** "AI trainer Egypt", "ai trainer", "مدرب ذكاء اصطناعي", "تدريب الذكاء الاصطناعي" as a head term, "ai consultant".

## 3. Internal linking rules
- Every country page links to its featured courses, the pricing guide and the contact page (built in).
- Every course page links to the pricing guide (added) and the Method page.
- Every guide links to at least one course and one case study, with descriptive anchor text (never "click here").
- The footer links every course and every country page from every page (built in).

## 4. Authority (months 1–6) — the deciding factor
See GEO-STRATEGY.md §3. Priorities: AUC faculty link · Nile Air release quote · AmCham Egypt · two bylined articles · named testimonials.

## 5. What we will not do
No doorway pages, no "Top 10 trainers" self-rankings, no paid links, no keyword-stuffed Arabic, no countries without a genuine reason to serve them.

## KPIs (monthly, from Search Console + GA4)
Indexed pages (target: all 66 by month 3) · impressions and clicks by country and language · non-branded clicks · `generate_lead` events by method (WhatsApp / email / form) · leads per landing page.
