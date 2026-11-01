# GEO Strategy — being recommended by AI assistants

*1 November 2026. Baseline in AI-VISIBILITY-BENCHMARK.md: ChatGPT already names Menova #1 (Egypt executives, EN), #2 (Saudi Arabia), #3 (Egypt, AR — misspelled "Minova").*

## 1. Entity consistency — one person, one brand, everywhere
| Fact | Canonical form |
|---|---|
| Name | Ahmed Amrousy · أحمد عمروسي (honorific: Eng.) |
| Brand | Menova · مِنوفا (Menova) on first Arabic mention — **fixed on all Arabic pages** |
| Roles | Executive Education Instructor, AUC Onsi Sawiris School of Business · Head of Marketing & PR, Nile Air · Founder, Menova |
| Markets | Egypt, Saudi Arabia, UAE, Kuwait, Oman — **updated in Organization schema, llms.txt, chatbot, FAQs** |
| Proof | 65 Kahraba executives, three runs, 16 hours, 4.8/5 |

The same wording should appear on LinkedIn, the AUC page, speaker bios and press quotes. AI engines trust facts that agree across independent sources.

## 2. Machine-readable site (done)
Person + Organization JSON-LD with stable `@id`s across all pages · Course, Article, FAQPage, BreadcrumbList · **OfferCatalog on Home (new)** · `areaServed` now includes Kuwait and Oman · `/llms.txt` and `/llms-full.txt` · semantic HTML, one h1, fast static pages.

## 3. Crawlers — what each one does
| Crawler | Purpose | Current setting |
|---|---|---|
| Googlebot / Bingbot | Search index (Bing also feeds Microsoft Copilot) | Allowed |
| OAI-SearchBot | ChatGPT search results | Allowed |
| ChatGPT-User, Claude-User, Perplexity-User | Fetches a page when a user asks about it | Allowed |
| Claude-SearchBot, PerplexityBot | AI search indexes | Allowed |
| GPTBot, ClaudeBot, CCBot, Google-Extended, Applebot-Extended | Model training (Google-Extended is a control token, not a crawler, and does not affect Google ranking) | Allowed |

**Recommendation: keep training crawlers allowed.** For a personal brand that wants to be recommended, being in training data is an advantage, and nothing on the site is confidential. Allowing a crawler does not guarantee a citation; it only removes a barrier.

**llms.txt:** no major AI engine has publicly committed to using it. It costs nothing, and it keeps a clean, quotable summary of the entity in one place, so it stays — without relying on it.

## 4. Third-party authority — where the next gains come from
Grennan (AI Mindset) is recommended with a 99-page site because others write about him. The plan, in order of value:
1. **AUC** faculty/instructor page linking to the site.
2. **Nile Air** — name and title quoted in the next release (the EIAS 2026 coverage pictured you but did not name you).
3. **Kahraba** — LinkedIn recommendations from participants, quoted on the site with permission.
4. **AmCham Egypt** ("AI for Leaders" programme) — speaker or co-delivery.
5. **Two bylined articles** — one English (business press), one Arabic.
6. **Podcasts and conference speaker pages** in KSA and UAE (each creates a dated, independent mention).
7. **Google Scholar, ORCID** — academic entity profiles (fields already in `site.config.ts`).

Never: fake reviews, self-ranking listicles, paid links, invented press.

## 5. Measurement
Re-run the 8 fixed questions in AI-VISIBILITY-BENCHMARK.md on the 1st of each month. Next run should confirm: Arabic answer spells "Menova"; Kuwait/Oman questions begin to mention Menova; Copilot becomes testable once Bing indexes the site.
