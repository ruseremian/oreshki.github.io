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
      "Рассыпчатое песочное тесто, густая карамельная сгущёнка и нежный ореховый аромат.",
    price: 1200,
    image: "/images/classic-oreshki.png",
    category: "cookies",
    available: true
  },
  {
    id: "gift",
    name: "Подарочная коробка",
    description:
      "Элегантная упаковка для тёплого жеста, семейного праздника или корпоративного комплимента.",
    price: 2400,
    image: "/images/gift-box.png",
    category: "gift",
    available: true
  },
  {
    id: "mini",
    name: "Мини-набор",
    description:
      "Небольшая порция свежих орешков для знакомства со вкусом или уютного чаепития.",
    price: 650,
    image: "/images/mini-set.png",
    category: "cookies",
    available: true
  }
];

export const productById = new Map(products.map((product) => [product.id, product]));

export function formatPrice(amount: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0
  }).format(amount);
}
