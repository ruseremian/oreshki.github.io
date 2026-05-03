export type ProductCategory = "cookies" | "gift";
export type ProductId = "classic" | "gift" | "mini";

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
    id: "classic",
    name: "Классические орешки",
    description:
      "Хрустящие скорлупки, нежная начинка и настоящий домашний вкус.",
    price: 15.99,
    image: "/images/oreshki-classic.jpg",
    category: "cookies",
    available: true
  },
  {
    id: "gift",
    name: "Подарочная коробка",
    description:
      "Элегантная коробка для тёплого подарка, праздника или красивого жеста.",
    price: 25.99,
    image: "/images/oreshki-gift-box.jpg",
    category: "gift",
    available: true
  },
  {
    id: "mini",
    name: "Мини-набор",
    description:
      "Небольшой формат, чтобы попробовать орешки или добавить сладкий акцент к кофе.",
    price: 6.99,
    image: "/images/oreshki-mini.jpg",
    category: "cookies",
    available: true
  }
];

export const productById = new Map(products.map((product) => [product.id, product]));

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(amount);
}
