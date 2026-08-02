import type { Lang } from "./i18n";

/* ---------------------------------------------------------------------------
 * Static program data (verses, films, seerah, supplications, phrases).
 * ------------------------------------------------------------------------ */

export type Verse = {
  id: string;
  surah: string;
  ref: string;
  arabic: string;
  meaning: string;
  en: string;
  tr: string;
};

export const VERSES: Verse[] = [
  {
    id: "v1",
    surah: "سورة غافر",
    ref: "٥١",
    arabic: "إِنَّا لَنَنصُرُ رُسُلَنَا وَالَّذِينَ آمَنُوا فِي الْحَيَاةِ الدُّنْيَا وَيَوْمَ يَقُومُ الْأَشْهَادُ",
    meaning: "وعدٌ إلهي بالنصر لا يتخلّف؛ فالطريق طويل لكن نهايته مكتوبة.",
    en: "Indeed, We will support Our messengers and those who believe in this world's life and on the Day when the witnesses arise.",
    tr: "Şüphesiz biz peygamberlerimize ve iman edenlere, dünya hayatında ve şahitlerin ayağa kalkacağı günde yardım ederiz.",
  },
  {
    id: "v2",
    surah: "سورة البقرة",
    ref: "٢١٤",
    arabic: "أَلَا إِنَّ نَصْرَ اللَّهِ قَرِيبٌ",
    meaning: "القرب هنا يقين لا تقدير؛ الشدّة إشارة إلى اقتراب الفرج.",
    en: "Unquestionably, the help of Allah is near.",
    tr: "İyi bilin ki, Allah'ın yardımı yakındır.",
  },
  {
    id: "v3",
    surah: "سورة آل عمران",
    ref: "١٣٩",
    arabic: "وَلَا تَهِنُوا وَلَا تَحْزَنُوا وَأَنتُمُ الْأَعْلَوْنَ إِن كُنتُم مُّؤْمِنِينَ",
    meaning: "العلوّ علوّ موقف ومعنى قبل أن يكون علوّ قوة.",
    en: "Do not weaken and do not grieve; you will be superior if you are true believers.",
    tr: "Gevşemeyin, üzülmeyin; eğer inanmışsanız üstün olan sizsiniz.",
  },
  {
    id: "v4",
    surah: "سورة الأنفال",
    ref: "٣٠",
    arabic: "وَيَمْكُرُونَ وَيَمْكُرُ اللَّهُ ۖ وَاللَّهُ خَيْرُ الْمَاكِرِينَ",
    meaning: "تدبير الظالمين محدود، وتدبير الله محيط.",
    en: "They plan, and Allah plans. And Allah is the best of planners.",
    tr: "Onlar tuzak kurarlar, Allah da tuzaklarını boşa çıkarır. Allah tedbir edenlerin en hayırlısıdır.",
  },
  {
    id: "v5",
    surah: "سورة الشرح",
    ref: "٥–٦",
    arabic: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا",
    meaning: "اليسر مصاحب للعسر لا لاحقٌ له فقط؛ في قلب المحنة منحة.",
    en: "For indeed, with hardship comes ease. Indeed, with hardship comes ease.",
    tr: "Şüphesiz güçlükle beraber bir kolaylık vardır. Gerçekten, güçlükle beraber bir kolaylık vardır.",
  },
  {
    id: "v6",
    surah: "سورة إبراهيم",
    ref: "٤٢",
    arabic: "وَلَا تَحْسَبَنَّ اللَّهَ غَافِلًا عَمَّا يَعْمَلُ الظَّالِمُونَ",
    meaning: "لا شيء يسقط من حساب العدل الإلهي، ولا دمعة تضيع.",
    en: "And never think that Allah is unaware of what the wrongdoers do.",
    tr: "Sakın, Allah'ı zalimlerin yaptıklarından habersiz sanma.",
  },
  {
    id: "v7",
    surah: "سورة الإسراء",
    ref: "١",
    arabic: "سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى",
    meaning: "الأقصى في قلب العقيدة قبل أن يكون في قلب الجغرافيا.",
    en: "Exalted is He who took His Servant by night from al-Masjid al-Haram to al-Masjid al-Aqsa.",
    tr: "Kulunu bir gece Mescid-i Haram'dan Mescid-i Aksâ'ya götüren Allah'ı tesbih ederim.",
  },
];

