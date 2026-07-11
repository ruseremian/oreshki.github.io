import { formatPrice, productById, type ProductId } from "@/lib/products";
import { BRAND_NAME } from "@/lib/brand";
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
  "oreshki-framboise": "/images/oreshki_framboises.png",
  "oreshki-pistache": "/images/oreshki_pistache.png",
  "oreshki-kadaifi": "/images/oreshki_kadaifi.png",
  pelmeni: "/images/pelmeni.jpg",
  "pelmeni-poulet": "/images/pelmeni.jpg",
  "pelmeni-mix-porc-boeuf": "/images/pelmeni.jpg",
  "pelmeni-boeuf": "/images/pelmeni.jpg",
  "kotleti-kievski": "/images/kotleti-kievski.jpg",
  vareniki: "/images/vareniki.jpg",
  "vareniki-fromage": "/images/vareniki.jpg",
  "vareniki-pommes-terre": "/images/vareniki.jpg",
  blinchiki: "/images/blinchiki.jpg",
  "blinchiki-viande": "/images/blinchiki.jpg",
  "blinchiki-fromage": "/images/blinchiki.jpg",
  "blinchiki-champignons": "/images/blinchiki.jpg",
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
  "oreshki-framboise": productById.get("oreshki-framboise")!.price,
  "oreshki-pistache": productById.get("oreshki-pistache")!.price,
  "oreshki-kadaifi": productById.get("oreshki-kadaifi")!.price,
  pelmeni: productById.get("pelmeni")!.price,
  "pelmeni-poulet": productById.get("pelmeni-poulet")!.price,
  "pelmeni-mix-porc-boeuf": productById.get("pelmeni-mix-porc-boeuf")!.price,
  "pelmeni-boeuf": productById.get("pelmeni-boeuf")!.price,
  "kotleti-kievski": productById.get("kotleti-kievski")!.price,
  vareniki: productById.get("vareniki")!.price,
  "vareniki-fromage": productById.get("vareniki-fromage")!.price,
  "vareniki-pommes-terre": productById.get("vareniki-pommes-terre")!.price,
  blinchiki: productById.get("blinchiki")!.price,
  "blinchiki-viande": productById.get("blinchiki-viande")!.price,
  "blinchiki-fromage": productById.get("blinchiki-fromage")!.price,
  "blinchiki-champignons": productById.get("blinchiki-champignons")!.price,
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
      brand: BRAND_NAME,
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
      eyebrow: "Сладкие и солёные традиционные блюда",
      title: "Домашняя Русская кухня",
      subtitle:
        "Выпечка, десерты и солёные блюда домашнего приготовления, сделанные вручную небольшими партиями по семейным рецептам.",
      trustLine: "Домашнее приготовление • Семейные рецепты • Предзаказ рекомендуется",
      order: "Заказать",
      discover: "Смотреть ассортимент",
      imageAlt: "Домашние орешки со сгущёнкой на бежевой керамической тарелке",
      logistics: [
        "Минимум 3 дня на подготовку",
        "Самовывоз только по договорённости",
        "Доставка: 7 € или бесплатно от 35 €",
        "Оплата не онлайн: инструкции после подтверждения"
      ]
    },
    products: {
      eyebrow: "Два направления",
      title: "Домашняя выпечка и блюда на заказ",
      description:
        "Два взаимодополняющих направления: фирменные сладости к чаю и щедрые солёные блюда к столу.",
      freeDeliveryBadge: "🚚 Бесплатная доставка от 35 €",
      fulfillmentNote:
        "Доставка возможна в Страсбурге и ближайших коммунах после подтверждения. Самовывоз — в Иттенхайме, только по договорённости; точные детали сообщаются после заявки.",
      artisanDisclaimer:
        "Продукция домашнего приготовления. Изделия могут содержать глютен, яйца, молоко, орехи и другие аллергены.",
      allergenDisclaimer:
        "Если у вас есть вопросы по составу, напишите нам перед заказом. Внешний вид изделий может немного отличаться, так как всё готовится вручную.",
      customQuantityNote:
        "Нужен индивидуальный формат, семейный заказ или блюдо к празднику? Напишите нам в Instagram, Telegram или WhatsApp.",
      order: "Добавить в корзину",
      added: "Товар добавлен в корзину",
      itemsEyebrow: "Сладкое направление",
      itemsTitle: "Домашняя выпечка",
      itemsIntro: "Домашние десерты и выпечка к чаю или для общего стола, с карамельными орешками как фирменной сладостью.",
      itemsBadge: "Сладкое",
      items: [
        {
          id: "pieces12",
          title: "Oreshki",
          fullName: productById.get("pieces12")!.orderName.ru,
          quantity: "3 формата и 3 вкуса",
          positioning: "Фирменные орешки",
          description:
            "Домашние орешки Maison Zhanna: классические форматы и новые вкусы с малиной, фисташкой или кадаифом.",
          price: formatPrice(productBasePrices.pieces12),
          basePrice: productBasePrices.pieces12,
          image: productImages.pieces24,
          imageAlt: "Домашние орешки со сгущёнкой в формате 24 штуки",
          variants: [
            {
              id: "pieces12",
              label: productById.get("pieces12")!.orderName.ru,
              fullName: productById.get("pieces12")!.orderName.ru,
              price: formatPrice(productBasePrices.pieces12),
              basePrice: productBasePrices.pieces12
            },
            {
              id: "pieces24",
              label: productById.get("pieces24")!.orderName.ru,
              fullName: productById.get("pieces24")!.orderName.ru,
              price: formatPrice(productBasePrices.pieces24),
              basePrice: productBasePrices.pieces24
            },
            {
              id: "pieces48",
              label: productById.get("pieces48")!.orderName.ru,
              fullName: productById.get("pieces48")!.orderName.ru,
              price: formatPrice(productBasePrices.pieces48),
              basePrice: productBasePrices.pieces48
            },
            {
              id: "oreshki-framboise",
              label: productById.get("oreshki-framboise")!.orderName.ru,
              fullName: productById.get("oreshki-framboise")!.orderName.ru,
              price: formatPrice(productBasePrices["oreshki-framboise"]),
              basePrice: productBasePrices["oreshki-framboise"],
              image: productImages["oreshki-framboise"],
              imageAlt: "Орешки Maison Zhanna с малиной"
            },
            {
              id: "oreshki-pistache",
              label: productById.get("oreshki-pistache")!.orderName.ru,
              fullName: productById.get("oreshki-pistache")!.orderName.ru,
              price: formatPrice(productBasePrices["oreshki-pistache"]),
              basePrice: productBasePrices["oreshki-pistache"],
              image: productImages["oreshki-pistache"],
              imageAlt: "Орешки Maison Zhanna с фисташкой"
            },
            {
              id: "oreshki-kadaifi",
              label: productById.get("oreshki-kadaifi")!.orderName.ru,
              fullName: productById.get("oreshki-kadaifi")!.orderName.ru,
              price: formatPrice(productBasePrices["oreshki-kadaifi"]),
              basePrice: productBasePrices["oreshki-kadaifi"],
              image: productImages["oreshki-kadaifi"],
              imageAlt: "Орешки Maison Zhanna с кадаифом"
            }
          ]
        },
        {
          id: "sigaretki",
          title: "Sigaretki",
          fullName: productById.get("sigaretki")!.orderName.ru,
          quantity: "12 штук",
          positioning: "Рулетная выпечка ручной работы",
          description:
            "Домашние сигаретки с яблоком — нежная выпечка из слоёного теста с ароматной яблочной начинкой. Снаружи они получаются лёгкими и хрустящими, а внутри — мягкими, фруктовыми и в меру сладкими. Отлично подходят к чаю, кофе или как домашний десерт к столу.",
          price: formatPrice(productBasePrices.sigaretki),
          basePrice: productBasePrices.sigaretki,
          image: productImages.sigaretki,
          imageAlt: "Домашние сигаретки, традиционная рулетная выпечка"
        },
        {
          id: "napoleon-blanc",
          title: "Пирожные",
          fullName: productById.get("napoleon-blanc")!.orderName.ru,
          quantity: "4 варианта",
          positioning: "Традиционные пирожные",
          description:
            "Домашние пирожные с нежным кремом, доступны во вкусах: шоколад-кофе, фисташка, красный вельвет и Наполеон.",
          price: formatPrice(productBasePrices["napoleon-blanc"]),
          basePrice: productBasePrices["napoleon-blanc"],
          image: productImages["napoleon-blanc"],
          imageAlt: "Домашние пирожные Наполеон, красный вельвет, фисташка и шоколад-кофе",
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
              label: "Пирожное шоколад-кофе",
              fullName: productById.get("napoleon-chocolat")!.orderName.ru,
              price: formatPrice(productBasePrices["napoleon-chocolat"]),
              basePrice: productBasePrices["napoleon-chocolat"]
            }
          ]
        }
      ],
      specialties: {
        eyebrow: "Солёное направление",
        title: "Блюда к столу",
        intro:
          "Солёные блюда Восточной Европы и русской кухни, сделанные вручную в щедром семейном духе.",
        badge: "Солёное",
        items: [
          {
            id: "pelmeni",
            title: "Pelmeni",
            fullName: productById.get("pelmeni")!.orderName.ru,
            quantity: "1 кг",
            tags: ["1 кг", "Замороженные"],
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
            title: "Kotleti po-kievski",
            fullName: productById.get("kotleti-kievski")!.orderName.ru,
            quantity: "за штуку",
            tags: ["за штуку", "Замороженные"],
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
            title: "Vareniki",
            fullName: productById.get("vareniki-fromage")!.orderName.ru,
            quantity: "1 кг",
            tags: ["1 кг", "Замороженные"],
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
            title: "Blinchiki",
            fullName: productById.get("blinchiki")!.orderName.ru,
            quantity: "за штуку",
            tags: ["за штуку", "Замороженные"],
            positioning: "Традиционные русские блинчики",
            description:
              "Тонкие домашние блинчики с начинками по семейным рецептам: мясо, сыр или грибы с картошкой. Мягкие, нежные и удобные для семейного стола.",
            price: formatPrice(productBasePrices.blinchiki),
            basePrice: productBasePrices.blinchiki,
            image: productImages.blinchiki,
            imageAlt: "Домашние тонкие русские блинчики",
            variants: [
              {
                id: "blinchiki-viande",
                label: "Мясо",
                fullName: productById.get("blinchiki-viande")!.orderName.ru,
                price: formatPrice(productBasePrices["blinchiki-viande"]),
                basePrice: productBasePrices["blinchiki-viande"]
              },
              {
                id: "blinchiki-fromage",
                label: "Сыр",
                fullName: productById.get("blinchiki-fromage")!.orderName.ru,
                price: formatPrice(productBasePrices["blinchiki-fromage"]),
                basePrice: productBasePrices["blinchiki-fromage"]
              },
              {
                id: "blinchiki-champignons",
                label: "Грибы и картошка",
                fullName: productById.get("blinchiki-champignons")!.orderName.ru,
                price: formatPrice(productBasePrices["blinchiki-champignons"]),
                basePrice: productBasePrices["blinchiki-champignons"]
              }
            ]
          },
          {
            id: "golubci",
            title: "Golubci",
            fullName: productById.get("golubci")!.orderName.ru,
            quantity: "1 кг",
            tags: ["1 кг", "Замороженные"],
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
            title: "Pirojki",
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
        "Наш стол объединяет сладости, десерты и солёные блюда, вдохновлённые традициями Восточной Европы и русской кухни, приготовленные дома небольшими партиями.",
      note:
        "Орешки остаются нашей фирменной сладостью, но у каждой позиции тот же подход: ручное приготовление, щедрые порции и тёплый вкус семейных рецептов.",
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
      freeDeliveryLabel: "🚚 Бесплатная доставка от 35 €",
      freeDeliveryRemaining: "Ещё {amount} до бесплатной доставки",
      freeDeliveryUnlocked: "Бесплатная доставка ✓",
      noPayment:
        "Оплата онлайн не подключена. Вы отправляете заявку на заказ; финальное подтверждение и инструкции по оплате приходят вручную в WhatsApp, Telegram или SMS.",
      fulfillmentGuidance:
        "Самовывоз возможен в Иттенхайме только по договорённости. Доставка по Страсбургу и ближайшим коммунам стоит 7 € и становится бесплатной от 35 €; детали подтверждаются вручную.",
      checkout: "Заявка на заказ",
      name: "Имя",
      namePlaceholder: "Как к вам обращаться",
      phone: "Телефон",
      phonePlaceholder: "+33 ...",
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
      preferredDateGuidance:
        "Если заказ нужен раньше, напишите напрямую в WhatsApp, Telegram или Instagram.",
      notes: "Комментарий",
      notesPlaceholder: "Время, пожелания",
      privacyConsent:
        `Я согласен(на), что ${BRAND_NAME} использует мои данные (имя, телефон, детали заказа и самовывоза/доставки) только для обработки этой заявки.`,
      submit: "Отправить заявку",
      submitting: "Отправляем...",
      errors: {
        items: "Корзина пуста",
        customerName: "Укажите имя",
        phone: "Введите корректный номер телефона.",
        address: "Укажите адрес доставки",
        preferredDate: "Выберите дату не раньше чем через 3 дня.",
        privacyConsent: "Подтвердите согласие на обработку данных заказа.",
        submit: "Не удалось отправить заказ. Проверьте соединение.",
        server: "Не удалось отправить заказ. Попробуйте ещё раз."
      },
      confirmationTitle: "Заявка получена",
      confirmationText:
        "Ваша заявка на заказ получена. Мы скоро свяжемся с вами, чтобы подтвердить детали и оплату.",
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
        "Оформите заказ на сайте или напишите нам в удобный мессенджер. Мы подтвердим ассортимент, дату приготовления, самовывоз по договорённости или доставку.",
      note:
        "Для индивидуальных количеств, семейных заказов, событий и блюд по запросу напишите напрямую в WhatsApp, Telegram или Instagram. Маркетинговые сообщения не отправляются без явного согласия.",
      instagramAria: "Открыть Instagram",
      telegramAria: "Открыть Telegram",
      whatsappAria: "Открыть WhatsApp"
    },
    footer: {
      tagline: "Домашние сладкие и солёные блюда ручной работы.",
      legalAria: "Юридические ссылки",
      privacyHref: "/privacy?lang=ru",
      privacy: "Политика конфиденциальности",
      termsHref: "/terms?lang=ru",
      terms: "Условия использования"
    }
  },
  fr: {
    nav: {
      aria: "Navigation principale",
      brand: BRAND_NAME,
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
      title: "Spécialités artisanales Russes",
      subtitle:
        "Pâtisseries, desserts et plats salés faits maison, préparés à la main en petites séries selon des recettes familiales.",
      trustLine: "Fait maison • Recettes familiales • Précommande recommandée",
      order: "Commander",
      discover: "Découvrir les univers",
      imageAlt: "Biscuits oreshki faits maison au caramel sur une assiette en céramique beige",
      logistics: [
        "Préparation minimum de 3 jours",
        "Retrait uniquement sur rendez-vous",
        "Livraison: 7 € ou offerte dès 35 €",
        "Paiement non en ligne: instructions après confirmation"
      ]
    },
    products: {
      eyebrow: "Deux univers",
      title: "Pâtisserie artisanale et traiteur maison",
      description:
        "Deux univers complémentaires : des douceurs signature pour le thé, et des plats salés généreux pour la table.",
      freeDeliveryBadge: "🚚 Livraison offerte dès 35 €",
      fulfillmentNote:
        "Livraison possible à Strasbourg et dans les communes voisines après confirmation. Retrait à Ittenheim uniquement sur rendez-vous; les détails exacts sont envoyés après la demande.",
      artisanDisclaimer:
        "Produits faits maison. Ils peuvent contenir du gluten, des oeufs, du lait, des fruits à coque et d'autres allergènes.",
      allergenDisclaimer:
        "Pour toute question sur la composition, contactez-nous avant de commander. Chaque produit étant préparé artisanalement, l'apparence finale peut légèrement varier.",
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
          title: "Oreshki",
          fullName: productById.get("pieces12")!.orderName.fr,
          quantity: "3 formats et 3 saveurs",
          positioning: "Oreshki signature",
          description:
            "Oreshki Maison Zhanna faits maison, proposés en formats classiques et en nouvelles saveurs framboise, pistache ou kadaïf.",
          price: formatPrice(productBasePrices.pieces12),
          basePrice: productBasePrices.pieces12,
          image: productImages.pieces24,
          imageAlt: "Format 24 pièces d’oreshki faits maison au caramel",
          variants: [
            {
              id: "pieces12",
              label: productById.get("pieces12")!.orderName.fr,
              fullName: productById.get("pieces12")!.orderName.fr,
              price: formatPrice(productBasePrices.pieces12),
              basePrice: productBasePrices.pieces12
            },
            {
              id: "pieces24",
              label: productById.get("pieces24")!.orderName.fr,
              fullName: productById.get("pieces24")!.orderName.fr,
              price: formatPrice(productBasePrices.pieces24),
              basePrice: productBasePrices.pieces24
            },
            {
              id: "pieces48",
              label: productById.get("pieces48")!.orderName.fr,
              fullName: productById.get("pieces48")!.orderName.fr,
              price: formatPrice(productBasePrices.pieces48),
              basePrice: productBasePrices.pieces48
            },
            {
              id: "oreshki-framboise",
              label: productById.get("oreshki-framboise")!.orderName.fr,
              fullName: productById.get("oreshki-framboise")!.orderName.fr,
              price: formatPrice(productBasePrices["oreshki-framboise"]),
              basePrice: productBasePrices["oreshki-framboise"],
              image: productImages["oreshki-framboise"],
              imageAlt: "Oreshki Maison Zhanna à la framboise"
            },
            {
              id: "oreshki-pistache",
              label: productById.get("oreshki-pistache")!.orderName.fr,
              fullName: productById.get("oreshki-pistache")!.orderName.fr,
              price: formatPrice(productBasePrices["oreshki-pistache"]),
              basePrice: productBasePrices["oreshki-pistache"],
              image: productImages["oreshki-pistache"],
              imageAlt: "Oreshki Maison Zhanna à la pistache"
            },
            {
              id: "oreshki-kadaifi",
              label: productById.get("oreshki-kadaifi")!.orderName.fr,
              fullName: productById.get("oreshki-kadaifi")!.orderName.fr,
              price: formatPrice(productBasePrices["oreshki-kadaifi"]),
              basePrice: productBasePrices["oreshki-kadaifi"],
              image: productImages["oreshki-kadaifi"],
              imageAlt: "Oreshki Maison Zhanna au kadaïf"
            }
          ]
        },
        {
          id: "sigaretki",
          title: "Sigaretki",
          fullName: productById.get("sigaretki")!.orderName.fr,
          quantity: "12 pièces",
          positioning: "Pâtisseries roulées artisanales",
          description:
            "Les sigaretkis maison à la pomme sont de délicates pâtisseries en pâte feuilletée, garnies d’une préparation parfumée à la pomme. Légères et croustillantes à l’extérieur, elles restent moelleuses, fruitées et légèrement sucrées à l’intérieur. Elles accompagnent parfaitement un thé, un café ou un dessert maison à partager.",
          price: formatPrice(productBasePrices.sigaretki),
          basePrice: productBasePrices.sigaretki,
          image: productImages.sigaretki,
          imageAlt: "Sigaretki maison, pâtisseries roulées artisanales"
        },
        {
          id: "napoleon-blanc",
          title: "Gâteaux",
          fullName: productById.get("napoleon-blanc")!.orderName.fr,
          quantity: "4 variantes",
          positioning: "Gâteaux traditionnels",
          description:
            "Petits gâteaux maison fondants, disponibles selon les parfums : chocolat-café, pistache, velvet rouge et Napoleon.",
          price: formatPrice(productBasePrices["napoleon-blanc"]),
          basePrice: productBasePrices["napoleon-blanc"],
          image: productImages["napoleon-blanc"],
          imageAlt: "Gâteaux maison Napoleon, velvet rouge, pistache et chocolat-café",
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
              label: "Gâteau chocolat-café",
              fullName: productById.get("napoleon-chocolat")!.orderName.fr,
              price: formatPrice(productBasePrices["napoleon-chocolat"]),
              basePrice: productBasePrices["napoleon-chocolat"]
            }
          ]
        }
      ],
      specialties: {
        eyebrow: "Univers salé",
        title: "Le Traiteur",
        intro:
          "Spécialités salées d’Europe de l’Est et russes, façonnées à la main dans un esprit généreux et familial.",
        badge: "Salé",
        items: [
          {
            id: "pelmeni",
            title: "Pelmeni",
            fullName: productById.get("pelmeni")!.orderName.fr,
            quantity: "1 kg",
            tags: ["1 kg", "Surgelé"],
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
            tags: ["par pièce", "Surgelé"],
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
            tags: ["1 kg", "Surgelé"],
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
            tags: ["par pièce", "Surgelé"],
            positioning: "Crêpes russes traditionnelles",
            description:
              "Fines crêpes maison garnies selon les recettes familiales : viande, fromage ou champignons et pommes de terre. Moelleuses, délicates et faciles à partager.",
            price: formatPrice(productBasePrices.blinchiki),
            basePrice: productBasePrices.blinchiki,
            image: productImages.blinchiki,
            imageAlt: "Blinchiki maison, crêpes russes traditionnelles",
            variants: [
              {
                id: "blinchiki-viande",
                label: "Viande",
                fullName: productById.get("blinchiki-viande")!.orderName.fr,
                price: formatPrice(productBasePrices["blinchiki-viande"]),
                basePrice: productBasePrices["blinchiki-viande"]
              },
              {
                id: "blinchiki-fromage",
                label: "Fromage",
                fullName: productById.get("blinchiki-fromage")!.orderName.fr,
                price: formatPrice(productBasePrices["blinchiki-fromage"]),
                basePrice: productBasePrices["blinchiki-fromage"]
              },
              {
                id: "blinchiki-champignons",
                label: "Champignons et pommes de terre",
                fullName: productById.get("blinchiki-champignons")!.orderName.fr,
                price: formatPrice(productBasePrices["blinchiki-champignons"]),
                basePrice: productBasePrices["blinchiki-champignons"]
              }
            ]
          },
          {
            id: "golubci",
            title: "Golubci",
            fullName: productById.get("golubci")!.orderName.fr,
            quantity: "1 kg",
            tags: ["1 kg", "Surgelé"],
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
        "Notre table réunit des douceurs, des desserts et des plats salés inspirés des traditions d’Europe de l’Est et russes, préparés maison en petites séries.",
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
      freeDeliveryLabel: "🚚 Livraison offerte dès 35 €",
      freeDeliveryRemaining: "Plus que {amount} pour la livraison offerte",
      freeDeliveryUnlocked: "Livraison offerte ✓",
      noPayment:
        "Le paiement en ligne n'est pas activé. Vous envoyez une demande de commande; la confirmation finale et les instructions de paiement sont envoyées manuellement par WhatsApp, Telegram ou SMS.",
      fulfillmentGuidance:
        "Retrait à Ittenheim uniquement sur rendez-vous. Livraison à Strasbourg et dans les communes voisines : 7 €, offerte dès 35 € ; les détails sont confirmés manuellement.",
      checkout: "Demande de commande",
      name: "Nom",
      namePlaceholder: "Votre nom",
      phone: "Téléphone",
      phonePlaceholder: "+33 ...",
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
      preferredDateGuidance:
        "Pour une demande plus urgente, contactez-nous directement via WhatsApp, Telegram ou Instagram.",
      notes: "Notes",
      notesPlaceholder: "Horaire, préférences",
      privacyConsent:
        `J'accepte que ${BRAND_NAME} utilise mes données (nom, téléphone, détails de commande et de retrait/livraison) uniquement pour traiter cette demande.`,
      submit: "Envoyer la demande",
      submitting: "Envoi...",
      errors: {
        items: "Votre panier est vide",
        customerName: "Indiquez votre nom",
        phone: "Veuillez entrer un numéro de téléphone valide.",
        address: "Indiquez l'adresse de livraison",
        preferredDate: "Choisissez une date au plus tôt dans 3 jours.",
        privacyConsent: "Cochez le consentement à l'utilisation des données de commande.",
        submit: "Impossible d'envoyer la commande. Vérifiez votre connexion.",
        server: "Impossible d'envoyer la commande. Réessayez."
      },
      confirmationTitle: "Commande reçue",
      confirmationText:
        "Votre demande de commande a été reçue. Nous vous contacterons rapidement pour confirmer les détails et le paiement.",
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
        "Commandez directement sur le site ou écrivez-nous dans le messager qui vous convient. Nous confirmons l’assortiment, la date de préparation, le retrait sur rendez-vous ou la livraison.",
      note:
        "Pour les quantités personnalisées, les commandes familiales, les événements ou les spécialités sur demande, contactez-nous directement via WhatsApp, Telegram ou Instagram. Aucun message marketing n'est envoyé sans accord explicite.",
      instagramAria: "Ouvrir Instagram",
      telegramAria: "Ouvrir Telegram",
      whatsappAria: "Ouvrir WhatsApp"
    },
    footer: {
      tagline: "Spécialités artisanales sucrées et salées faites maison.",
      legalAria: "Liens légaux",
      privacyHref: "/privacy",
      privacy: "Politique de confidentialité",
      termsHref: "/terms",
      terms: "Conditions d'utilisation"
    }
  }
} as const;

export type SiteContent = (typeof siteContent)[Language];
export type ProductItem =
  | SiteContent["products"]["items"][number]
  | SiteContent["products"]["specialties"]["items"][number];
