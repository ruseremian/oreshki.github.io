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
  pieces12: "/images/oreshki-12.jpg",
  pieces24: "/images/oreshki-24.jpg",
  pieces48: "/images/oreshki-48.jpg",
  pelmeni: "/images/pelmeni.jpg",
  "pelmeni-poulet": "/images/pelmeni.jpg",
  "pelmeni-mix-porc-boeuf": "/images/pelmeni.jpg",
  "pelmeni-boeuf": "/images/pelmeni.jpg",
  "kotleti-kievski": "/images/kotleti-kievski.jpg",
  vareniki: "/images/vareniki.jpg",
  "vareniki-fromage": "/images/vareniki.jpg",
  "vareniki-pommes-terre": "/images/vareniki.jpg",
  blinchiki: "/images/blinchiki.jpg",
  golubci: "/images/golubci.jpg",
  pirojki: "/images/pirojki.jpg",
  sigaretki: "/images/sigaretki.jpg",
  "napoleon-blanc": "/images/napoleon.jpg",
  "napoleon-velvet-rouge": "/images/napoleon.jpg",
  "napoleon-chocolat": "/images/napoleon.jpg",
  "napoleon-cafe": "/images/napoleon.jpg",
  "napoleon-pistache": "/images/napoleon.jpg"
};

const productBasePrices: Record<ProductId, number> = {
  pieces12: productById.get("pieces12")!.price,
  pieces24: productById.get("pieces24")!.price,
  pieces48: productById.get("pieces48")!.price,
  pelmeni: productById.get("pelmeni")!.price,
  "pelmeni-poulet": productById.get("pelmeni-poulet")!.price,
  "pelmeni-mix-porc-boeuf": productById.get("pelmeni-mix-porc-boeuf")!.price,
  "pelmeni-boeuf": productById.get("pelmeni-boeuf")!.price,
  "kotleti-kievski": productById.get("kotleti-kievski")!.price,
  vareniki: productById.get("vareniki")!.price,
  "vareniki-fromage": productById.get("vareniki-fromage")!.price,
  "vareniki-pommes-terre": productById.get("vareniki-pommes-terre")!.price,
  blinchiki: productById.get("blinchiki")!.price,
  golubci: productById.get("golubci")!.price,
  pirojki: productById.get("pirojki")!.price,
  sigaretki: productById.get("sigaretki")!.price,
  "napoleon-blanc": productById.get("napoleon-blanc")!.price,
  "napoleon-velvet-rouge": productById.get("napoleon-velvet-rouge")!.price,
  "napoleon-chocolat": productById.get("napoleon-chocolat")!.price,
  "napoleon-cafe": productById.get("napoleon-cafe")!.price,
  "napoleon-pistache": productById.get("napoleon-pistache")!.price
};

