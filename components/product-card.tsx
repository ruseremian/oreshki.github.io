import Image from "next/image";
import { motion } from "framer-motion";

import { ProductId, ProductItem } from "@/lib/site-data";

type ProductCardProps = {
  product: ProductItem;
  index: number;
  orderLabel: string;
  onOrder: (productId: ProductId) => void;
};

export function ProductCard({
  product,
  index,
  orderLabel,
  onOrder
}: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="group overflow-hidden rounded-3xl border border-cocoa/8 bg-cream shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-glow"
    >
      <div className="overflow-hidden">
        <Image
          src={product.image}
          alt={product.title}
          width={900}
          height={700}
          className="aspect-[5/4] w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-serif text-2xl leading-tight text-cocoa">
            {product.title}
          </h3>
          <p className="shrink-0 rounded-full bg-caramel/12 px-3 py-1 text-sm font-bold text-caramel">
            {product.price}
          </p>
        </div>
        <p className="mt-4 min-h-24 text-sm leading-7 text-cocoa/68">
          {product.description}
        </p>
        <button
          type="button"
          onClick={() => onOrder(product.id)}
          className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-cocoa/15 bg-white/70 px-6 py-3 text-sm font-semibold text-cocoa backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-caramel/40 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
          aria-label={`${orderLabel}: ${product.title}`}
        >
          {orderLabel}
        </button>
      </div>
    </motion.article>
  );
}
