import { Instagram, Send, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createWhatsAppLink, links, SiteContent } from "@/lib/site-data";

type ContactButtonsProps = {
  labels: {
    instagram: string;
    telegram: string;
    whatsapp: string;
  };
  aria?: Pick<
    SiteContent["contact"],
    "instagramAria" | "telegramAria" | "whatsappAria"
  >;
  className?: string;
};

export function ContactButtons({
  labels,
  aria,
  className = ""
}: ContactButtonsProps) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row ${className}`}>
      <Button
        href={links.instagram}
        variant="secondary"
        aria-label={aria?.instagramAria ?? labels.instagram}
      >
        <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.instagram}
      </Button>
      <Button
        href={links.telegram}
        variant="secondary"
        aria-label={aria?.telegramAria ?? labels.telegram}
      >
        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.telegram}
      </Button>
      <Button
        href={createWhatsAppLink()}
        variant="secondary"
        aria-label={aria?.whatsappAria ?? labels.whatsapp}
      >
        <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.whatsapp}
      </Button>
    </div>
  );
}
