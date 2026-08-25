import { getCollection, type CollectionEntry, type CollectionKey } from 'astro:content';
import type { Locale } from '~/site.config';

/**
 * Collection entry ids look like "en/ai-for-business". This splits them back
 * into the locale and the shared slug that pairs an entry with its mirror.
 */
export function splitId(id: string): { lang: Locale; slug: string } {
  const [lang, ...rest] = id.split('/');
  return { lang: lang as Locale, slug: rest.join('/') };
}

/** All entries in one language, sorted by their `order` frontmatter field. */
export async function entriesFor<C extends CollectionKey>(
  collection: C,
  lang: Locale,
): Promise<Array<CollectionEntry<C> & { slug: string }>> {
  const all = await getCollection(collection);
  return all
    .filter((entry) => splitId(entry.id).lang === lang)
    .map((entry) => Object.assign(entry, { slug: splitId(entry.id).slug }))
    .sort((a, b) => {
      const orderA = (a.data as { order?: number }).order ?? 99;
      const orderB = (b.data as { order?: number }).order ?? 99;
      return orderA - orderB;
    });
}

/** One entry by language + shared slug. Returns undefined if the mirror is missing. */
export async function entryFor<C extends CollectionKey>(
  collection: C,
  lang: Locale,
  slug: string,
): Promise<CollectionEntry<C> | undefined> {
  const all = await getCollection(collection);
  return all.find((entry) => entry.id === `${lang}/${slug}`);
}

/**
 * getStaticPaths helper: one route per entry per language, with the English
 * routes un-prefixed and Arabic under /ar/.
 *
 * `param` names the dynamic segment. It is 'slug' for the nested routes
 * (courses/[slug].astro) and 'geo' for the root-level geo route, whose
 * segment cannot be called 'slug' without colliding with them.
 */
export async function pathsFor<C extends CollectionKey>(
  collection: C,
  lang: Locale,
  param: string = 'slug',
) {
  const entries = await entriesFor(collection, lang);
  return entries.map((entry) => ({
    params: { [param]: entry.slug },
    props: { entry, lang },
  }));
}
