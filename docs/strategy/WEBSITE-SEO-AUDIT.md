# Website SEO / AEO / GEO Audit — ahamrousy.github.io

*Audited 1 November 2026 with full access to the repository (Astro 5, static output, GitHub Pages via GitHub Actions) and the live site.*

## What was verified, and how

| Area | Method | Result |
|---|---|---|
| Pages | Live sitemap | 62 URLs (31 EN + 31 AR), all HTTP 200 |
| robots.txt | Live | Allows search and AI crawlers by name; declares the sitemap |
| Canonicals, hreflang (incl. x-default), one h1, `dir=rtl`, title/description lengths, Person JSON-LD, OG image | `npm run seo` over every live URL | 0 errors, 0 warnings |
| Performance, accessibility | `npm run audit` (Lighthouse, mobile, throttled, 7 routes) | Perf: EN 100, AR 96–98 · A11y, Best Practices, SEO: 100 · CLS ≈ 0 |
| Schema | Live HTML | Person, Organization, WebSite, FAQPage, Course, Article, BreadcrumbList, EducationalOccupationalCredential |
| AI files | Live | `/llms.txt` and `/llms-full.txt` (200) |
| Google index | `site:` query | **3 of 62 pages** (Home, About EN, About AR) |
| Bing index | `site:` query | **0 pages** — Bing returns unrelated results |
| Words per key page | Live HTML | Home 1,857 · About 2,222 · Egypt landing 1,907 · AI for Business 1,845 |

**Not verifiable without your accounts:** Search Console coverage reasons, Core Web Vitals field data (CrUX needs traffic first), backlinks, and real visitor behaviour (GA4 is not configured).

## Issues, by severity

| # | Severity | Issue | Business impact | Fix |
|---|---|---|---|---|
| 1 | **Critical** | Google has indexed 3 of 62 pages after ~10 weeks | 59 pages cannot rank at all | Request indexing in Search Console (5–10/day); earn external links (items 3, 9) |
| 2 | **Critical** | **Bing has indexed nothing** | Microsoft Copilot answers come from Bing; DuckDuckGo and others also draw on it | Bing Webmaster Tools (import from Search Console, 2 min). IndexNow is **already** pinged on every deploy (last run: HTTP 202, 60 URLs) — Bing receives the URLs but is not indexing an unverified, low-authority host |
| 3 | **Critical** | Hosted on `ahamrousy.github.io`, a subdomain you don't own | Every link and mention you earn accrues to github.io. Moving later costs more each month | Buy a domain (e.g. ahmedamrousy.com). GitHub Pages redirects the old address automatically. Cheap now, expensive later |
| 4 | High | No analytics (`ga4MeasurementId` empty) | No way to see which pages bring leads | Add GA4 ID; the consent banner is already built |
| 5 | High | Arabic brand spelling drift: ChatGPT rendered "مِنوفا" as **"Minova"** in its Arabic answer | Entity split: two names for one brand | First mention on every AR page: "مِنوفا (Menova)" |
| 6 | High | "Menova" collides with other brands (Menova store, Menova Health clinic, Menovair in autocomplete) | Brand-name searches are ambiguous | Keep the personal name as the primary entity — already the strategy; reinforce it in titles |
| 7 | High | No Google Business Profile | Egypt results show a Maps pack (Epsilon AI, ACAD); you are absent | Service-area profile (address hidden), category "Corporate training" — needs your verification |
| 8 | Medium | Contact form posts to `mailto:` (Formspree ID empty) | Some visitors have no mail client; lost leads | Add a free Formspree ID, or keep WhatsApp as primary (already prominent) |
| 9 | Medium | `sameAs` lists 4 profiles; none institutional | Weaker entity corroboration | Add AUC faculty page, Nile Air page if public, Google Scholar, ORCID, Spotify (fields already exist in `site.config.ts`) |
| 10 | Medium | No testimonials with names | Trust gap at the decision point | LinkedIn recommendations from Kahraba participants (in progress) |
| 11 | Low | Home page JSON-LD has no `Service` / `OfferCatalog` | Minor; Course schema already covers programmes | Add an `OfferCatalog` of programmes on Home |

## UX — can a visitor answer these in 5 seconds?

| Question | Status |
|---|---|
| Who is he? | Yes — the hero names him; the nav item now reads "Ahmed Amrousy" |
| What does he teach / who for? | Yes — h1 plus course catalogue |
| Why trust him? | Partly — AUC badges, logos, Kahraba numbers. **Missing: a named client quote** |
| How to book / request corporate training? | Yes — "Schedule a meeting", WhatsApp, Schedule-a-call page |
| Price? | Partly — a pricing guide exists (`/insights/what-corporate-ai-training-costs/`); course pages should link to it |

## What already beats the competitors
Full hreflang plus genuine Arabic, which none of the three top competitors has. Richer schema than any competitor checked. Static, fast pages. llms.txt. Named, verifiable Egyptian case studies.
