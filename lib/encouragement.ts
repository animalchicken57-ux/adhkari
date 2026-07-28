import type { Lang } from "./i18n";

// ============================================================
//  محتوى تحفيزي: عبارات مشجّعة، حقائق عن السنن، وأحاديث
//  Encouragement content: motivational lines, sunnah facts, hadiths
// ============================================================

export type Bilingual = { ar: string; en: string };

// عبارات تحفيزية قصيرة تُعرض عند فتح التطبيق (اللحظة الصباحية)
export const MOTIVATIONAL: Bilingual[] = [
  {
    ar: "كل ذِكر تقوله الآن حسنةٌ تُكتب لك وأنت لا تشعر 🌿",
    en: "Every dhikr you say now is a good deed written for you without you even noticing 🌿",
  },
  {
    ar: "لحظة واحدة من الذِّكر تُثقل ميزانك يوم القيامة ⚖️",
    en: "A single moment of dhikr weighs heavy in your scale on the Day of Judgment ⚖️",
  },
  {
    ar: "بدأت يومك بذِكر الله؟ إذًا بدأته بأفضل بداية ممكنة ☀️",
    en: "Started your day with the remembrance of Allah? Then you started it the best way possible ☀️",
  },
  {
    ar: "لا تستهِن بذِكرٍ صغير، فربّ كلمةٍ خفيفةٍ ثقيلةٍ في الميزان 🕊️",
    en: "Never belittle a small dhikr — a light word can be heavy on the scale 🕊️",
  },
  {
    ar: "قلبٌ يذكر الله قلبٌ حيّ ومطمئن. أنت تعتني بقلبك الآن ❤️",
    en: "A heart that remembers Allah is alive and at peace. You are caring for your heart right now ❤️",
  },
  {
    ar: "المداومة على القليل خيرٌ من الكثير المنقطع. استمر 🌱",
    en: "Consistency in a little is better than a lot that stops. Keep going 🌱",
  },
  {
    ar: "بذِكرك اليوم تبني بيتًا لك في الجنّة، لبنةً بعد لبنة 🏡",
    en: "With your dhikr today you build a home in Paradise, brick by brick 🏡",
  },
  {
    ar: "أنت الآن ممّن قال الله فيهم: «الذين يذكرون الله قيامًا وقعودًا» 🤲",
    en: "You are now among those Allah described: 'those who remember Allah standing and sitting' 🤲",
  },
];

// حقائق ممتعة عن السنن وكيف نجمع الحسنات دون أن نشعر
export const SUNNAH_FACTS: Bilingual[] = [
  {
    ar: "هل تعلم؟ «سبحان الله وبحمده» مئة مرة تُحطّ خطاياك ولو كانت مثل زبد البحر.",
    en: "Did you know? Saying 'SubhanAllahi wa bihamdihi' 100 times erases your sins even if they were like the foam of the sea.",
  },
  {
    ar: "هل تعلم؟ من صلّى على النبي ﷺ مرّةً صلّى الله عليه بها عشرًا.",
    en: "Did you know? Whoever sends blessings upon the Prophet ﷺ once, Allah sends blessings upon him ten times.",
  },
  {
    ar: "هل تعلم؟ كلمتان خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن: «سبحان الله وبحمده، سبحان الله العظيم».",
    en: "Did you know? Two words light on the tongue, heavy on the scale, beloved to the Most Merciful: 'SubhanAllahi wa bihamdih, SubhanAllahil-'Azim'.",
  },
  {
    ar: "هل تعلم؟ التبسّم في وجه أخيك صدقة، وإماطة الأذى عن الطريق صدقة — حسناتٌ بلا مجهود يُذكر.",
    en: "Did you know? Smiling at your brother is charity, and removing harm from the road is charity — good deeds with almost no effort.",
  },
  {
    ar: "هل تعلم؟ من قال «لا إله إلا الله وحده لا شريك له…» عشر مرّات كان كمن أعتق أربعة أنفُس.",
    en: "Did you know? Whoever says 'La ilaha illa Allah…' ten times is like one who freed four souls.",
  },
  {
    ar: "هل تعلم؟ الذِّكر يُثمر جنّاتٍ في الآخرة؛ قيل للنبي ﷺ إنّ غراس الجنّة: سبحان الله والحمد لله ولا إله إلا الله والله أكبر.",
    en: "Did you know? Dhikr plants gardens in the Hereafter — the Prophet ﷺ said the plants of Paradise are: SubhanAllah, Alhamdulillah, La ilaha illa Allah, Allahu Akbar.",
  },
  {
    ar: "هل تعلم؟ من قرأ آية الكرسي دبر كل صلاة لم يمنعه من دخول الجنّة إلا الموت.",
    en: "Did you know? Whoever recites Ayat al-Kursi after every prayer, nothing stands between him and Paradise except death.",
  },
  {
    ar: "هل تعلم؟ الاستغفار يفتح لك أبواب الرزق والفرج: «ومن يتّق الله يجعل له مخرجًا».",
    en: "Did you know? Seeking forgiveness opens the doors of provision and relief: 'Whoever fears Allah, He makes for him a way out'.",
  },
];

