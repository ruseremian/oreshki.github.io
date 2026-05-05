"use client";

import { ShoppingBag } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Language, languages, SiteContent } from "@/lib/site-data";

type NavigationProps = {
  content: SiteContent["nav"];
  language: Language;
  onLanguageChange: (language: Language) => void;
  onCartOpen: () => void;
};

export function Navigation({
  content,
  language,
  onLanguageChange,
  onCartOpen
}: NavigationProps) {
  const { itemCount } = useCart();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cocoa/10 bg-cream/95 shadow-sm backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label={content.aria}
      >
        <a href="#" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cocoa text-sm font-bold text-cream transition group-hover:bg-caramel">
            О
          </span>
          <span className="hidden font-serif text-lg font-semibold text-cocoa sm:block">
            {content.brand}
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {content.items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-cocoa/70 transition hover:bg-cocoa/5 hover:text-cocoa"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div
            className="flex rounded-full border border-cocoa/10 bg-white/55 p-1 shadow-sm"
            role="group"
            aria-label={content.languageLabel}
          >
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                onClick={() => onLanguageChange(item.code)}
                className={cn(
                  "h-8 min-w-10 rounded-full px-3 text-xs font-bold transition",
                  language === item.code
                    ? "bg-cocoa text-cream shadow-sm"
                    : "text-cocoa/65 hover:bg-cocoa/5 hover:text-cocoa"
                )}
                aria-pressed={language === item.code}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={onCartOpen}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-cocoa/10 bg-white/60 text-cocoa transition hover:bg-white"
            aria-label={`${content.cartAria} ${itemCount}`}
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            {itemCount > 0 ? (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-caramel px-1 text-[10px] font-bold text-cream">
                {itemCount}
              </span>
            ) : null}
          </button>
          <Button
            href="#products"
            size="sm"
            aria-label={content.order}
            className="hidden sm:inline-flex"
          >
            {content.order}
          </Button>
        </div>
      </nav>
    </header>
  );
}
