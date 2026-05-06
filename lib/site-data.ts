import { formatPrice, productById, type ProductId } from "@/lib/products";
import {
  INSTAGRAM_URL,
  TELEGRAM_URL,
  WHATSAPP_URL
} from "@/lib/social-links";

export type { ProductId } from "@/lib/products";

export type Language = "ru" | "fr";
export type ContactMethod = "whatsapp" | "telegram" | "instagram" | "phone";
export type FulfillmentMethod = "pickup" | "delivery";

export const links = {
  instagram: INSTAGRAM_URL,
  telegram: TELEGRAM_URL,
  whatsappBase: WHATSAPP_URL
};

export function createWhatsAppLink() {
  return links.whatsappBase;
}

export function createTelegramLink() {
  return links.telegram;
}

export const languages: { code: Language; label: string }[] = [
  { code: "ru", label: "RU" },
  { code: "fr", label: "FR" }
];

const productImages: Record<ProductId, string> = {
  classic: "/images/oreshki-classic.jpg",
  gift: "/images/oreshki-gift-box.jpg",
  mini: "/images/oreshki-mini.jpg"
};

const productBasePrices: Record<ProductId, number> = {
  classic: productById.get("classic")!.price,
  gift: productById.get("gift")!.price,
  mini: productById.get("mini")!.price
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
      title: "Домашние орешки со сгущёнкой",
      subtitle:
        "Тот самый вкус детства — золотистая хрустящая скорлупка и нежная карамельная начинка из варёной сгущёнки.",
      trustLine: "Ручная работа • Маленькие партии • Рекомендуем предзаказ",
      order: "Заказать",
      discover: "Посмотреть форматы",
      imageAlt: "Домашние орешки со сгущёнкой на бежевой керамической тарелке",
      logistics: [
        "Приготовление за 24–48 ч",
        "Самовывоз или локальная доставка",
        "Оплата при заказе или получении",
        "Для коробок рекомендуем предзаказ"
      ]
    },
    products: {
      eyebrow: "Ассортимент",
      title: "Три формата для знакомства, семьи и подарка",
      description:
        "Выберите маленький набор к кофе, фирменный формат для дома или элегантную коробку для тёплого подарка.",
      order: "Добавить в корзину",
      added: "Товар добавлен в корзину",
      items: [
        {
          id: "mini",
          title: "Мини-набор",
          quantity: "~10 штук",
          positioning: "Идеально для знакомства",
          description:
            "Небольшой формат, чтобы попробовать орешки или добавить сладкий акцент к кофе.",
          price: formatPrice(productBasePrices.mini),
          basePrice: productBasePrices.mini,
          image: productImages.mini,
          imageAlt: "Небольшая порция орешков со сгущёнкой рядом с чашкой кофе"
        },
        {
          id: "classic",
          title: "Классические орешки",
          quantity: "~25 штук",
          positioning: "Фирменный формат",
          description:
            "Наш фирменный формат: хрустящие скорлупки, нежная начинка и настоящий домашний вкус.",
          price: formatPrice(productBasePrices.classic),
          basePrice: productBasePrices.classic,
          image: productImages.classic,
          imageAlt: "Орешки со сгущёнкой крупным планом, один орешек раскрыт с карамельной начинкой"
        },
        {
          id: "gift",
          title: "Подарочная коробка",
          quantity: "~40 штук + упаковка",
          positioning: "Лучше всего для подарка",
          description:
            "Элегантная коробка для тёплого подарка, праздника или красивого жеста.",
          price: formatPrice(productBasePrices.gift),
          basePrice: productBasePrices.gift,
          image: productImages.gift,
          imageAlt: "Бежевая подарочная коробка с домашними орешками и лентой"
        }
      ]
    },
    about: {
      eyebrow: "История",
      title: "Восточноевропейская сладость, приготовленная вручную",
      description:
        "Орешки — это маленькое печенье в форме грецкого ореха, которое часто готовят для семейных праздников и тёплых встреч. Каждая скорлупка выпекается отдельно, затем наполняется варёной сгущёнкой.",
      note:
        "Мы готовим небольшими партиями, чтобы сохранить главное: хрустящую текстуру, щедрую начинку и аромат настоящего домашнего десерта.",
      imageAlt: "Руки наполняют скорлупки орешков варёной сгущёнкой"
    },
    reviews: {
      eyebrow: "Отзывы",
      title: "Тёплые слова после первой коробки",
      ratingLabel: "5 из 5 звёзд",
      items: [
        {
          name: "Анна",
          text: "Тот самый вкус из детства. Скорлупки хрустящие, начинки много — невозможно остановиться."
        },
        {
          name: "Марк",
          text: "Заказывали на день рождения, всё исчезло за несколько минут. Коробка выглядела очень красиво."
        },
        {
          name: "Елена",
          text: "Свежие, не приторные и очень аккуратные. Видно, что сделано вручную."
        }
      ]
    },
    cart: {
      eyebrow: "Заказ",
      title: "Корзина",
      close: "Закрыть",
      remove: "Удалить товар",
      quantity: "Количество",
      emptyTitle: "Корзина пуста",
      emptyText:
        "Добавьте набор орешков из раздела продуктов, и здесь появится оформление заказа.",
      total: "Итого",
      subtotal: "Промежуточный итог",
      deliveryFee: "Стоимость доставки",
      pickupFeeLabel: "Самовывоз бесплатно",
      deliveryFeeLabel: "Доставка: 3,99 €",
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
        phone: "Введите корректный номер телефона.",
        address: "Укажите адрес доставки",
        submit: "Не удалось отправить заказ. Проверьте соединение.",
        server: "Не удалось отправить заказ. Попробуйте ещё раз."
      },
      confirmationTitle: "Заказ принят",
      confirmationText: "Мы скоро свяжемся с вами, чтобы подтвердить детали.",
      orderNumber: "Номер заказа",
      confirmationTotal: "Сумма заказа",
      back: "Вернуться на сайт",
      contactLabels: {
        instagram: "Instagram",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
      }
    },
    contact: {
      eyebrow: "Контакты",
      title: "Хотите орешки?",
      description:
        "Оформите заказ прямо на сайте или напишите нам в удобный мессенджер. Мы подтвердим наличие, дату приготовления и варианты самовывоза или доставки.",
      note:
        "Для подарочных коробок и праздничных заказов лучше написать заранее: так мы успеем подготовить свежую партию и аккуратную упаковку.",
      instagramAria: "Открыть Instagram",
      telegramAria: "Открыть Telegram",
      whatsappAria: "Открыть WhatsApp"
    }
  },
  fr: {
    nav: {
      aria: "Navigation principale",
      brand: "Oreshki",
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
      title: "Oreshki faits maison au caramel",
      subtitle:
        "Le goût de l’enfance — des coques dorées, croustillantes et garnies d’un cœur fondant au lait concentré caramélisé.",
      trustLine: "Faits à la main • Petites séries • Précommande recommandée",
      order: "Commander",
      discover: "Découvrir les formats",
      imageAlt: "Oreshki faits maison au caramel sur une assiette en céramique beige",
      logistics: [
        "Préparation sous 24–48h",
        "Retrait ou livraison locale",
        "Paiement à la commande ou à la réception",
        "Précommande conseillée pour les coffrets"
      ]
    },
    products: {
      eyebrow: "Assortiment",
      title: "Trois formats pour découvrir, partager ou offrir",
      description:
        "Choisissez le mini format pour goûter, notre boîte signature pour la maison ou un coffret élégant pour offrir.",
      order: "Ajouter au panier",
      added: "Produit ajouté au panier",
      items: [
        {
          id: "mini",
          title: "Mini set",
          quantity: "~10 pièces",
          positioning: "Idéal pour découvrir",
          description:
            "Le petit format parfait pour découvrir les oreshki ou accompagner un café.",
          price: formatPrice(productBasePrices.mini),
          basePrice: productBasePrices.mini,
          image: productImages.mini,
          imageAlt: "Petit format d’oreshki au caramel près d’une tasse de café"
        },
        {
          id: "classic",
          title: "Classic",
          quantity: "~25 pièces",
          positioning: "Format signature",
          description:
            "Notre format signature : des coques croustillantes, une garniture fondante et le vrai goût maison.",
          price: formatPrice(productBasePrices.classic),
          basePrice: productBasePrices.classic,
          image: productImages.classic,
          imageAlt: "Oreshki au caramel en gros plan avec un biscuit ouvert montrant la garniture"
        },
        {
          id: "gift",
          title: "Gift box",
          quantity: "~40 pièces + packaging",
          positioning: "Parfait à offrir",
          description:
            "Un coffret élégant pour offrir une douceur artisanale, rare et généreuse.",
          price: formatPrice(productBasePrices.gift),
          basePrice: productBasePrices.gift,
          image: productImages.gift,
          imageAlt: "Coffret cadeau beige rempli d’oreshki au caramel avec un ruban"
        }
      ]
    },
    about: {
      eyebrow: "Histoire",
      title: "Une douceur d’Europe de l’Est, préparée à la main",
      description:
        "Les oreshki sont de petits biscuits en forme de noix, traditionnellement préparés pour les grandes occasions. Chaque coque est cuite une par une, puis garnie d’un caramel fondant au lait concentré.",
      note:
        "Nous les préparons en petites séries pour préserver ce qui fait leur charme : une texture croustillante, un cœur généreux et ce parfum de dessert fait maison.",
      imageAlt: "Des mains garnissent des coques d’oreshki avec du caramel au lait concentré"
    },
    reviews: {
      eyebrow: "Avis",
      title: "Des mots doux après la première boîte",
      ratingLabel: "5 étoiles sur 5",
      items: [
        {
          name: "Anna",
          text: "Exactement le goût de mon enfance. Les coques sont croustillantes, la garniture est généreuse… impossible de s’arrêter."
        },
        {
          name: "Marc",
          text: "Commandés pour un anniversaire, tout est parti en quelques minutes. Le coffret était très élégant."
        },
        {
          name: "Elena",
          text: "Très frais, pas trop sucré, et vraiment fait avec soin. On sent la différence avec un dessert industriel."
        }
      ]
    },
    cart: {
      eyebrow: "Commande",
      title: "Panier",
      close: "Fermer",
      remove: "Retirer l'article",
      quantity: "Quantité",
      emptyTitle: "Votre panier est vide",
      emptyText:
        "Ajoutez un coffret depuis la section produits, puis finalisez votre commande ici.",
      total: "Total",
      subtotal: "Sous-total",
      deliveryFee: "Frais de livraison",
      pickupFeeLabel: "Retrait gratuit",
      deliveryFeeLabel: "Livraison: 3,99 €",
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
        phone: "Veuillez entrer un numéro de téléphone valide.",
        address: "Indiquez l'adresse de livraison",
        submit: "Impossible d'envoyer la commande. Vérifiez votre connexion.",
        server: "Impossible d'envoyer la commande. Réessayez."
      },
      confirmationTitle: "Commande reçue",
      confirmationText:
        "Votre commande a été reçue. Nous vous contacterons rapidement.",
      orderNumber: "Numéro de commande",
      confirmationTotal: "Total de la commande",
      back: "Retour au site",
      contactLabels: {
        instagram: "Instagram",
        telegram: "Telegram",
        whatsapp: "WhatsApp"
      }
    },
    contact: {
      eyebrow: "Contact",
      title: "Une envie d’oreshki ?",
      description:
        "Commandez directement sur le site ou écrivez-nous dans le messager qui vous convient. Nous confirmons la disponibilité, la date de préparation et les options de retrait ou livraison.",
      note:
        "Pour les coffrets cadeaux et les commandes de fête, la précommande nous aide à préparer une fournée fraîche et un emballage soigné.",
      instagramAria: "Ouvrir Instagram",
      telegramAria: "Ouvrir Telegram",
      whatsappAria: "Ouvrir WhatsApp"
    }
  }
} as const;

export type SiteContent = (typeof siteContent)[Language];
export type ProductItem = SiteContent["products"]["items"][number];