export type Film = {
  id: string;
  title: string;
  duration: string;
  body: string;
  href: string;
};

export const FILMS: Film[] = [
  {
    id: "f1",
    title: "صمود غزة",
    duration: "٤٨ دقيقة",
    body: "شهادات حيّة من داخل الحصار: كيف تصنع الحياة طريقها بين الركام، وكيف يصير البقاء نفسه فعل مقاومة.",
    href: "#",
  },
  {
    id: "f2",
    title: "حجارة القدس تتكلم",
    duration: "٣٥ دقيقة",
    body: "جولة في البلدة القديمة وأسوار الأقصى، مع مفردات ثلاثية اللغة تشرح المصطلحات التاريخية والقانونية.",
    href: "#",
  },
  {
    id: "f3",
    title: "طريق القوافل",
    duration: "٢٨ دقيقة",
    body: "قصص قوافل التضامن عبر القارات: التنظيم، العبور، والكلمة الطيبة التي فتحت الحدود.",
    href: "#",
  },
];

export type Seerah = {
  id: string;
  title: string;
  context: string;
  lesson: string;
  modern: string;
};

export const SEERAH: Seerah[] = [
  {
    id: "s1",
    title: "حصار شعب أبي طالب",
    context: "ثلاث سنوات من المقاطعة الاقتصادية والاجتماعية في شِعب مكة، حتى أكل القوم ورق الشجر.",
    lesson: "الحصار سلاح قديم، والصبر المنظّم هو الذي أسقطه لا الصدفة.",
    modern: "بناء شبكات إسناد صغيرة ومستمرة أهمّ من حملة واحدة عابرة.",
  },
  {
    id: "s2",
    title: "الهجرة والتخطيط",
    context: "خروج محسوب بالدليل والزاد والاختباء في الغار ثلاث ليالٍ ثم الطريق الساحلي.",
    lesson: "التوكل لا يُلغي التخطيط؛ بل يُتوّجه.",
    modern: "كل خطوة في القافلة تحتاج لوجستيات دقيقة بقدر ما تحتاج نية صادقة.",
  },
  {
    id: "s3",
    title: "صلح الحديبية",
    context: "شروط بدت مجحفة، فتحققت بعدها أكبر موجة دخول في الدين خلال عامين.",
    lesson: "النصر أحيانًا يلبس ثوب التنازل المؤقّت.",
    modern: "قراءة المكاسب بعيدة المدى بدل الانفعال بنتيجة يوم واحد.",
  },
];

export type Dua = {
  id: string;
  arabic: string;
  translit: string;
  source: string;
  meaning: string;
};

export const DUAS: Dua[] = [
  {
    id: "d1",
    arabic: "سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنقَلِبُونَ",
    translit: "Subhāna alladhī sakhkhara lanā hādhā wa mā kunnā lahu muqrinīn…",
    source: "دعاء السفر — رواه مسلم",
    meaning: "تذكير بأن الطريق كلها بتسخير الله، وأن المنتهى إليه سبحانه.",
  },
  {
    id: "d2",
    arabic: "اللَّهُمَّ إِنَّا نَجْعَلُكَ فِي نُحُورِهِمْ وَنَعُوذُ بِكَ مِنْ شُرُورِهِمْ",
    translit: "Allāhumma innā najʿaluka fī nuḥūrihim wa naʿūdhu bika min shurūrihim",
    source: "دعاء لقاء العدو — رواه أبو داود",
    meaning: "درع التمكين: الاحتماء بالله عند مواجهة القوة الغاشمة.",
  },
  {
    id: "d3",
    arabic: "حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ",
    translit: "Ḥasbunā Allāhu wa niʿma al-wakīl",
    source: "قول إبراهيم عليه السلام ومحمد ﷺ",
    meaning: "كلمة اليقين التي تُطفئ نار الخوف وتثبّت القلب.",
  },
];

