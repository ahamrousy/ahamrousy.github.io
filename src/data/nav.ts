import type { UIKey } from '~/i18n/ui';

export interface NavItem {
  key: string;
  label: UIKey;
}

/** Header navigation. Deliberately short — six items is the readable limit. */
export const primaryNav: NavItem[] = [
  { key: 'about', label: 'nav.about' },
  { key: 'courses', label: 'nav.courses' },
  { key: 'method', label: 'nav.method' },
  { key: 'case-studies', label: 'nav.cases' },
  { key: 'insights', label: 'nav.insights' },
  { key: 'contact', label: 'nav.contact' },
];

/** Mobile disclosure shows everything, including the pages the header drops. */
export const mobileNav: NavItem[] = [
  { key: '', label: 'nav.home' },
  ...primaryNav.slice(0, 5),
  { key: 'speaking', label: 'nav.speaking' },
  { key: 'podcast', label: 'nav.podcast' },
  { key: 'contact', label: 'nav.contact' },
];

export const footerExplore: NavItem[] = [
  { key: 'about', label: 'nav.about' },
  { key: 'method', label: 'nav.method' },
  { key: 'case-studies', label: 'nav.cases' },
  { key: 'insights', label: 'nav.insights' },
  { key: 'speaking', label: 'nav.speaking' },
  { key: 'podcast', label: 'nav.podcast' },
];

/** Geo landing pages — surfaced in the footer so every page links to them. */
export const geoKeys = [
  'corporate-ai-training-egypt',
  'corporate-ai-training-saudi-arabia',
  'corporate-ai-training-uae',
] as const;
