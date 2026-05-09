"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import { SiteContent } from "@/lib/site-data";

type ReviewsProps = {
  content: SiteContent["reviews"];
};

export function Reviews({ content }: ReviewsProps) {
  return (
    <section id="reviews" className="scroll-mt-24 bg-cocoa py-10 text-cream sm:py-16 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-almond sm:tracking-[0.28em]">
            {content.eyebrow}
          </p>
          <h2 className="font-serif text-[2rem] leading-tight sm:text-4xl md:text-5xl">
            {content.title}
          </h2>
        </div>

        <div className="mt-8 grid gap-5 sm:mt-10 md:grid-cols-3">
          {content.items.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="rounded-2xl border border-cream/12 bg-cream/[0.07] p-5 shadow-soft backdrop-blur sm:rounded-3xl sm:p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <Quote className="h-7 w-7 text-almond" aria-hidden="true" />
                <div className="flex gap-1" aria-label={content.ratingLabel}>
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-almond text-almond"
                      aria-hidden="true"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-5 text-base leading-7 text-cream/82 md:min-h-36 md:leading-8">
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
