/**
 * Menova — single source of truth for site-wide constants.
 *
 * ─────────────────────────────────────────────────────────────────────────────
 * ⚠️  THE ONLY TWO LINES YOU MUST CHANGE BEFORE YOUR FIRST DEPLOY:
 *
 *   SITE_URL  — your live origin, no trailing slash
 *   BASE      — "/" for a root repo (username.github.io)
 *               "/menova/" for a project repo (username.github.io/menova)
 *
 * Everything else (canonicals, hreflang, sitemap, JSON-LD, OG images, llms.txt)
 * derives from these. astro.config.ts imports them, so they never drift.
 * ─────────────────────────────────────────────────────────────────────────────
 */
export const SITE_URL = 'https://ahamrousy.github.io';
export const BASE = '/';

/** Contact + social. Used in the UI, the chatbot, and Person/Organization JSON-LD. */
export const contact = {
  email: 'ahmedamrousy@aucegypt.edu',
  /** International format, digits only — this is what wa.me expects. */
  whatsappNumber: '201001240186',
  /** Human-readable, used in visible text and tel: links. */
  whatsappDisplay: '+20 100 124 0186',
  linkedin: 'https://www.linkedin.com/in/ahmed-amrousy/',
  /**
   * Formspree form ID (the part after formspree.io/f/), e.g. "xdorwkqz".
   * Leave empty and the contact form still works — it composes a mailto from
   * the entered values instead of POSTing. See README.md § Contact form.
   */
  formspreeId: '',
  /** TODO: replace with the real URLs once the profiles exist. */
  youtube: '', // TODO: عاش يا وحش podcast channel URL
  spotify: '', // TODO: podcast on Spotify
  googleScholar: '', // TODO: Google Scholar profile (strong entity signal — see LAUNCH-CHECKLIST.md)
  github: '', // TODO: GitHub profile URL
  orcid: '', // TODO: ORCID iD
} as const;

/** Pre-filled WhatsApp deep link. `text` is URL-encoded at call time. */
export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

/** Pre-filled mailto. The primary CTA everywhere on the site. */
export function mailtoUrl(subject: string, body?: string): string {
  const params = new URLSearchParams({ subject });
  if (body) params.set('body', body);
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, '%20')}`;
}

/** Analytics + webmaster verification placeholders. Empty = tag not rendered. */
export const analytics = {
  /** TODO: replace with your GA4 Measurement ID, e.g. "G-XXXXXXXXXX". */
  ga4MeasurementId: '',
  /** TODO: paste the content value from Google Search Console's HTML-tag method. */
  googleSiteVerification: '',
  /** TODO: paste the content value from Bing Webmaster Tools. */
  bingSiteVerification: '',
} as const;

export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Site-wide brand facts, mirrored into Organization JSON-LD. */
export const brand = {
  name: 'Menova',
  legalName: 'Menova',
  foundingLocation: 'Cairo, Egypt',
  colors: {
    crimson: '#9B1B30',
    green: '#1B7A4A',
    ink: '#14151A',
  },
} as const;
