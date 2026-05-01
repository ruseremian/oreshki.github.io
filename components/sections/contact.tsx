"use client";

import { motion } from "framer-motion";
import { Instagram, Send } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { links, SiteContent } from "@/lib/site-data";

type ContactProps = {
  content: SiteContent["contact"];
};

export function Contact({ content }: ContactProps) {
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
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href={links.instagram} aria-label={content.instagramAria}>
              <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
              Instagram
            </Button>
            <Button href={links.telegram} variant="secondary" aria-label={content.telegramAria}>
              <Send className="mr-2 h-4 w-4" aria-hidden="true" />
              Telegram
            </Button>
          </div>

          <p className="mx-auto mt-8 max-w-2xl rounded-3xl border border-cocoa/10 bg-white/48 px-6 py-5 text-sm leading-7 text-cocoa/68 shadow-soft">
            {content.note}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
