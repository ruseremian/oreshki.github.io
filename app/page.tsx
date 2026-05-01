import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Navigation } from "@/components/sections/navigation";
import { Products } from "@/components/sections/products";
import { Reviews } from "@/components/sections/reviews";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Products />
        <About />
        <Reviews />
        <Contact />
      </main>
    </>
  );
}
