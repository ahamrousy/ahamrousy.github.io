/**
 * The Ahmed Amrousy entity record — the single source of truth.
 *
 * Everything downstream reads from here: Person JSON-LD, the About page, the
 * media kit, /llms.txt, the downloadable PDF, and the chatbot's answers. One
 * record means the name, the job titles and the course names are spelled
 * identically everywhere, which is precisely what search and generative
 * engines need in order to resolve **one** entity instead of several.
 *
 * Every fact below was supplied by Ahmed. Nothing here is inferred. Anything
 * still unknown is marked TODO rather than guessed.
 */

export const person = {
  /** Canonical spelling. Never vary this string. */
  name: 'Ahmed Amrousy',
  nameAr: 'أحمد عمروسي',
  /** Every form people actually search for. Used in JSON-LD alternateName. */
  alternateNames: [
    'Eng. Ahmed Amrousy',
    'Eng Ahmed Amrousy',
    'Dr. Amrousy',
    'Dr Amrousy',
    'Ahmed Amrousy AUC',
    'أحمد عمروسي',
    'م. أحمد عمروسي',
    'الدكتور أحمد عمروسي',
  ],
  honorificPrefix: 'Eng.',
  jobTitle: {
    en: 'Head of Marketing & PR, Nile Air · Executive Education Instructor, AUC · Founder, Menova',
    ar: 'مدير التسويق والعلاقات العامة في نايل إير · محاضر التعليم التنفيذي بالجامعة الأمريكية بالقاهرة · مؤسس مِنوفا',
  },
  tagline: {
    en: 'I teach leaders how to think with AI — not how to use it.',
    ar: 'أُعلِّم القيادات كيف تُفكِّر بالذكاء الاصطناعي — لا كيف تستخدمه.',
  },
  location: { en: 'Cairo, Egypt', ar: 'القاهرة، مصر' },
  nationality: { en: 'Egyptian', ar: 'مصري' },

  /**
   * Roles, in the order Ahmed wants them presented:
   * AUC first, DBA second, industry third, training record fourth.
   */
  roles: [
    {
      id: 'auc',
      org: { en: 'The American University in Cairo', ar: 'الجامعة الأمريكية بالقاهرة' },
      unit: { en: 'Onsi Sawiris School of Business — Executive Education', ar: 'كلية أنسي ساويرس لإدارة الأعمال — التعليم التنفيذي' },
      title: { en: 'Executive Education Instructor', ar: 'محاضر التعليم التنفيذي' },
      url: 'https://business.aucegypt.edu/',
    },
    {
      id: 'ain-shams',
      org: { en: 'Ain Shams University', ar: 'جامعة عين شمس' },
      unit: { en: 'Doctorate of Business Administration (DBA)', ar: 'دكتوراه إدارة الأعمال المهنية' },
      title: { en: 'DBA Candidate', ar: 'باحث دكتوراه' },
      note: {
        en: 'Thesis: the Stimulus–Organism–Response (S-O-R) framework applied to sports-event sponsorship in Egypt.',
        ar: 'موضوع الأطروحة: تطبيق إطار المُثير–الكائن–الاستجابة (S-O-R) على رعاية الأحداث الرياضية في مصر.',
      },
      url: '',
    },
    {
      id: 'nile-air',
      org: { en: 'Nile Air', ar: 'نايل إير' },
      unit: { en: "Egypt's largest private airline", ar: 'أكبر شركة طيران خاصة في مصر' },
      title: { en: 'Head of Marketing & PR', ar: 'مدير التسويق والعلاقات العامة' },
      url: 'https://www.nileair.com/',
    },
    {
      id: 'menova',
      org: { en: 'Menova', ar: 'مِنوفا' },
      unit: { en: 'AI-for-Business training', ar: 'تدريب الذكاء الاصطناعي للأعمال' },
      title: { en: 'Founder', ar: 'المؤسس' },
      url: '',
    },
    {
      id: 'gesmal',
      org: { en: 'GESMAL Industries', ar: 'جيزمال إندَستريز' },
      unit: { en: 'Educational robotics', ar: 'الروبوتات التعليمية' },
      title: { en: 'Co-founder', ar: 'شريك مؤسس' },
      url: '',
    },
  ],

  education: [
    {
      degree: { en: 'DBA (candidate)', ar: 'دكتوراه إدارة الأعمال (باحث)' },
      org: { en: 'Ain Shams University', ar: 'جامعة عين شمس' },
    },
    {
      degree: { en: 'MBA', ar: 'ماجستير إدارة الأعمال' },
      org: { en: 'German University in Cairo', ar: 'الجامعة الألمانية بالقاهرة' },
    },
    {
      degree: { en: 'BSc Mechanical Engineering', ar: 'بكالوريوس الهندسة الميكانيكية' },
      org: { en: 'Cairo University', ar: 'جامعة القاهرة' },
    },
    {
      degree: { en: 'Diploma in Mechatronics', ar: 'دبلوم الميكاترونيكس' },
      org: { en: '', ar: '' },
    },
  ],

  memberships: [{ en: 'Member, Chartered Management Institute (CMI)', ar: 'عضو المعهد البريطاني للإدارة (CMI)' }],

  /** 25 years of marketing leadership, by sector. */
  industryExperience: {
    years: '25',
    sectors: [
      { en: 'Aviation', ar: 'الطيران', orgs: ['Nile Air'] },
      { en: 'FMCG', ar: 'السلع الاستهلاكية', orgs: ['Electrolux', 'Samsung', 'Cadbury Egypt'] },
      { en: 'Publishing & EdTech', ar: 'النشر والتعليم الرقمي', orgs: ['Nahdet Misr'] },
      { en: 'Manufacturing', ar: 'الصناعة', orgs: [] },
    ],
  },

  /** Headline numbers. Keep these citable — generative engines quote figures. */
  stats: [
    { value: '25', label: { en: 'years in marketing leadership', ar: 'عامًا في قيادة التسويق' } },
    { value: '65', label: { en: 'executives trained at Kahraba', ar: 'مسؤولًا تنفيذيًا دُرِّبوا في كهرباء' } },
    { value: '4.8/5', label: { en: 'participant rating, Kahraba programme', ar: 'تقييم المشاركين في برنامج كهرباء' } },
    { value: '70/30', label: { en: 'hands-on to theory, every session', ar: 'تطبيق عملي مقابل نظرية في كل جلسة' } },
  ],

  /** Other public work — real signals for the name entity. */
  otherWork: {
    podcast: {
      name: 'عاش يا وحش',
      nameLatin: '3aash Ya Wa7sh',
      description: {
        en: 'A sports-transformation podcast hosted by Ahmed Amrousy. One completed season.',
        ar: 'بودكاست عن التحوّل في الرياضة يقدّمه أحمد عمروسي. موسم أول مكتمل.',
      },
    },
    sport: {
      en: 'Endurance athlete — triathlon and open-water swimming.',
      ar: 'رياضي تحمُّل — ترايثلون وسباحة المياه المفتوحة.',
    },
  },

  /**
   * Media-kit bios at three lengths. Journalists and AI engines both need a
   * ready-made source of truth; giving them one stops paraphrase drift.
   */
  bios: {
    en: {
      short:
        "Ahmed Amrousy is an Egyptian AI-for-Business instructor and marketing leader. He teaches executive education at the American University in Cairo's Onsi Sawiris School of Business, is Head of Marketing & PR at Nile Air, and founded Menova, a corporate AI training practice serving Egypt and the GCC.",
      medium:
        "Ahmed Amrousy is an Egyptian AI-for-Business instructor and marketing leader. He teaches executive education at the American University in Cairo's Onsi Sawiris School of Business, is Head of Marketing & PR at Nile Air — Egypt's largest private airline — and is the founder of Menova, a corporate AI training practice serving Egypt, Saudi Arabia and the UAE. A DBA candidate at Ain Shams University, he holds an MBA from the German University in Cairo and a BSc in Mechanical Engineering from Cairo University. Across 25 years he has led marketing at Electrolux, Samsung, Cadbury Egypt and Nahdet Misr. His teaching position is simple: leaders should learn to think with AI, not merely to use it.",
      long:
        "Ahmed Amrousy is an Egyptian AI-for-Business instructor and marketing leader based in Cairo. He teaches executive education at the American University in Cairo's Onsi Sawiris School of Business, where he runs AI programmes for senior managers and executives. He is a DBA candidate at Ain Shams University, writing on the Stimulus–Organism–Response framework applied to sports-event sponsorship in Egypt. In industry he is Head of Marketing & PR at Nile Air, Egypt's largest private airline, and he has spent 25 years leading marketing across FMCG, publishing and EdTech, and manufacturing — including Electrolux, Samsung, Cadbury Egypt and Nahdet Misr. He holds an MBA from the German University in Cairo, a BSc in Mechanical Engineering from Cairo University and a diploma in Mechatronics, and is a member of the Chartered Management Institute. He is the founder of Menova, an AI-for-Business training practice, and co-founder of GESMAL Industries, an educational robotics venture. Through Menova he has trained executives at Kahraba, the National Electricity Technology Company, where 65 executives including the CEO rated the programme 4.8 out of 5; companies affiliated with the Engineering Export Council of Egypt; and faculty at Cairo University's Faculty of Economics and Political Science, in partnership with Logic Consulting. His sessions are 70% hands-on and 30% theory, delivered verbally in Arabic with English slides, built on live demonstrations against real client data. He teaches two prompting frameworks of his own design, POCAB and GCSE-F, alongside SOSTAC and Playing to Win for AI strategy. He also hosts the sports-transformation podcast عاش يا وحش and competes in triathlon and open-water swimming.",
    },
    ar: {
      short:
        'أحمد عمروسي محاضر مصري في الذكاء الاصطناعي للأعمال وقيادي تسويقي. يُدرِّس في التعليم التنفيذي بكلية أنسي ساويرس لإدارة الأعمال بالجامعة الأمريكية بالقاهرة، ويشغل منصب مدير التسويق والعلاقات العامة في نايل إير، وأسَّس مِنوفا لتدريب الشركات على الذكاء الاصطناعي في مصر والخليج.',
      medium:
        'أحمد عمروسي محاضر مصري في الذكاء الاصطناعي للأعمال وقيادي تسويقي. يُدرِّس في التعليم التنفيذي بكلية أنسي ساويرس لإدارة الأعمال بالجامعة الأمريكية بالقاهرة، ويشغل منصب مدير التسويق والعلاقات العامة في نايل إير — أكبر شركة طيران خاصة في مصر — وهو مؤسس مِنوفا لتدريب الشركات على الذكاء الاصطناعي في مصر والسعودية والإمارات. باحث دكتوراه إدارة الأعمال بجامعة عين شمس، حاصل على ماجستير إدارة الأعمال من الجامعة الألمانية بالقاهرة وبكالوريوس الهندسة الميكانيكية من جامعة القاهرة. قاد التسويق على مدى 25 عامًا في إلكترولوكس وسامسونج وكادبوري مصر ونهضة مصر. وموقفه من التدريب واضح: على القيادات أن تتعلَّم التفكير بالذكاء الاصطناعي لا مجرد استخدامه.',
      long:
        'أحمد عمروسي محاضر مصري في الذكاء الاصطناعي للأعمال وقيادي تسويقي، مقره القاهرة. يُدرِّس في التعليم التنفيذي بكلية أنسي ساويرس لإدارة الأعمال بالجامعة الأمريكية بالقاهرة، حيث يقدّم برامج الذكاء الاصطناعي لكبار المديرين والتنفيذيين. وهو باحث دكتوراه إدارة الأعمال بجامعة عين شمس، وأطروحته عن تطبيق إطار المُثير–الكائن–الاستجابة على رعاية الأحداث الرياضية في مصر. وعلى الجانب المهني يشغل منصب مدير التسويق والعلاقات العامة في نايل إير، أكبر شركة طيران خاصة في مصر، بعد 25 عامًا في قيادة التسويق عبر قطاعات السلع الاستهلاكية والنشر والتعليم الرقمي والصناعة — من إلكترولوكس وسامسونج إلى كادبوري مصر ونهضة مصر. حاصل على ماجستير إدارة الأعمال من الجامعة الألمانية بالقاهرة، وبكالوريوس الهندسة الميكانيكية من جامعة القاهرة، ودبلوم الميكاترونيكس، وعضو بالمعهد البريطاني للإدارة. أسَّس مِنوفا لتدريب الشركات على الذكاء الاصطناعي، وشارك في تأسيس جيزمال إندَستريز للروبوتات التعليمية. ومن خلال مِنوفا درَّب تنفيذيي الشركة القومية لتكنولوجيا الكهرباء «كهرباء» — 65 تنفيذيًا بينهم الرئيس التنفيذي بتقييم 4.8 من 5 — وشركات أعضاء المجلس التصديري للصناعات الهندسية، وأعضاء هيئة التدريس بكلية الاقتصاد والعلوم السياسية بجامعة القاهرة بالشراكة مع لوجيك كونسلتنج. جلساته 70% تطبيق عملي و30% نظرية، تُقدَّم شفهيًا بالعربية بشرائح إنجليزية، وتقوم على عروض حية على بيانات حقيقية. يُدرِّس إطارَين للتوجيه من تصميمه هما POCAB وGCSE-F، إلى جانب SOSTAC وPlaying to Win لبناء استراتيجية الذكاء الاصطناعي. كما يقدّم بودكاست «عاش يا وحش» عن التحوّل في الرياضة، ويمارس الترايثلون وسباحة المياه المفتوحة.',
    },
  },

  /** Approved titles for press use — stops publications inventing their own. */
  approvedTitles: {
    en: [
      'Eng. Ahmed Amrousy — Founder, Menova',
      'Ahmed Amrousy — Executive Education Instructor, AUC School of Business',
      'Ahmed Amrousy — Head of Marketing & PR, Nile Air',
      'Ahmed Amrousy — AI-for-Business instructor',
    ],
    ar: [
      'م. أحمد عمروسي — مؤسس مِنوفا',
      'أحمد عمروسي — محاضر التعليم التنفيذي بالجامعة الأمريكية بالقاهرة',
      'أحمد عمروسي — مدير التسويق والعلاقات العامة، نايل إير',
      'أحمد عمروسي — محاضر الذكاء الاصطناعي للأعمال',
    ],
  },
} as const;

