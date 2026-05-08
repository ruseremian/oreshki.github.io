export type ProductCategory = "cookies";
export type ProductId = "pieces12" | "pieces24" | "pieces48";

export type Product = {
  id: ProductId;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  available: boolean;
};

export const products: Product[] = [
  {
    id: "pieces12",
    name: "12 pièces",
    description: "Формат для пробы — 2 коробки по 6 штук.",
    price: 8,
    image: "/images/oreshki-12.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "pieces24",
    name: "24 pièces",
    description: "Классический формат — идеально для семьи или друзей.",
    price: 16,
    image: "/images/oreshki-24.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "pieces48",
    name: "48 pièces",
    description: "Большой формат — без специальной подарочной упаковки.",
    price: 32,
    image: "/images/oreshki-48.jpg",
    category: "cookies",
    available: true
  }
];

export const productById = new Map(products.map((product) => [product.id, product]));

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
}
