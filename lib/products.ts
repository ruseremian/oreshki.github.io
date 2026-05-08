export type ProductCategory = "cookies";
export type ProductId = "pieces12" | "pieces24" | "pieces48";

export type Product = {
  id: ProductId;
  name: string;
  orderName: {
    fr: string;
    ru: string;
  };
  description: string;
  price: number;
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
