# Images

**Every path below already has a committed placeholder.** Nothing 404s and nothing shifts layout.
To use a real image, drop a file at the same path with the same filename and extension. No code
changes, no rebuilding of anything by hand.

All `<img>` tags on the site carry explicit `width` and `height`, so matching the aspect ratios
below keeps Cumulative Layout Shift at zero. If you supply a different ratio the image will be
cropped to fit (`object-fit: cover`), not squashed — but the crop may not be where you want it.

---

## Priority 1 — the headshot

| Path | Size | Ratio | Notes |
| --- | --- | --- | --- |
| `ahmed-amrousy-headshot.jpg` | **640 × 800** | 4:5 portrait | Home hero + About page |

This is the most important image on the site. It is the Largest Contentful Paint element on the
homepage, so its file size directly sets the homepage performance score.

- Keep it **under 120 kB**. Export JPEG at quality 80–82.
- Head and shoulders, eyes roughly one-third from the top.
- Plain or softly blurred background — the site is dense and a busy background fights it.
- Business or business-casual. This is the image AUC and conference organisers will reuse.

> **After adding it, re-run `npm run build && npm run audit`.** A 2 MB export is the most common
> way a 100 performance score becomes an 80.

---

## Priority 2 — the `gallery/` folder is not used

Four placeholder files sit in `gallery/`, left over from the initial build.
**No page renders them.** Real photography now lives with the case study or
course it belongs to (see below), which is a better home for it — a photo next
to the engagement it documents carries more weight than one in an anonymous
grid. The folder can be deleted, or kept if you later want a standalone
gallery page built.

---

## Priority 3 — client logos

`logos/` — the eleven supplied marks, processed by:

```bash
npm run logos
```

That script trims each mark, fits it inside a common box and **never enlarges
it**. It deliberately does *not* strip white backgrounds: several marks are
opaque on white and some contain white inside the artwork (the USAID seal, the
AUC lockup), so a blanket cut-out would punch holes through them. The wall
tiles are white, so an opaque white background is already invisible.

The wall renders **full colour** on white tiles. It is not greyscale, because
the AUC mark is white-on-navy and cannot be desaturated without reading as one
dark box among ten pale ones.

```
vodafone.svg          kahraba.png           usaid.png
auc.png               cairo-university.png  eece.png
bue.png               nile-university.png   arab-academy.png
logic-consulting.png  train.png
```

> **Resolution.** The supplied files are 74–298 px wide; a retina 160 px slot
> wants 320 px. They are displayed small enough to stay crisp, but **vector
> (SVG) or higher-resolution originals would look noticeably sharper** — that
> is a source-file limit, not a layout one. Vodafone is already vector and
> shows the difference.

To change which organisations appear, edit `logoWall` in `src/data/person.ts`.
**Only include organisations Ahmed has genuinely worked with, and only where
you have the right to display the mark.**

---

## Brand assets

| Path | Purpose | Notes |
| --- | --- | --- |
| `menova-logo.png` | JSON-LD `Organization.logo` | The official full logo (shield + wordmark) |
| `menova-mark.png` | Header, footer, OG cards, PDF masthead | Shield-only crop of the official logo |
| `badges/auc-instructor-*.webp` | AUC teaching badges | Official AUC files — never redraw or restyle |
| `ahmed-amrousy-running.jpg` | About page, athlete section | Real race photograph |
| `case-studies/<slug>.jpg` | Case-study pages + About strip | 1200 × 800 — see below |
| `apple-touch-icon.png` | iOS home screen | Generated from the mark |
| `../favicon.png` | Browser tab | In `public/`, not `public/images/` |

### Engagement photographs — all real, already in place

```
case-studies/kahraba-1.jpg    Copilot cohort at Kahraba
case-studies/kahraba-2.jpg    The same session, working on real documents
case-studies/eece.jpg         AI for Business Strategy, EECE
case-studies/feps-logic.jpg   AI for Educators, FEPS with Logic Consulting
courses/vodafone-spark-1.jpg  Spark Entrepreneurship Bootcamp with Vodafone
courses/vodafone-spark-2.jpg  The same bootcamp, learning outcomes on screen
```

Add or replace them by editing the `photos:` array in the relevant Markdown
file — each entry needs `src`, `width` and `height`, and takes an optional
`caption`. Run `npm run case-photos` to resize and compress new originals
from `Sources for Website/Photos/`; it prints the dimensions to paste in.

The **Cowork & Fable** case study has no photograph, so it shows the Kahraba
logo instead — set by its `logo:` frontmatter. That is the pattern to follow
whenever an engagement was not photographed: the client's mark, never a
stand-in image pretending to be a photo.

**Faces:** these photographs show identifiable participants. Make sure you have
permission to publish them, particularly for corporate and government clients.

The mark and logo come from the master file in `Sources for Website/Menova Logo.pdf.png`.
To rebrand, replace `menova-logo.png` and `menova-mark.png` (and regenerate
`apple-touch-icon.png` + `../favicon.png` from the mark) — every surface updates.

Open Graph cards are **generated at build time** from page titles — you never supply those. They
land in `dist/og/`, one per page per language.

---

## Formats

The placeholders are JPEG and PNG because those are universally supported and the site references
them with plain `<img>` tags.

If you want WebP or AVIF: convert your files, put them at the same paths with the new extension,
and update the `src` in the component that references them (grep for the filename). Astro's
`<Image>` component would automate this, but it requires the source files to exist at build time —
which is precisely what makes it awkward for a repo shipped with placeholders. Once your real
photography is in place, switching to `astro:assets` is a reasonable next step.

Every image on the site carries `loading="lazy"` and `decoding="async"`, and every one has
explicit `width`/`height` (or a fixed aspect-ratio tile), which is why Cumulative Layout Shift
measures 0 on every audited page.

---

## Regenerating placeholders

Only needed if you change the expected filenames:

```bash
npm run placeholders
```

This overwrites the placeholder files. It will overwrite real images too, so do not run it after
you have added your own.
