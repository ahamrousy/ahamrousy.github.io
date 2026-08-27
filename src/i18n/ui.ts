import type { Locale } from '~/site.config';

/**
 * UI chrome strings only — navigation, buttons, labels.
 * Page *copy* lives in src/data/pages/*.ts (singleton pages) and in the
 * Markdown collections under src/content/ (courses, case studies, geo, insights).
 *
 * Arabic here is written, not machine-translated, and uses the same course and
 * role names as the English side so search and generative engines resolve one
 * entity rather than two. See SEO-KEYWORD-MAP.md.
 */
export const ui = {
  en: {
    'skip.content': 'Skip to main content',
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.courses': 'Courses',
    'nav.method': 'Method',
    'nav.cases': 'Case studies',
    'nav.insights': 'Insights',
    'nav.speaking': 'Speaking',
    'nav.podcast': 'Podcast',
    'nav.contact': 'Schedule a call',
    'nav.menu': 'Menu',
    'nav.primary': 'Primary',
    'nav.footer': 'Footer',
    'nav.breadcrumb': 'Breadcrumb',

    'lang.switch': 'العربية',
    'lang.switchLabel': 'Switch to Arabic',
    'lang.current': 'English',

    /** Primary CTA site-wide. Points at the scheduler, never at mailto:
        — a mailto that opens nothing is a dead conversion path. */
    'cta.primary': 'Schedule a meeting',
    'cta.proposal': 'Request a proposal',
    'cta.book': 'Book a call',
    'cta.whatsapp': 'WhatsApp',
    'cta.email': 'Email Ahmed',
    'cta.linkedin': 'LinkedIn',
    'cta.viewCourse': 'View course',
    'cta.allCourses': 'See all seven programmes',
    'cta.readCase': 'Read the case study',
    'cta.readArticle': 'Read the article',
    'cta.download': 'Download one-page profile (PDF)',
    'cta.method': 'How Ahmed teaches',
    'cta.backHome': 'Back to home',

    'label.lastUpdated': 'Last updated',
    'label.duration': 'Duration',
    'label.format': 'Format',
    'label.audience': 'Audience',
    'label.language': 'Language',
    'label.level': 'Level',
    'label.delivery': 'Delivery',
    'label.outcomes': 'What you leave with',
    'label.modules': 'Programme outline',
    'label.who': 'Who it is for',
    'label.tools': 'Tools covered',
    'label.frameworks': 'Frameworks taught',
    'label.client': 'Client',
    'label.sector': 'Sector',
    'label.participants': 'Participants',
    'label.rating': 'Rating',
    'label.challenge': 'The challenge',
    'label.approach': 'The approach',
    'label.result': 'The result',
    'label.readingTime': 'min read',
    'label.published': 'Published',
    'label.author': 'By',

    'heading.faq': 'Frequently asked questions',
    'heading.courses': 'The Menova course catalogue',
    'heading.proof': 'Where Ahmed has taught',
    'heading.related': 'Related',
    'heading.contact': 'Talk to Ahmed',
    'heading.logos': 'Clients, universities and partners',

    'note.logos':
      'Organisations where Ahmed Amrousy has delivered training, taught, or held a leadership role.',
    'note.pricing':
      'Every Menova programme is scoped to the client. Book a short call — or send the team size, seniority and objective — and you get a written proposal with agenda, duration and price within two working days.',
    'note.proposalBody':
      'Hello Ahmed,\n\nWe are considering an AI training programme.\n\nOrganisation:\nTeam size and seniority:\nPreferred language (Arabic / English):\nCity and preferred dates:\nWhat we want people to be able to do afterwards:\n\nThank you.',

    'chat.title': 'Ask about Menova',
    'chat.subtitle': 'Quick answers · then straight to Ahmed',
    'chat.open': 'Open the Menova assistant',
    'chat.close': 'Close chat',
    'chat.placeholder': 'Ask a question…',
    'chat.send': 'Send',
    'chat.greeting':
      'Hello — I answer basic questions about Menova, Ahmed Amrousy and the AI training programmes. For anything specific, Ahmed replies himself on WhatsApp.',
    'chat.fallback':
      'That one is better answered by Ahmed directly. Message him on WhatsApp and you will normally get a reply the same day.',
    'chat.whatsapp': 'Continue on WhatsApp',
    'chat.disclaimer': 'Scripted assistant — no data leaves your browser.',
    'chat.suggestions': 'Suggested questions',

    'a11y.logoHome': 'Menova — home',
    'a11y.chatLog': 'Conversation',

    'footer.tagline': 'AI-for-Business training for leaders in Egypt and the GCC.',
    'footer.rights': 'All rights reserved.',
    'footer.built': 'Cairo, Egypt',
    'footer.explore': 'Explore',
    'footer.programmes': 'Programmes',
    'footer.regions': 'Regions',
  },

  ar: {
    'skip.content': 'تخطَّ إلى المحتوى الرئيسي',
    'nav.home': 'الرئيسية',
    'nav.about': 'عن أحمد عمروسي',
    'nav.courses': 'الدورات',
    'nav.method': 'المنهج',
    'nav.cases': 'دراسات الحالة',
    'nav.insights': 'مقالات',
    'nav.speaking': 'المحاضرات',
    'nav.podcast': 'البودكاست',
    'nav.contact': 'احجز مكالمة',
    'nav.menu': 'القائمة',
    'nav.primary': 'التنقل الرئيسي',
    'nav.footer': 'روابط الموقع',
    'nav.breadcrumb': 'مسار التصفح',

    'lang.switch': 'English',
    'lang.switchLabel': 'التحويل إلى الإنجليزية',
    'lang.current': 'العربية',

    'cta.primary': 'احجز اجتماعًا',
    'cta.proposal': 'اطلب عرضًا تدريبيًا',
    'cta.book': 'احجز مكالمة',
    'cta.whatsapp': 'واتساب',
    'cta.email': 'راسل أحمد',
    'cta.linkedin': 'لينكدإن',
    'cta.viewCourse': 'تفاصيل الدورة',
    'cta.allCourses': 'تصفَّح البرامج السبعة',
    'cta.readCase': 'اقرأ دراسة الحالة',
    'cta.readArticle': 'اقرأ المقال',
    'cta.download': 'حمِّل الملف التعريفي (PDF)',
    'cta.method': 'كيف يُدرِّس أحمد',
    'cta.backHome': 'العودة إلى الرئيسية',

    'label.lastUpdated': 'آخر تحديث',
    'label.duration': 'المدة',
    'label.format': 'الصيغة',
    'label.audience': 'الفئة المستهدفة',
    'label.language': 'لغة التقديم',
    'label.level': 'المستوى',
    'label.delivery': 'مكان التنفيذ',
    'label.outcomes': 'ماذا يخرج به المشارك',
    'label.modules': 'محاور البرنامج',
    'label.who': 'لمن هذا البرنامج',
    'label.tools': 'الأدوات المستخدمة',
    'label.frameworks': 'الأُطر المُدرَّسة',
    'label.client': 'الجهة',
    'label.sector': 'القطاع',
    'label.participants': 'عدد المشاركين',
    'label.rating': 'التقييم',
    'label.challenge': 'التحدي',
    'label.approach': 'المعالجة',
    'label.result': 'النتيجة',
    'label.readingTime': 'دقائق قراءة',
    'label.published': 'تاريخ النشر',
    'label.author': 'بقلم',

    'heading.faq': 'أسئلة متكررة',
    'heading.courses': 'برامج مِنوفا التدريبية',
    'heading.proof': 'أين درَّب أحمد',
    'heading.related': 'اقرأ أيضًا',
    'heading.contact': 'تواصل مع أحمد',
    'heading.logos': 'عملاء وجامعات وشركاء',

    'note.logos': 'جهات درَّب فيها أحمد عمروسي أو دَرَّس بها أو تولَّى فيها موقعًا قياديًا.',
    'note.pricing':
      'كل برنامج في مِنوفا يُفصَّل على مقاس الجهة. احجز مكالمة قصيرة — أو أرسل عدد المشاركين ومستواهم والهدف — ويصلك عرض مكتوب بالأجندة والمدة والسعر خلال يومَي عمل.',
    'note.proposalBody':
      'أهلًا أحمد،\n\nنفكر في برنامج تدريبي عن الذكاء الاصطناعي.\n\nالجهة:\nعدد المشاركين ومستواهم:\nلغة التقديم المفضلة (عربي / إنجليزي):\nالمدينة والتواريخ المقترحة:\nما نريد أن يصبح الفريق قادرًا عليه بعد التدريب:\n\nشكرًا لك.',

    'chat.title': 'اسأل عن مِنوفا',
    'chat.subtitle': 'إجابات سريعة · ثم تواصل مباشر مع أحمد',
    'chat.open': 'افتح مساعد مِنوفا',
    'chat.close': 'إغلاق المحادثة',
    'chat.placeholder': 'اكتب سؤالك…',
    'chat.send': 'إرسال',
    'chat.greeting':
      'أهلًا — أُجيب عن الأسئلة الأساسية حول مِنوفا وأحمد عمروسي وبرامج الذكاء الاصطناعي. لأي تفصيل آخر، يردّ أحمد بنفسه على واتساب.',
    'chat.fallback': 'هذا السؤال يُجيب عنه أحمد مباشرة. راسله على واتساب وعادةً يصلك الرد في نفس اليوم.',
    'chat.whatsapp': 'أكمل على واتساب',
    'chat.disclaimer': 'مساعد آلي مُبرمَج — لا تُرسَل أي بيانات خارج متصفحك.',
    'chat.suggestions': 'أسئلة مقترحة',

    'a11y.logoHome': 'مِنوفا — الصفحة الرئيسية',
    'a11y.chatLog': 'سجل المحادثة',

    'footer.tagline': 'تدريب القيادات على الذكاء الاصطناعي في مصر والخليج.',
    'footer.rights': 'جميع الحقوق محفوظة.',
    'footer.built': 'القاهرة، مصر',
    'footer.explore': 'تصفَّح',
    'footer.programmes': 'البرامج',
    'footer.regions': 'الأسواق',
  },
} as const;

export type UIKey = keyof (typeof ui)['en'];

/** Returns a translator bound to a locale, falling back to English. */
export function useTranslations(lang: Locale) {
  return function t(key: UIKey): string {
    return (ui[lang] as Record<string, string>)[key] ?? ui.en[key];
  };
}
