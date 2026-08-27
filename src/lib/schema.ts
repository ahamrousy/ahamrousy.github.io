import { SITE_URL, brand, contact, type Locale } from '~/site.config';
import { person } from '~/data/person';
import { absolute, asset, path } from '~/i18n/routing';

/**
 * JSON-LD builders.
 *
 * Two ideas hold this together:
 *
 * 1. **Stable @ids.** The Person is always `${SITE_URL}/#ahmed-amrousy` and the
 *    Organization is always `${SITE_URL}/#menova`, on every page, in both
 *    languages. Everything else references those ids instead of repeating the
 *    objects. That is what lets a crawler merge 54 pages into one knowledge
 *    graph node rather than 54 loosely-related ones — which is the entire
 *    mechanism behind goal #1, owning the name search.
 *
 * 2. **No invented facts.** Every value traces back to src/data/person.ts.
 *    Empty `sameAs` entries are filtered out rather than guessed at.
 */

export const PERSON_ID = `${SITE_URL}/#ahmed-amrousy`;
export const ORG_ID = `${SITE_URL}/#menova`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

/** Drops empty strings, empty arrays, null and undefined from a node. */
function clean<T extends Json>(node: T): T {
  for (const key of Object.keys(node)) {
    const value = node[key];
    const empty =
      value === undefined ||
      value === null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0);
    if (empty) delete node[key];
  }
  return node;
}

/** External profiles that prove the entity exists off-site. Blanks removed. */
function sameAs(): string[] {
  return [
    contact.linkedin,
    // Broadcast appearance — a third-party page that independently evidences
    // the entity, which is exactly what sameAs is for.
    person.otherWork.television.url,
    contact.googleScholar,
    contact.youtube,
    contact.spotify,
    contact.github,
    contact.orcid,
  ].filter(Boolean);
}

export function personSchema(lang: Locale): Json {
  const roles = person.roles;
  const auc = roles.find((r) => r.id === 'auc')!;
  const nileAir = roles.find((r) => r.id === 'nile-air')!;
  const ainShams = roles.find((r) => r.id === 'ain-shams')!;

  return clean({
    '@type': 'Person',
    '@id': PERSON_ID,
    name: person.name,
    alternateName: [...person.alternateNames],
    honorificPrefix: person.honorificPrefix,
    givenName: 'Ahmed',
    familyName: 'Amrousy',
    description: person.bios[lang].medium,
    disambiguatingDescription: person.bios[lang].short,
    jobTitle: [
      auc.title[lang],
      nileAir.title[lang],
      lang === 'ar' ? 'مؤسس مِنوفا' : 'Founder, Menova',
    ],
    url: absolute(path('about', lang)),
    image: absolute(asset('images/ahmed-amrousy-headshot.jpg')),
    email: `mailto:${contact.email}`,
    telephone: `+${contact.whatsappNumber}`,
    knowsLanguage: [
      { '@type': 'Language', name: 'Arabic', alternateName: 'ar' },
      { '@type': 'Language', name: 'English', alternateName: 'en' },
    ],
    nationality: { '@type': 'Country', name: person.nationality[lang] },
    homeLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    },
    worksFor: [
      clean({ '@type': 'Organization', name: nileAir.org[lang], url: nileAir.url }),
      { '@id': ORG_ID },
    ],
    affiliation: [
      clean({
        '@type': 'CollegeOrUniversity',
        name: auc.org[lang],
        department: auc.unit[lang],
        url: auc.url,
      }),
      clean({ '@type': 'CollegeOrUniversity', name: ainShams.org[lang] }),
    ],
    alumniOf: person.education
      .filter((e) => e.org[lang])
      .map((e) => ({ '@type': 'CollegeOrUniversity', name: e.org[lang] })),
    hasCredential: person.education.map((e) =>
      clean({
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: e.degree[lang],
        recognizedBy: e.org[lang] ? { '@type': 'Organization', name: e.org[lang] } : undefined,
      }),
    ),
    memberOf: [{ '@type': 'Organization', name: 'Chartered Management Institute' }],
    founder: { '@id': ORG_ID },
    knowsAbout:
      lang === 'ar'
        ? [
            'الذكاء الاصطناعي للأعمال',
            'تدريب القيادات على الذكاء الاصطناعي',
            'هندسة الأوامر',
            'استراتيجية التسويق',
            'التعليم التنفيذي',
            'الذكاء الاصطناعي التوليدي',
          ]
        : [
            'AI for Business',
            'Executive AI training',
            'Prompt engineering',
            'Marketing strategy',
            'Executive education',
            'Generative AI adoption',
            'AI strategy',
          ],
    sameAs: sameAs(),
  });
}