export const siteContent = {
  ru: {
    nav: {
      aria: "Основная навигация",
      brand: "Орешки",
      order: "Заказать",
      items: [
        { label: "Выпечка", href: "#patisserie" },
        { label: "Блюда", href: "#traiteur" },
        { label: "Отзывы", href: "#reviews" },
        { label: "Контакты", href: "#contact" }
      ],
      cartAria: "Открыть корзину, товаров:",
      languageLabel: "Выбрать язык"
    },
    hero: {
      eyebrow: "Традиционные блюда: сладкое и солёное",
      title: "Домашняя Кавказская кухня",
      subtitle:
        "Пирожные, десерты и солёные блюда, приготовленные вручную по семейным рецептам небольшими партиями.",
      trustLine: "Ручная работа • Семейные рецепты • Предзаказ приветствуется",
      order: "Заказать",
      discover: "Смотреть ассортимент",
      imageAlt: "Домашние орешки со сгущёнкой на бежевой керамической тарелке",
      logistics: [
        "Приготовление за 24–48 ч",
        "Самовывоз или локальная доставка",
        "Оплата при заказе или получении",
        "Предзаказ помогает подготовить свежую партию"
      ]
    },
    products: {
      eyebrow: "Два направления",
      title: "Домашняя выпечка и блюда к столу",
      description:
        "Выберите сладкие изделия для чаепития или солёные блюда для семейного стола — всё готовится вручную и по предзаказу.",
      artisanDisclaimer:
        "Так как вся продукция готовится вручную, внешний вид изделий может немного отличаться.",
      customQuantityNote:
        "Нужен индивидуальный формат, семейный заказ или блюдо к празднику? Напишите нам в Instagram, Telegram или WhatsApp.",
      order: "Добавить в корзину",
      added: "Товар добавлен в корзину",
      itemsEyebrow: "Сладкое",
      itemsTitle: "Домашняя выпечка",
      itemsIntro: "Домашние десерты и выпечка для тёплого чаепития: фирменные орешки, нежные сигаретки и сладкие рецепты ручной работы.",
      itemsBadge: "Сладкое",
      items: [
        {
          id: "pieces12",
          title: "12 pièces",
          fullName: productById.get("pieces12")!.orderName.ru,
          quantity: "12 штук",
          positioning: "Формат для пробы",
          description:
            "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и кусочками фундука. Формат для пробы — 2 коробки по 6 штук.",
          price: formatPrice(productBasePrices.pieces12),
          basePrice: productBasePrices.pieces12,
          image: productImages.pieces12,
          imageAlt: "Две коробки домашних орешков со сгущёнкой по 6 штук"
        },
        {
          id: "pieces24",
          title: "24 pièces",
          fullName: productById.get("pieces24")!.orderName.ru,
          quantity: "24 штуки",
          positioning: "Классический формат",
          description:
            "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и кусочками фундука. Классический формат — идеально для семьи или друзей.",
          price: formatPrice(productBasePrices.pieces24),
          basePrice: productBasePrices.pieces24,
          image: productImages.pieces24,
          imageAlt: "Домашние орешки со сгущёнкой в формате 24 штуки"
        },
        {
          id: "pieces48",
          title: "48 pièces",
          fullName: productById.get("pieces48")!.orderName.ru,
          quantity: "48 штук",
          positioning: "Большой формат",
          description:
            "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и кусочками фундука. Большой формат поставляется в двух отдельных упаковках.",
          price: formatPrice(productBasePrices.pieces48),
          basePrice: productBasePrices.pieces48,
          image: productImages.pieces48,
          imageAlt: "Большой формат домашних орешков со сгущёнкой 48 штук"
        },
        {
          id: "sigaretki",
          title: "Домашние сигаретки",
          fullName: productById.get("sigaretki")!.orderName.ru,
          quantity: "коробка",
          positioning: "Тонкая домашняя выпечка",
          description:
            "Домашние сигаретки — нежная выпечка с лёгкой хрустящей текстурой и приятной сладостью. Отлично подходят к чаю или кофе.",
          price: formatPrice(productBasePrices.sigaretki),
          basePrice: productBasePrices.sigaretki,
          image: productImages.sigaretki,
          imageAlt: "Домашние сигаретки, традиционная рулетная выпечка"
        },
        {
          id: "napoleon-blanc",
          title: "Пирожные",
          fullName: productById.get("napoleon-blanc")!.orderName.ru,
          quantity: "5 вариантов",
          positioning: "Традиционные пирожные",
          description:
            "Домашние пирожные с нежным кремом, доступны во вкусах: шоколад, кофе, фисташка, красный вельвет и Наполеон.",
          price: formatPrice(productBasePrices["napoleon-blanc"]),
          basePrice: productBasePrices["napoleon-blanc"],
          image: productImages["napoleon-blanc"],
          imageAlt: "Домашние пирожные Наполеон, красный вельвет, фисташка, кофе и шоколад",
          variants: [
            {
              id: "napoleon-blanc",
              label: "Наполеон",
              fullName: productById.get("napoleon-blanc")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-blanc"]),
              basePrice: productBasePrices["napoleon-blanc"]
            },
            {
              id: "napoleon-velvet-rouge",
              label: "Красный вельвет",
              fullName: productById.get("napoleon-velvet-rouge")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-velvet-rouge"]),
              basePrice: productBasePrices["napoleon-velvet-rouge"]
            },
            {
              id: "napoleon-pistache",
              label: "Фисташковое пирожное",
              fullName: productById.get("napoleon-pistache")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-pistache"]),
              basePrice: productBasePrices["napoleon-pistache"]
            },
            {
              id: "napoleon-chocolat",
              label: "Шоколадное пирожное",
              fullName: productById.get("napoleon-chocolat")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-chocolat"]),
              basePrice: productBasePrices["napoleon-chocolat"]
            },
            {
              id: "napoleon-cafe",
              label: "Кофейное пирожное",
              fullName: productById.get("napoleon-cafe")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-cafe"]),
              basePrice: productBasePrices["napoleon-cafe"]
            }
          ]
        }
      ],
      specialties: {
        eyebrow: "Солёное",
        title: "Домашние блюда к столу",
        intro:
          "Традиционные солёные блюда Восточной Европы и Кавказа для уютного обеда, семейного ужина или праздничного стола.",
        badge: "Солёное",
        items: [
          {
            id: "pelmeni",
            title: "Домашние пельмени",
            fullName: productById.get("pelmeni")!.orderName.ru,
            quantity: "1 кг",
            positioning: "Традиционные пельмени ручной работы",
            description:
              "Традиционные пельмени ручной работы из тонкого теста с начинкой из мяса, лука и специй. Идеально варить в воде или бульоне.",
            price: formatPrice(productBasePrices.pelmeni),
            basePrice: productBasePrices.pelmeni,
            image: productImages.pelmeni,
            imageAlt: "Домашние пельмени ручной работы",
            variants: [
              {
                id: "pelmeni-poulet",
                label: "Курица",
                fullName: productById.get("pelmeni-poulet")!.orderName.ru,
                price: formatPrice(productBasePrices["pelmeni-poulet"]),
                basePrice: productBasePrices["pelmeni-poulet"]
              },
              {
                id: "pelmeni-mix-porc-boeuf",
                label: "Микс свинина / говядина",
                fullName: productById.get("pelmeni-mix-porc-boeuf")!.orderName.ru,
                price: formatPrice(productBasePrices["pelmeni-mix-porc-boeuf"]),
                basePrice: productBasePrices["pelmeni-mix-porc-boeuf"]
              },
              {
                id: "pelmeni-boeuf",
                label: "Говядина",
                fullName: productById.get("pelmeni-boeuf")!.orderName.ru,
                price: formatPrice(productBasePrices["pelmeni-boeuf"]),
                basePrice: productBasePrices["pelmeni-boeuf"]
              }
            ]
          },
          {
            id: "kotleti-kievski",
            title: "Котлеты по-киевски",
            fullName: productById.get("kotleti-kievski")!.orderName.ru,
            quantity: "за штуку",
            positioning: "Классические котлеты с ароматным маслом",
            description:
              "Куриные котлеты с ароматным маслом, зеленью и хрустящей панировкой. Румяные снаружи и нежные внутри.",
            price: formatPrice(productBasePrices["kotleti-kievski"]),
            basePrice: productBasePrices["kotleti-kievski"],
            image: productImages["kotleti-kievski"],
            imageAlt: "Домашние котлеты по-киевски с ароматным маслом"
          },
          {
            id: "vareniki-fromage",
            title: "Домашние вареники",
            fullName: productById.get("vareniki-fromage")!.orderName.ru,
            quantity: "1 кг",
            positioning: "Традиционные вареники с начинкой",
            description:
              "Домашние вареники из мягкого теста с щедрой начинкой по традиционным рецептам: картофель или творог.",
            price: formatPrice(productBasePrices["vareniki-fromage"]),
            basePrice: productBasePrices["vareniki-fromage"],
            image: productImages["vareniki-fromage"],
            imageAlt: "Домашние вареники с традиционной начинкой",
            variants: [
              {
                id: "vareniki-fromage",
                label: "С творогом",
                fullName: productById.get("vareniki-fromage")!.orderName.ru,
                price: formatPrice(productBasePrices["vareniki-fromage"]),
                basePrice: productBasePrices["vareniki-fromage"]
              },
              {
                id: "vareniki-pommes-terre",
                label: "С картошкой",
                fullName: productById.get("vareniki-pommes-terre")!.orderName.ru,
                price: formatPrice(productBasePrices["vareniki-pommes-terre"]),
                basePrice: productBasePrices["vareniki-pommes-terre"]
              }
            ]
          },
          {
            id: "blinchiki",
            title: "Домашние блинчики",
            fullName: productById.get("blinchiki")!.orderName.ru,
            quantity: "за штуку",
            positioning: "Традиционные русские блинчики",
            description:
              "Тонкие домашние блинчики с начинками по семейным рецептам: мясо, сыр или грибы. Мягкие, нежные и удобные для семейного стола.",
            price: formatPrice(productBasePrices.blinchiki),
            basePrice: productBasePrices.blinchiki,
            image: productImages.blinchiki,
            imageAlt: "Домашние тонкие русские блинчики"
          },
          {
            id: "golubci",
            title: "Домашние голубцы",
            fullName: productById.get("golubci")!.orderName.ru,
            quantity: "1 кг",
            positioning: "Традиционные голубцы",
            description:
              "Капустные листья с начинкой из риса, мяса, овощей и специй. Готовятся дома в мягком соусе, как сытное семейное блюдо.",
            price: formatPrice(productBasePrices.golubci),
            basePrice: productBasePrices.golubci,
            image: productImages.golubci,
            imageAlt: "Домашние голубцы по семейному рецепту"
          },
          {
            id: "pirojki",
            title: "Жареные пирожки",
            fullName: productById.get("pirojki")!.orderName.ru,
            quantity: "за штуку",
            positioning: "Традиционные домашние пирожки",
            description:
              "Домашние жареные пирожки из мягкого теста с румяной корочкой. Начинки по традиционным рецептам: картошка, капуста, мясо, печень или яйцо с луком.",
            price: formatPrice(productBasePrices.pirojki),
            basePrice: productBasePrices.pirojki,
            image: productImages.pirojki,
            imageAlt: "Домашние жареные пирожки с разными начинками"
          }
        ]
      }
    },
    about: {
      eyebrow: "История",
      title: "Семейные рецепты, приготовленные вручную",
      description:
        "Мы готовим домашние сладкие и солёные блюда небольшими партиями: от фирменных орешков до сытных блюд для семейного стола.",
      note:
        "В основе — семейные рецепты, ручная работа и щедрая подача, чтобы каждый заказ ощущался как тёплое домашнее угощение.",
      imageAlt: "Руки готовят домашние орешки с варёной сгущёнкой"
    },
    reviews: {
      eyebrow: "Отзывы",
      title: "Тёплые слова после домашнего стола",
      ratingLabel: "5 из 5 звёзд",
      previousLabel: "Предыдущий отзыв",
      nextLabel: "Следующий отзыв",
      items: [
        {
          name: "Serguei",
          text: "Заказ был очень щедрым, сразу видно, что всё домашнее. Пельмени напомнили семейные обеды."
        },
        {
          name: "Milena",
          text: "Орешки были свежие, красивые и с щедрой начинкой. Подали к чаю — всем очень понравилось."
        },
        {
          name: "Ilona",
          text: "Щедрая, простая и очень вкусная еда. Видно, что всё приготовлено с заботой."
        },
        {
          name: "Svetlana",
          text: "Котлеты были хрустящие снаружи и нежные внутри. Очень вкусно и по-домашнему."
        },
        {
          name: "Arthur",
          text: "Заказывали несколько блюд на вечер, порции были отличные, и всё очень быстро закончилось."
        },
        {
          name: "Ruslan",
          text: "Тот самый вкус из детства. Скорлупки хрустящие, начинки много — невозможно остановиться."
        },
        {
          name: "Charlotte",
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
        "Добавьте сладости или солёные блюда из ассортимента, и здесь появится оформление заказа.",
      total: "Итого",
      subtotal: "Промежуточный итог",
      deliveryFee: "Стоимость доставки",
      pickupFeeLabel: "Самовывоз бесплатно",
      deliveryFeeLabel: "Доставка: 7 €",
      freeDeliveryLabel: "Бесплатная доставка от 35 €",
      freeDeliveryRemaining: "Ещё {amount} до бесплатной доставки",
      freeDeliveryUnlocked: "Доставка бесплатная",
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
      notesPlaceholder: "Время, пожелания",
      submit: "Отправить заказ",
      submitting: "Отправляем...",
      errors: {
        items: "Корзина пуста",
        customerName: "Укажите имя",
        phone: "Введите корректный номер телефона.",
        address: "Укажите адрес доставки",
        preferredDate: "Выберите дату не раньше чем через 3 дня.",
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
      title: "Готовите семейный стол или праздник?",
      description:
        "Оформите заказ прямо на сайте или напишите нам в удобный мессенджер. Мы подтвердим ассортимент, дату приготовления и варианты самовывоза или доставки.",
      note:
        "Для событий и семейных заказов по запросу лучше написать заранее: так мы успеем подготовить всё свежим.",
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
        { label: "Pâtisserie", href: "#patisserie" },
        { label: "Traiteur", href: "#traiteur" },
        { label: "Avis", href: "#reviews" },
        { label: "Contact", href: "#contact" }
      ],
      cartAria: "Ouvrir le panier, articles :",
      languageLabel: "Choisir la langue"
    },
    hero: {
      eyebrow: "Spécialités maison sucrées & salées",
      title: "Spécialités artisanales du Caucase",
      subtitle:
        "Pâtisseries, desserts et plats salés faits maison, préparés à la main en petites séries selon des recettes familiales.",
      trustLine: "Fait maison • Recettes familiales • Précommande recommandée",
      order: "Commander",
      discover: "Découvrir les univers",
      imageAlt: "Oreshki faits maison au caramel sur une assiette en céramique beige",
      logistics: [
        "Préparation sous 24–48h",
        "Retrait ou livraison locale",
        "Paiement à la commande ou à la réception",
        "Précommande conseillée pour les grandes quantités"
      ]
    },
    products: {
      eyebrow: "Deux univers",
      title: "Pâtisserie artisanale et traiteur maison",
      description:
        "Deux univers complémentaires : des douceurs signature pour le thé, et des plats salés généreux pour la table.",
      artisanDisclaimer:
        "Chaque produit étant préparé artisanalement, l’apparence finale peut légèrement varier.",
      customQuantityNote:
        "Besoin d’une quantité personnalisée, d’une commande familiale ou d’une spécialité pour un événement ? Contactez-nous via Instagram, Telegram ou WhatsApp.",
      order: "Ajouter au panier",
      added: "Produit ajouté au panier",
      itemsEyebrow: "Univers sucré",
      itemsTitle: "La Pâtisserie",
      itemsIntro: "Desserts et pâtisseries faits maison pour le thé ou le partage, avec les oreshki au caramel comme signature iconique.",
      itemsBadge: "Sucré",
      items: [
        {
          id: "pieces12",
          title: "12 pièces",
          fullName: productById.get("pieces12")!.orderName.fr,
          quantity: "12 pièces",
          positioning: "Format découverte",
          description:
            "Oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur. Format découverte — 2 boîtes de 6 pièces.",
          price: formatPrice(productBasePrices.pieces12),
          basePrice: productBasePrices.pieces12,
          image: productImages.pieces12,
          imageAlt: "Deux boîtes d’oreshki faits maison de 6 pièces chacune"
        },
        {
          id: "pieces24",
          title: "24 pièces",
          fullName: productById.get("pieces24")!.orderName.fr,
          quantity: "24 pièces",
          positioning: "Format classique",
          description:
            "Oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur. Format classique — idéal à partager.",
          price: formatPrice(productBasePrices.pieces24),
          basePrice: productBasePrices.pieces24,
          image: productImages.pieces24,
          imageAlt: "Format 24 pièces d’oreshki faits maison au caramel"
        },
        {
          id: "pieces48",
          title: "48 pièces",
          fullName: productById.get("pieces48")!.orderName.fr,
          quantity: "48 pièces",
          positioning: "Grand format généreux",
          description:
            "Oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur. Grand format généreux — livré en deux emballages séparés.",
          price: formatPrice(productBasePrices.pieces48),
          basePrice: productBasePrices.pieces48,
          image: productImages.pieces48,
          imageAlt: "Grand format 48 pièces d’oreshki faits maison au caramel"
        },
        {
          id: "sigaretki",
          title: "Sigaretki",
          fullName: productById.get("sigaretki")!.orderName.fr,
          quantity: "boîte",
          positioning: "Pâtisseries roulées artisanales",
          description:
            "Petites pâtisseries roulées maison, légèrement croustillantes et délicatement sucrées. Parfaites avec un thé ou un café.",
          price: formatPrice(productBasePrices.sigaretki),
          basePrice: productBasePrices.sigaretki,
          image: productImages.sigaretki,
          imageAlt: "Sigaretki maison, pâtisseries roulées artisanales"
        },
        {
          id: "napoleon-blanc",
          title: "Gâteaux",
          fullName: productById.get("napoleon-blanc")!.orderName.fr,
          quantity: "5 variantes",
          positioning: "Gâteaux traditionnels",
          description:
            "Petits gâteaux maison fondants, disponibles selon les parfums : chocolat, café, pistache, velvet rouge et Napoleon.",
          price: formatPrice(productBasePrices["napoleon-blanc"]),
          basePrice: productBasePrices["napoleon-blanc"],
          image: productImages["napoleon-blanc"],
          imageAlt: "Gâteaux maison Napoleon, velvet rouge, pistache, café et chocolat",
          variants: [
            {
              id: "napoleon-blanc",
              label: "Napoleon",
              fullName: productById.get("napoleon-blanc")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-blanc"]),
              basePrice: productBasePrices["napoleon-blanc"]
            },
            {
              id: "napoleon-velvet-rouge",
              label: "Velvet rouge",
              fullName: productById.get("napoleon-velvet-rouge")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-velvet-rouge"]),
              basePrice: productBasePrices["napoleon-velvet-rouge"]
            },
            {
              id: "napoleon-pistache",
              label: "Gâteau à la pistache",
              fullName: productById.get("napoleon-pistache")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-pistache"]),
              basePrice: productBasePrices["napoleon-pistache"]
            },
            {
              id: "napoleon-chocolat",
              label: "Gâteau au chocolat",
              fullName: productById.get("napoleon-chocolat")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-chocolat"]),
              basePrice: productBasePrices["napoleon-chocolat"]
            },
            {
              id: "napoleon-cafe",
              label: "Gâteau au café",
              fullName: productById.get("napoleon-cafe")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-cafe"]),
              basePrice: productBasePrices["napoleon-cafe"]
            }
          ]
        }
      ],
      specialties: {
        eyebrow: "Univers salé",
        title: "Le Traiteur",
        intro:
          "Spécialités salées d’Europe de l’Est et du Caucase, façonnées à la main dans un esprit généreux et familial.",
        badge: "Salé",
        items: [
          {
            id: "pelmeni",
            title: "Pelmeni",
            fullName: productById.get("pelmeni")!.orderName.fr,
            quantity: "1 kg",
            positioning: "Raviolis traditionnels faits maison",
            description:
              "Raviolis traditionnels préparés à la main avec une pâte fine et une farce de viande, oignons et épices. À cuire dans l’eau ou dans un bouillon.",
            price: formatPrice(productBasePrices.pelmeni),
            basePrice: productBasePrices.pelmeni,
            image: productImages.pelmeni,
            imageAlt: "Pelmeni maison préparés à la main",
            variants: [
              {
                id: "pelmeni-poulet",
                label: "Poulet",
                fullName: productById.get("pelmeni-poulet")!.orderName.fr,
                price: formatPrice(productBasePrices["pelmeni-poulet"]),
                basePrice: productBasePrices["pelmeni-poulet"]
              },
              {
                id: "pelmeni-mix-porc-boeuf",
                label: "Mix porc / bœuf",
                fullName: productById.get("pelmeni-mix-porc-boeuf")!.orderName.fr,
                price: formatPrice(productBasePrices["pelmeni-mix-porc-boeuf"]),
                basePrice: productBasePrices["pelmeni-mix-porc-boeuf"]
              },
              {
                id: "pelmeni-boeuf",
                label: "Bœuf",
                fullName: productById.get("pelmeni-boeuf")!.orderName.fr,
                price: formatPrice(productBasePrices["pelmeni-boeuf"]),
                basePrice: productBasePrices["pelmeni-boeuf"]
              }
            ]
          },
          {
            id: "kotleti-kievski",
            title: "Kotleti po-kievski",
            fullName: productById.get("kotleti-kievski")!.orderName.fr,
            quantity: "par pièce",
            positioning: "Escalopes roulées au beurre parfumé",
            description:
              "Escalopes de poulet roulées avec du beurre parfumé, des herbes et une chapelure croustillante. Dorées à l’extérieur et fondantes à l’intérieur.",
            price: formatPrice(productBasePrices["kotleti-kievski"]),
            basePrice: productBasePrices["kotleti-kievski"],
            image: productImages["kotleti-kievski"],
            imageAlt: "Kotleti po-kievski maison au beurre parfumé"
          },
          {
            id: "vareniki-fromage",
            title: "Vareniki",
            fullName: productById.get("vareniki-fromage")!.orderName.fr,
            quantity: "1 kg",
            positioning: "Raviolis traditionnels garnis",
            description:
              "Vareniki maison préparés avec une pâte souple et une garniture généreuse selon les recettes traditionnelles : pommes de terre ou fromage.",
            price: formatPrice(productBasePrices["vareniki-fromage"]),
            basePrice: productBasePrices["vareniki-fromage"],
            image: productImages["vareniki-fromage"],
            imageAlt: "Vareniki maison avec garniture traditionnelle",
            variants: [
              {
                id: "vareniki-fromage",
                label: "Fromage blanc",
                fullName: productById.get("vareniki-fromage")!.orderName.fr,
                price: formatPrice(productBasePrices["vareniki-fromage"]),
                basePrice: productBasePrices["vareniki-fromage"]
              },
              {
                id: "vareniki-pommes-terre",
                label: "Pommes de terre",
                fullName: productById.get("vareniki-pommes-terre")!.orderName.fr,
                price: formatPrice(productBasePrices["vareniki-pommes-terre"]),
                basePrice: productBasePrices["vareniki-pommes-terre"]
              }
            ]
          },
          {
            id: "blinchiki",
            title: "Blinchiki",
            fullName: productById.get("blinchiki")!.orderName.fr,
            quantity: "par pièce",
            positioning: "Crêpes russes traditionnelles",
            description:
              "Fines crêpes maison garnies selon les recettes familiales : viande, fromage ou champignons. Moelleuses, délicates et faciles à partager.",
            price: formatPrice(productBasePrices.blinchiki),
            basePrice: productBasePrices.blinchiki,
            image: productImages.blinchiki,
            imageAlt: "Blinchiki maison, crêpes russes traditionnelles"
          },
          {
            id: "golubci",
            title: "Golubci",
            fullName: productById.get("golubci")!.orderName.fr,
            quantity: "1 kg",
            positioning: "Choux farcis traditionnels",
            description:
              "Feuilles de chou farcies avec du riz, de la viande assaisonnée, des légumes et des épices. Mijotées maison dans une sauce douce et réconfortante.",
            price: formatPrice(productBasePrices.golubci),
            basePrice: productBasePrices.golubci,
            image: productImages.golubci,
            imageAlt: "Golubci maison, choux farcis traditionnels"
          },
          {
            id: "pirojki",
            title: "Pirojki",
            fullName: productById.get("pirojki")!.orderName.fr,
            quantity: "par pièce",
            positioning: "Petits chaussons frits traditionnels",
            description:
              "Pirojki frits maison à la pâte moelleuse et à la croûte dorée. Garnitures traditionnelles : pommes de terre, chou, viande, foie ou œuf avec oignons.",
            price: formatPrice(productBasePrices.pirojki),
            basePrice: productBasePrices.pirojki,
            image: productImages.pirojki,
            imageAlt: "Pirojki maison frits avec garnitures traditionnelles"
          }
        ]
      }
    },
    about: {
      eyebrow: "Histoire",
      title: "Des recettes familiales préparées à la main",
      description:
        "Notre table réunit des douceurs, des desserts et des plats salés inspirés des traditions d’Europe de l’Est et du Caucase, préparés maison en petites séries.",
      note:
        "Les oreshki restent notre signature, mais chaque spécialité suit la même exigence : une préparation artisanale, des quantités généreuses et le goût chaleureux des recettes de famille.",
      imageAlt: "Préparation artisanale d’oreshki au caramel"
    },
    reviews: {
      eyebrow: "Avis",
      title: "Des mots doux autour de la table",
      ratingLabel: "5 étoiles sur 5",
      previousLabel: "Avis précédent",
      nextLabel: "Avis suivant",
      items: [
        {
          name: "Serguei",
          text: "Les quantités sont vraiment généreuses, on sent que c’est fait maison. Les pelmeni avaient le goût des repas de famille."
        },
        {
          name: "Milena",
          text: "Les oreshki étaient frais, bien garnis et très beaux. On les a servis avec le thé, tout le monde a adoré."
        },
        {
          name: "Ilona",
          text: "Cuisine généreuse, simple et pleine de goût. Les plats donnent vraiment l’impression d’avoir été préparés avec soin."
        },
        {
          name: "Svetlana",
          text: "Les kotleti étaient croustillantes à l’extérieur et fondantes à l’intérieur. Très bon équilibre, très réconfortant."
        },
        {
          name: "Arthur",
          text: "On a commandé plusieurs spécialités pour une soirée, les quantités étaient parfaites et tout est parti très vite."
        },
        {
          name: "Ruslan",
          text: "Exactement le goût de mon enfance. Les coques sont croustillantes, la garniture est généreuse… impossible de s’arrêter."
        },
        {
          name: "Charlotte",
          text: "Très frais et vraiment fait avec soin. On sent la différence d’une cuisine maison préparée à la main."
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
        "Ajoutez des pâtisseries ou des plats depuis l’assortiment, puis finalisez votre commande ici.",
      total: "Total",
      subtotal: "Sous-total",
      deliveryFee: "Frais de livraison",
      pickupFeeLabel: "Retrait gratuit",
      deliveryFeeLabel: "Livraison: 7 €",
      freeDeliveryLabel: "Livraison offerte dès 35 €",
      freeDeliveryRemaining: "Plus que {amount} pour la livraison offerte",
      freeDeliveryUnlocked: "Livraison offerte",
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
      notesPlaceholder: "Horaire, préférences",
      submit: "Envoyer la commande",
      submitting: "Envoi...",
      errors: {
        items: "Votre panier est vide",
        customerName: "Indiquez votre nom",
        phone: "Veuillez entrer un numéro de téléphone valide.",
        address: "Indiquez l'adresse de livraison",
        preferredDate: "Choisissez une date au plus tôt dans 3 jours.",
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
      title: "Une table familiale ou un événement à préparer ?",
      description:
        "Commandez directement sur le site ou écrivez-nous dans le messager qui vous convient. Nous confirmons l’assortiment, la date de préparation et les options de retrait ou livraison.",
      note:
        "Pour les grandes quantités, les repas de famille, les événements ou les spécialités sur demande, la précommande nous aide à tout préparer frais.",
      instagramAria: "Ouvrir Instagram",
      telegramAria: "Ouvrir Telegram",
      whatsappAria: "Ouvrir WhatsApp"
    }
  }
} as const;

export type SiteContent = (typeof siteContent)[Language];
export type ProductItem =
  | SiteContent["products"]["items"][number]
  | SiteContent["products"]["specialties"]["items"][number];
