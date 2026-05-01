"use client";

import { useState } from "react";

import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Navigation } from "@/components/sections/navigation";
import { Products } from "@/components/sections/products";
import { Reviews } from "@/components/sections/reviews";
import { Language, siteContent } from "@/lib/site-data";

export default function Home() {
  const [language, setLanguage] = useState<Language>("ru");
  const content = siteContent[language];

  return (
    <>
      <Navigation
        content={content.nav}
        language={language}
        onLanguageChange={setLanguage}
      />
      <main>
        <Hero content={content.hero} />
        <Products content={content.products} />
        <About content={content.about} />
        <Reviews content={content.reviews} />
        <Contact content={content.contact} />
      </main>
    </>
  );
}
