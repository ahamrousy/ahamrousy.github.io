import { SITE_URL, BASE, type Locale, defaultLocale, locales } from '~/site.config';

/**
 * Routing model
 * ─────────────
 * Every page is identified by a language-neutral **route key** — the English
 * path with no leading or trailing slash. Home is the empty string.
 *
 *   ''                          → /            and /ar/
 *   'about'                     → /about/      and /ar/about/
 *   'courses/ai-for-business'   → /courses/…/  and /ar/courses/…/
 *
 * Slugs stay Latin in both languages on purpose: it keeps the EN↔AR hreflang
 * pairing mechanical (same key, two locales) and avoids percent-encoded Arabic
 * URLs, which are ugly in the SERP and fragile when shared. The *content* is
 * fully Arabic; only the URL segment is transliterated. See DECISIONS.md.
 */
export type RouteKey = string;

/** Normalises `BASE` to exactly one leading and one trailing slash. */
const baseSegment = `/${BASE.replace(/^\/+|\/+$/g, '')}`.replace(/\/+$/, '') || '';

/**
 * Base-aware, locale-aware internal URL. **Always** use this for internal
 * links and asset paths — never hardcode a leading "/" — so the site keeps
 * working if it moves between a root repo and a /menova/ project repo.
 */
export function path(key: RouteKey, lang: Locale = defaultLocale): string {
  const clean = key.replace(/^\/+|\/+$/g, '');
  const prefix = lang === defaultLocale ? '' : `/${lang}`;
  const tail = clean ? `/${clean}` : '';
  return `${baseSegment}${prefix}${tail}/`;
}

/** Base-aware path to a file in /public (images, downloads, og). */
export function asset(file: string): string {
  return `${baseSegment}/${file.replace(/^\/+/, '')}`;
}

/** Absolute URL — required for canonical, hreflang, OG and JSON-LD. */
export function absolute(pathname: string): string {
  return new URL(pathname, `${SITE_URL}/`).href;
}

/** Absolute canonical for a route key in a given language. */
export function canonical(key: RouteKey, lang: Locale): string {
  return absolute(path(key, lang));
}

/**
 * The full hreflang set for a page: every locale plus x-default.
 * x-default points at English — it is the broadest-reach version of the site.
 */
export function alternates(key: RouteKey): Array<{ hreflang: string; href: string }> {
  const links: Array<{ hreflang: string; href: string }> = locales.map((lang) => ({
    hreflang: lang as string,
    href: canonical(key, lang),
  }));
  links.push({ hreflang: 'x-default', href: canonical(key, defaultLocale) });
  return links;
}

/** Reads the route key back out of a URL pathname (used by the language switch). */
export function keyFromPathname(pathname: string): { key: RouteKey; lang: Locale } {
  let p = pathname;
  if (baseSegment && p.startsWith(baseSegment)) p = p.slice(baseSegment.length);
  p = p.replace(/^\/+|\/+$/g, '');
  const segments = p ? p.split('/') : [];
  const maybeLang = segments[0] as Locale | undefined;
  if (maybeLang && maybeLang !== defaultLocale && (locales as readonly string[]).includes(maybeLang)) {
    return { key: segments.slice(1).join('/'), lang: maybeLang };
  }
  return { key: segments.join('/'), lang: defaultLocale };
}

export const dir = (lang: Locale): 'rtl' | 'ltr' => (lang === 'ar' ? 'rtl' : 'ltr');

/** BCP-47 tags, regionalised so search engines geo-associate correctly. */
export const htmlLang = (lang: Locale): string => (lang === 'ar' ? 'ar' : 'en');
