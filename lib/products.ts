export type ProductCategory = "cookies" | "specialties";
export type ProductId =
  | "oreshki-classiques-12"
  | "oreshki-classiques-24"
  | "oreshki-classiques-48"
  | "oreshki-pistache-12"
  | "oreshki-pistache-24"
  | "oreshki-pistache-48"
  | "oreshki-kadaifi-12"
  | "oreshki-kadaifi-24"
  | "oreshki-kadaifi-48"
  | "oreshki-framboise-12"
  | "oreshki-framboise-24"
  | "oreshki-framboise-48"
  | "napoleon-blanc"
  | "napoleon-velvet-rouge"
  | "napoleon-chocolat"
  | "napoleon-cafe"
  | "napoleon-pistache"
  | "pelmeni"
  | "pelmeni-poulet"
  | "pelmeni-mix-porc-boeuf"
  | "pelmeni-boeuf"
  | "kotleti-kievski"
  | "vareniki"
  | "vareniki-fromage"
  | "vareniki-pommes-terre"
  | "blinchiki"
  | "blinchiki-viande"
  | "blinchiki-fromage"
  | "blinchiki-champignons"
  | "golubci"
  | "pirojki"
  | "sigaretki";

export type Product = {
  id: ProductId;
  name: string;
  orderName: {
    fr: string;
    ru: string;
  };
  description: string;
  price: number;
  unit?: string;
  image: string;
  category: ProductCategory;
  available: boolean;
};

