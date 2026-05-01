import { Button } from "@/components/ui/button";
import { links } from "@/lib/site-data";

const navItems = [
  { label: "Продукты", href: "#products" },
  { label: "О нас", href: "#about" },
  { label: "Отзывы", href: "#reviews" },
  { label: "Контакты", href: "#contact" }
];

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 border-b border-cocoa/10 bg-cream/82 backdrop-blur-xl">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8"
        aria-label="Основная навигация"
      >
        <a href="#" className="group flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-cocoa text-sm font-bold text-cream transition group-hover:bg-caramel">
            О
          </span>
          <span className="hidden font-serif text-lg font-semibold text-cocoa sm:block">
            Орешки
          </span>
        </a>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 text-sm font-medium text-cocoa/70 transition hover:bg-cocoa/5 hover:text-cocoa"
            >
              {item.label}
            </a>
          ))}
        </div>

        <Button href={links.instagram} size="sm" aria-label="Заказать в Instagram">
          Заказать
        </Button>
      </nav>
    </header>
  );
}
