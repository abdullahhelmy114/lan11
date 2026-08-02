export type Lang = "ar" | "en" | "tr";

export const LANGS: { code: Lang; label: string; native: string; note: string }[] = [
  { code: "ar", label: "AR", native: "العربية", note: "لغة الوحي والقرار" },
  { code: "en", label: "EN", native: "English", note: "Language of advocacy" },
  { code: "tr", label: "TR", native: "Türkçe", note: "Kardeşliğin dili" },
];

export const dirOf = (l: Lang) => (l === "ar" ? "rtl" : "ltr");

type Dict = {
  brand: string;
  tagline: string;
  hero: { eyebrow: string; title: string; sub: string; pick: string; cta: string };
  welcome: { label: string; hadith: string; source: string; note: string };
  pillars: { label: string; title: string; items: { title: string; body: string }[] };
  bridge: { label: string; title: string; body: string; caption: string };
  form: {
    label: string;
    title: string;
    steps: string[];
    lang: string;
    name: string;
    email: string;
    whatsapp: string;
    country: string;
    submit: string;
    back: string;
    next: string;
    successTitle: string;
    successBody: string;
    share: string;
    copy: string;
    copied: string;
    errName: string;
    errEmail: string;
    errPhone: string;
  };
  wall: {
    label: string;
    title: string;
    body: string;
    name: string;
    country: string;
    message: string;
    submit: string;
    posted: string;
    empty: string;
  };
  roadmap: { label: string; title: string; items: { title: string; body: string; tag: string }[] };
  footer: { about: string; rights: string; links: string; contact: string };
  theme: { light: string; dark: string };
};

