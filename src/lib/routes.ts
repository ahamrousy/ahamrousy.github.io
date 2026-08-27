import { getCollection } from 'astro:content';
import type { Locale } from '~/site.config';
import { splitId } from '~/i18n/content';

/**
 * The single registry of every indexable route on the site.
 *
 * sitemap.xml and llms.txt both read from here, which is the point: a new
 * course or article appears in both automatically, and the two can never
 * disagree about what exists. 404 is deliberately absent — it is noindex.
 */

export interface RouteRecord {
  /** Language-neutral route key. '' is home. */
  key: string;
  /** Latest meaningful change, used for sitemap <lastmod>. */
  lastmod: Date;
  /** Sitemap priority. Entity and commercial pages rank highest. */
  priority: number;
  changefreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  /** Human title per locale, used by llms.txt. */
  title: Record<Locale, string>;
  /** One-line description per locale, used by llms.txt. */
  description: Record<Locale, string>;
}

/** Fallback date for the hand-written singleton pages. */
const SITE_UPDATED = new Date('2026-08-24');

export async function allRoutes(): Promise<RouteRecord[]> {
  const [courses, cases, geo, insights] = await Promise.all([
    getCollection('courses'),
    getCollection('caseStudies'),
    getCollection('geo'),
    getCollection('insights'),
  ]);

  const byLang = <T extends { id: string; data: Record<string, unknown> }>(
    entries: T[],
    lang: Locale,
  ) => entries.filter((entry) => splitId(entry.id).lang === lang);

  /** Pulls the localised value for a collection-backed route. */
  const pair = <T extends { id: string; data: Record<string, unknown> }>(
    entries: T[],
    slug: string,
    field: string,
  ): Record<Locale, string> => ({
    en: String(entries.find((e) => e.id === `en/${slug}`)?.data[field] ?? ''),
    ar: String(entries.find((e) => e.id === `ar/${slug}`)?.data[field] ?? ''),
  });

  const routes: RouteRecord[] = [
    {
      key: '',
      lastmod: SITE_UPDATED,
      priority: 1.0,
      changefreq: 'weekly',
      title: { en: 'Menova — AI for Business training', ar: 'مِنوفا — تدريب الذكاء الاصطناعي للأعمال' },
      description: {
        en: 'Homepage. Who Ahmed Amrousy is, the seven programmes, proof and contact.',
        ar: 'الصفحة الرئيسية. مَن هو أحمد عمروسي، والبرامج السبعة، والأدلة، والتواصل.',
      },
    },
    {
      key: 'about',
      lastmod: SITE_UPDATED,
      priority: 0.95,
      changefreq: 'monthly',
      title: { en: 'Ahmed Amrousy — full profile', ar: 'أحمد عمروسي — الملف الكامل' },
      description: {
        en: 'Canonical biography, roles, credentials and media kit. The authoritative source on the Ahmed Amrousy entity.',
        ar: 'السيرة المعتمدة والمواقع والمؤهلات والملف الصحفي. المصدر المرجعي عن أحمد عمروسي.',
      },
    },
    {
      key: 'courses',
      lastmod: SITE_UPDATED,
      priority: 0.9,
      changefreq: 'monthly',
      title: { en: 'Course catalogue', ar: 'برامج مِنوفا التدريبية' },
      description: {
        en: 'All seven Menova AI programmes with duration, audience and format.',
        ar: 'برامج مِنوفا السبعة بالمدة والفئة المستهدفة والصيغة.',
      },
    },
    {
      key: 'method',
      lastmod: SITE_UPDATED,
      priority: 0.8,
      changefreq: 'monthly',
      title: { en: 'The Menova method', ar: 'منهج مِنوفا' },
      description: {
        en: 'POCAB and GCSE-F prompting frameworks, the 70/30 structure, and the tools used.',
        ar: 'إطارا POCAB وGCSE-F، وبنية 70/30، والأدوات المستخدمة.',
      },
    },
    {
      key: 'case-studies',
      lastmod: SITE_UPDATED,
      priority: 0.8,
      changefreq: 'monthly',
      title: { en: 'Case studies', ar: 'دراسات الحالة' },
      description: {
        en: 'Documented training engagements including Kahraba, EECE and Cairo University FEPS with Logic Consulting.',
        ar: 'مشروعات تدريب موثَّقة تشمل كهرباء والمجلس التصديري وجامعة القاهرة مع لوجيك كونسلتنج.',
      },
    },
    {
      key: 'insights',
      lastmod: SITE_UPDATED,
      priority: 0.7,
      changefreq: 'weekly',
      title: { en: 'Insights', ar: 'مقالات' },
      description: {
        en: 'Articles by Ahmed Amrousy on AI training, prompting frameworks and corporate adoption.',
        ar: 'مقالات بقلم أحمد عمروسي عن التدريب وأُطر التوجيه والتبنّي المؤسسي.',
      },
    },
    {
      key: 'speaking',
      lastmod: SITE_UPDATED,
      priority: 0.7,
      changefreq: 'monthly',
      title: { en: 'Speaking — keynotes and workshops', ar: 'المحاضرات وورش العمل' },
      description: {
        en: 'Keynote topics, formats and booking for conferences and universities.',
        ar: 'موضوعات المحاضرات والصيغ وطريقة الحجز للمؤتمرات والجامعات.',
      },
    },
    {
      key: 'podcast',
      lastmod: SITE_UPDATED,
      priority: 0.6,
      changefreq: 'monthly',
      title: { en: 'عاش يا وحش — podcast', ar: 'بودكاست عاش يا وحش' },
      description: {
        en: 'Sports-transformation podcast hosted by Ahmed Amrousy. One completed season.',
        ar: 'بودكاست عن التحوّل في الرياضة يقدّمه أحمد عمروسي. موسم أول مكتمل.',
      },
    },
    {
      key: 'contact',
      lastmod: SITE_UPDATED,
      priority: 0.9,
      changefreq: 'monthly',
      title: { en: 'Schedule a call', ar: 'احجز مكالمة' },
      description: {
        en: 'Pick a date and time for a phone or online call with Ahmed, or request a proposal by email or WhatsApp.',
        ar: 'اختر تاريخًا ووقتًا لمكالمة هاتفية أو أونلاين مع أحمد، أو اطلب عرضًا عبر البريد أو واتساب.',
      },
    },
  ];

  for (const entry of byLang(courses, 'en')) {
    const { slug } = splitId(entry.id);
    routes.push({
      key: `courses/${slug}`,
      lastmod: entry.data.updated,
      priority: entry.data.flagship ? 0.9 : 0.85,
      changefreq: 'monthly',
      title: pair(courses, slug, 'title'),
      description: pair(courses, slug, 'tagline'),
    });
  }

  for (const entry of byLang(geo, 'en')) {
    const { slug } = splitId(entry.id);
    routes.push({
      key: slug,
      lastmod: entry.data.updated,
      priority: 0.85,
      changefreq: 'monthly',
      title: pair(geo, slug, 'title'),
      description: pair(geo, slug, 'metaDescription'),
    });
  }

  for (const entry of byLang(cases, 'en')) {
    const { slug } = splitId(entry.id);
    routes.push({
      key: `case-studies/${slug}`,
      lastmod: entry.data.updated,
      priority: 0.7,
      changefreq: 'yearly',
      title: pair(cases, slug, 'title'),
      description: pair(cases, slug, 'client'),
    });
  }

  for (const entry of byLang(insights, 'en')) {
    const { slug } = splitId(entry.id);
    routes.push({
      key: `insights/${slug}`,
      lastmod: entry.data.updated,
      priority: 0.65,
      changefreq: 'monthly',
      title: pair(insights, slug, 'title'),
      description: pair(insights, slug, 'metaDescription'),
    });
  }

  return routes;
}
