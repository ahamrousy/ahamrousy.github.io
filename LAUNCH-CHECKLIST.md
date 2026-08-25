# Launch checklist

Ordered so the things that block a correct launch come first, and the things that actually move
the "Ahmed Amrousy" ranking come before the cosmetic ones.

---

## 0 · Before the first push — blocking

- [ ] **Set `SITE_URL` in `src/site.config.ts`** to your real origin.
      Currently `https://ahmedamrousy.github.io`. If your GitHub username differs, every canonical
      URL, hreflang tag, sitemap entry, OG image URL and JSON-LD `@id` will point at a domain you
      do not own. **This is the one mistake that is expensive to undo** — Google will have indexed
      the wrong canonicals before you notice.
- [ ] **Decide the domain now, not later.** If you are buying `menova.ai`, do it before submitting
      to Search Console — see DECISIONS.md § Domain. Migrating afterwards costs weeks of re-indexing.
- [ ] Confirm `BASE` matches: `'/'` for a `username.github.io` repo, `'/menova/'` for a project repo.
- [ ] `npm run build && npm run audit` — build clean, all Lighthouse categories ≥ 95.
- [ ] Skim the site in a browser at 375 px wide, in both languages, and click the language switch
      on three different pages to confirm it keeps you on the same page.

---

## 1 · Publish

- [ ] Create the GitHub repo. Name it `<username>.github.io` for a root deploy.
- [ ] Push to `main`.
- [ ] **Settings → Pages → Build and deployment → Source: GitHub Actions.**
      Not "Deploy from a branch" — the workflow publishes the built output, not the source.
- [ ] Wait for the Actions run to go green, then open the live URL.
- [ ] Check `/_astro/` assets actually load. If the site renders unstyled, `public/.nojekyll` is
      missing — Jekyll has eaten the bundle directory.
- [ ] Spot-check live: `/sitemap.xml`, `/robots.txt`, `/llms.txt`, `/404.html`,
      `/downloads/ahmed-amrousy-profile.pdf`, and one OG card at `/og/en-home.png`.

---

## 2 · Search engines

- [ ] **Google Search Console** — add the property.
  - [ ] Verify. Easiest path here is the HTML-tag method: paste the `content` value into
        `analytics.googleSiteVerification` in `src/site.config.ts`, push, then click Verify.
  - [ ] Submit `https://<your-domain>/sitemap.xml`.
  - [ ] Use **URL Inspection → Request Indexing** on `/about/` and `/ar/about/` specifically.
        Do not wait for the crawler — these two pages are goal #1.
  - [ ] Check **International Targeting** after a week for hreflang errors.
- [ ] **Bing Webmaster Tools** — add the site, verify via `analytics.bingSiteVerification`,
      submit the sitemap. Bing matters more than its market share suggests: it feeds ChatGPT
      search and Copilot.
- [ ] Confirm `/robots.txt` resolves and names your sitemap with the correct domain.

---

## 3 · Entity corroboration — the highest-leverage work on this list

Nothing on the site can prove Ahmed Amrousy exists. Only external sources pointing *back* can.
This section is what turns the `Person` JSON-LD from a claim into a corroborated entity, and it
matters more for the name search than any further code change.