/**
 * Official AUC Executive Education instructor badges — issued by the Onsi
 * Sawiris School of Business. Displayed under the portrait on the About page
 * and home hero. Files supplied by AUC; do not redraw or restyle them.
 */
export const badges = [
  {
    file: 'images/badges/auc-instructor-2024-2025.webp',
    width: 280,
    height: 250,
    alt: {
      en: 'AUC School of Business — Executive Education Instructor badge, 2024–25',
      ar: 'شارة محاضر التعليم التنفيذي بكلية إدارة الأعمال بالجامعة الأمريكية بالقاهرة 2024–25',
    },
  },
  {
    file: 'images/badges/auc-instructor-2025-2026.webp',
    width: 172,
    height: 146,
    alt: {
      en: 'AUC School of Business — Executive Education Instructor badge, 2025–26',
      ar: 'شارة محاضر التعليم التنفيذي بكلية إدارة الأعمال بالجامعة الأمريكية بالقاهرة 2025–26',
    },
  },
] as const;

/**
 * Logo wall. `file` points at a placeholder SVG that ships with the repo —
 * drop a real logo at the same path and it appears automatically.
 * See public/images/README.md for exact sizes. Never add a logo Ahmed has not
 * actually worked with.
 */
export const logoWall = [
  { name: 'Vodafone', file: 'images/logos/vodafone.svg' },
  { name: 'USAID programmes', file: 'images/logos/usaid.svg' },
  { name: 'Kahraba', file: 'images/logos/kahraba.svg' },
  { name: 'Engineering Export Council of Egypt', file: 'images/logos/eece.svg' },
  { name: 'British University in Egypt', file: 'images/logos/bue.svg' },
  { name: 'Nile University', file: 'images/logos/nile-university.svg' },
  { name: 'The American University in Cairo', file: 'images/logos/auc.svg' },
  { name: 'Cairo University', file: 'images/logos/cairo-university.svg' },
  { name: 'Ain Shams University', file: 'images/logos/ain-shams.svg' },
  { name: 'Nile Air', file: 'images/logos/nile-air.svg' },
  { name: 'Logic Consulting', file: 'images/logos/logic-consulting.svg' },
] as const;

