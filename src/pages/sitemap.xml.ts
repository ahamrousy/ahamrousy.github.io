import type { APIRoute } from 'astro';
import { locales } from '~/site.config';
import { canonical } from '~/i18n/routing';
import { allRoutes } from '~/lib/routes';

/**
 * XML sitemap with per-URL hreflang alternates.
 *
 * Hand-rolled rather than using @astrojs/sitemap because the bilingual
 * requirement here is specific: every URL must carry xhtml:link alternates for
 * en, ar and x-default, and those links must be reciprocal. Generating them
 * from the same route registry the site itself uses guarantees that.
 */
export const GET: APIRoute = async () => {
  const routes = await allRoutes();

  const urls = routes
    .flatMap((route) =>
      locales.map((lang) => {
        const alternates = [
          ...locales.map(
            (alt) =>
              `    <xhtml:link rel="alternate" hreflang="${alt}" href="${canonical(route.key, alt)}"/>`,
          ),
          `    <xhtml:link rel="alternate" hreflang="x-default" href="${canonical(route.key, 'en')}"/>`,
        ].join('\n');

        return [
          '  <url>',
          `    <loc>${canonical(route.key, lang)}</loc>`,
          `    <lastmod>${route.lastmod.toISOString().slice(0, 10)}</lastmod>`,
          `    <changefreq>${route.changefreq}</changefreq>`,
          `    <priority>${route.priority.toFixed(2)}</priority>`,
          alternates,
          '  </url>',
        ].join('\n');
      }),
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
