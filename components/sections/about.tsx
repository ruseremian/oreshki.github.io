"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";
import { SiteContent } from "@/lib/site-data";

type AboutProps = {
  content: SiteContent["about"];
};

export function About({ content }: AboutProps) {
  return (
    <section id="about" className="overflow-hidden scroll-mt-24 py-10 sm:py-16 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-8 px-4 sm:gap-10 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="left"
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />
          <p className="mt-4 max-w-xl text-base leading-7 text-cocoa/70 sm:mt-5 sm:leading-8">
            {content.note}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65 }}
          className="relative min-w-0"
        >
          <div className="absolute -right-2 top-8 h-32 w-32 rounded-full bg-sage/12 blur-3xl sm:-right-4 sm:h-44 sm:w-44" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-soft">
            <Image
              src="/images/oreshki-handmade.jpg"
              alt={content.imageAlt}
              width={1100}
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
