"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { INSTAGRAM_URL, TELEGRAM_URL, WHATSAPP_URL } from "@/lib/social-links";
import { ProductId, SiteContent } from "@/lib/site-data";

type ProductsProps = {
  content: SiteContent["products"];
  onOrder: (productId: ProductId) => void;
};

export function Products({ content, onOrder }: ProductsProps) {
  const [addedProductId, setAddedProductId] = useState<ProductId | null>(null);

  useEffect(() => {
    if (!addedProductId) return;

    const timeout = window.setTimeout(() => setAddedProductId(null), 1800);
    return () => window.clearTimeout(timeout);
  }, [addedProductId]);

  function handleOrder(productId: ProductId) {
    onOrder(productId);
    setAddedProductId(productId);
  }

  return (
    <section className="bg-white/42 py-12 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div id="products" className="mt-8 grid scroll-mt-24 gap-6 sm:mt-10 md:grid-cols-3">
          {content.items.map((product, index) => (
            <ProductCard
              key={product.title}
              product={product}
              index={index}
              orderLabel={content.order}
              addedLabel={content.added}
              added={addedProductId === product.id}
              onOrder={handleOrder}
            />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-7 text-cocoa/68">
          <LinkedCustomQuantityNote text={content.customQuantityNote} />
        </p>

        <AnimatePresence>
          {addedProductId ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="fixed bottom-5 left-1/2 z-[70] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 rounded-full bg-cocoa px-5 py-3 text-center text-sm font-semibold text-cream shadow-glow"
              role="status"
            >
              {content.added}
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}

function LinkedCustomQuantityNote({ text }: { text: string }) {
  const links: Record<string, string> = {
    Instagram: INSTAGRAM_URL,
    Telegram: TELEGRAM_URL,
    WhatsApp: WHATSAPP_URL
  };

  return (
    <>
      {text.split(/(Instagram|Telegram|WhatsApp)/).map((part, index) => {
        const href = links[part];

        return href ? (
          <a
            key={`${part}-${index}`}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="font-semibold text-caramel underline decoration-caramel/30 underline-offset-4 transition hover:text-cocoa"
          >
            {part}
          </a>
        ) : (
          part
        );
      })}
    </>
  );
}
