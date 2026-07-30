// ============================================================
//  معلومات طريفة عن الإسلام — Fun facts about Islam
// ============================================================

import type { Bilingual } from "@/lib/books";

export type FunFact = {
  id: string;
  emoji: string;
  text: Bilingual;
};

export const FUN_FACTS: FunFact[] = [
  {
    id: "basmala-count",
    emoji: "🔢",
    text: {
      ar: "كل سور القرآن تبدأ بالبسملة إلا سورة التوبة، وسورة النمل وحدها فيها بسملتان — واحدة في أوّلها وأخرى داخل رسالة سليمان عليه السلام.",
      en: "Every surah of the Qur'an opens with the Basmala except at-Tawbah — and an-Naml has two: one at its start and another inside Sulayman's letter.",
    },
  },
  {
    id: "middle-letter",
    emoji: "📖",
    text: {
      ar: "أطول سورة في القرآن هي البقرة (٢٨٦ آية)، وأقصرها سورة الكوثر (٣ آيات).",
      en: "The longest surah is al-Baqarah with 286 verses; the shortest is al-Kawthar with just 3.",
    },
  },
  {
    id: "maryam",
    emoji: "🌸",
    text: {
      ar: "مريم عليها السلام هي المرأة الوحيدة التي ذُكر اسمها صراحةً في القرآن، وسُمّيت باسمها سورة كاملة.",
      en: "Maryam (peace be upon her) is the only woman mentioned by name in the Qur'an — and an entire surah carries her name.",
    },
  },
  {
    id: "honey-bee",
    emoji: "🐝",
    text: {
      ar: "هناك سور في القرآن سُمّيت بأسماء حيوانات وحشرات: البقرة، النحل، النمل، العنكبوت، الفيل.",
      en: "Several surahs are named after animals and insects: the Cow, the Bee, the Ant, the Spider, and the Elephant.",
    },
  },
  {
    id: "qibla-change",
    emoji: "🧭",
    text: {
      ar: "كان المسلمون يصلّون نحو بيت المقدس نحو ستة عشر شهرًا قبل أن يأمر الله بتحويل القبلة إلى الكعبة.",
      en: "Muslims prayed toward Jerusalem for about sixteen months before Allah commanded the qibla be turned to the Ka'bah.",
    },
  },
  {
    id: "first-word",
    emoji: "🖋️",
    text: {
      ar: "أوّل كلمة نزلت من القرآن هي «اقْرَأْ» — فبدأ الوحي بالأمر بالقراءة والعلم.",
      en: "The very first word revealed of the Qur'an was “Read” — revelation began with a command to seek knowledge.",
    },
  },
  {
    id: "kaaba-cloth",
    emoji: "🕋",
    text: {
      ar: "كسوة الكعبة تُصنع من الحرير الطبيعي الأسود وتُطرّز بخيوط مذهّبة، وتُستبدل بكسوة جديدة كل عام.",
      en: "The Ka'bah's covering is woven from black silk embroidered with gold-plated thread, and is replaced with a new one every year.",
    },
  },
  {
    id: "salman",
    emoji: "🌍",
    text: {
      ar: "من صحابة النبي ﷺ من جاء من بلاد بعيدة: سلمان من فارس، وصهيب من الروم، وبلال من الحبشة.",
      en: "The Prophet's ﷺ companions came from far and wide: Salman from Persia, Suhayb from Rome, and Bilal from Abyssinia.",
    },
  },
  {
    id: "zero-hour",
    emoji: "🔭",
    text: {
      ar: "علماء المسلمين طوّروا علم الجبر والخوارزميات، وكلمة «Algorithm» مشتقة من اسم العالِم المسلم الخوارزمي.",
      en: "Muslim scholars developed algebra and algorithms — the word “algorithm” comes from the name of the scholar al-Khwarizmi.",
    },
  },
  {
    id: "smile-charity",
    emoji: "😊",
    text: {
      ar: "قال النبي ﷺ إنّ تبسّمك في وجه أخيك صدقة — فحتى الابتسامة لها أجر.",
      en: "The Prophet ﷺ said that smiling at your brother is charity — even a smile carries reward.",
    },
  },
  {
    id: "laylat-qadr",
    emoji: "✨",
    text: {
      ar: "ليلة القدر خير من ألف شهر، أي أفضل من أكثر من ثلاث وثمانين سنة من العبادة.",
      en: "Laylat al-Qadr is better than a thousand months — more than eighty-three years of worship in a single night.",
    },
  },
  {
    id: "fasting-worldwide",
    emoji: "🌙",
    text: {
      ar: "لأنّ التقويم الهجري قمري، فإنّ رمضان يتنقّل عبر فصول السنة ويعود إلى الفصل نفسه كل ثلاث وثلاثين سنة تقريبًا.",
      en: "Because the Hijri calendar is lunar, Ramadan drifts through the seasons and returns to the same one roughly every thirty-three years.",
    },
  },
  {
    id: "names-99",
    emoji: "📿",
    text: {
      ar: "لله أسماء حسنى كثيرة، اشتهر منها تسعة وتسعون اسمًا، من أحصاها دخل الجنة.",
      en: "Allah has many beautiful names; ninety-nine are the most well known, and whoever embraces them enters Paradise.",
    },
  },
  {
    id: "first-mosque",
    emoji: "🕌",
    text: {
      ar: "أوّل مسجد بُني في الإسلام هو مسجد قباء في المدينة، وقد شارك النبي ﷺ بنفسه في بنائه.",
      en: "The first mosque built in Islam was Masjid Quba in Madinah, and the Prophet ﷺ took part in building it himself.",
    },
  },
  {
    id: "water-wudu",
    emoji: "💧",
    text: {
      ar: "نهى النبي ﷺ عن الإسراف في ماء الوضوء حتى لو كان المسلم على نهر جارٍ — درسٌ مبكّر في ترشيد الماء.",
      en: "The Prophet ﷺ forbade wasting water in wudu even beside a flowing river — an early lesson in conservation.",
    },
  },
  {
    id: "hijrah-calendar",
    emoji: "📅",
    text: {
      ar: "التقويم الهجري لا يبدأ بمولد النبي ﷺ ولا بوفاته، بل بهجرته من مكة إلى المدينة.",
      en: "The Hijri calendar starts neither at the Prophet's ﷺ birth nor his passing, but at his migration from Makkah to Madinah.",
    },
  },
  {
    id: "quran-memorizers",
    emoji: "🧠",
    text: {
      ar: "ملايين المسلمين حول العالم يحفظون القرآن كاملًا عن ظهر قلب، وكثير منهم لا يتحدّث العربية لغةً أمّ.",
      en: "Millions of Muslims worldwide have memorized the entire Qur'an by heart — many of them not native Arabic speakers.",
    },
  },
  {
    id: "friday",
    emoji: "🌟",
    text: {
      ar: "يوم الجمعة أفضل أيام الأسبوع في الإسلام، وفيه ساعة لا يُرَدّ فيها دعاء العبد.",
      en: "Friday is the best day of the week in Islam, containing an hour in which supplication is not turned away.",
    },
  },
  {
    id: "coffee",
    emoji: "☕",
    text: {
      ar: "يُنسب انتشار شرب القهوة إلى الصوفية في اليمن الذين استعانوا بها للسهر في الذِّكر والعبادة.",
      en: "The spread of coffee drinking is traced to Sufis in Yemen, who used it to stay awake for remembrance and worship.",
    },
  },
  {
    id: "green-dome",
    emoji: "💚",
    text: {
      ar: "المسجد النبوي يتّسع لأكثر من مليون مصلٍّ في مواسم الذروة، وفيه مظلّات آلية تُفتح وتُغلق حسب الشمس.",
      en: "The Prophet's Mosque holds over a million worshippers at peak times, and has motorized umbrellas that open and close with the sun.",
    },
  },
  {
    id: "ink-blood",
    emoji: "🖊️",
    text: {
      ar: "قال النبي ﷺ إنّ طلب العلم فريضة على كل مسلم، ورفع منزلة العلماء حتى قال: «العلماء ورثة الأنبياء».",
      en: "The Prophet ﷺ made seeking knowledge an obligation on every Muslim, and raised the scholars' rank, saying: “The scholars are the heirs of the prophets.”",
    },
  },
  {
    id: "house-of-wisdom",
    emoji: "🏛️",
    text: {
      ar: "«بيت الحكمة» في بغداد كان أعظم مركز علمي في زمانه، تُرجمت فيه كتب اليونان والفرس والهند إلى العربية.",
      en: "The House of Wisdom in Baghdad was the greatest research centre of its age, translating Greek, Persian, and Indian works into Arabic.",
    },
  },
  {
    id: "oldest-university",
    emoji: "🎓",
    text: {
      ar: "جامعة القرويين في فاس بالمغرب أسّستها امرأة اسمها فاطمة الفهري سنة ٨٥٩م، وتُعدّ من أقدم الجامعات العاملة في العالم.",
      en: "Al-Qarawiyyin University in Fez, Morocco, was founded by a woman — Fatima al-Fihri — in 859 CE, and is among the oldest continuously operating universities in the world.",
    },
  },
  {
    id: "surgery",
    emoji: "🩺",
    text: {
      ar: "الطبيب المسلم الزهراوي وضع كتابًا وصف فيه أكثر من مئتي أداة جراحية، وظلّ مرجعًا في أوروبا قرونًا.",
      en: "The Muslim physician al-Zahrawi wrote a book describing over two hundred surgical instruments; it remained a reference in Europe for centuries.",
    },
  },
  {
    id: "camera",
    emoji: "📷",
    text: {
      ar: "ابن الهيثم شرح كيف يرى الإنسان بالضوء الداخل إلى العين، ووصف «القمرة» التي أخذت منها الكاميرا اسمها.",
      en: "Ibn al-Haytham explained vision as light entering the eye, and described the qamara — the dark chamber that gave the camera its name.",
    },
  },
  {
    id: "salam-meaning",
    emoji: "🕊️",
    text: {
      ar: "تحية الإسلام «السلام عليكم» دعاء بالأمان والرحمة، وردّها بأحسن منها زيادة في الأجر.",
      en: "The Islamic greeting “as-salamu alaykum” is a prayer for peace and mercy — and answering with something better earns more reward.",
    },
  },
  {
    id: "orphan-care",
    emoji: "🤝",
    text: {
      ar: "قال النبي ﷺ عن كافل اليتيم: «أنا وكافل اليتيم في الجنة هكذا» وأشار بإصبعيه متقاربتين.",
      en: "Of one who cares for an orphan the Prophet ﷺ said: “I and the caretaker of an orphan will be in Paradise like this,” holding two fingers together.",
    },
  },
  {
    id: "animals-mercy",
    emoji: "🐈",
    text: {
      ar: "أخبر النبي ﷺ أنّ امرأة دخلت النار في هرّة حبستها، وأنّ رجلًا غُفر له لأنّه سقى كلبًا عطشان.",
      en: "The Prophet ﷺ told of a woman punished over a cat she confined, and a man forgiven for giving water to a thirsty dog.",
    },
  },
  {
    id: "zamzam",
    emoji: "💧",
    text: {
      ar: "بئر زمزم تتدفّق منذ آلاف السنين منذ زمن هاجر وإسماعيل عليهما السلام ولم تنضب.",
      en: "The well of Zamzam has flowed since the time of Hajar and Isma'il thousands of years ago, and has never run dry.",
    },
  },
  {
    id: "hajj-numbers",
    emoji: "🕋",
    text: {
      ar: "يجتمع في الحج أكثر من مليوني مسلم من نحو ١٨٠ دولة، يلبسون لباسًا واحدًا لا فرق فيه بين غني وفقير.",
      en: "Hajj gathers over two million Muslims from some 180 countries, all in the same simple garments with no distinction between rich and poor.",
    },
  },
  {
    id: "shortest-ayah",
    emoji: "📏",
    text: {
      ar: "أطول آية في القرآن هي آية الدَّين في سورة البقرة، وتشغل وحدها قرابة صفحة كاملة.",
      en: "The longest verse in the Qur'an is the verse of debt in al-Baqarah — on its own it fills close to a full page.",
    },
  },
  {
    id: "sujood-surah",
    emoji: "🙇",
    text: {
      ar: "في القرآن مواضع يُسنّ فيها السجود عند تلاوتها، تُسمّى سجدات التلاوة.",
      en: "The Qur'an contains specific places where prostration is recommended upon recitation — the prostrations of recitation.",
    },
  },
  {
    id: "moon-calendar",
    emoji: "🌘",
    text: {
      ar: "السنة الهجرية أقصر من الميلادية بنحو أحد عشر يومًا، لأنّها تعتمد دورة القمر لا الشمس.",
      en: "The Hijri year is about eleven days shorter than the Gregorian one, because it follows the moon's cycle rather than the sun's.",
    },
  },
  {
    id: "first-adhan",
    emoji: "📢",
    text: {
      ar: "بلال بن رباح رضي الله عنه كان أوّل مؤذّن في الإسلام، وكان عبدًا عُذّب على إيمانه ثم أعتقه أبو بكر.",
      en: "Bilal ibn Rabah was the first mu'adhdhin in Islam — a slave tortured for his faith until Abu Bakr freed him.",
    },
  },
  {
    id: "hospital",
    emoji: "🏥",
    text: {
      ar: "أنشأ المسلمون «البيمارستانات» وهي مستشفيات تعالج الناس مجانًا وتضمّ أقسامًا متخصّصة ومكتبات طبية.",
      en: "Muslims built bimaristans — hospitals that treated people free of charge, with specialized wards and medical libraries.",
    },
  },
  {
    id: "debt-forgiveness",
    emoji: "💰",
    text: {
      ar: "الزكاة ركن من أركان الإسلام، وهي حقّ معلوم في المال يُعطى للفقراء، لا تفضّلًا بل واجبًا.",
      en: "Zakah is a pillar of Islam — a defined right the poor have over wealth, given as an obligation rather than a favour.",
    },
  },
  {
    id: "mothers-feet",
    emoji: "👣",
    text: {
      ar: "سُئل النبي ﷺ من أحقّ الناس بحسن الصحبة فقال: «أمّك» ثلاث مرات، ثم قال: «أبوك».",
      en: "Asked who deserves the best companionship, the Prophet ﷺ said “your mother” three times, and only then “your father.”",
    },
  },
  {
    id: "night-journey",
    emoji: "🌌",
    text: {
      ar: "في رحلة الإسراء والمعراج فُرضت الصلوات الخمس، وكانت خمسين ثم خُفّفت رحمةً بالأمة.",
      en: "On the Night Journey the five daily prayers were ordained — originally fifty, then lightened as a mercy to the community.",
    },
  },
  {
    id: "quran-order",
    emoji: "🔀",
    text: {
      ar: "ترتيب سور القرآن في المصحف يختلف عن ترتيب نزولها؛ فأوّل ما نزل سورة العلق وهي في آخر المصحف.",
      en: "The order of surahs in the mushaf differs from the order of revelation — the first revealed, al-'Alaq, sits near the very end.",
    },
  },
  {
    id: "gardens-spain",
    emoji: "🌷",
    text: {
      ar: "قصر الحمراء في الأندلس من أروع ما بناه المسلمون، وفيه نظام ريّ وحدائق ونقوش لا تزال تبهر الزوّار.",
      en: "The Alhambra in Andalusia is among the finest things Muslims built — its irrigation, gardens, and carvings still astonish visitors.",
    },
  },
  {
    id: "no-monks",
    emoji: "🏡",
    text: {
      ar: "لا رهبانية في الإسلام؛ فالعبادة تكون في البيت والسوق والعمل، وحتى النفقة على الأهل صدقة.",
      en: "There is no monasticism in Islam — worship happens at home, in the market, and at work; even spending on your family is charity.",
    },
  },
  {
    id: "tears",
    emoji: "😢",
    text: {
      ar: "من السبعة الذين يظلّهم الله في ظلّه يوم لا ظلّ إلا ظلّه: رجل ذكر الله خاليًا ففاضت عيناه.",
      en: "Among the seven whom Allah shades on a day with no shade but His: one who remembers Allah alone and his eyes overflow with tears.",
    },
  },
  {
    id: "trade-honesty",
    emoji: "⚖️",
    text: {
      ar: "قال النبي ﷺ: «التاجر الصدوق الأمين مع النبيّين والصدّيقين والشهداء» — فالصدق في البيع عبادة.",
      en: "The Prophet ﷺ said the truthful, trustworthy merchant will be with the prophets, the truthful, and the martyrs — honest trade is worship.",
    },
  },
  {
    id: "astrolabe",
    emoji: "⭐",
    text: {
      ar: "طوّر المسلمون الإسطرلاب لتحديد أوقات الصلاة واتجاه القبلة، فصار أداة ملاحة استعملها العالم قرونًا.",
      en: "Muslims refined the astrolabe to fix prayer times and the qibla direction — it became a navigation tool the world used for centuries.",
    },
  },
  {
    id: "salat-count",
    emoji: "🕰️",
    text: {
      ar: "المسلم الذي يصلّي الفروض الخمس يقف بين يدي الله أكثر من ١٨٠٠ مرّة في السنة الواحدة.",
      en: "A Muslim praying the five daily prayers stands before Allah more than 1,800 times in a single year.",
    },
  },
];
