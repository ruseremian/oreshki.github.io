"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import { calculateOrderSubtotal } from "@/lib/pricing";
import { ProductId, productById } from "@/lib/products";

type CartItem = {
  productId: ProductId;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  total: number;
  addItem: (productId: ProductId, quantity?: number) => void;
  increaseItem: (productId: ProductId) => void;
  decreaseItem: (productId: ProductId) => void;
  removeItem: (productId: ProductId) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const storageKey = "oreshki-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem(storageKey);

    if (savedCart) {
      try {
        const parsed = JSON.parse(savedCart) as CartItem[];
        setItems(sanitizeItems(parsed));
      } catch {
        localStorage.removeItem(storageKey);
      }
    }

    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [hydrated, items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((count, item) => count + item.quantity, 0);
    const subtotal = calculateOrderSubtotal(items);

    return {
      items,
      itemCount,
      subtotal,
      total: subtotal,
      addItem(productId, quantity = 1) {
        setItems((current) => {
          const existing = current.find((item) => item.productId === productId);

          if (existing) {
            return current.map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          }

          return [...current, { productId, quantity }];
        });
      },
      increaseItem(productId) {
        setItems((current) =>
          current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      },
      decreaseItem(productId) {
        setItems((current) =>
          current
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter((item) => item.quantity > 0)
        );
      },
      removeItem(productId) {
        setItems((current) =>
          current.filter((item) => item.productId !== productId)
        );
      },
      clearCart() {
        setItems([]);
      }
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}

function sanitizeItems(items: CartItem[]) {
  return items.filter(
    (item) =>
      Boolean(productById.get(item.productId)?.available) &&
      Number.isInteger(item.quantity) &&
      item.quantity > 0
  );
}