export type Phrase = {
  id: string;
  ar: string;
  en: string;
  tr: string;
};

export const PHRASES: Phrase[] = [
  { id: "p1", ar: "أنا عضو في قافلة الحرية والعدالة", en: "I am a member of the caravan for freedom and justice.", tr: "Ben özgürlük ve adalet kervanının bir üyesiyim." },
  { id: "p2", ar: "نحن هنا من أجل فلسطين، سلميًّا", en: "We are here for Palestine, peacefully.", tr: "Barışçıl bir şekilde Filistin için buradayız." },
  { id: "p3", ar: "هل يمكنك مساعدتنا في العبور؟", en: "Could you help us with the crossing?", tr: "Geçiş konusunda bize yardımcı olabilir misiniz?" },
  { id: "p4", ar: "نحتاج ماءً وطعامًا ومكانًا للراحة", en: "We need water, food and a place to rest.", tr: "Suya, yiyeceğe ve dinlenecek bir yere ihtiyacımız var." },
  { id: "p5", ar: "شكرًا لكم، جزاكم الله خيرًا", en: "Thank you, may God reward you with goodness.", tr: "Teşekkür ederiz, Allah sizden razı olsun." },
  { id: "p6", ar: "القدس ليست وحدها", en: "Jerusalem is not alone.", tr: "Kudüs yalnız değildir." },
  { id: "p7", ar: "الكلمة الطيّبة زادُ الطريق", en: "A good word is provision for the road.", tr: "Güzel söz, yolun azığıdır." },
];

/* ------------------------------ UI strings ------------------------------ */

type UiDict = {
  heroCta: string;
  memoryLabel: string;
  memoryTitle: string;
  memoryCustomize: string;
  memoryName: string;
  memoryCountry: string;
  memoryVerse: string;
  memoryGenerate: string;
  memoryPrint: string;
  memoryClose: string;
  memoryCode: string;
  memorySupervision: string;
  divineTitle: string;
  divineSub: string;
  divineQuote: string;
  divineExplain: string;
  divineEngineTitle: string;
  divineEngineBody: string;
  divineShieldTitle: string;
  divineShieldBody: string;
  pillarsTitle: string;
  browse: string;
  example: string;
  bridgeTitle: string;
  bridgeSub: string;
  bridgeSearch: string;
  bridgeCounter: (i: number, n: number) => string;
  listen: string;
  share: string;
  prev: string;
  next: string;
  archiveTabs: string[];
  archiveFooter: string;
  archiveClose: string;
  watch: string;
  meaning: string;
  lessonHistory: string;
  lessonPoint: string;
  lessonModern: string;
  translate: string;
  wallTitle: string;
  wallSub: string;
  roadTitle: string;
  roadItems: { title: string; body: string }[];
  countdown: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  discountTitle: string;
  discountReveal: string;
  discountNote: string;
  shareWhatsapp: string;
  feedbackTitle: string;
  feedbackTabs: string[];
  feedbackName: string;
  feedbackText: string;
  feedbackSubmit: string;
  feedbackThanks: string;
};