- [ ] **LinkedIn** — add the site URL to the Website field on
      [the profile](https://www.linkedin.com/in/ahmed-amrousy/). Make sure the headline matches
      the approved title in the media kit **word for word**. Inconsistent job titles across sources
      are the single most common reason an entity fails to resolve.
- [ ] **AUC** — ask for the site link on your Executive Education instructor bio page. A `.edu`
      link from the institution you teach at is worth more than any number of directory listings.
- [ ] **Nile Air** — ask for the link on any corporate leadership or press page that names you.
- [ ] **Google Scholar** — create the profile if it does not exist, list the DBA work, add the site
      link. Then paste the profile URL into `contact.googleScholar` in `src/site.config.ts`. It
      joins `sameAs` automatically.
- [ ] **ORCID** — register, link the site, paste the iD into `contact.orcid`.
- [ ] **Wikidata** — create an item for Ahmed Amrousy: occupation, employer, educated at, official
      website. Wikidata feeds Google's Knowledge Graph directly and is a disproportionately strong
      signal for a name query. Cite AUC and Nile Air pages as sources.
- [ ] **Podcast show notes** — add a link to `/podcast/` from every عاش يا وحش episode description
      on every platform it is hosted on.
- [ ] Paste the podcast URLs into `contact.youtube` / `contact.spotify`. The buttons and the
      `PodcastSeries` JSON-LD `sameAs` appear automatically.
- [ ] **Ain Shams** — if the DBA programme lists candidates publicly, ask for the link.
- [ ] **Formatech, Logic Consulting, EECE** — ask each whether they will link to the matching case
      study. A client linking to a case study about themselves is the strongest B2B signal there is.

> **Google Business Profile.** Worth creating if — and only if — Menova has a real address you are
> willing to publish and can verify by postcard. A GBP with a fake or shared address is worse than
> none: it invites suspension and the suspension is visible. If training is delivered at client
> sites rather than yours, a service-area business with Cairo as the area is the correct
> configuration. Skip this entirely if you are unsure.

---

## 4 · Fill the placeholders

Every one of these is currently visible on the live site as a yellow `TODO` panel. That is
deliberate — but they should not stay up for long.

Find them all: `grep -rn "todos:" src/content`

- [ ] **Course durations** — five programmes carry my defaults (12h / 6h / 12h / 9h / 12h). The
      16-hour flagship is the only one you specified. Confirm or correct each, and update both
      `duration` and `durationISO` (the ISO-8601 value feeds `Course` JSON-LD).
- [ ] **Case study dates** — all five say "TODO — confirm delivery dates".
- [ ] **Kahraba split** — how the 65 divided between the executive and departmental cohorts.
- [ ] **Testimonials** — ask Kahraba, Formatech and Logic Consulting for a quotable line with a
      name and title. Add via the `testimonial` frontmatter field; the block renders automatically.
- [ ] **Geo logistics** — confirm lead times and the Egyptian invoicing arrangement, and whether a
      Saudi invoicing entity or local partner exists.
- [ ] **Speaking history** — the page has no past events listed. Add names and dates.
- [ ] **Podcast episodes** — no episode list yet.

---

## 5 · Images

Specs in `public/images/README.md`. Everything currently resolves to a committed placeholder, so
nothing is broken — but the placeholders look like placeholders.

- [ ] `ahmed-amrousy-headshot.jpg` (640 × 800, portrait). **Do this first.** It is on the home hero
      and the About page, and it is the LCP element on the homepage.
- [ ] Gallery images — training sessions, events, podcast shoots (1200 × 800).
- [ ] Real client logos, if you have permission to use them. Replace the placeholder SVGs at the
      same paths in `public/images/logos/`. **Only logos of organisations you have actually worked
      with**, and only where you have the right to display the mark.
- [ ] Re-run `npm run audit` after adding real photography — large unoptimised images are the most
      common way a 100 turns into an 80.

---

## 6 · Optional configuration

- [ ] **GA4** — put your `G-XXXXXXXXXX` into `analytics.ga4MeasurementId`. Until you do, no banner
      renders and nothing is requested from Google. After you do, GA4 loads only on consent.
- [ ] **Formspree** — create a form, paste the ID into `contact.formspreeId`. Without it the
      contact form still works by composing a `mailto:`.
- [ ] **GitHub / other profiles** — `contact.github` and the rest join `sameAs` automatically.

---

## 7 · First month

- [ ] **Week 1** — confirm `/about/` and `/ar/about/` are indexed (`site:` search, or URL
      Inspection). If not, request indexing again.
- [ ] **Week 2** — search "Ahmed Amrousy" in a logged-out incognito window. Note the position and
      what outranks you. This is your baseline for goal #1.
- [ ] **Week 2** — validate a course page and the About page in
      [Google's Rich Results Test](https://search.google.com/test/rich-results). Expect Person,
      Organization, BreadcrumbList, FAQPage and Course to be detected with no errors.
- [ ] **Week 4** — run the GEO check in SEO-KEYWORD-MAP.md § Measuring it: ask the five assistants
      the six questions, in both languages, and log the answers. Repeat monthly. This is the only
      real measurement of goal #2, and it is also how you catch a fact that has drifted.
- [ ] **Week 4** — Search Console → Performance: which queries are actually bringing impressions.
      Expect the name terms first and the geo-qualified commercial terms to follow slowly.

---

## Things that will not help, so you are not tempted

- **Buying backlinks or directory listings.** For a personal-brand entity, inconsistent citations
  actively hurt — conflicting job titles across low-quality directories make the entity harder to
  resolve, not easier.
- **More pages.** 53 is already generous for this footprint. Depth on the pages that exist beats
  breadth; another thin course page dilutes rather than adds.
- **Chasing "AI courses".** It is not winnable from a `github.io` subdomain and it is not where
  your buyers are. The geo-qualified and named variants are, and those are already targeted.
- **Keyword-stuffing the Arabic pages.** The Arabic content is written, not translated, and that is
  precisely why it can rank. Do not let anyone "optimise" it into machine-translation cadence.