export function organizationSchema(lang: Locale): Json {
  return clean({
    '@type': ['Organization', 'EducationalOrganization'],
    '@id': ORG_ID,
    name: brand.name,
    alternateName: lang === 'ar' ? 'مِنوفا' : 'Menova AI Training',
    description:
      lang === 'ar'
        ? 'مِنوفا جهة تدريب متخصصة في الذكاء الاصطناعي للأعمال، أسَّسها أحمد عمروسي، وتقدّم برامج تنفيذية للشركات في مصر والسعودية والإمارات بالعربية والإنجليزية.'
        : 'Menova is an AI-for-Business training practice founded by Ahmed Amrousy, delivering executive programmes to companies in Egypt, Saudi Arabia and the UAE in Arabic and English.',
    url: absolute(path('', lang)),
    logo: absolute(asset('images/menova-logo.png')),
    image: absolute(asset('og/home.png')),
    email: `mailto:${contact.email}`,
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    foundingLocation: {
      '@type': 'Place',
      address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    },
    address: { '@type': 'PostalAddress', addressLocality: 'Cairo', addressCountry: 'EG' },
    areaServed: [
      { '@type': 'Country', name: 'Egypt' },
      { '@type': 'Country', name: 'Saudi Arabia' },
      { '@type': 'Country', name: 'United Arab Emirates' },
      { '@type': 'Place', name: 'Gulf Cooperation Council' },
    ],
    knowsLanguage: ['ar', 'en'],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: lang === 'ar' ? 'استفسارات التدريب' : 'Training enquiries',
      email: contact.email,
      telephone: `+${contact.whatsappNumber}`,
      availableLanguage: ['ar', 'en'],
      areaServed: ['EG', 'SA', 'AE'],
    },
    sameAs: sameAs(),
  });
}

export function websiteSchema(lang: Locale): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: `${brand.name} — ${person.name}`,
    url: absolute(path('', lang)),
    inLanguage: lang,
    publisher: { '@id': ORG_ID },
    about: { '@id': PERSON_ID },
  };
}

export interface Crumb {
  name: string;
  key: string;
}

export function breadcrumbSchema(crumbs: Crumb[], lang: Locale): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: absolute(path(crumb.key, lang)),
    })),
  };
}

export function faqSchema(faqs: Array<{ q: string; a: string }>): Json | null {
  if (!faqs.length) return null;
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  };
}

interface CourseSchemaInput {
  title: string;
  description: string;
  slug: string;
  durationISO: string;
  duration: string;
  delivery: string;
  teachingLanguage: string;
  level: string;
  audience: string;
}

export function courseSchema(course: CourseSchemaInput, lang: Locale): Json {
  const url = absolute(path(`courses/${course.slug}`, lang));
  return clean({
    '@type': 'Course',
    '@id': `${url}#course`,
    name: course.title,
    description: course.description,
    url,
    inLanguage: lang,
    availableLanguage: ['ar', 'en'],
    provider: { '@id': ORG_ID },
    educationalLevel: course.level,
    audience: { '@type': 'EducationalAudience', educationalRole: course.audience },
    teaches: course.title,
    // Google's Course enrichment needs at least one instance carrying a mode
    // and a workload. Two instances because Menova genuinely delivers both.
    hasCourseInstance: [
      {
        '@type': 'CourseInstance',
        courseMode: 'onsite',
        courseWorkload: course.durationISO,
        inLanguage: ['ar', 'en'],
        instructor: { '@id': PERSON_ID },
        location: {
          '@type': 'Place',
          name: course.delivery,
          address: { '@type': 'PostalAddress', addressCountry: 'EG' },
        },
      },
      {
        '@type': 'CourseInstance',
        courseMode: 'online',
        courseWorkload: course.durationISO,
        inLanguage: ['ar', 'en'],
        instructor: { '@id': PERSON_ID },
      },
    ],
  });
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  slug: string;
  published: Date;
  updated: Date;
}

export function articleSchema(article: ArticleSchemaInput, lang: Locale): Json {
  const url = absolute(path(`insights/${article.slug}`, lang));
  return {
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: article.title,
    description: article.description,
    url,
    inLanguage: lang,
    datePublished: article.published.toISOString().slice(0, 10),
    dateModified: article.updated.toISOString().slice(0, 10),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    image: absolute(asset(`og/insights-${article.slug}.png`)),
  };
}

export function podcastSchema(lang: Locale): Json {
  return clean({
    '@type': 'PodcastSeries',
    '@id': `${SITE_URL}/#podcast`,
    name: person.otherWork.podcast.name,
    alternateName: person.otherWork.podcast.nameLatin,
    description: person.otherWork.podcast.description[lang],
    url: absolute(path('podcast', lang)),
    inLanguage: 'ar',
    author: { '@id': PERSON_ID },
    actor: { '@id': PERSON_ID },
    webFeed: contact.spotify || undefined,
    sameAs: [contact.youtube, contact.spotify].filter(Boolean),
  });
}

/**
 * Wraps a set of nodes into one @graph. One script tag per page, every node
 * cross-referenced by @id — easier for crawlers than a scatter of fragments.
 */
export function graph(nodes: Array<Json | null | undefined>): string {
  return JSON.stringify(
    { '@context': 'https://schema.org', '@graph': nodes.filter(Boolean) },
    null,
    0,
  );
}
