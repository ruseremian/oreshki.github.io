"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteContent } from "@/lib/site-data";

type HeroProps = {
  content: SiteContent["hero"];
  onOrder: () => void;
};

export function Hero({ content, onOrder }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-10 pt-6 sm:pb-16 sm:pt-12 lg:pb-20">
      <div className="mx-auto grid max-w-7xl items-center gap-7 px-4 sm:gap-10 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-caramel sm:mb-5 sm:tracking-[0.3em]">
            {content.eyebrow}
          </p>
          <h1 className="max-w-3xl font-serif text-[2.35rem] leading-[1.05] text-cocoa min-[390px]:text-4xl sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-cocoa/72 sm:mt-5 sm:text-lg sm:leading-8">
            {content.subtitle}
          </p>
          <p className="mt-4 text-sm font-semibold text-caramel">
            {content.trustLine}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOrder}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
              aria-label={content.order}
            >
              {content.order}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOrder}
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-cocoa/15 bg-white/60 px-6 py-3 text-sm font-semibold text-cocoa shadow-sm backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
            >
              {content.discover}
            </button>
          </div>

          <ul className="mt-6 grid max-w-xl gap-3 text-sm text-cocoa/72 sm:mt-8 sm:grid-cols-2">
            {content.logistics.map((item) => (
              <li
                key={item}
                className="flex min-h-14 items-center gap-3 rounded-2xl border border-cocoa/8 bg-white/45 px-4 py-3 shadow-sm backdrop-blur"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-caramel" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-caramel/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.25rem] border border-white/70 bg-white/40 shadow-glow sm:rounded-[1.75rem]">
            <Image
              src="/images/oreshki-hero.jpg"
              alt={content.imageAlt}
              width={1400}
              height={1000}
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
