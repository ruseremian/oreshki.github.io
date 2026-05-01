"use client";

import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/section-heading";
import { ProductId, SiteContent } from "@/lib/site-data";

type ProductsProps = {
  content: SiteContent["products"];
  onOrder: (productId: ProductId) => void;
};

export function Products({ content, onOrder }: ProductsProps) {
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
              onOrder={onOrder}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
