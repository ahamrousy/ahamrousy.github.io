import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Content model
 * ─────────────
 * Every collection is stored as  <collection>/<lang>/<slug>.md  so an English
 * page and its Arabic mirror share one slug. That shared slug is the join key
 * for hreflang, for the language switch and for "related" links — nothing has
 * to be wired up by hand when a page is added.
 *
 * To add a course: drop en/<slug>.md and ar/<slug>.md into src/content/courses/.
 * Both routes, both sitemap entries, the hreflang pair, the Course JSON-LD and
 * the catalogue card all appear on the next build. See README.md.
 */

/** Shared SEO frontmatter. Enforced lengths keep titles and descriptions in-SERP. */
const seo = {
  /** ≤ 60 characters — longer titles get truncated in Google's results. */
  seoTitle: z.string().max(60),
  /** ≤ 155 characters. */
  metaDescription: z.string().max(155),
  primaryKeyword: z.string(),
  secondaryKeywords: z.array(z.string()).default([]),
  /**
   * The GEO payload: 2–3 self-contained sentences that define the entity
   * without needing the rest of the page. Rendered as the opening paragraph
   * and reused in llms-full.txt. Write it so it can be quoted verbatim.
   */
  summary: z.string(),
  updated: z.coerce.date(),
  noindex: z.boolean().default(false),
  /**
   * Anything on this page that Ahmed still has to confirm — durations, dates,
   * headcounts, quotes. Rendered as a visible TODO panel so a placeholder can
   * never quietly harden into a fact. Empty array = page is fully confirmed.
   */
  todos: z.array(z.string()).default([]),
};

const faqSchema = z
  .array(z.object({ q: z.string(), a: z.string() }))
  .default([])
  .describe('Rendered as <details> and emitted as FAQPage JSON-LD.');

const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    ...seo,
    title: z.string(),
    /** Shown on cards and in the nav; keep it short. */
    shortTitle: z.string().optional(),
    tagline: z.string(),
    duration: z.string(),
    /** ISO-8601 duration for Course/CourseInstance JSON-LD, e.g. "PT16H". */
    durationISO: z.string(),
    format: z.string(),
    audience: z.string(),
    teachingLanguage: z.string(),
    level: z.string(),
    delivery: z.string(),
    outcomes: z.array(z.string()),
    modules: z.array(z.object({ title: z.string(), points: z.array(z.string()) })),
    who: z.array(z.string()),
    toolsCovered: z.array(z.string()).default([]),
    frameworksTaught: z.array(z.string()).default([]),
    faqs: faqSchema,
    /** Slugs used for internal linking. Every course links to one of each. */
    relatedCase: z.string().optional(),
    relatedGeo: z.string().optional(),
    order: z.number().default(99),
    flagship: z.boolean().default(false),
  }),
});

const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    ...seo,
    title: z.string(),
    client: z.string(),
    sector: z.string(),
    participants: z.string().optional(),
    rating: z.string().optional(),
    programme: z.string(),
    /** TODO placeholders live here until Ahmed confirms exact dates. */
    period: z.string().optional(),
    challenge: z.string(),
    approach: z.array(z.string()),
    result: z.array(z.string()),
    testimonial: z.object({ quote: z.string(), attribution: z.string() }).optional(),
    /**
     * Photo from the engagement, e.g. "images/case-studies/kahraba.jpg".
     * Ships as a branded placeholder — drop a real 1200×800 photo at the same
     * path and it appears on the case study page, the hub and the About strip.
     */
    photo: z.string().optional(),
    relatedCourse: z.string().optional(),
    order: z.number().default(99),
  }),
});

const geo = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/geo' }),
  schema: z.object({
    ...seo,
    title: z.string(),
    /** Country/region shown in UI and used in Course areaServed JSON-LD. */
    region: z.string(),
    countryCode: z.string().length(2),
    cities: z.array(z.string()),
    /** Why a buyer in this market should care — 3 short proof points. */
    proofPoints: z.array(z.string()),
    logistics: z.array(z.object({ label: z.string(), value: z.string() })),
    faqs: faqSchema,
    featuredCourses: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const insights = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/insights' }),
  schema: z.object({
    ...seo,
    title: z.string(),
    published: z.coerce.date(),
    readingTime: z.number(),
    /** Question-style queries this article is written to answer. */
    answers: z.array(z.string()).default([]),
    faqs: faqSchema,
    relatedCourse: z.string().optional(),
    order: z.number().default(99),
  }),
});

export const collections = { courses, caseStudies, geo, insights };
