"use client";

import { useState } from "react";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Navigation } from "@/components/sections/navigation";
import { OrderForm } from "@/components/order-form";
import { Products } from "@/components/sections/products";
import { Reviews } from "@/components/sections/reviews";
import { Language, ProductId, siteContent } from "@/lib/site-data";

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const [selectedProductId, setSelectedProductId] = useState<ProductId>("classic");
  const content = siteContent[language];

  function scrollToOrder(productId?: ProductId) {
    if (productId) setSelectedProductId(productId);
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Navigation
        content={content.nav}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main>
        <Hero content={content.hero} onOrder={() => scrollToOrder()} />
        <Products content={content.products} onOrder={scrollToOrder} />
        <About content={content.about} />
        <Reviews content={content.reviews} />
        <OrderForm
          content={content.order}
          products={content.products.items}
          selectedProductId={selectedProductId}
          language={language}
          onProductChange={setSelectedProductId}
        />
        <Contact content={content.contact} />
      </main>
    </>
  );
}
