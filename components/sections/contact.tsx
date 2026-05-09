"use client";

import { motion } from "framer-motion";

import { ContactButtons } from "@/components/contact-buttons";
import { SectionHeading } from "@/components/section-heading";
import { SiteContent } from "@/lib/site-data";

type ContactProps = {
  content: SiteContent["contact"];
};

export function Contact({ content }: ContactProps) {
  return (
    <section id="contact" className="scroll-mt-24 py-10 sm:py-16 lg:py-18">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <ContactButtons
            labels={{ instagram: "Instagram", telegram: "Telegram", whatsapp: "WhatsApp" }}
            aria={content}
            className="mt-7 justify-center"
          />

          <p className="mx-auto mt-6 max-w-2xl rounded-2xl border border-cocoa/10 bg-white/48 px-4 py-5 text-sm leading-7 text-cocoa/68 shadow-soft sm:rounded-3xl sm:px-6">
            {content.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
