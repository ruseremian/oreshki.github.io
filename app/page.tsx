"use client";

import { useEffect, useState } from "react";

import { About } from "@/components/sections/about";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider, useCart } from "@/components/cart-provider";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { LegalFooter } from "@/components/legal-footer";
import { Navigation } from "@/components/sections/navigation";
import { Products } from "@/components/sections/products";
import { Reviews } from "@/components/sections/reviews";
import { Language, ProductId, siteContent } from "@/lib/site-data";

export default function Home() {
  return (
    <CartProvider>
      <LandingPage />
    </CartProvider>
  );
}

function LandingPage() {
  const [language, setLanguage] = useState<Language>("fr");
  const [cartOpen, setCartOpen] = useState(false);
  const content = siteContent[language];
  const { addItem } = useCart();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("oreshki-language") as Language | null;

    if (savedLanguage === "ru" || savedLanguage === "fr") {
      setLanguage(savedLanguage);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("oreshki-language", language);
  }, [language]);

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function addProductToCart(productId: ProductId) {
    addItem(productId);
  }

  return (
    <>
      <Navigation
        content={content.nav}
        language={language}
        onLanguageChange={setLanguage}
        onCartOpen={() => setCartOpen(true)}
      />
      <main className="pt-[65px]">
        <Hero content={content.hero} onOrder={scrollToProducts} />
        <Products content={content.products} onOrder={addProductToCart} />
        <About content={content.about} />
        <Reviews content={content.reviews} />
        <Contact content={content.contact} />
      </main>
      <LegalFooter />
      <CartDrawer
        open={cartOpen}
        onOpenChange={setCartOpen}
        content={content.cart}
        products={content.products.items}
      />
    </>
  );
}