// أحاديث في فضل الذِّكر
export const HADITHS: { text: Bilingual; source: Bilingual }[] = [
  {
    text: {
      ar: "مثل الذي يذكر ربّه والذي لا يذكر ربّه مثل الحيّ والميّت.",
      en: "The likeness of the one who remembers his Lord and the one who does not is like the living and the dead.",
    },
    source: { ar: "رواه البخاري", en: "Bukhari" },
  },
  {
    text: {
      ar: "ألا أنبّئكم بخير أعمالكم… وأرفعها في درجاتكم… ذِكر الله تعالى.",
      en: "Shall I not tell you of the best of your deeds, the highest in rank… the remembrance of Allah.",
    },
    source: { ar: "رواه الترمذي", en: "Tirmidhi" },
  },
  {
    text: {
      ar: "يقول الله تعالى: أنا عند ظنّ عبدي بي، وأنا معه إذا ذكرني.",
      en: "Allah says: I am as My servant thinks of Me, and I am with him when he remembers Me.",
    },
    source: { ar: "متفق عليه", en: "Bukhari & Muslim" },
  },
  {
    text: {
      ar: "لا يزال لسانك رطبًا من ذِكر الله.",
      en: "Let your tongue remain moist with the remembrance of Allah.",
    },
    source: { ar: "رواه الترمذي", en: "Tirmidhi" },
  },
  {
    text: {
      ar: "من قال: سبحان الله وبحمده، في يوم مئة مرّة، حُطّت خطاياه ولو كانت مثل زبد البحر.",
      en: "Whoever says 'SubhanAllahi wa bihamdihi' 100 times a day, his sins are erased even if like the foam of the sea.",
    },
    source: { ar: "متفق عليه", en: "Bukhari & Muslim" },
  },
  {
    text: {
      ar: "كلمتان حبيبتان إلى الرحمن، خفيفتان على اللسان، ثقيلتان في الميزان: سبحان الله وبحمده، سبحان الله العظيم.",
      en: "Two phrases beloved to the Most Merciful, light on the tongue, heavy on the scale: SubhanAllahi wa bihamdih, SubhanAllahil-'Azim.",
    },
    source: { ar: "متفق عليه", en: "Bukhari & Muslim" },
  },
];

export function pick<T>(arr: T[], seed: number): T {
  return arr[((seed % arr.length) + arr.length) % arr.length];
}

// مؤشّر ثابت لكل يوم (حتى يتطابق العرض على الخادم والعميل)
export function dayOfYear(date = new Date()): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function tr(item: Bilingual, lang: Lang): string {
  return item[lang] ?? item.ar;
}
