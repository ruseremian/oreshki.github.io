import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import { ProductId, ProductItem } from "@/lib/site-data";

type ProductCardProps = {
  product: ProductItem;
  index: number;
  orderLabel: string;
  addedLabel: string;
  categoryLabel?: string;
  addedProductId: ProductId | null;
  onOrder: (productId: ProductId) => void;
};

export function ProductCard({
  product,
  index,
  orderLabel,
  addedLabel,
  categoryLabel,
  addedProductId,
  onOrder
}: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.image);
  const variants = "variants" in product ? product.variants : undefined;
  const [selectedProductId, setSelectedProductId] = useState<ProductId>(
    product.id
  );
  const selectedVariant =
    variants?.find((variant) => variant.id === selectedProductId) ??
    variants?.[0];
  const selectedOrderId = selectedVariant?.id ?? product.id;
  const displayedPrice = selectedVariant?.price ?? product.price;
  const added = addedProductId === selectedOrderId;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.45,
        delay: index * 0.07,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="group flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-cocoa/8 bg-cream shadow-soft transition-shadow duration-300 hover:shadow-glow sm:rounded-3xl"
    >
      <div className="aspect-[4/3] shrink-0 overflow-hidden sm:aspect-[5/4]">
        <Image
          src={imageSrc}
          alt={product.imageAlt}
          width={900}
          height={700}
          sizes="(min-width: 768px) 33vw, 100vw"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          onError={() => setImageSrc("/images/oreshki-handmade.jpg")}
        />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="mb-4 flex flex-wrap content-start gap-2 md:min-h-[4.5rem]">
          {categoryLabel ? (
            <span className="rounded-full border border-caramel/20 bg-white/65 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-caramel">
              {categoryLabel}
            </span>
          ) : null}
          <span className="max-w-full rounded-full bg-caramel/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-caramel sm:tracking-[0.14em]">
            {product.positioning}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3 md:min-h-[4.75rem]">
          <h3 className="min-w-0 flex-1 font-serif text-2xl leading-tight text-cocoa">
            {product.title}
          </h3>
          <p className="shrink-0 self-start rounded-full bg-caramel/12 px-3 py-1 text-sm font-bold leading-6 text-caramel">
            {displayedPrice}
          </p>
        </div>
        <p className="mt-4 text-sm leading-7 text-cocoa/68 md:min-h-[7rem]">
          {product.description}
        </p>
        {variants ? (
          <div className="mt-4 grid gap-2">
            {variants.map((variant) => {
              const selected = variant.id === selectedOrderId;

              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => setSelectedProductId(variant.id)}
                  aria-pressed={selected}
                  className={
                    selected
                      ? "flex min-h-11 w-full items-start justify-between gap-3 rounded-2xl border border-caramel bg-white px-4 py-2 text-left text-sm font-semibold text-cocoa shadow-sm transition"
                      : "flex min-h-11 w-full items-start justify-between gap-3 rounded-2xl border border-cocoa/10 bg-white/58 px-4 py-2 text-left text-sm font-semibold text-cocoa/68 transition hover:border-caramel/45 hover:bg-white"
                  }
                >
                  <span className="min-w-0 break-words leading-5">
                    {variant.label}
                  </span>
                  <span className="shrink-0 pt-0.5 text-caramel">
                    {variant.price}
                  </span>
                </button>
              );
            })}
          </div>
        ) : null}
        <div className="mt-4 flex min-h-8 items-center">
          <span className="rounded-full border border-cocoa/10 bg-white/60 px-3 py-1 text-xs font-semibold text-cocoa/62">
            {product.quantity}
          </span>
        </div>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => onOrder(selectedOrderId)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cocoa/15 bg-white/70 px-6 py-3 text-sm font-semibold text-cocoa backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-caramel/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
            aria-label={`${orderLabel}: ${selectedVariant?.fullName ?? product.title}`}
          >
            {added ? addedLabel : orderLabel}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