export const products: Product[] = [
  {
    id: "oreshki-classiques-12",
    name: "Oreshki classiques — 12 pièces",
    orderName: {
      fr: "Oreshki classiques — 12 pièces",
      ru: "Классические орешки — 12 штук"
    },
    description: "Biscuits oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur.",
    price: 8,
    image: "/images/oreshki_café.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-classiques-24",
    name: "Oreshki classiques — 24 pièces",
    orderName: {
      fr: "Oreshki classiques — 24 pièces",
      ru: "Классические орешки — 24 штуки"
    },
    description: "Biscuits oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur.",
    price: 15.5,
    image: "/images/oreshki_café.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-classiques-48",
    name: "Oreshki classiques — 48 pièces",
    orderName: {
      fr: "Oreshki classiques — 48 pièces",
      ru: "Классические орешки — 48 штук"
    },
    description: "Biscuits oreshki faits maison avec une pâte tendre au beurre et aux œufs, garnis de lait concentré caramélisé et de morceaux de noisettes à l’intérieur.",
    price: 30,
    image: "/images/oreshki_café.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-pistache-12",
    name: "Oreshki à la pistache — 12 pièces",
    orderName: {
      fr: "Oreshki à la pistache — 12 pièces",
      ru: "Орешки с фисташкой — 12 штук"
    },
    description:
      "Une version douce et généreuse de nos oreshki maison, avec une touche de pistache qui apporte une saveur ronde, délicate et très réconfortante.",
    price: 12,
    image: "/images/oreshki_pistache.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-pistache-24",
    name: "Oreshki à la pistache — 24 pièces",
    orderName: {
      fr: "Oreshki à la pistache — 24 pièces",
      ru: "Орешки с фисташкой — 24 штуки"
    },
    description:
      "Une version douce et généreuse de nos oreshki maison, avec une touche de pistache qui apporte une saveur ronde, délicate et très réconfortante.",
    price: 23,
    image: "/images/oreshki_pistache.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-pistache-48",
    name: "Oreshki à la pistache — 48 pièces",
    orderName: {
      fr: "Oreshki à la pistache — 48 pièces",
      ru: "Орешки с фисташкой — 48 штук"
    },
    description:
      "Une version douce et généreuse de nos oreshki maison, avec une touche de pistache qui apporte une saveur ronde, délicate et très réconfortante.",
    price: 45,
    image: "/images/oreshki_pistache.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-kadaifi-12",
    name: "Oreshki au kadaïf à la pistache — 12 pièces",
    orderName: {
      fr: "Oreshki au kadaïf à la pistache — 12 pièces",
      ru: "Орешки с кадаифом и фисташкой — 12 штук"
    },
    description:
      "Des oreshki au kadaïf à la pistache, croustillants et fondants à la fois, pensés comme une petite douceur précieuse à partager autour d’un thé.",
    price: 12,
    image: "/images/oreshki_kadaifi.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-kadaifi-24",
    name: "Oreshki au kadaïf à la pistache — 24 pièces",
    orderName: {
      fr: "Oreshki au kadaïf à la pistache — 24 pièces",
      ru: "Орешки с кадаифом и фисташкой — 24 штуки"
    },
    description:
      "Des oreshki au kadaïf à la pistache, croustillants et fondants à la fois, pensés comme une petite douceur précieuse à partager autour d’un thé.",
    price: 23,
    image: "/images/oreshki_kadaifi.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-kadaifi-48",
    name: "Oreshki au kadaïf à la pistache — 48 pièces",
    orderName: {
      fr: "Oreshki au kadaïf à la pistache — 48 pièces",
      ru: "Орешки с кадаифом и фисташкой — 48 штук"
    },
    description:
      "Des oreshki au kadaïf à la pistache, croustillants et fondants à la fois, pensés comme une petite douceur précieuse à partager autour d’un thé.",
    price: 45,
    image: "/images/oreshki_kadaifi.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-framboise-12",
    name: "Oreshki à la framboise — 12 pièces",
    orderName: {
      fr: "Oreshki à la framboise — 12 pièces",
      ru: "Орешки с малиной — 12 штук"
    },
    description:
      "Des oreshki maison délicats, relevés par la framboise pour une note fruitée, tendre et lumineuse qui rappelle les desserts faits avec attention.",
    price: 12,
    image: "/images/oreshki_framboises.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-framboise-24",
    name: "Oreshki à la framboise — 24 pièces",
    orderName: {
      fr: "Oreshki à la framboise — 24 pièces",
      ru: "Орешки с малиной — 24 штуки"
    },
    description:
      "Des oreshki maison délicats, relevés par la framboise pour une note fruitée, tendre et lumineuse qui rappelle les desserts faits avec attention.",
    price: 23,
    image: "/images/oreshki_framboises.png",
    category: "cookies",
    available: true
  },
  {
    id: "oreshki-framboise-48",
    name: "Oreshki à la framboise — 48 pièces",
    orderName: {
      fr: "Oreshki à la framboise — 48 pièces",
      ru: "Орешки с малиной — 48 штук"
    },
    description:
      "Des oreshki maison délicats, relevés par la framboise pour une note fruitée, tendre et lumineuse qui rappelle les desserts faits avec attention.",
    price: 45,
    image: "/images/oreshki_framboises.png",
    category: "cookies",
    available: true
  },
  {
    id: "pelmeni",
    name: "Pelmeni",
    orderName: {
      fr: "Pelmeni — 1 kg",
      ru: "Домашние пельмени — 1 кг"
    },
    description:
      "Raviolis traditionnels préparés avec une pâte fine et une farce à base de viande assaisonnée, d’oignons et d’épices. À cuire dans l’eau ou dans un bouillon.",
    price: 13,
    unit: "1 kg",
    image: "/images/pelmeni.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "pelmeni-poulet",
    name: "Pelmeni — Poulet",
    orderName: {
      fr: "Pelmeni — Poulet",
      ru: "Пельмени — Курица"
    },
    description:
      "Raviolis traditionnels préparés avec une pâte fine et une farce au poulet, des oignons et des épices. À cuire dans l’eau ou dans un bouillon.",
    price: 12,
    unit: "1 kg",
    image: "/images/pelmeni.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "pelmeni-mix-porc-boeuf",
    name: "Pelmeni — Mix porc / bœuf",
    orderName: {
      fr: "Pelmeni — Mix porc / bœuf",
      ru: "Пельмени — Микс свинина / говядина"
    },
    description:
      "Raviolis traditionnels préparés avec une pâte fine et une farce porc-bœuf, des oignons et des épices. À cuire dans l’eau ou dans un bouillon.",
    price: 13,
    unit: "1 kg",
    image: "/images/pelmeni.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "pelmeni-boeuf",
    name: "Pelmeni — Bœuf",
    orderName: {
      fr: "Pelmeni — Bœuf",
      ru: "Пельмени — Говядина"
    },
    description:
      "Raviolis traditionnels préparés avec une pâte fine et une farce au bœuf, des oignons et des épices. À cuire dans l’eau ou dans un bouillon.",
    price: 14,
    unit: "1 kg",
    image: "/images/pelmeni.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "kotleti-kievski",
    name: "Kotleti po-kievski",
    orderName: {
      fr: "Kotleti po-kievski — par pièce",
      ru: "Котлеты по-киевски — за штуку"
    },
    description:
      "Escalopes roulées préparées avec du poulet, du beurre parfumé, des herbes et une chapelure croustillante. Fondantes à l’intérieur et dorées à l’extérieur.",
    price: 4,
    unit: "par pièce",
    image: "/images/kotleti-kievski.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "vareniki",
    name: "Vareniki",
    orderName: {
      fr: "Vareniki — 1 kg",
      ru: "Домашние вареники — 1 кг"
    },
    description:
      "Raviolis maison garnis selon les recettes : pommes de terre, fromage. Préparés avec une pâte souple et généreusement garnis.",
    price: 10,
    unit: "1 kg",
    image: "/images/vareniki.jpg",
    category: "specialties",
    available: false
  },
  {
    id: "vareniki-fromage",
    name: "Vareniki — Fromage blanc",
    orderName: {
      fr: "Vareniki — Fromage blanc",
      ru: "Вареники — с творогом"
    },
    description:
      "Vareniki maison au fromage blanc, préparés avec une pâte souple et une garniture généreuse.",
    price: 11,
    unit: "1 kg",
    image: "/images/vareniki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "vareniki-pommes-terre",
    name: "Vareniki — Pommes de terre",
    orderName: {
      fr: "Vareniki — Pommes de terre",
      ru: "Вареники — с картошкой"
    },
    description:
      "Vareniki maison aux pommes de terre, préparés avec une pâte souple et une garniture généreuse.",
    price: 9,
    unit: "1 kg",
    image: "/images/vareniki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "blinchiki",
    name: "Blinchiki",
    orderName: {
      fr: "Blinchiki — 1 kg",
      ru: "Домашние блинчики — 1 кг"
    },
    description:
      "Fines crêpes maison garnies selon les recettes : viande, fromage, champignons et pommes de terre.",
    price: 10,
    unit: "1 kg",
    image: "/images/blinchiki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "blinchiki-viande",
    name: "Blinchiki — Viande",
    orderName: {
      fr: "Blinchiki — Viande — 1 kg",
      ru: "Блинчики — мясо — 1 кг"
    },
    description:
      "Fines crêpes maison garnies à la viande selon les recettes familiales.",
    price: 10,
    unit: "1 kg",
    image: "/images/blinchiki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "blinchiki-fromage",
    name: "Blinchiki — Fromage",
    orderName: {
      fr: "Blinchiki — Fromage — 1 kg",
      ru: "Блинчики — сыр — 1 кг"
    },
    description:
      "Fines crêpes maison garnies au fromage selon les recettes familiales.",
    price: 9,
    unit: "1 kg",
    image: "/images/blinchiki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "blinchiki-champignons",
    name: "Blinchiki — Champignons et pommes de terre",
    orderName: {
      fr: "Blinchiki — Champignons et pommes de terre — 1 kg",
      ru: "Блинчики — грибы и картошка — 1 кг"
    },
    description:
      "Fines crêpes maison garnies aux champignons et pommes de terre selon les recettes familiales.",
    price: 9,
    unit: "1 kg",
    image: "/images/blinchiki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "golubci",
    name: "Golubci",
    orderName: {
      fr: "Golubci — 1 kg",
      ru: "Домашние голубцы — 1 кг"
    },
    description:
      "Feuilles de chou farcies avec du riz, de la viande assaisonnée, des légumes et une sauce mijotée maison.",
    price: 17,
    unit: "1 kg",
    image: "/images/golubci.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "pirojki",
    name: "Pirojki",
    orderName: {
      fr: "Pirojki — par pièce",
      ru: "Жареные пирожки — за штуку"
    },
    description:
      "Petits chaussons frits préparés avec une pâte moelleuse et des garnitures variées : pommes de terre, chou, viande, foie ou œuf avec oignons.",
    price: 2,
    unit: "par pièce",
    image: "/images/pirojki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "sigaretki",
    name: "Sigaretki",
    orderName: {
      fr: "Sigaretki",
      ru: "Домашние сигаретки"
    },
    description:
      "Les sigaretkis maison à la pomme sont de délicates pâtisseries en pâte feuilletée, garnies d’une préparation parfumée à la pomme. Légères et croustillantes à l’extérieur, elles restent moelleuses, fruitées et légèrement sucrées à l’intérieur. Elles accompagnent parfaitement un thé, un café ou un dessert maison à partager.",
    price: 10,
    unit: "12 pièces",
    image: "/images/sigaretki.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-blanc",
    name: "Napoleon",
    orderName: {
      fr: "Napoleon",
      ru: "Наполеон"
    },
    description:
      "Un gâteau Napoleon aux fines couches de pâte et à la crème légère. Doux, fondant et parfaitement équilibré en sucre.",
    price: 2,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-velvet-rouge",
    name: "Velvet rouge",
    orderName: {
      fr: "Velvet rouge",
      ru: "Красный вельвет"
    },
    description:
      "Un gâteau velvet rouge maison à la texture tendre et à la crème légère. Doux, moelleux et généreux.",
    price: 2.5,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-chocolat",
    name: "Gâteau chocolat-café",
    orderName: {
      fr: "Gâteau chocolat-café",
      ru: "Пирожное шоколад-кофе"
    },
    description:
      "Un gâteau chocolat-café avec une crème onctueuse, un goût de cacao intense et une note de café.",
    price: 2,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-cafe",
    name: "Gâteau chocolat-café",
    orderName: {
      fr: "Gâteau chocolat-café",
      ru: "Пирожное шоколад-кофе"
    },
    description:
      "Un gâteau chocolat-café avec une crème onctueuse, un goût de cacao intense et une note de café.",
    price: 2,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-pistache",
    name: "Gâteau à la pistache",
    orderName: {
      fr: "Gâteau à la pistache",
      ru: "Фисташковое пирожное"
    },
    description:
      "Un gâteau à la pistache avec une crème délicate et une légère note de fruits secs. Une texture fondante et un goût raffiné.",
    price: 2.5,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  }
];

export const productById = new Map(products.map((product) => [product.id, product]));

export function getProductOrderName(productId: ProductId, language: "fr" | "ru" = "fr") {
  return productById.get(productId)?.orderName[language] ?? productById.get(productId)?.name ?? productId;
}

export function formatPrice(amount: number) {
  const fractionDigits = Number.isInteger(amount) ? 0 : 2;

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits
  }).format(amount);
}
