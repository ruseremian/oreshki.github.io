export type Language = "ru" | "fr";

export const links = {
  instagram: "https://instagram.com/yourpage",
  telegram: "https://t.me/yourpage"
};

export const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "fr", label: "FR" }
];

export const siteContent = {
  ru: {
    nav: {
      aria: "Основная навигация",
      brand: "Орешки",
      order: "Заказать",
      items: [
        { label: "Продукты", href: "#products" },
        { label: "О нас", href: "#about" },
        { label: "Отзывы", href: "#reviews" },
        { label: "Контакты", href: "#contact" }
      ],
      languageLabel: "Выбрать язык"
    },
    hero: {
      eyebrow: "Домашняя кондитерская",
      title: "Орешки со сгущёнкой ручной работы",
      subtitle:
        "Свежие партии на заказ, натуральные ингредиенты и тот самый домашний вкус: хрустящая скорлупка, нежная карамельная сгущёнка и аккуратная ручная сборка.",
      instagram: "Заказать в Instagram",
      telegram: "Написать в Telegram",
      imageAlt: "Орешки со сгущёнкой на керамической тарелке",
      stats: [
        ["24 ч", "свежесть"],
        ["100%", "ручная работа"],
        ["3", "формата"]
      ]
    },
    products: {
      eyebrow: "Ассортимент",
      title: "Три формата для уютного повода",
      description:
        "Выберите классическую порцию к чаю, компактный набор для знакомства или подарочную коробку с красивой подачей.",
      order: "Заказать",
      items: [
        {
          title: "Классические орешки",
          description:
            "Рассыпчатое песочное тесто, густая карамельная сгущёнка и нежный ореховый аромат.",
          price: "от 1 200 ₽",
          image: "/images/classic-oreshki.png"
        },
        {
          title: "Подарочная коробка",
          description:
            "Элегантная упаковка для тёплого жеста, семейного праздника или корпоративного комплимента.",
          price: "от 2 400 ₽",
          image: "/images/gift-box.png"
        },
        {
          title: "Мини-набор",
          description:
            "Небольшая порция свежих орешков для знакомства со вкусом или уютного чаепития.",
          price: "от 650 ₽",
          image: "/images/mini-set.png"
        }
      ]
    },
    about: {
      eyebrow: "История",
      title: "Маленькие партии, большой вкус детства",
      description:
        "Каждая скорлупка выпекается вручную до золотистого оттенка, затем наполняется густой варёной сгущёнкой и собирается аккуратно, без спешки. Мы выбираем качественное масло, свежие яйца и понятные ингредиенты, чтобы вкус оставался честным, тёплым и узнаваемым.",
      note:
        "Орешки готовятся небольшими партиями, поэтому они приезжают к вам свежими: хрустящими снаружи, мягко-карамельными внутри и по-домашнему ароматными.",
      imageAlt: "Свежие домашние орешки со сгущёнкой"
    },
    reviews: {
      eyebrow: "Отзывы",
      title: "Тёплые слова после первой коробки",
      items: [
        {
          name: "Анна",
          text: "Вкус как из детства, только аккуратнее и нежнее. Сгущёнка густая, орешки свежие, коробка красивая."
        },
        {
          name: "Мария",
          text: "Заказывала в подарок маме. Очень тёплая подача, всё приехало целым, аромат был невероятный."
        },
        {
          name: "Екатерина",
          text: "Люблю, что они не приторные. Видно, что сделаны вручную: ровные, хрустящие и с щедрой начинкой."
        }
      ]
    },
    contact: {
      eyebrow: "Заказ",
      title: "Напишите, и мы соберём свежую партию",
      description:
        "Принимаем заказы в Instagram и Telegram. Подскажем ближайшую дату выпечки, формат набора и варианты красивой упаковки.",
      note:
        "Доставка и самовывоз обсуждаются индивидуально. Для праздников и подарков лучше написать за 2-3 дня, чтобы мы успели подготовить свежую партию и упаковку.",
      instagramAria: "Открыть Instagram",
      telegramAria: "Открыть Telegram"
    }
  },
  fr: {
    nav: {
      aria: "Navigation principale",
      brand: "Orechki",
      order: "Commander",
      items: [
        { label: "Produits", href: "#products" },
        { label: "À propos", href: "#about" },
        { label: "Avis", href: "#reviews" },
        { label: "Contact", href: "#contact" }
      ],
      languageLabel: "Choisir la langue"
    },
    hero: {
      eyebrow: "Pâtisserie maison",
      title: "Orechki au lait concentré fait main",
      subtitle:
        "Des fournées fraîches sur commande, des ingrédients premium et ce goût maison inoubliable : coque sablée croquante, garniture caramel fondante et assemblage fait à la main.",
      instagram: "Commander sur Instagram",
      telegram: "Écrire sur Telegram",
      imageAlt: "Orechki au lait concentré sur une assiette en céramique",
      stats: [
        ["24 h", "fraîcheur"],
        ["100%", "fait main"],
        ["3", "formats"]
      ]
    },
    products: {
      eyebrow: "Assortiment",
      title: "Trois formats pour un moment doux",
      description:
        "Choisissez une portion classique pour le thé, un mini coffret découverte ou une boîte cadeau élégante.",
      order: "Commander",
      items: [
        {
          title: "Orechki classiques",
          description:
            "Une pâte sablée friable, un lait concentré caramélisé généreux et un délicat parfum de noix.",
          price: "dès 1 200 ₽",
          image: "/images/classic-oreshki.png"
        },
        {
          title: "Boîte cadeau",
          description:
            "Un coffret raffiné pour une attention chaleureuse, une fête de famille ou un compliment d'entreprise.",
          price: "dès 2 400 ₽",
          image: "/images/gift-box.png"
        },
        {
          title: "Mini coffret",
          description:
            "Une petite portion d'orechki frais pour découvrir le goût ou accompagner un thé cosy.",
          price: "dès 650 ₽",
          image: "/images/mini-set.png"
        }
      ]
    },
    about: {
      eyebrow: "Histoire",
      title: "Petites fournées, grand goût d'enfance",
      description:
        "Chaque coque est cuite à la main jusqu'à une teinte dorée, puis garnie de lait concentré caramélisé et assemblée avec soin. Nous choisissons du bon beurre, des oeufs frais et des ingrédients simples pour garder un goût sincère, doux et nostalgique.",
      note:
        "Les orechki sont préparés en petites fournées afin d'arriver chez vous frais : croquants dehors, fondants au caramel dedans et délicieusement maison.",
      imageAlt: "Orechki maison frais au lait concentré"
    },
    reviews: {
      eyebrow: "Avis",
      title: "Des mots doux après la première boîte",
      items: [
        {
          name: "Anna",
          text: "Le goût de l'enfance, mais plus fin et plus délicat. La garniture est généreuse, les biscuits sont frais et la boîte est très jolie."
        },
        {
          name: "Maria",
          text: "Je les ai commandés pour ma mère. Présentation très chaleureuse, tout est arrivé intact et le parfum était incroyable."
        },
        {
          name: "Ekaterina",
          text: "J'aime qu'ils ne soient pas trop sucrés. On sent le fait main : réguliers, croquants et bien garnis."
        }
      ]
    },
    contact: {
      eyebrow: "Commande",
      title: "Écrivez-nous, nous préparerons une fournée fraîche",
      description:
        "Nous prenons les commandes sur Instagram et Telegram. Nous vous indiquerons la prochaine date de cuisson, le format idéal et les options d'emballage.",
      note:
        "Livraison et retrait sont à convenir individuellement. Pour les fêtes et les cadeaux, écrivez 2 à 3 jours à l'avance afin que nous préparions une fournée fraîche et un bel emballage.",
      instagramAria: "Ouvrir Instagram",
      telegramAria: "Ouvrir Telegram"
    }
  }
} as const;

export type SiteContent = (typeof siteContent)[Language];
