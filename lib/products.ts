export type ProductCategory = "cookies" | "specialties";
export type ProductId =
  | "pieces12"
  | "pieces24"
  | "pieces48"
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
    id: "pieces12",
    name: "Format découverte — 12 pièces",
    orderName: {
      fr: "Format découverte — 12 pièces",
      ru: "Формат для пробы — 12 штук"
    },
    description: "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и цельным фундуком внутри. Формат для пробы — 2 коробки по 6 штук.",
    price: 8,
    image: "/images/oreshki-12.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "pieces24",
    name: "Format classique — 24 pièces",
    orderName: {
      fr: "Format classique — 24 pièces",
      ru: "Классический формат — 24 штуки"
    },
    description: "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и цельным фундуком внутри. Классический формат — идеально для семьи или друзей.",
    price: 16,
    image: "/images/oreshki-24.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "pieces48",
    name: "Grand format généreux — 48 pièces",
    orderName: {
      fr: "Grand format généreux — 48 pièces",
      ru: "Большой формат — 48 штук"
    },
    description: "Домашние орешки из нежного теста с маслом и яйцами, с начинкой из варёной сгущёнки и цельным фундуком внутри. Большой формат поставляется в двух отдельных упаковках.",
    price: 32,
    image: "/images/oreshki-48.jpg",
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
    price: 13,
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
    price: 13,
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
      fr: "Blinchiki — par pièce",
      ru: "Домашние блинчики — за штуку"
    },
    description:
      "Fines crêpes maison garnies selon les recettes : viande, fromage, champignons.",
    price: 1,
    unit: "par pièce",
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
      "Petites pâtisseries roulées maison, légèrement croustillantes et délicatement sucrées. Parfaites avec un thé ou un café.",
    price: 10,
    unit: "boîte",
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
    name: "Gâteau au chocolat",
    orderName: {
      fr: "Gâteau au chocolat",
      ru: "Шоколадное пирожное"
    },
    description:
      "Un gâteau au chocolat avec une crème onctueuse et un goût de cacao plus intense. Gourmand et généreux.",
    price: 2,
    unit: "par pièce",
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-cafe",
    name: "Gâteau au café",
    orderName: {
      fr: "Gâteau au café",
      ru: "Кофейное пирожное"
    },
    description:
      "Un gâteau au café avec une crème douce et parfumée. Fondant, délicat et équilibré.",
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
