"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { SectionHeading } from "@/components/section-heading";

export function About() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            align="left"
            eyebrow="История"
            title="Маленькие партии, большой вкус детства"
            description="Каждая скорлупка выпекается вручную до золотистого оттенка, затем наполняется густой варёной сгущёнкой и собирается аккуратно, без спешки. Мы выбираем качественное масло, свежие яйца и понятные ингредиенты, чтобы вкус оставался честным, тёплым и узнаваемым."
          />
          <p className="mt-6 max-w-xl text-base leading-8 text-cocoa/70">
            Орешки готовятся небольшими партиями, поэтому они приезжают к вам
            свежими: хрустящими снаружи, мягко-карамельными внутри и
            по-домашнему ароматными.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65 }}
          className="relative"
        >
          <div className="absolute -right-4 top-8 h-44 w-44 rounded-full bg-sage/12 blur-3xl" />
          <div className="relative overflow-hidden rounded-[1.5rem] border border-white/70 shadow-soft">
            <Image
              src="/images/oreshki-hero.png"
              alt="Свежие домашние орешки со сгущёнкой"
              width={1100}
              height={900}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
