"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

import { SiteContent } from "@/lib/site-data";
import { cn } from "@/lib/utils";

type ReviewsProps = {
  content: SiteContent["reviews"];
};

export function Reviews({ content }: ReviewsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleReviews = useMemo(
    () =>
      Array.from({ length: Math.min(3, content.items.length) }, (_, offset) => {
        const index = (activeIndex + offset) % content.items.length;
        return content.items[index];
      }),
    [activeIndex, content.items]
  );

  function showPrevious() {
    setActiveIndex((current) =>
      current === 0 ? content.items.length - 1 : current - 1
    );
  }

  function showNext() {
    setActiveIndex((current) => (current + 1) % content.items.length);
  }

  return (
    <section id="reviews" className="scroll-mt-24 bg-cocoa py-10 text-cream sm:py-16 lg:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-almond sm:tracking-[0.28em]">
              {content.eyebrow}
            </p>
            <h2 className="font-serif text-[2rem] leading-tight sm:text-4xl md:text-5xl">
              {content.title}
            </h2>
          </div>

          <div className="flex justify-center gap-3 sm:justify-end">
            <CarouselButton
              label={content.previousLabel}
              onClick={showPrevious}
              icon="previous"
            />
            <CarouselButton
              label={content.nextLabel}
              onClick={showNext}
              icon="next"
            />
          </div>
        </div>

        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="mt-8 grid gap-5 sm:mt-10 sm:grid-cols-2 md:grid-cols-3"
        >
          {visibleReviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className={cn(
                "flex min-h-[22rem] flex-col rounded-2xl border border-cream/12 bg-cream/[0.07] p-5 shadow-soft backdrop-blur sm:rounded-3xl sm:p-6",
                index === 1 && "hidden sm:flex",
                index === 2 && "hidden md:flex"
              )}
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
              <p className="mt-5 text-base leading-7 text-cream/82 md:leading-8">
                &laquo;{review.text}&raquo;
              </p>
              <p className="mt-auto pt-6 font-serif text-xl text-cream">
                {review.name}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CarouselButton({
  label,
  onClick,
  icon
}: {
  label: string;
  onClick: () => void;
  icon: "previous" | "next";
}) {
  const Icon = icon === "previous" ? ChevronLeft : ChevronRight;

  return (
    <button
      type="button"
      onClick={onClick}
      className="grid h-12 w-12 place-items-center rounded-full border border-almond/25 bg-cream/10 text-almond shadow-sm transition hover:-translate-y-0.5 hover:border-almond/45 hover:bg-cream/16 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-almond"
      aria-label={label}
    >
      <Icon className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
