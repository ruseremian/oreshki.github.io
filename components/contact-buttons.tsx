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
    <div className={`flex w-full flex-col gap-3 sm:w-auto sm:flex-row ${className}`}>
      <Button
        href={links.instagram}
        variant="secondary"
        aria-label={aria?.instagramAria ?? labels.instagram}
        className="w-full sm:w-auto"
      >
        <Instagram className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.instagram}
      </Button>
      <Button
        href={links.telegram}
        variant="secondary"
        aria-label={aria?.telegramAria ?? labels.telegram}
        className="w-full sm:w-auto"
      >
        <Send className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.telegram}
      </Button>
      <Button
        href={createWhatsAppLink()}
        variant="secondary"
        aria-label={aria?.whatsappAria ?? labels.whatsapp}
        className="w-full sm:w-auto"
      >
        <MessageCircle className="mr-2 h-4 w-4" aria-hidden="true" />
        {labels.whatsapp}
      </Button>
    </div>
  );
}