/** Frameworks Ahmed teaches. Referenced by /method/ and by course pages. */
export const frameworks = {
  pocab: {
    acronym: 'POCAB',
    expansion: 'Persona · Objective · Audience · Context · Boundaries',
    expansionAr: 'الشخصية · الهدف · الجمهور · السياق · الحدود',
    use: {
      en: 'Structures a single prompt so the model behaves like a named expert working to a defined brief.',
      ar: 'يُبنى به الأمر الواحد بحيث يتصرف النموذج كخبير محدَّد يعمل وفق إحاطة واضحة.',
    },
    parts: [
      { letter: 'P', term: { en: 'Persona', ar: 'الشخصية' }, q: { en: 'Who should the model be?', ar: 'مَن يكون النموذج؟' } },
      { letter: 'O', term: { en: 'Objective', ar: 'الهدف' }, q: { en: 'What decision does this serve?', ar: 'أي قرار يخدمه هذا؟' } },
      { letter: 'C', term: { en: 'Context', ar: 'السياق' }, q: { en: 'What does it need to know first?', ar: 'ما الذي يجب أن يعرفه أولًا؟' } },
      { letter: 'A', term: { en: 'Audience', ar: 'الجمهور' }, q: { en: 'Who reads the output?', ar: 'مَن سيقرأ المُخرَج؟' } },
      { letter: 'B', term: { en: 'Boundaries', ar: 'الحدود' }, q: { en: 'What is off-limits?', ar: 'ما الممنوع؟' } },
    ],
  },
  gcsef: {
    acronym: 'GCSE-F',
    expansion: 'Goal · Context · Source · Expectations · Format',
    expansionAr: 'الهدف · السياق · المصدر · التوقعات · الصيغة',
    use: {
      en: 'Structures work over documents and data — the model must answer from a named source, not from memory.',
      ar: 'يُبنى به العمل على المستندات والبيانات — على النموذج أن يُجيب من مصدر محدَّد لا من ذاكرته.',
    },
    parts: [
      { letter: 'G', term: { en: 'Goal', ar: 'الهدف' }, q: { en: 'What must be produced?', ar: 'ما المطلوب إنتاجه؟' } },
      { letter: 'C', term: { en: 'Context', ar: 'السياق' }, q: { en: 'What situation surrounds it?', ar: 'ما الوضع المحيط به؟' } },
      { letter: 'S', term: { en: 'Source', ar: 'المصدر' }, q: { en: 'Which documents are authoritative?', ar: 'أي المستندات مرجعية؟' } },
      { letter: 'E', term: { en: 'Expectations', ar: 'التوقعات' }, q: { en: 'What does good look like?', ar: 'كيف يبدو المُخرَج الجيد؟' } },
      { letter: 'F', term: { en: 'Format', ar: 'الصيغة' }, q: { en: 'How should it be laid out?', ar: 'كيف يُعرَض؟' } },
    ],
  },
} as const;

/** Advanced prompting techniques taught in the executive and strategy programmes. */
export const promptingTechniques = [
  { en: 'Chain-of-thought', ar: 'سلسلة التفكير' },
  { en: 'Chain-of-verification', ar: 'سلسلة التحقق' },
  { en: 'Self-critique', ar: 'النقد الذاتي' },
  { en: 'Tree-of-thoughts', ar: 'شجرة الأفكار' },
  { en: 'Expert-panel', ar: 'لجنة الخبراء' },
] as const;

/** Tools demonstrated live in sessions. */
export const tools = [
  { name: 'Claude', detail: { en: 'chat, Cowork and Fable 5', ar: 'المحادثة وCowork وFable 5' } },
  { name: 'Microsoft Copilot', detail: { en: 'inside Microsoft 365', ar: 'داخل مايكروسوفت 365' } },
  { name: 'NotebookLM / Gemini Notebook', detail: { en: 'source-grounded research', ar: 'بحث مُستنِد إلى مصادر' } },
  { name: 'ChatGPT', detail: { en: 'general reasoning and agents', ar: 'الاستدلال العام والوكلاء' } },
] as const;
