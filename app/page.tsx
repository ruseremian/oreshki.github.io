"use client";

import { useState } from "react";

import { About } from "@/components/sections/about";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider, useCart } from "@/components/cart-provider";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
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
  const [language, setLanguage] = useState<Language>("ru");
  const [cartOpen, setCartOpen] = useState(false);
  const content = siteContent[language];
  const { addItem } = useCart();

  function scrollToProducts() {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  }

  function addProductToCart(productId: ProductId) {
    addItem(productId);
    setCartOpen(true);
  }

  return (
    <>
      <Navigation
        content={content.nav}
        language={language}
        onLanguageChange={setLanguage}
        onCartOpen={() => setCartOpen(true)}
      />
      <main>
        <Hero content={content.hero} onOrder={scrollToProducts} />
        <Products content={content.products} onOrder={addProductToCart} />
        <About content={content.about} />
        <Reviews content={content.reviews} />
        <Contact content={content.contact} />
      </main>
      <CartDrawer open={cartOpen} onOpenChange={setCartOpen} />
    </>
  );
}
