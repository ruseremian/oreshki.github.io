"use client";

import { motion } from "framer-motion";
import { Instagram, Send } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { links } from "@/lib/site-data";

export function Contact() {
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow="Заказ"
            title="Напишите, и мы соберём свежую партию"
            description="Принимаем заказы в Instagram и Telegram. Подскажем ближайшую дату выпечки, формат набора и варианты красивой упаковки."
          />

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={links.instagram} aria-label="Открыть Instagram">
              <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
              Instagram
            </Button>
            <Button href={links.telegram} variant="secondary" aria-label="Открыть Telegram">
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              Telegram
            </Button>
          </div>

          <p className="mx-auto mt-8 max-w-2xl rounded-3xl border border-cocoa/10 bg-white/48 px-6 py-5 text-sm leading-7 text-cocoa/68 shadow-soft">
            Доставка и самовывоз обсуждаются индивидуально. Для праздников и
            подарков лучше написать за 2-3 дня, чтобы мы успели подготовить
            свежую партию и упаковку.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
