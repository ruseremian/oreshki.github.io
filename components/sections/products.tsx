"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
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
    <section id="products" className="bg-white/42 py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
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
