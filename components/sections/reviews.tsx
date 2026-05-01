"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

import { reviews } from "@/lib/site-data";

export function Reviews() {
  return (
    <section id="reviews" className="bg-cocoa py-20 text-cream sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-almond">
            Отзывы
          </p>
          <h2 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
            Тёплые слова после первой коробки
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-3xl border border-cream/12 bg-cream/[0.07] p-6 shadow-soft backdrop-blur"
            >
              <Quote className="h-7 w-7 text-almond" aria-hidden="true" />
              <p className="mt-5 min-h-36 text-base leading-8 text-cream/82">
                «{review.text}»
              </p>
              <p className="mt-6 font-serif text-xl text-cream">
                {review.name}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