export const ui: Record<Lang, UiDict> = {
  ar: {
    heroCta: "سجّل الآن واستلم الهدية والتنبيهات",
    memoryLabel: "الهدية الرقمية",
    memoryTitle: "الكارت التذكاري الرقمي",
    memoryCustomize: "تخصيص الكارت",
    memoryName: "الاسم",
    memoryCountry: "الدولة / المدينة",
    memoryVerse: "الآية المفضّلة",
    memoryGenerate: "توليد الكارت التذكاري الرقمي",
    memoryPrint: "طباعة الكارت التذكاري",
    memoryClose: "إغلاق",
    memoryCode: "الرمز الفريد",
    memorySupervision: "إعداد وإشراف: الدكتورة جيهان علي زياد",
    divineTitle: "الرسالة والعهد الإلهي",
    divineSub: "أهلاً برواد مسيرة الحرية والعدالة • إعداد وإشراف: الدكتورة جيهان علي زياد",
    divineQuote:
      "يَا عِبَادِي إِنِّي حَرَّمْتُ الظُّلْمَ عَلَى نَفْسِي وَجَعَلْتُهُ بَيْنَكُمْ مُحَرَّماً فَلاَ تَظَالَمُوا",
    divineExplain:
      "هذا الحديث القدسي هو العهد الأول: أن الظلم محرَّم على الله ذاته، ومحرَّم بيننا. من هنا تنطلق كل مسيرة عادلة، ومن هنا يستمد المشاركون في قافلة فلسطين البرية شرعية خطواتهم الأخلاقية قبل أي شرعية أخرى.",
    divineEngineTitle: "محرك ووقود الضمائر الحية",
    divineEngineBody:
      "الكلمة الطيّبة واليقين هما الوقود الذي لا ينفد. حين يتعب الجسد على الطريق، تبقى الآية والدعاء والقصة النبوية تعيد شحن الضمير وتذكّره لماذا بدأ.",
    divineShieldTitle: "درع التمكين والأمان",
    divineShieldBody:
      "أدعية التمكين ليست كلمات تُقال فحسب، بل درعٌ نفسي يحفظ الاتزان عند المواجهة، ويحوّل الخوف إلى ثبات، والانفعال إلى موقف محسوب.",
    pillarsTitle: "زَادُكم في الطريق: أربعة محاور رئيسية",
    browse: "تصفح",
    example: "مثال",
    bridgeTitle: "الجسر اللغوي التضامني",
    bridgeSub: "ربط اللغة العربية (لغة المصدر والقرآن) باللغتين الإنجليزية والتركية",
    bridgeSearch: "ابحث عن جملة…",
    bridgeCounter: (i, n) => `الجملة ${i} من ${n}`,
    listen: "استماع",
    share: "مشاركة",
    prev: "السابق",
    next: "التالي",
    archiveTabs: ["آيات التثبيت (7)", "الأفلام الوثائقية (3)", "دروس السيرة (3)", "أدعية التمكين (3)"],
    archiveFooter: "برنامج روح القدس رفيق السفر • إشراف د. جيهان علي زياد",
    archiveClose: "إغلاق الأرشيف",
    watch: "مشاهدة",
    meaning: "المعنى الروحي",
    lessonHistory: "السياق التاريخي",
    lessonPoint: "الدرس",
    lessonModern: "التطبيق المعاصر",
    translate: "ترجمة فورية",
    wallTitle: "جدارية الشرف والتضامن الرقمية",
    wallSub: "اترك بصمتك ورسالتك التضامنية لتُحفظ للأبد",
    roadTitle: "خارطة الطريق والمفاجآت القادمة",
    roadItems: [
      {
        title: "إطلاق حقيبة الوعي والمناصرة",
        body: "أرشيف رقمي واحد يجمع آيات التثبيت، والأفلام الوثائقية، ودروس السيرة، وأدعية التمكين، ومعجم مصطلحات القضية — مجاناً ومتاح لكل أعضاء القافلة.",
      },
      {
        title: "دورات اللغة العربية المتكاملة",
        body: "ليست دورات محادثة فقط: قراءة وكتابة، وقواعد ميسّرة، ومفردات القضية، ومهارات تدقيق الرواية والخطاب الإعلامي — بمستويات متدرّجة وشهادة حضور.",
      },
      {
        title: "جدارية الشرف والأرشيف الدائم",
        body: "توثيق رسائل التضامن والكارتات التذكارية في أرشيف دائم، مع تنبيهات لكل إصدار ودورة جديدة تصل إلى المسجّلين أولاً.",
      },
    ],
    countdown: "العد التنازلي للإطلاق القادم",
    days: "يوم",
    hours: "ساعة",
    minutes: "دقيقة",
    seconds: "ثانية",
    discountTitle: "كود خصم حصري",
    discountReveal: "اكشف الكود",
    discountNote: "امتياز خاص لأعضاء القافلة على جميع الدورات القادمة: اللغة العربية، ومصطلحات المناصرة، ومهارات الخطاب الإعلامي.",
    shareWhatsapp: "شارك عبر واتساب",
    feedbackTitle: "شاركنا رأيك",
    feedbackTabs: ["اقتراح", "رأي وتجربة"],
    feedbackName: "الاسم (اختياري)",
    feedbackText: "اكتب هنا…",
    feedbackSubmit: "إرسال",
    feedbackThanks: "وصلتنا رسالتك، شكرًا لك.",
  },
  en: {
    heroCta: "Register now for the gift & alerts",
    memoryLabel: "The digital gift",
    memoryTitle: "Digital Memory Card",
    memoryCustomize: "Customise the card",
    memoryName: "Name",
    memoryCountry: "Country / City",
    memoryVerse: "Favourite verse",
    memoryGenerate: "Generate the digital memory card",
    memoryPrint: "Print the memory card",
    memoryClose: "Close",
    memoryCode: "Unique code",
    memorySupervision: "Prepared and supervised by Dr. Jehan Ali Ziad",
    divineTitle: "The Message and the Divine Covenant",
    divineSub: "Welcome, pioneers of the march for freedom and justice • Supervised by Dr. Jehan Ali Ziad",
    divineQuote:
      "O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another.",
    divineExplain:
      "This Hadith Qudsi is the first covenant: oppression is forbidden to God upon Himself, and forbidden among us. From here every just march begins, and from here the caravan draws its moral legitimacy before any other.",
    divineEngineTitle: "The engine and fuel of living consciences",
    divineEngineBody:
      "A good word and certainty are fuel that never runs out. When the body tires on the road, the verse, the supplication and the prophetic story recharge the conscience and remind it why it started.",
    divineShieldTitle: "A shield of empowerment and safety",
    divineShieldBody:
      "Supplications of empowerment are not only words: they are a psychological shield that keeps balance in confrontation, turning fear into steadfastness and reaction into a measured stance.",
    pillarsTitle: "Your provision on the road: four main pillars",
    browse: "Browse",
    example: "Example",
    bridgeTitle: "The Solidarity Language Bridge",
    bridgeSub: "Connecting Arabic — the language of the source and the Qur'an — with English and Turkish",
    bridgeSearch: "Search a phrase…",
    bridgeCounter: (i, n) => `Phrase ${i} of ${n}`,
    listen: "Listen",
    share: "Share",
    prev: "Previous",
    next: "Next",
    archiveTabs: ["Verses of steadfastness (7)", "Documentaries (3)", "Seerah lessons (3)", "Supplications (3)"],
    archiveFooter: "Ruhulqudus Travel Companion • Supervised by Dr. Jehan Ali Ziad",
    archiveClose: "Close the archive",
    watch: "Watch",
    meaning: "Spiritual meaning",
    lessonHistory: "Historical context",
    lessonPoint: "The lesson",
    lessonModern: "Modern application",
    translate: "Instant translation",
    wallTitle: "The Digital Wall of Honour & Solidarity",
    wallSub: "Leave your mark and your message of solidarity, preserved forever",
    roadTitle: "Roadmap and what comes next",
    roadItems: [
      {
        title: "Launch of the Awareness & Advocacy Kit",
        body: "One digital archive: verses of steadfastness, documentaries, seerah lessons, empowerment supplications and a glossary of the cause — free for every caravan member.",
      },
      {
        title: "Full Arabic language courses",
        body: "Not conversation only: reading, writing, simplified grammar, the vocabulary of the cause, fact-checking and media-speech skills — graded levels with a certificate of attendance.",
      },
      {
        title: "Wall of honour & permanent archive",
        body: "Solidarity messages and memory cards preserved in a permanent archive, with alerts on every new release and course sent to registrants first.",
      },
    ],
    countdown: "Countdown to the next launch",
    days: "days",
    hours: "hours",
    minutes: "min",
    seconds: "sec",
    discountTitle: "Exclusive discount code",
    discountReveal: "Reveal the code",
    discountNote: "A special privilege for caravan members on all upcoming courses: Arabic language, advocacy terminology and media-speech skills.",
    shareWhatsapp: "Share on WhatsApp",
    feedbackTitle: "Share your thoughts",
    feedbackTabs: ["Suggestion", "Opinion & experience"],
    feedbackName: "Name (optional)",
    feedbackText: "Write here…",
    feedbackSubmit: "Send",
    feedbackThanks: "We received your message, thank you.",
  },
  tr: {
    heroCta: "Şimdi kaydolun: hediye ve bildirimler",
    memoryLabel: "Dijital hediye",
    memoryTitle: "Dijital Hatıra Kartı",
    memoryCustomize: "Kartı özelleştir",
    memoryName: "İsim",
    memoryCountry: "Ülke / Şehir",
    memoryVerse: "En sevdiğiniz âyet",
    memoryGenerate: "Dijital hatıra kartını oluştur",
    memoryPrint: "Hatıra kartını yazdır",
    memoryClose: "Kapat",
    memoryCode: "Benzersiz kod",
    memorySupervision: "Hazırlayan ve denetleyen: Dr. Jehan Ali Ziad",
    divineTitle: "Mesaj ve İlâhî Ahit",
    divineSub: "Özgürlük ve adalet yürüyüşünün öncüleri hoş geldiniz • Dr. Jehan Ali Ziad denetiminde",
    divineQuote:
      "Ey kullarım! Ben zulmü kendime haram kıldım, onu sizin aranızda da haram kıldım; öyleyse birbirinize zulmetmeyin.",
    divineExplain:
      "Bu kudsî hadis ilk ahittir: zulüm Allah'a kendi zatında haram, aramızda da haramdır. Her adil yürüyüş buradan başlar; kervan ahlâkî meşruiyetini her şeyden önce buradan alır.",
    divineEngineTitle: "Diri vicdanların motoru ve yakıtı",
    divineEngineBody:
      "Güzel söz ve yakîn tükenmeyen yakıttır. Yolda beden yorulduğunda âyet, dua ve siyer kıssası vicdanı yeniden şarj eder ve neden yola çıktığını hatırlatır.",
    divineShieldTitle: "Temkin ve güven kalkanı",
    divineShieldBody:
      "Temkin duaları yalnızca söz değildir; karşılaşma anında dengeyi koruyan, korkuyu sebata, tepkiyi ölçülü bir duruşa çeviren psikolojik bir kalkandır.",
    pillarsTitle: "Yoldaki azığınız: dört ana eksen",
    browse: "İncele",
    example: "Örnek",
    bridgeTitle: "Dayanışma Dil Köprüsü",
    bridgeSub: "Arapçayı (kaynağın ve Kur'an'ın dili) İngilizce ve Türkçe ile buluşturmak",
    bridgeSearch: "Bir cümle ara…",
    bridgeCounter: (i, n) => `Cümle ${i} / ${n}`,
    listen: "Dinle",
    share: "Paylaş",
    prev: "Önceki",
    next: "Sonraki",
    archiveTabs: ["Sebat âyetleri (7)", "Belgeseller (3)", "Siyer dersleri (3)", "Temkin duaları (3)"],
    archiveFooter: "Ruhulkudüs Yol Arkadaşı • Dr. Jehan Ali Ziad denetiminde",
    archiveClose: "Arşivi kapat",
    watch: "İzle",
    meaning: "Mânevî anlam",
    lessonHistory: "Tarihsel bağlam",
    lessonPoint: "Ders",
    lessonModern: "Günümüze uygulama",
    translate: "Anında çeviri",
    wallTitle: "Dijital Şeref ve Dayanışma Duvarı",
    wallSub: "İzinizi ve dayanışma mesajınızı bırakın, sonsuza dek saklansın",
    roadTitle: "Yol haritası ve gelecek sürprizler",
    roadItems: [
      {
        title: "Farkındalık ve Savunuculuk Çantası'nın açılışı",
        body: "Sebat âyetleri, belgeseller, siyer dersleri, temkin duaları ve dava sözlüğü tek bir dijital arşivde — tüm kervan üyelerine ücretsiz.",
      },
      {
        title: "Kapsamlı Arapça kursları",
        body: "Sadece konuşma değil: okuma, yazma, sade dil bilgisi, davanın kelime dağarcığı, doğrulama ve medya söylemi becerileri — kademeli seviyeler ve katılım belgesi.",
      },
      {
        title: "Şeref duvarı ve kalıcı arşiv",
        body: "Dayanışma mesajları ve hatıra kartları kalıcı arşivde saklanır; her yeni yayın ve kurs önce kayıtlı üyelere bildirilir.",
      },
    ],
    countdown: "Bir sonraki lansmana geri sayım",
    days: "gün",
    hours: "saat",
    minutes: "dk",
    seconds: "sn",
    discountTitle: "Özel indirim kodu",
    discountReveal: "Kodu göster",
    discountNote: "Kervan üyelerine tüm gelecek kurslarda özel ayrıcalık: Arapça, savunuculuk terminolojisi ve medya söylemi becerileri.",
    shareWhatsapp: "WhatsApp'ta paylaş",
    feedbackTitle: "Görüşünüzü paylaşın",
    feedbackTabs: ["Öneri", "Görüş ve deneyim"],
    feedbackName: "İsim (isteğe bağlı)",
    feedbackText: "Buraya yazın…",
    feedbackSubmit: "Gönder",
    feedbackThanks: "Mesajınız bize ulaştı, teşekkürler.",
  },
};

