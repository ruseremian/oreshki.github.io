import type { ProductId } from "@/lib/products";

export type { ProductId } from "@/lib/products";

export type Language = "ru" | "fr";
export type ContactMethod = "whatsapp" | "telegram" | "instagram" | "phone";
export type FulfillmentMethod = "pickup" | "delivery";

export const links = {
  instagram: "https://www.instagram.com/aida_221?igsh=MTVnZGNvanU2dzB2cg==",
  telegram: "tg://resolve?phone=33649635568",
  whatsappBase: "https://wa.me/33649635568"
};

export function createWhatsAppLink(message: string) {
  return `${links.whatsappBase}?text=${encodeURIComponent(message)}`;
}

export function createTelegramLink(message: string) {
  return `https://t.me/share/url?url=&text=${encodeURIComponent(message)}`;
}

export const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "fr", label: "FR" }
];

const productImages: Record<ProductId, string> = {
  classic: "/images/classic-oreshki.png",
  gift: "/images/gift-box.png",
  mini: "/images/mini-set.png"
};

const productBasePrices: Record<ProductId, number> = {
  classic: 1200,
  gift: 2400,
  mini: 650
};

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
      cartAria: "Открыть корзину, товаров:",
      languageLabel: "Выбрать язык"
    },
    hero: {
      eyebrow: "Домашняя кондитерская",
      title: "Орешки со сгущёнкой ручной работы",
      subtitle:
        "Свежие партии на заказ, натуральные ингредиенты и тот самый домашний вкус: хрустящая скорлупка, нежная карамельная сгущёнка и аккуратная ручная сборка.",
      order: "Заказать",
      instagram: "Instagram",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
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
      order: "Добавить в корзину",
      items: [
        {
          id: "classic",
          title: "Классические орешки",
          description:
            "Рассыпчатое песочное тесто, густая карамельная сгущёнка и нежный ореховый аромат.",
          price: "от 1 200 ₽",
          basePrice: productBasePrices.classic,
          image: productImages.classic
        },
        {
          id: "gift",
          title: "Подарочная коробка",
          description:
            "Элегантная упаковка для тёплого жеста, семейного праздника или корпоративного комплимента.",
          price: "от 2 400 ₽",
          basePrice: productBasePrices.gift,
          image: productImages.gift
        },
        {
          id: "mini",
          title: "Мини-набор",
          description:
            "Небольшая порция свежих орешков для знакомства со вкусом или уютного чаепития.",
          price: "от 650 ₽",
          basePrice: productBasePrices.mini,
          image: productImages.mini
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
    cart: {
      eyebrow: "Заказ",
      title: "Корзина",
      close: "Закрыть",
      remove: "Удалить товар",
      emptyTitle: "Корзина пуста",
      emptyText:
        "Добавьте набор орешков из раздела продуктов, и здесь появится оформление заказа.",
      total: "Итого",
      noPayment:
        "Оплата онлайн пока не подключена. Мы подтвердим детали и способ оплаты после заявки.",
      checkout: "Оформление заказа",
      name: "Имя",
      namePlaceholder: "Как к вам обращаться",
      phone: "Телефон",
      phonePlaceholder: "+33 ...",
      email: "Email, если удобно",
      emailPlaceholder: "name@example.com",
      contactMethod: "Удобный способ связи",
      methods: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        instagram: "Instagram",
        phone: "Телефон"
      },
      deliveryMethod: "Получение",
      pickup: "Самовывоз",
      delivery: "Доставка",
      address: "Адрес доставки",
      addressPlaceholder: "Улица, дом, город",
      preferredDate: "Желаемая дата",
      notes: "Комментарий",
      notesPlaceholder: "Время, упаковка, пожелания",
      submit: "Отправить заказ",
      submitting: "Отправляем...",
      errors: {
        items: "Корзина пуста",
        customerName: "Укажите имя",
        phone: "Укажите телефон",
        address: "Укажите адрес доставки",
        submit: "Не удалось отправить заказ. Проверьте соединение.",
        server: "Не удалось отправить заказ. Попробуйте ещё раз."
      },
      confirmationTitle: "Заказ принят",
      confirmationText: "Мы скоро свяжемся с вами, чтобы подтвердить детали.",
      orderNumber: "Номер заказа",
      confirmationMessage: "Здравствуйте! Я только что оформила заказ {orderId} на сайте.",
      back: "Вернуться на сайт",
      contactLabels: {
        instagram: "Instagram",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
      }
    },
    contact: {
      eyebrow: "Контакты",
      title: "Напишите нам напрямую",
      description:
        "Можно заказать через форму или сразу написать в удобный мессенджер. Мы подскажем ближайшую дату выпечки, формат набора и варианты красивой упаковки.",
      note:
        "Доставка и самовывоз обсуждаются индивидуально. Для праздников и подарков лучше написать за 2-3 дня, чтобы мы успели подготовить свежую партию и упаковку.",
      instagramAria: "Открыть Instagram",
      telegramAria: "Открыть Telegram",
      whatsappAria: "Открыть WhatsApp"
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
      cartAria: "Ouvrir le panier, articles :",
      languageLabel: "Choisir la langue"
    },
    hero: {
      eyebrow: "Pâtisserie maison",
      title: "Orechki au lait concentré fait main",
      subtitle:
        "Des fournées fraîches sur commande, des ingrédients premium et ce goût maison inoubliable : coque sablée croquante, garniture caramel fondante et assemblage fait à la main.",
      order: "Commander",
      instagram: "Instagram",
      telegram: "Telegram",
      whatsapp: "WhatsApp",
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
      order: "Ajouter au panier",
      items: [
        {
          id: "classic",
          title: "Orechki classiques",
          description:
            "Une pâte sablée friable, un lait concentré caramélisé généreux et un délicat parfum de noix.",
          price: "dès 1 200 ₽",
          basePrice: productBasePrices.classic,
          image: productImages.classic
        },
        {
          id: "gift",
          title: "Boîte cadeau",
          description:
            "Un coffret raffiné pour une attention chaleureuse, une fête de famille ou un compliment d'entreprise.",
          price: "dès 2 400 ₽",
          basePrice: productBasePrices.gift,
          image: productImages.gift
        },
        {
          id: "mini",
          title: "Mini coffret",
          description:
            "Une petite portion d'orechki frais pour découvrir le goût ou accompagner un thé cosy.",
          price: "dès 650 ₽",
          basePrice: productBasePrices.mini,
          image: productImages.mini
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
    cart: {
      eyebrow: "Commande",
      title: "Panier",
      close: "Fermer",
      remove: "Retirer l'article",
      emptyTitle: "Votre panier est vide",
      emptyText:
        "Ajoutez un coffret depuis la section produits, puis finalisez votre commande ici.",
      total: "Total",
      noPayment:
        "Le paiement en ligne n'est pas encore activé. Nous confirmerons les détails et le mode de paiement après votre demande.",
      checkout: "Commander",
      name: "Nom",
      namePlaceholder: "Votre nom",
      phone: "Téléphone",
      phonePlaceholder: "+33 ...",
      email: "Email, si vous préférez",
      emailPlaceholder: "nom@example.com",
      contactMethod: "Méthode de contact préférée",
      methods: {
        whatsapp: "WhatsApp",
        telegram: "Telegram",
        instagram: "Instagram",
        phone: "Téléphone"
      },
      deliveryMethod: "Mode de réception",
      pickup: "Retrait",
      delivery: "Livraison",
      address: "Adresse de livraison",
      addressPlaceholder: "Rue, numéro, ville",
      preferredDate: "Date souhaitée",
      notes: "Notes",
      notesPlaceholder: "Horaire, emballage, préférences",
      submit: "Envoyer la commande",
      submitting: "Envoi...",
      errors: {
        items: "Votre panier est vide",
        customerName: "Indiquez votre nom",
        phone: "Indiquez votre téléphone",
        address: "Indiquez l'adresse de livraison",
        submit: "Impossible d'envoyer la commande. Vérifiez votre connexion.",
        server: "Impossible d'envoyer la commande. Réessayez."
      },
      confirmationTitle: "Commande reçue",
      confirmationText:
        "Nous vous contacterons bientôt pour confirmer les détails.",
      orderNumber: "Numéro de commande",
      confirmationMessage: "Bonjour ! Je viens de passer la commande {orderId} sur le site.",
      back: "Retour au site",
      contactLabels: {
        instagram: "Instagram",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
      }
    },
    contact: {
      eyebrow: "Contact",
      title: "Écrivez-nous directement",
      description:
        "Vous pouvez commander via le formulaire ou écrire directement sur votre messagerie préférée. Nous vous indiquerons la prochaine date de cuisson, le format idéal et les options d'emballage.",
      note:
        "Livraison et retrait sont à convenir individuellement. Pour les fêtes et les cadeaux, écrivez 2 à 3 jours à l'avance afin que nous préparions une fournée fraîche et un bel emballage.",
      instagramAria: "Ouvrir Instagram",
      telegramAria: "Ouvrir Telegram",
      whatsappAria: "Ouvrir WhatsApp"
    }
  }
} as const;

export type SiteContent = (typeof siteContent)[Language];
export type ProductItem = SiteContent["products"]["items"][number];
