# Image brief — exact specifications

Everything the Menova site needs, with exact filenames, dimensions and size budgets.
Hand the prompt at the bottom to Claude Cowork (or any image editor) together with your
real source photographs.

---

## What must be real, and why

| Asset | Source |
| --- | --- |
| Headshot | **A real photograph of Ahmed.** Never AI-generated |
| Training / event / podcast photos | **Real photographs of real sessions.** Never generated |
| Client logos | **The organisation's actual mark, used with permission** |
| Menova brand mark | Already done — real vector, in the repo |

The site's entire search and generative-engine strategy depends on Ahmed being a
*verifiable* entity: a consistent name, consistent roles, corroborated by AUC, Nile Air and
LinkedIn. A generated portrait of a real person undermines that, and it is the image
journalists and conference organisers will reuse. Generated "training session" photos would
be fabricating evidence of engagements — and those engagements actually happened, so there is
nothing to fabricate.

**Claude Cowork's job here is processing, not inventing:** crop, resize, compress, rename.

---

## 1 · Headshot — the only image that is currently live and still a placeholder

| | |
| --- | --- |
| **Filename** | `ahmed-amrousy-headshot.jpg` |
| **Save to** | `public/images/` |
| **Dimensions** | **640 × 800** (4:5 portrait) |
| **Format** | JPEG, quality 82, progressive |
| **Size budget** | **under 120 kB** — hard limit 150 kB |
| **Used on** | Home hero, About page, `Person` JSON-LD `image`, media kit |

**This is the Largest Contentful Paint element on the homepage**, so its file size directly
sets the performance score. A 4 MB phone photo dropped in unchanged is the standard way a
Lighthouse 100 becomes an 80.

**Composition:** head and shoulders, eyes roughly one third down from the top, plain or softly
blurred background (the site is visually dense and a busy background fights it), business or
business-casual. Strip EXIF rotation — phone photos are frequently sideways.

There is already a script that does all of this correctly:

```bash
npm run headshot -- "C:\path\to\your-photo.jpg"
```

Add `--gravity=north` if the automatic crop cuts the top of the head.

---

## 2 · Client logos — 12 slots

| | |
| --- | --- |
| **Save to** | `public/images/logos/` |
| **Display size** | 160 × 48 |
| **Format** | **SVG preferred.** PNG at 320 × 96 (retina) if no vector exists |
| **Background** | **Transparent.** A white box renders as a grey rectangle |
| **Size budget** | under 20 kB each |

Exact filenames — these are referenced in `src/data/person.ts` and must match:

```
vodafone.svg          usaid.svg             kahraba.svg
eece.svg              bue.svg               nile-university.svg
auc.svg               cairo-university.svg  ain-shams.svg
nile-air.svg          formatech.svg         logic-consulting.svg
```

The wall renders logos in **greyscale at 72% opacity**, going full colour on hover. So:
single-colour or high-contrast marks work best, and very light logos disappear. Trim
whitespace to the mark's bounding box — the grid supplies its own padding.

Each file currently holds a neutral placeholder carrying the organisation's name as text.
**Leaving a placeholder in place is perfectly respectable.** Using a logo without permission
is not — universities and government-linked entities in particular usually require written
approval.

---

## 3 · Gallery — not yet displayed anywhere

Four placeholder files exist at `public/images/gallery/`, but **no page currently renders
them.** They are groundwork, not a gap. If you want a photo gallery on `/speaking/` or
`/about/`, that needs a page section built first — ask, and it is a small job.

If you are collecting photographs anyway:

| | |
| --- | --- |
| **Dimensions** | 1200 × 800 (3:2 landscape) |
| **Format** | JPEG, quality 82 |
| **Size budget** | under 200 kB each |
| **Filenames** | `training-01.jpg`, `training-02.jpg`, `event-01.jpg`, `podcast-01.jpg` |

Candid beats posed — a photo of people actually working on laptops evidences the "70%
hands-on" claim in a way a staged group shot does not.

**Participant faces:** get permission, or choose frames where individuals are not
identifiable. For clients in energy, finance or government this is not optional.

---

## 4 · Brand assets — already done, do not replace

| File | Size | Status |
| --- | --- | --- |
| `public/images/menova-logo.svg` | 200 × 48 | Real vector |
| `public/images/apple-touch-icon.png` | 180 × 180 | Generated from the mark |
| `public/favicon.svg` | 32 × 32 | Real vector |

The Menova mark is drawn in three places — `src/components/BrandMark.astro`,
`menova-logo.svg`, and `favicon.svg`. Change one, change all three.

**Open Graph cards are generated automatically** at build time from page titles — 54 of them,
one per page per language. You never supply those.

---

## Publishing any image

Drop the file at the exact path with the exact name, then in GitHub Desktop: write a summary →
**Commit to main** → **Push origin**. Live in about two minutes.

Then re-run the audit — large unoptimised images are the most common regression:

```bash
npm run build && npm run audit
```

---

## The prompt for Claude Cowork

> I have a set of photographs I need prepared for my website. **Do not generate, synthesise or
> alter the content of any image — these are real photographs of real people and events. Your
> job is cropping, resizing, compressing and renaming only.** If a required source photo is
> missing, tell me rather than substituting anything.
>
> For each output file, produce exactly these specifications:
>
> **1. Professional headshot**
> - Output filename: `ahmed-amrousy-headshot.jpg`
> - Exactly 640 × 800 pixels (4:5 portrait)
> - JPEG, quality 82, progressive encoding
> - **Must be under 120 kB.** If it exceeds that, reduce quality in steps of 3 until it fits
> - Crop: head and shoulders, eyes approximately one third down from the top edge, centred
>   horizontally. Do not crop the top of the head
> - Honour EXIF orientation before cropping — correct any sideways rotation
> - Do not retouch, smooth skin, replace the background, or alter my appearance
>
> **2. Client logos** — only for organisations I explicitly give you files for
> - Output to a `logos` folder, using exactly these names where I supply a matching file:
>   `vodafone`, `usaid`, `kahraba`, `eece`, `bue`, `nile-university`, `auc`,
>   `cairo-university`, `ain-shams`, `nile-air`, `formatech`, `logic-consulting`
> - SVG if I give you a vector, otherwise PNG at 320 × 96
> - **Transparent background** — remove any white or coloured box behind the mark
> - Trim whitespace to the mark's bounding box
> - Under 20 kB each
> - These render in greyscale at 72% opacity, so flag any logo that becomes illegible when
>   desaturated
>
> **3. Event and training photographs** — only from photos I supply
> - Names: `training-01.jpg`, `training-02.jpg`, `event-01.jpg`, `podcast-01.jpg`
> - Exactly 1200 × 800 pixels (3:2 landscape)
> - JPEG, quality 82, under 200 kB each
> - Crop to keep the main subject centred; prefer frames showing people working over posed
>   group shots
> - Flag any photo where a participant's face is clearly identifiable so I can check permissions
>
> Give me the finished files with these exact names, plus a short table listing each output's
> final dimensions and file size in kB so I can confirm the budgets were met.

---

## Faster alternative for the headshot

If it is only the headshot you need, skip Cowork entirely — the repo already has a script that
applies every rule above:

```bash
npm run headshot -- "C:\Users\Admin\Desktop\my-photo.jpg"
```

It prints the final dimensions and file size, warns if the source is too small to upscale
cleanly, and tells you how to adjust the crop.
