"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { links, SiteContent } from "@/lib/site-data";

type ProductsProps = {
  content: SiteContent["products"];
};

export function Products({ content }: ProductsProps) {
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
            <motion.article
              key={product.title}
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
                <Button
                  href={links.instagram}
                  variant="secondary"
                  className="mt-6 w-full"
                  aria-label={`${content.order}: ${product.title}`}
                >
                  {content.order}
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
