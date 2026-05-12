export type ProductCategory = "cookies" | "specialties";
export type ProductId =
  | "pieces12"
  | "pieces24"
  | "pieces48"
  | "napoleon-blanc"
  | "napoleon-chocolat"
  | "napoleon-pistache"
  | "pelmeni"
  | "kotleti-kievski"
  | "vareniki"
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
    description: "Домашние орешки с начинкой из варёной сгущёнки. Готовятся из нежного теста с маслом и яйцами, с мягкой сладкой начинкой внутри. Формат для пробы — 2 коробки по 6 штук.",
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
    description: "Домашние орешки с начинкой из варёной сгущёнки. Готовятся из нежного теста с маслом и яйцами, с мягкой сладкой начинкой внутри. Классический формат — идеально для семьи или друзей.",
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
    description: "Домашние орешки с начинкой из варёной сгущёнки. Готовятся из нежного теста с маслом и яйцами, с мягкой сладкой начинкой внутри. Большой формат поставляется в двух отдельных упаковках.",
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
    price: 10,
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
      fr: "Golubci — par pièce",
      ru: "Домашние голубцы — за штуку"
    },
    description:
      "Feuilles de chou farcies avec du riz, de la viande assaisonnée, des légumes et une sauce mijotée maison.",
    price: 1,
    unit: "par pièce",
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
    price: 1,
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
      "Fines pâtisseries roulées préparées avec une pâte légère et une garniture sucrée selon les recettes maison. Légèrement croustillantes et saupoudrées de sucre glace.",
    price: 10,
    unit: "boîte",
    image: "/images/sigaretki.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-blanc",
    name: "Napoléon maison — Blanc",
    orderName: {
      fr: "Napoléon maison — Blanc",
      ru: "Наполеон — белый"
    },
    description:
      "Un Napoléon maison aux fines couches de pâte et à la crème légère. Doux, fondant et parfaitement équilibré en sucre.",
    price: 6,
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-chocolat",
    name: "Napoléon maison — Chocolat",
    orderName: {
      fr: "Napoléon maison — Chocolat",
      ru: "Наполеон — шоколадный"
    },
    description:
      "Un Napoléon maison au chocolat avec une crème onctueuse et un goût de cacao plus intense. Gourmand et généreux.",
    price: 6,
    image: "/images/napoleon.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "napoleon-pistache",
    name: "Napoléon maison — Pistache",
    orderName: {
      fr: "Napoléon maison — Pistache",
      ru: "Наполеон — фисташковый"
    },
    description:
      "Un Napoléon maison à la pistache avec une crème délicate et une légère note de fruits secs. Une texture fondante et un goût raffiné.",
    price: 7,
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
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
