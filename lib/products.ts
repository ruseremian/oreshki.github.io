export type ProductCategory = "cookies" | "specialties";
export type ProductId =
  | "pieces12"
  | "pieces24"
  | "pieces48"
  | "pelmeni"
  | "kotleti-kievski"
  | "vareniki"
  | "blinchiki"
  | "golubci"
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
    description: "Формат для пробы — 2 коробки по 6 штук.",
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
    description: "Классический формат — идеально для семьи или друзей.",
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
    description: "Большой формат поставляется в двух отдельных упаковках.",
    price: 32,
    image: "/images/oreshki-48.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "pelmeni",
    name: "Pelmeni maison",
    orderName: {
      fr: "Pelmeni maison — 1 kg",
      ru: "Домашние пельмени — 1 кг"
    },
    description:
      "Pelmeni préparés à la main, parfaits à cuire à l’eau ou au bouillon.",
    price: 12,
    unit: "1 kg",
    image: "/images/pelmeni.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "kotleti-kievski",
    name: "Kotleti po-kievski",
    orderName: {
      fr: "Kotleti po-kievski — 1 kg",
      ru: "Котлеты по-киевски — 1 кг"
    },
    description:
      "Escalopes roulées au beurre parfumé, croustillantes et fondantes.",
    price: 14,
    unit: "1 kg",
    image: "/images/kotleti-kievski.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "vareniki",
    name: "Vareniki maison",
    orderName: {
      fr: "Vareniki maison — 1 kg",
      ru: "Домашние вареники — 1 кг"
    },
    description:
      "Vareniki faits maison avec une garniture généreuse selon les disponibilités.",
    price: 11,
    unit: "1 kg",
    image: "/images/vareniki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "blinchiki",
    name: "Blinchiki maison",
    orderName: {
      fr: "Blinchiki maison — 1 kg",
      ru: "Домашние блинчики — 1 кг"
    },
    description:
      "Fines crêpes maison garnies selon les recettes traditionnelles.",
    price: 9,
    unit: "1 kg",
    image: "/images/blinchiki.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "golubci",
    name: "Golubci maison",
    orderName: {
      fr: "Golubci maison — 1 kg",
      ru: "Домашние голубцы — 1 кг"
    },
    description:
      "Choux farcis préparés maison avec une recette familiale généreuse.",
    price: 13,
    unit: "1 kg",
    image: "/images/golubci.jpg",
    category: "specialties",
    available: true
  },
  {
    id: "sigaretki",
    name: "Sigaretki maison",
    orderName: {
      fr: "Sigaretki maison",
      ru: "Домашние сигаретки"
    },
    description:
      "Délicates pâtisseries roulées artisanales préparées maison selon une recette traditionnelle.",
    price: 10,
    unit: "boîte",
    image: "/images/sigaretki.jpg",
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
