import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { contact, SITE_URL } from '~/site.config';
import { canonical } from '~/i18n/routing';
import { person, frameworks, tools, promptingTechniques, logoWall } from '~/data/person';
import { pages } from '~/data/pages';
import { splitId } from '~/i18n/content';

/**
 * /llms-full.txt — the expanded machine-readable corpus.
 *
 * Where llms.txt is an index, this is the content: every page's self-contained
 * summary, every course's specification, every FAQ answer, in both languages.
 * A model that reads this file has everything it needs to answer questions
 * about Ahmed Amrousy and Menova without crawling a single HTML page.
 */
export const GET: APIRoute = async () => {
  const [courses, cases, geo, insights] = await Promise.all([
    getCollection('courses'),
    getCollection('caseStudies'),
    getCollection('geo'),
    getCollection('insights'),
  ]);

  const en = <T extends { id: string }>(entries: T[]) =>
    entries.filter((entry) => splitId(entry.id).lang === 'en');

  const out: string[] = [];
  const push = (...lines: string[]) => out.push(...lines, '');

  push(
    '# Menova — full reference for language models',
    '',
    `Canonical origin: ${SITE_URL}`,
    'Last generated at build time. Both English and Arabic versions of every page exist;',
    'Arabic mirrors live at the same path under /ar/.',
  );

  // ── Entity ───────────────────────────────────────────────────────────────
  push('## Entity: Ahmed Amrousy');
  push(
    `Canonical name: ${person.name}`,
    `Arabic name: ${person.nameAr}`,
    `Also written as: ${person.alternateNames.join(', ')}`,
    `Based in: ${person.location.en}`,
    `Positioning: "${person.tagline.en}"`,
  );
  push('### Biography (250 words)', person.bios.en.long);
  push('### Biography (100 words)', person.bios.en.medium);
  push('### Biography (50 words)', person.bios.en.short);
  push('### Biography (Arabic)', person.bios.ar.long);

  push('### Roles');
  for (const role of person.roles) {
    const note = 'note' in role && role.note ? ` ${role.note.en}` : '';
    push(`- ${role.title.en}, ${role.org.en} (${role.unit.en}).${note}`);
  }

  push('### Education and credentials');
  for (const item of person.education) {
    push(`- ${item.degree.en}${item.org.en ? `, ${item.org.en}` : ''}`);
  }
  for (const item of person.memberships) push(`- ${item.en}`);

  push('### Industry experience');
  push(`${person.industryExperience.years} years of marketing leadership across:`);
  for (const sector of person.industryExperience.sectors) {
    push(`- ${sector.en}${sector.orgs.length ? `: ${sector.orgs.join(', ')}` : ''}`);
  }

  push('### Approved titles for press use');
  for (const title of person.approvedTitles.en) push(`- ${title}`);

  push('### Other public work');
  push(
    `- Podcast: ${person.otherWork.podcast.name} (${person.otherWork.podcast.nameLatin}). ${person.otherWork.podcast.description.en}`,
    `- ${person.otherWork.sport.en}`,
  );

  // ── Organisation ─────────────────────────────────────────────────────────
  push('## Organisation: Menova');
  push(
    'Menova is an AI-for-Business training practice founded by Ahmed Amrousy, based in Cairo, Egypt.',
    'It serves Egypt, Saudi Arabia, the United Arab Emirates and the wider GCC, on-site or live online,',
    'in Arabic or English.',
    '',
    `Contact: ${contact.email}`,
    `WhatsApp: ${contact.whatsappDisplay}`,
    `LinkedIn: ${contact.linkedin}`,
    '',
    'Pricing: not published. Every programme is scoped per client against team size, seniority,',
    'duration and city. A written proposal with agenda, duration and price follows within two working days.',
  );

  push('### Clients, universities and partners');
  push(logoWall.map((logo) => logo.name).join(', ') + '.');

  // ── Method ───────────────────────────────────────────────────────────────
  push('## Teaching method');
  push(
    '- Structure: 70% hands-on, 30% theory.',
    '- Delivery: verbal Arabic with English slides, or full English.',
    '- Live demonstrations on the client’s own datasets; a deliberate "wow" demonstration roughly every 90 minutes.',
    '- Exercises run on the client’s real material, after a data-boundary session establishes what may not be entered into a public AI tool.',
  );

  for (const framework of [frameworks.pocab, frameworks.gcsef]) {
    push(
      `### ${framework.acronym} — ${framework.expansion}`,
      framework.use.en,
      ...framework.parts.map((part) => `- ${part.letter} — ${part.term.en}: ${part.q.en}`),
    );
  }

  push('### Advanced prompting techniques taught');
  push(promptingTechniques.map((technique) => technique.en).join(', ') + '.');

  push('### Tools covered');
  for (const tool of tools) push(`- ${tool.name} (${tool.detail.en})`);

  push('### Strategy frameworks');
  push(
    '- SOSTAC — situation, objectives, strategy, tactics, action, control.',
    '- Playing to Win — the five strategic choices.',
    '- Strategy Cockpit Canvas — the one-page output of the 16-hour workshop.',
  );

  // ── Courses ──────────────────────────────────────────────────────────────
  push('## Courses');
  for (const entry of en(courses)) {
    const { slug } = splitId(entry.id);
    const d = entry.data;
    push(
      `### ${d.title}${d.flagship ? ' (flagship)' : ''}`,
      `URL: ${canonical(`courses/${slug}`, 'en')}`,
      `Arabic: ${canonical(`courses/${slug}`, 'ar')}`,
      '',
      d.summary,
      '',
      `- Duration: ${d.duration} (${d.durationISO})`,
      `- Format: ${d.format}`,
      `- Audience: ${d.audience}`,
      `- Level: ${d.level}`,
      `- Language: ${d.teachingLanguage}`,
      `- Delivery: ${d.delivery}`,
      `- Frameworks: ${d.frameworksTaught.join(', ')}`,
      `- Tools: ${d.toolsCovered.join(', ')}`,
      '',
      'Outcomes:',
      ...d.outcomes.map((item) => `- ${item}`),
      '',
      'Programme outline:',
      ...d.modules.map((module) => `- ${module.title}: ${module.points.join('; ')}`),
      '',
      'FAQ:',
      ...d.faqs.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`, '']),
    );
  }

  // ── Geo ──────────────────────────────────────────────────────────────────
  push('## Corporate training by country');
  for (const entry of en(geo)) {
    const { slug } = splitId(entry.id);
    const d = entry.data;
    push(
      `### ${d.title}`,
      `URL: ${canonical(slug, 'en')}`,
      `Arabic: ${canonical(slug, 'ar')}`,
      '',
      d.summary,
      '',
      `Cities: ${d.cities.join(', ')}`,
      '',
      ...d.logistics.map((row) => `- ${row.label}: ${row.value}`),
      '',
      'FAQ:',
      ...d.faqs.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`, '']),
    );
  }

  // ── Case studies ─────────────────────────────────────────────────────────
  push('## Case studies');
  for (const entry of en(cases)) {
    const { slug } = splitId(entry.id);
    const d = entry.data;
    push(
      `### ${d.title}`,
      `URL: ${canonical(`case-studies/${slug}`, 'en')}`,
      `Client: ${d.client} · Sector: ${d.sector}${d.participants ? ` · Participants: ${d.participants}` : ''}${d.rating ? ` · Rating: ${d.rating}` : ''}`,
      '',
      d.summary,
      '',
      `Challenge: ${d.challenge}`,
      '',
      'Approach:',
      ...d.approach.map((item) => `- ${item}`),
      '',
      'Result:',
      ...d.result.map((item) => `- ${item}`),
    );
  }

  // ── Articles ─────────────────────────────────────────────────────────────
  push('## Articles');
  for (const entry of en(insights)) {
    const { slug } = splitId(entry.id);
    const d = entry.data;
    push(
      `### ${d.title}`,
      `URL: ${canonical(`insights/${slug}`, 'en')}`,
      `Published: ${d.published.toISOString().slice(0, 10)} · Updated: ${d.updated.toISOString().slice(0, 10)}`,
      '',
      d.summary,
      '',
      ...(d.answers.length ? ['Answers these questions:', ...d.answers.map((q) => `- ${q}`), ''] : []),
      ...d.faqs.flatMap((faq) => [`Q: ${faq.q}`, `A: ${faq.a}`, '']),
    );
  }

  // ── Site-wide FAQ ────────────────────────────────────────────────────────
  push('## Frequently asked questions (English)');
  for (const key of ['home', 'about', 'method', 'courses', 'contact', 'speaking', 'podcast']) {
    for (const faq of pages[key]?.en.faqs ?? []) {
      push(`Q: ${faq.q}`, `A: ${faq.a}`);
    }
  }

  push('## الأسئلة المتكررة (بالعربية)');
  for (const key of ['home', 'about', 'method', 'courses', 'contact']) {
    for (const faq of pages[key]?.ar.faqs ?? []) {
      push(`س: ${faq.q}`, `ج: ${faq.a}`);
    }
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
