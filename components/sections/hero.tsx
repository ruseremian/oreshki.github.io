"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { ContactButtons } from "@/components/contact-buttons";
import { SiteContent } from "@/lib/site-data";

type HeroProps = {
  content: SiteContent["hero"];
  onOrder: () => void;
};

export function Hero({ content, onOrder }: HeroProps) {
  return (
    <section className="relative overflow-hidden pb-20 pt-12 sm:pt-16 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10"
        >
          <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-caramel">
            {content.eyebrow}
          </p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.02] text-cocoa sm:text-6xl lg:text-7xl">
            {content.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-cocoa/72">
            {content.subtitle}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onOrder}
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-cocoa px-6 py-3 text-sm font-semibold text-cream shadow-soft transition duration-300 hover:-translate-y-0.5 hover:bg-espresso focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-caramel"
              aria-label={content.order}
            >
              {content.order}
              <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </button>
            <ContactButtons
              labels={{
                instagram: content.instagram,
                telegram: content.telegram,
                whatsapp: content.whatsapp
              }}
              className="sm:flex-row"
            />
          </div>

          <dl className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-cocoa">
            {content.stats.map(([value, label]) => (
              <div
                key={label}
                className="border-l border-caramel/30 pl-4"
              >
                <dt className="font-serif text-2xl font-semibold">{value}</dt>
                <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-cocoa/55">
                  {label}
                </dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.15, duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-4 rounded-[2rem] bg-caramel/10 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/40 shadow-glow">
            <Image
              src="/images/oreshki-hero.png"
              alt={content.imageAlt}
              width={1400}
              height={1000}
              priority
              className="aspect-[4/3] h-full w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