export const PILLAR_DETAILS: Record<Lang, { title: string; body: string; example: string }[]> = {
  ar: [
    { title: "آيات التثبيت والوعد الصادق", body: "٧ آيات مختارة للثبات مع معناها الروحي وترجمتها.", example: "سورة غافر ٥١" },
    { title: "سلسلة الأفلام الوثائقية", body: "٣ أفلام تحمل الرواية كما هي بمفردات ثلاثية اللغة.", example: "«صمود غزة»" },
    { title: "عبق السيرة النبوية والتاريخ", body: "٣ محطات من السيرة بدروس قابلة للتطبيق اليوم.", example: "«حصار شعب أبي طالب»" },
    { title: "أدعية التمكين واليقين", body: "٣ أدعية مأثورة بالنص والنطق والمعنى.", example: "«دعاء السفر»" },
  ],
  en: [
    { title: "Verses of steadfastness and the true promise", body: "7 selected verses with spiritual meaning and translation.", example: "Surah Ghafir 51" },
    { title: "The documentary film series", body: "3 films carrying the story as it is, with trilingual vocabulary.", example: "“Gaza's Steadfastness”" },
    { title: "The fragrance of the Seerah and history", body: "3 stations from the Seerah with lessons applicable today.", example: "“The siege of Abu Talib's valley”" },
    { title: "Supplications of empowerment and certainty", body: "3 traditional supplications with text, transliteration and meaning.", example: "“The traveller's supplication”" },
  ],
  tr: [
    { title: "Sebat ve sadık vaat âyetleri", body: "Mânevî anlamı ve çevirisiyle 7 seçme âyet.", example: "Mü'min sûresi 51" },
    { title: "Belgesel film serisi", body: "Üç dilli kelime desteğiyle hikâyeyi olduğu gibi taşıyan 3 film.", example: "“Gazze'nin Direnişi”" },
    { title: "Siyer ve tarihin kokusu", body: "Bugüne uygulanabilir derslerle siyerden 3 durak.", example: "“Ebû Tâlib vadisi kuşatması”" },
    { title: "Temkin ve yakîn duaları", body: "Metni, okunuşu ve anlamıyla 3 me'sûr dua.", example: "“Yolculuk duası”" },
  ],
};
