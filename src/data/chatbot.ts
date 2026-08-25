import type { Locale } from '~/site.config';

/**
 * Chatbot knowledge base.
 *
 * Why it is rule-based and not an LLM: the site is static and hosted on GitHub
 * Pages. There is no server to hold an API key, and any key shipped inside a
 * static page is a key handed to the public. So this is a deterministic
 * keyword matcher over a fixed answer set — it cannot hallucinate a price, a
 * date or a credential, which matters when the whole SEO strategy depends on
 * one consistent set of facts. Anything outside the script routes to WhatsApp,
 * which is the behaviour Ahmed asked for anyway.
 *
 * Every answer here restates a fact that also appears in the page copy, so the
 * bot never becomes a second, drifting source of truth.
 */

export interface Intent {
  id: string;
  /** Lowercased, accent-stripped keyword stems. Matching is substring-based. */
  patterns: { en: string[]; ar: string[] };
  answer: { en: string; ar: string };
  /** Route keys offered as follow-up links after the answer. */
  links?: Array<{ key: string; label: { en: string; ar: string } }>;
}

export const intents: Intent[] = [
  {
    id: 'greeting',
    patterns: {
      en: ['hello', 'hi ', 'hi', 'hey', 'good morning', 'good evening', 'salam'],
      ar: ['اهلا', 'أهلا', 'مرحبا', 'السلام', 'صباح', 'مساء', 'هاي'],
    },
    answer: {
      en: 'Hello. Ask me about the courses, how long they run, which languages Ahmed teaches in, or where Menova delivers. For pricing and dates, Ahmed answers personally on WhatsApp.',
      ar: 'أهلًا بك. اسألني عن البرامج ومدتها ولغة التقديم والأماكن التي تُنفَّذ فيها. أما الأسعار والمواعيد فيردّ عليها أحمد شخصيًا على واتساب.',
    },
  },
  {
    id: 'who',
    patterns: {
      en: ['who is', 'who’s', 'about ahmed', 'amrousy', 'background', 'experience', 'cv', 'bio', 'qualification', 'credential'],
      ar: ['مين', 'من هو', 'عمروسي', 'خبرة', 'سيرة', 'مؤهل', 'نبذة'],
    },
    answer: {
      en: 'Ahmed Amrousy is an Egyptian AI-for-Business instructor. He teaches executive education at the American University in Cairo, is Head of Marketing & PR at Nile Air, a DBA candidate at Ain Shams University, and the founder of Menova. He has 20+ years of marketing leadership across aviation, FMCG, EdTech and manufacturing.',
      ar: 'أحمد عمروسي محاضر مصري في الذكاء الاصطناعي للأعمال. يُدرِّس في التعليم التنفيذي بالجامعة الأمريكية بالقاهرة، ويشغل منصب مدير التسويق والعلاقات العامة في نايل إير، وباحث دكتوراه بجامعة عين شمس، ومؤسس مِنوفا. له أكثر من 20 عامًا في قيادة التسويق عبر الطيران والسلع الاستهلاكية والتعليم الرقمي والصناعة.',
    },
    links: [{ key: 'about', label: { en: 'Full profile', ar: 'الملف الكامل' } }],
  },
  {
    id: 'courses',
    patterns: {
      en: ['course', 'courses', 'programme', 'program', 'training', 'workshop', 'catalog', 'catalogue', 'what do you offer', 'services'],
      ar: ['دورة', 'دورات', 'كورس', 'كورسات', 'برنامج', 'برامج', 'تدريب', 'ورشة', 'خدمات'],
    },
    answer: {
      en: 'Menova runs six programmes: AI for Business, AI for Executives, AI for Marketing & Sales, AI for Educators, AI for Automation, and the flagship 16-hour AI for Business Strategy workshop. All of them are 70% hands-on.',
      ar: 'تقدّم مِنوفا ستة برامج: الذكاء الاصطناعي للأعمال، وللقيادات التنفيذية، وللتسويق والمبيعات، وللمعلمين، وللأتمتة، بالإضافة إلى ورشة استراتيجية الذكاء الاصطناعي الرئيسية ومدتها 16 ساعة. جميعها 70% تطبيق عملي.',
    },
    links: [{ key: 'courses', label: { en: 'See all six', ar: 'تصفَّح البرامج' } }],
  },
  {
    id: 'duration',
    patterns: {
      en: ['how long', 'duration', 'hours', 'days', 'length', 'time commitment', '16 hour', 'schedule'],
      ar: ['مدة', 'كام ساعة', 'كم ساعة', 'كام يوم', 'كم يوم', 'المدة', 'ساعات', 'جدول'],
    },
    answer: {
      en: 'Most programmes run 6 to 12 hours, delivered as one or two days. The flagship AI for Business Strategy workshop is 16 hours, usually split across two days. Exact scheduling is set with the client.',
      ar: 'معظم البرامج بين 6 و12 ساعة تُنفَّذ في يوم أو يومين. أما ورشة استراتيجية الذكاء الاصطناعي الرئيسية فمدتها 16 ساعة، تُقسَّم عادةً على يومين. ويُتَّفق على الجدول الدقيق مع الجهة.',
    },
    links: [{ key: 'courses/ai-for-business-strategy', label: { en: 'The 16-hour workshop', ar: 'ورشة الـ16 ساعة' } }],
  },
  {
    id: 'language',
    patterns: {
      en: ['arabic', 'language', 'english', 'in arabic', 'bilingual', 'which language'],
      ar: ['لغة', 'بالعربي', 'عربي', 'انجليزي', 'إنجليزي', 'اللغة'],
    },
    answer: {
      en: 'Yes — Ahmed delivers verbally in Arabic with English slides and English materials. Fully English delivery is also available. Both work for mixed Arabic/English teams.',
      ar: 'نعم — يقدّم أحمد الشرح شفهيًا بالعربية مع شرائح ومواد بالإنجليزية. والتقديم بالإنجليزية بالكامل متاح أيضًا. والصيغتان تناسبان الفرق المختلطة.',
    },
    links: [{ key: 'method', label: { en: 'How Ahmed teaches', ar: 'منهج التدريس' } }],
  },
  {
    id: 'price',
    patterns: {
      en: ['price', 'cost', 'how much', 'fee', 'fees', 'budget', 'quote', 'rate', 'pricing', 'proposal'],
      ar: ['سعر', 'تكلفة', 'كام', 'بكام', 'اسعار', 'أسعار', 'تكاليف', 'عرض سعر', 'ميزانية'],
    },
    answer: {
      en: 'Pricing is set per client — it depends on team size, seniority, duration and city. Send Ahmed the team size and the objective and you get a written proposal, agenda and price, within two working days. WhatsApp is fastest.',
      ar: 'السعر يُحدَّد لكل جهة على حدة حسب عدد المشاركين ومستواهم والمدة والمدينة. أرسل لأحمد عدد المشاركين والهدف من التدريب ويصلك عرض مكتوب بالأجندة والسعر خلال يومَي عمل. وواتساب أسرع وسيلة.',
    },
    /** Deliberately escalates: pricing is a conversation Ahmed wants to own. */
    links: [{ key: 'contact', label: { en: 'Request a proposal', ar: 'اطلب عرضًا' } }],
  },
  {
    id: 'locations',
    patterns: {
      en: ['where', 'egypt', 'cairo', 'saudi', 'riyadh', 'uae', 'dubai', 'abu dhabi', 'gcc', 'gulf', 'travel', 'country', 'location'],
      ar: ['فين', 'أين', 'مصر', 'القاهرة', 'السعودية', 'الرياض', 'الامارات', 'الإمارات', 'دبي', 'ابوظبي', 'الخليج', 'مكان'],
    },
    answer: {
      en: 'Menova delivers on-site in Egypt (Cairo and beyond), Saudi Arabia and the UAE, and live online anywhere. Ahmed has already delivered in the UAE for Hisense via Formatech.',
      ar: 'تنفّذ مِنوفا التدريب حضوريًا في مصر (القاهرة وغيرها) والسعودية والإمارات، وأونلاين مباشر في أي مكان. وقد نفَّذ أحمد بالفعل تدريبًا في الإمارات لهايسنس عبر فورماتك.',
    },
    links: [
      { key: 'corporate-ai-training-egypt', label: { en: 'Egypt', ar: 'مصر' } },
      { key: 'corporate-ai-training-saudi-arabia', label: { en: 'Saudi Arabia', ar: 'السعودية' } },
      { key: 'corporate-ai-training-uae', label: { en: 'UAE', ar: 'الإمارات' } },
    ],
  },
  {
    id: 'online',
    patterns: {
      en: ['online', 'remote', 'virtual', 'zoom', 'teams', 'in person', 'onsite', 'on-site', 'face to face'],
      ar: ['اونلاين', 'أونلاين', 'عن بعد', 'حضوري', 'زوم', 'اون لاين'],
    },
    answer: {
      en: 'Both. Every programme runs on-site at your offices or live online. The 70% hands-on structure is kept either way — participants work on their own data during the session.',
      ar: 'الاثنان. كل برنامج يُنفَّذ حضوريًا في مقر الجهة أو أونلاين مباشر. وتُحافظ الصيغتان على بنية 70% تطبيق عملي — إذ يعمل المشاركون على بياناتهم الفعلية أثناء الجلسة.',
    },
  },
  {
    id: 'audience',
    patterns: {
      en: ['who is it for', 'audience', 'executives', 'managers', 'beginners', 'technical', 'prerequisite', 'level', 'suitable'],
      ar: ['لمين', 'لمن', 'الفئة', 'مديرين', 'تنفيذيين', 'مبتدئ', 'مستوى', 'شروط', 'مناسب'],
    },
    answer: {
      en: 'The programmes are built for executives, managers and professional teams — no technical background needed. Ahmed teaches leaders how to think with AI, not how to code. Sessions work best with 10 to 25 participants.',
      ar: 'البرامج مصمَّمة للتنفيذيين والمديرين والفرق المهنية — دون الحاجة إلى خلفية تقنية. فأحمد يُعلِّم القيادات كيف تُفكِّر بالذكاء الاصطناعي لا كيف تبرمج. وتعمل الجلسات على أفضل وجه مع 10 إلى 25 مشاركًا.',
    },
    links: [{ key: 'courses/ai-for-executives', label: { en: 'AI for Executives', ar: 'الذكاء الاصطناعي للقيادات' } }],
  },
  {
    id: 'frameworks',
    patterns: {
      en: ['pocab', 'gcse', 'framework', 'method', 'prompting', 'prompt', 'sostac', 'playing to win', 'how do you teach', 'methodology'],
      ar: ['بوكاب', 'إطار', 'اطار', 'منهج', 'طريقة', 'الأوامر', 'برومبت', 'منهجية'],
    },
    answer: {
      en: 'Ahmed teaches two prompting frameworks of his own design: POCAB (Persona, Objective, Context, Audience, Boundaries) for single prompts, and GCSE-F (Goal, Context, Source, Expectations, Format) for work over documents and data. For AI strategy he uses SOSTAC and Playing to Win.',
      ar: 'يُدرِّس أحمد إطارَين للتوجيه من تصميمه: POCAB (الشخصية، الهدف، السياق، الجمهور، الحدود) للأوامر المفردة، وGCSE-F (الهدف، السياق، المصدر، التوقعات، الصيغة) للعمل على المستندات والبيانات. ولاستراتيجية الذكاء الاصطناعي يستخدم SOSTAC وPlaying to Win.',
    },
    links: [{ key: 'method', label: { en: 'The method', ar: 'المنهج' } }],
  },
  {
    id: 'tools',
    patterns: {
      en: ['tool', 'tools', 'chatgpt', 'claude', 'copilot', 'gemini', 'notebooklm', 'software', 'which ai'],
      ar: ['ادوات', 'أدوات', 'شات جي بي تي', 'كلود', 'كوبايلوت', 'جيميني', 'برامج'],
    },
    answer: {
      en: 'Sessions cover Claude (chat, Cowork and Fable 5), Microsoft Copilot, NotebookLM / Gemini Notebook, and ChatGPT — demonstrated live on real datasets rather than slides.',
      ar: 'تغطي الجلسات كلود (المحادثة وCowork وFable 5)، ومايكروسوفت كوبايلوت، وNotebookLM / جيميني نوتبوك، وشات جي بي تي — بعروض حية على بيانات حقيقية لا مجرد شرائح.',
    },
  },
  {
    id: 'clients',
    patterns: {
      en: ['client', 'clients', 'who have you trained', 'case study', 'reference', 'kahraba', 'testimonial', 'proof', 'results'],
      ar: ['عملاء', 'عميل', 'دراسة حالة', 'كهرباء', 'مرجع', 'نتائج', 'من درب'],
    },
    answer: {
      en: 'Recent programmes include Kahraba (the National Electricity Technology Company) where 65 executives including the CEO rated it 4.8/5, companies affiliated with the Engineering Export Council of Egypt, Cairo University FEPS, Hisense UAE via Formatech, and Logic Consulting.',
      ar: 'من البرامج الأخيرة: كهرباء (الشركة القومية لتكنولوجيا الكهرباء) حيث درَّب 65 تنفيذيًا بينهم الرئيس التنفيذي بتقييم 4.8/5، وشركات أعضاء المجلس التصديري للصناعات الهندسية، وكلية الاقتصاد والعلوم السياسية بجامعة القاهرة، وهايسنس الإمارات عبر فورماتك، ولوجيك كونسلتنج.',
    },
    links: [{ key: 'case-studies', label: { en: 'Case studies', ar: 'دراسات الحالة' } }],
  },
  {
    id: 'booking',
    patterns: {
      en: ['book', 'booking', 'contact', 'call', 'reach', 'email', 'talk to', 'get in touch', 'available', 'availability', 'date', 'when can'],
      ar: ['حجز', 'احجز', 'تواصل', 'اتصال', 'ايميل', 'مكالمة', 'متاح', 'موعد', 'ميعاد'],
    },
    answer: {
      en: 'The fastest route is WhatsApp — Ahmed replies personally, usually the same day. You can also email ahmedamrousy@aucegypt.edu with your team size, city and preferred dates.',
      ar: 'أسرع وسيلة هي واتساب — يردّ أحمد بنفسه، وعادةً في نفس اليوم. ويمكنك أيضًا مراسلته على ahmedamrousy@aucegypt.edu مع ذكر عدد المشاركين والمدينة والتواريخ المفضلة.',
    },
    links: [{ key: 'contact', label: { en: 'Contact page', ar: 'صفحة التواصل' } }],
  },
  {
    id: 'speaking',
    patterns: {
      en: ['keynote', 'speak', 'speaker', 'conference', 'event', 'panel', 'university talk'],
      ar: ['محاضرة', 'مؤتمر', 'متحدث', 'ندوة', 'فعالية', 'كلمة'],
    },
    answer: {
      en: 'Yes — Ahmed speaks at conferences, universities and corporate events on AI adoption, AI strategy and the future of managerial work, in Arabic or English.',
      ar: 'نعم — يتحدث أحمد في المؤتمرات والجامعات وفعاليات الشركات عن تبنّي الذكاء الاصطناعي واستراتيجيته ومستقبل العمل الإداري، بالعربية أو الإنجليزية.',
    },
    links: [{ key: 'speaking', label: { en: 'Speaking', ar: 'المحاضرات' } }],
  },
  {
    id: 'podcast',
    patterns: {
      en: ['podcast', 'show', '3aash', 'wa7sh', 'sports'],
      ar: ['بودكاست', 'عاش يا وحش', 'رياضة', 'برنامج صوتي'],
    },
    answer: {
      en: 'Ahmed hosts عاش يا وحش (3aash Ya Wa7sh), a sports-transformation podcast with one completed season.',
      ar: 'يقدّم أحمد بودكاست «عاش يا وحش» عن التحوّل في الرياضة، وله موسم أول مكتمل.',
    },
    links: [{ key: 'podcast', label: { en: 'The podcast', ar: 'البودكاست' } }],
  },
];

/** Chips shown before the visitor types anything. Keys map to intent ids. */
export const starterQuestions: Record<Locale, Array<{ label: string; intent: string }>> = {
  en: [
    { label: 'Who is Ahmed Amrousy?', intent: 'who' },
    { label: 'What courses do you run?', intent: 'courses' },
    { label: 'Do you train in Arabic?', intent: 'language' },
    { label: 'How much does it cost?', intent: 'price' },
    { label: 'Do you deliver in Saudi or the UAE?', intent: 'locations' },
  ],
  ar: [
    { label: 'مَن هو أحمد عمروسي؟', intent: 'who' },
    { label: 'ما البرامج المتاحة؟', intent: 'courses' },
    { label: 'هل التدريب بالعربية؟', intent: 'language' },
    { label: 'ما التكلفة؟', intent: 'price' },
    { label: 'هل تنفّذون في السعودية والإمارات؟', intent: 'locations' },
  ],
};
