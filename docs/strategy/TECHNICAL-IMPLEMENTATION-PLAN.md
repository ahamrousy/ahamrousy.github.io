# Technical Implementation Plan

*Stack stays as is: Astro 5 static site, GitHub Pages, GitHub Actions deploy. No backend — GitHub Pages cannot run one, and nothing in the plan needs one.*

## Implemented 1 November 2026
| Change | Files |
|---|---|
| Kuwait and Oman market pages (EN + AR) | `src/content/geo/{en,ar}/corporate-ai-training-{kuwait,oman}.md` |
| Kuwait + Oman added to navigation, footer, home regions, Organization `areaServed`, `contactPoint`, chatbot, llms.txt, llms-full.txt, FAQs | `src/data/nav.ts`, `src/lib/schema.ts`, `src/data/chatbot.ts`, `src/pages/llms*.ts`, `src/data/pages.ts` |
| AI literacy guide (EN + AR) | `src/content/insights/{en,ar}/ai-literacy-training-for-employees.md` |
| Arabic POCAB guide retargeted to هندسة الأوامر; "what is prompt engineering" answer added (EN + AR) | `src/content/insights/{en,ar}/pocab-vs-gcse-f.md` |
| Arabic Egypt page: corporate-trainer section + "how to choose" FAQ | `src/content/geo/ar/corporate-ai-training-egypt.md` |
| "مِنوفا (Menova)" on first brand mention across Arabic summaries and bios | 18 Arabic content files, `src/data/pages.ts`, `src/data/person.ts` |
| Pricing-guide link on every course page | `src/components/pages/CourseDetail.astro` |
| `OfferCatalog` JSON-LD on Home | `src/lib/schema.ts`, `src/components/pages/HomePage.astro` |
| GA4 `generate_lead` events (WhatsApp, email, phone, form) — consent-gated | `src/scripts/leads.ts`, `src/layouts/BaseLayout.astro` |
| Domain-ready: IndexNow, SEO audit and robots.txt read the origin from `site.config.ts` | `scripts/indexnow.mjs`, `scripts/seo-audit.mjs`, `src/pages/robots.txt.ts` |
| SEO audit can run against a local build: `npm run seo http://localhost:4321` | `scripts/seo-audit.mjs` |

## Verification standard (every change)
`node scripts/check-seo-lengths.mjs` → `astro check` → `astro build` → `npm run seo <local>` (0 errors) → `npm run audit` (Lighthouse ≥ 95) → live check after deploy.

## Custom domain runbook (when you have bought it)
1. You: buy the domain; at the registrar add four `A` records to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` and a `CNAME` for `www` → `ahamrousy.github.io`.
2. Me: set `SITE_URL` in `src/site.config.ts`; add `public/CNAME` containing the domain; build, audit, push.
3. You: GitHub repo → Settings → Pages → Custom domain → enter it → tick **Enforce HTTPS** once the certificate is issued.
4. You: add the new domain as a property in Search Console and Bing; submit the sitemap. The old address redirects automatically.

## Waiting on your accounts
| Item | What I need |
|---|---|
| GA4 | Measurement ID (`G-…`) → `site.config.ts` |
| Bing | Nothing, if you use "Import from Search Console"; otherwise the meta tag value |
| Contact form | Optional free Formspree form ID — otherwise the form keeps composing an email |
| Google Scholar, ORCID, Spotify | Profile URLs → `sameAs` |
