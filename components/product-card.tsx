import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

import { ProductId, ProductItem } from "@/lib/site-data";

type ProductCardProps = {
  product: ProductItem;
  index: number;
  orderLabel: string;
  addedLabel: string;
  added: boolean;
  onOrder: (productId: ProductId) => void;
};

export function ProductCard({
  product,
  index,
  orderLabel,
  addedLabel,
  added,
  onOrder
}: ProductCardProps) {
  const [imageSrc, setImageSrc] = useState(product.image);

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
      <div className="aspect-[4/3] overflow-hidden sm:aspect-[5/4]">
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
        <div className="mb-4 flex flex-wrap content-start gap-2 md:min-h-16">
          <span className="max-w-full rounded-full bg-caramel/12 px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] text-caramel sm:tracking-[0.14em]">
            {product.positioning}
          </span>
          <span className="rounded-full border border-cocoa/10 bg-white/60 px-3 py-1 text-xs font-semibold text-cocoa/62">
            {product.quantity}
          </span>
        </div>
        <div className="flex flex-wrap items-start justify-between gap-3 md:min-h-[4.25rem]">
          <h3 className="min-w-0 flex-1 font-serif text-2xl leading-tight text-cocoa">
            {product.title}
          </h3>
          <p className="shrink-0 self-start rounded-full bg-caramel/12 px-3 py-1 text-sm font-bold leading-6 text-caramel">
            {product.price}
          </p>
        </div>
        <p className="mt-4 flex-1 text-sm leading-7 text-cocoa/68">
          {product.description}
        </p>
        <div className="mt-auto pt-6">
          <button
            type="button"
            onClick={() => onOrder(product.id)}
            className="inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cocoa/15 bg-white/70 px-6 py-3 text-sm font-semibold text-cocoa backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-caramel/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
            aria-label={`${orderLabel}: ${product.title}`}
          >
            {added ? addedLabel : orderLabel}
          </button>
        </div>
      </div>
    </motion.article>
  );
}