export const t: Record<Lang, Dict> = {
  ar: {
    brand: "روح القدس رفيق السفر",
    tagline: "برنامج لغوي وروحي مجاني — هدية لقافلة الأرض العالمية لفلسطين",
    hero: {
      eyebrow: "هدية تضامنية مجانية · د. جيهان زياد",
      title: "جسرٌ من الكلمة الطيّبة واليقين.. يرافق خطاكم نحو العدالة",
      sub: "برنامج «روح القدس رفيق السفر» اللغوي والروحي — هدية تضامنية مجانية لأعضاء قافلة الأرض العالمية لفلسطين.",
      pick: "اختر لغة رفقتك في الطريق",
      cta: "سجّل واستلم الهدية",
    },
    welcome: {
      label: "كلمة الاستقبال",
      hadith:
        "يا عبادي إني حرّمتُ الظلمَ على نفسي وجعلتُه بينكم محرَّمًا، فلا تظالموا.",
      source: "حديث قدسي — رواه مسلم",
      note: "من هذا اليقين ننطلق: أن الظلم زائل، وأن الكلمة الطيّبة زادُ الطريق.",
    },
    pillars: {
      label: "أركان البرنامج",
      title: "أربعة أركان ترافقك في كل محطة",
      items: [
        { title: "أفلام فك الحصار", body: "أفلام وثائقية مختارة مع مفردات ثلاثية اللغة تشرح الرواية كما هي." },
        { title: "آيات الوعد الصادق", body: "آيات الثبات والوعد، بترجمة ميسّرة وتأمل يومي قصير." },
        { title: "عبر السيرة النبوية", body: "دروس من السيرة في الصبر والتنظيم والرحمة في الطريق الطويل." },
        { title: "أدعية التمكين", body: "أدعية مأثورة بثلاث لغات، مكتوبة ومنطوقة، لتردّدها في القافلة." },
      ],
    },
    bridge: {
      label: "الجسر اللغوي",
      title: "ثلاث لغات.. صوتٌ واحد",
      body: "العربية لسان القضية، والإنجليزية لسان العالم، والتركية لسان الأخوّة. نلتقي في المنتصف حيث يصير الكلام موقفًا.",
      caption: "دوائر متداخلة، ونورٌ في القلب",
    },
    form: {
      label: "التسجيل",
      title: "سجّل لاستلام الهدية وتنبيهات الدورات",
      steps: ["اللغة", "بياناتك", "تم"],
      lang: "لغة البرنامج",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      whatsapp: "رقم الواتساب",
      country: "مفتاح الدولة",
      submit: "سجّل واستلم الهدية",
      back: "رجوع",
      next: "التالي",
      successTitle: "تم تسجيلك بنجاح",
      successBody: "وصلتنا بياناتك. سنرسل لك الهدية الرقمية، وننبّهك أولاً بكل دورة أو إصدار جديد عبر الواتساب والبريد.",
      share: "شارك الهدية",
      copy: "نسخ الرابط",
      copied: "تم النسخ",
      errName: "الرجاء كتابة الاسم",
      errEmail: "بريد إلكتروني غير صحيح",
      errPhone: "رقم واتساب غير صحيح",
    },
    wall: {
      label: "جدار التضامن",
      title: "جدار التضامن الرقمي",
      body: "اكتب كلمة تُقرأ في الطريق، تصل إلى من يمشي عن كلٍّ منّا.",
      name: "الاسم",
      country: "الدولة",
      message: "رسالتك",
      submit: "أضف رسالتك",
      posted: "أضيفت رسالتك إلى الجدار",
      empty: "كن أول من يكتب على الجدار.",
    },
    roadmap: {
      label: "الطريق أمامنا",
      title: "ما بعد الرفقة",
      items: [
        { title: "رفيق السفر المجاني", body: "البرنامج الحالي — مفتوح للجميع بلا مقابل.", tag: "الآن" },
        { title: "دورات المحادثة", body: "مجموعات صغيرة للتحدث بالإنجليزية والتركية.", tag: "قريبًا" },
        { title: "أكواد خصم خاصة", body: "امتيازات لأعضاء القافلة في برامجنا القادمة.", tag: "لاحقًا" },
      ],
    },
    footer: {
      about: "برنامج تعليمي روحي مجاني من إعداد د. جيهان زياد، هديةً لأعضاء قافلة الأرض العالمية لفلسطين.",
      rights: "جميع الحقوق محفوظة",
      links: "روابط",
      contact: "تواصل",
    },
    theme: { light: "الوضع الفاتح", dark: "الوضع الداكن" },
  },
  en: {
    brand: "Ruhulqudus Travel Companion",
    tagline: "A free linguistic & spiritual program — a gift to the Global Land Caravan for Palestine",
    hero: {
      eyebrow: "A free solidarity gift · Dr. Jehan Ziad",
      title: "A Bridge of Good Words & Certainty — Walking Beside You Toward Justice",
      sub: "The “Ruhulqudus Travel Companion” linguistic and spiritual program — a free solidarity gift for members of the Global Land Caravan for Palestine.",
      pick: "Choose the language of your companion",
      cta: "Register & get the gift",
    },
    welcome: {
      label: "Sacred welcome",
      hadith:
        "O My servants, I have forbidden oppression for Myself and have made it forbidden amongst you, so do not oppress one another.",
      source: "Hadith Qudsi — narrated by Muslim",
      note: "From this certainty we set out: injustice passes, and a good word is provision for the road.",
    },
    pillars: {
      label: "Program pillars",
      title: "Four pillars for every stop on the road",
      items: [
        { title: "Documentary Films", body: "Curated documentaries with trilingual vocabulary that carry the story as it is." },
        { title: "Verses of Steadfastness", body: "Verses of promise and patience with plain translation and a short daily reflection." },
        { title: "Prophetic Seerah Lessons", body: "Lessons in patience, organisation and mercy for a long journey." },
        { title: "Empowerment Prayers", body: "Traditional supplications in three languages, written and spoken, for the caravan." },
      ],
    },
    bridge: {
      label: "The linguistic bridge",
      title: "Three languages, one voice",
      body: "Arabic is the tongue of the cause, English the tongue of the world, Turkish the tongue of brotherhood. We meet in the middle, where words become a stance.",
      caption: "Overlapping circles, a light at the centre",
    },
    form: {
      label: "Registration",
      title: "Register for the gift & course alerts",
      steps: ["Language", "Your details", "Done"],
      lang: "Program language",
      name: "Full name",
      email: "Email address",
      whatsapp: "WhatsApp number",
      country: "Country code",
      submit: "Register & get the gift",
      back: "Back",
      next: "Continue",
      successTitle: "You are registered",
      successBody: "We have your details. We'll send you the digital gift and alert you first about every new course and release by WhatsApp and email.",
      share: "Share the gift",
      copy: "Copy link",
      copied: "Copied",
      errName: "Please enter your name",
      errEmail: "Enter a valid email",
      errPhone: "Enter a valid WhatsApp number",
    },
    wall: {
      label: "Solidarity wall",
      title: "Digital Solidarity Wall",
      body: "Leave a word to be read on the road, reaching those who walk on behalf of us all.",
      name: "Name",
      country: "Country",
      message: "Your message",
      submit: "Add your message",
      posted: "Your message was added to the wall",
      empty: "Be the first to write on the wall.",
    },
    roadmap: {
      label: "The road ahead",
      title: "Beyond the companion",
      items: [
        { title: "Free Travel Companion", body: "The current program — open to everyone, at no cost.", tag: "Now" },
        { title: "Conversation Courses", body: "Small groups practising spoken English and Turkish.", tag: "Soon" },
        { title: "Exclusive Discount Codes", body: "Privileges for caravan members across future programs.", tag: "Later" },
      ],
    },
    footer: {
      about: "A free educational and spiritual program by Dr. Jehan Ziad, offered as a gift to members of the Global Land Caravan for Palestine.",
      rights: "All rights reserved",
      links: "Links",
      contact: "Contact",
    },
    theme: { light: "Light mode", dark: "Dark mode" },
  },
  tr: {
    brand: "Ruhulkudüs Yol Arkadaşı",
    tagline: "Ücretsiz dil ve mânevî program — Filistin için Küresel Kara Kervanı'na hediye",
    hero: {
      eyebrow: "Ücretsiz dayanışma hediyesi · Dr. Jehan Ziad",
      title: "Güzel Sözden ve Yakînden Bir Köprü — Adalete Giden Adımlarınızla",
      sub: "«Ruhulkudüs Yol Arkadaşı» dil ve mânevî programı — Filistin için Küresel Kara Kervanı üyelerine ücretsiz bir dayanışma hediyesi.",
      pick: "Yol arkadaşınızın dilini seçin",
      cta: "Kaydolun ve hediyeyi alın",
    },
    welcome: {
      label: "Kutlu karşılama",
      hadith:
        "Ey kullarım! Ben zulmü kendime haram kıldım, onu sizin aranızda da haram kıldım; öyleyse birbirinize zulmetmeyin.",
      source: "Kudsî hadis — Müslim rivayeti",
      note: "Bu yakînle yola çıkıyoruz: zulüm geçicidir, güzel söz ise yolun azığıdır.",
    },
    pillars: {
      label: "Programın sütunları",
      title: "Her durakta yanınızda dört sütun",
      items: [
        { title: "Kuşatmayı Kıran Belgeseller", body: "Üç dilli kelime desteğiyle seçilmiş belgeseller." },
        { title: "Sadık Vaadin Âyetleri", body: "Sebat ve vaat âyetleri, sade çeviri ve kısa günlük tefekkür." },
        { title: "Siyerden Dersler", body: "Uzun yolda sabır, teşkilat ve merhamet dersleri." },
        { title: "Temkin Duaları", body: "Üç dilde, yazılı ve sesli me'sûr dualar." },
      ],
    },
    bridge: {
      label: "Dil köprüsü",
      title: "Üç dil, tek ses",
      body: "Arapça davanın dili, İngilizce dünyanın dili, Türkçe kardeşliğin dili. Sözün duruşa dönüştüğü ortada buluşuyoruz.",
      caption: "İç içe geçen daireler, merkezde bir ışık",
    },
    form: {
      label: "Kayıt",
      title: "Hediye ve kurs bildirimleri için kaydolun",
      steps: ["Dil", "Bilgileriniz", "Tamam"],
      lang: "Program dili",
      name: "Ad soyad",
      email: "E-posta",
      whatsapp: "WhatsApp numarası",
      country: "Ülke kodu",
      submit: "Kaydolun ve hediyeyi alın",
      back: "Geri",
      next: "Devam",
      successTitle: "Kaydınız alındı",
      successBody: "Bilgileriniz bize ulaştı. Dijital hediyeyi göndereceğiz ve her yeni kurs ile yayından ilk siz haberdar olacaksınız.",
      share: "Hediyeyi paylaş",
      copy: "Bağlantıyı kopyala",
      copied: "Kopyalandı",
      errName: "Lütfen adınızı yazın",
      errEmail: "Geçerli bir e-posta girin",
      errPhone: "Geçerli bir WhatsApp numarası girin",
    },
    wall: {
      label: "Dayanışma duvarı",
      title: "Dijital Dayanışma Duvarı",
      body: "Yolda okunacak bir söz bırakın; hepimiz adına yürüyenlere ulaşsın.",
      name: "İsim",
      country: "Ülke",
      message: "Mesajınız",
      submit: "Mesajını ekle",
      posted: "Mesajınız duvara eklendi",
      empty: "Duvara ilk yazan siz olun.",
    },
    roadmap: {
      label: "Önümüzdeki yol",
      title: "Yol arkadaşından sonra",
      items: [
        { title: "Ücretsiz Yol Arkadaşı", body: "Mevcut program — herkese açık ve ücretsiz.", tag: "Şimdi" },
        { title: "Konuşma Kursları", body: "İngilizce ve Türkçe konuşma için küçük gruplar.", tag: "Yakında" },
        { title: "Özel İndirim Kodları", body: "Kervan üyelerine gelecek programlarda ayrıcalıklar.", tag: "Sonra" },
      ],
    },
    footer: {
      about: "Dr. Jehan Ziad tarafından hazırlanan, Filistin için Küresel Kara Kervanı üyelerine hediye edilen ücretsiz eğitim ve mânevî program.",
      rights: "Tüm hakları saklıdır",
      links: "Bağlantılar",
      contact: "İletişim",
    },
    theme: { light: "Açık mod", dark: "Koyu mod" },
  },
};
