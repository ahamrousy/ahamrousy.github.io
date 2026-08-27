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

## Priority 2 — gallery

Landscape, **1200 × 800** (3:2), under 200 kB each.

| Path | What it should show |
| --- | --- |
| `gallery/training-01.jpg` | A session in progress — room, participants, laptops open |
| `gallery/training-02.jpg` | Ahmed teaching, mid-gesture, screen or whiteboard visible |
| `gallery/event-01.jpg` | Keynote or conference stage |
| `gallery/podcast-01.jpg` | عاش يا وحش recording setup |

Candid beats posed. A photograph of people actually working on laptops in a real session is worth
more than a staged group shot, because it evidences the "70% hands-on" claim the copy makes.

**Faces of participants:** get permission, or choose frames where individuals are not identifiable.
For corporate clients in energy, finance or government this is not optional.

To add more slots, extend the `jobs` array in `scripts/generate-placeholders.mjs`, or just add the
files and reference them from the relevant page.

---

## Priority 3 — client logos

`logos/` — **160 × 48** display size, SVG strongly preferred (sharp at any size, a few kB).
If only PNG is available, supply it at 320 × 96 for retina.

Current placeholder files, each carrying the organisation's name as text:

```
vodafone.svg          usaid.svg            kahraba.svg
eece.svg              bue.svg              nile-university.svg
auc.svg               cairo-university.svg ain-shams.svg
nile-air.svg          logic-consulting.svg
```

The wall renders logos in greyscale at 72% opacity, coming to full colour on hover. That means:

- **Transparent background** — a white box will show as a grey rectangle.
- **Single-colour or high-contrast marks work best.** Very light logos disappear in greyscale.
- Trim whitespace to the mark's bounding box; the grid supplies its own padding.

> **Only add a logo for an organisation Ahmed has genuinely worked with, and only where you have
> the right to display the mark.** Some organisations — universities and government-linked
> entities especially — require written permission. The placeholder is a perfectly respectable
> thing to leave in place; a logo used without permission is not.

To change which organisations appear, edit `logoWall` in `src/data/person.ts`.

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

### Case-study photos — the four slots to fill

One real photograph per documented engagement, 1200 × 800 (3:2), under 200 kB:

```
case-studies/kahraba.jpg               Copilot training at Kahraba
case-studies/kahraba-cowork-fable.jpg  Cowork & Fable 5 session, Kahraba leadership
case-studies/eece.jpg                  AI for Business Strategy, EECE
case-studies/feps-logic.jpg            AI for Educators, FEPS with Logic Consulting
```

Each currently holds a branded placeholder. Drop the real photo at the same
path and it appears on the case-study page, the case-studies hub and the
About page's "Trainings in action" strip. Get participant permission, or pick
frames where individuals are not identifiable.

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

Every image on the site already has `loading="lazy"` and `decoding="async"`, except the hero
headshot, which is `fetchpriority="high"` because it is the LCP element.

---

## Regenerating placeholders

Only needed if you change the expected filenames:

```bash
npm run placeholders
```

This overwrites the placeholder files. It will overwrite real images too, so do not run it after
you have added your own.
