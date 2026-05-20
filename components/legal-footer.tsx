import Link from "next/link";

import { Logo } from "@/components/ui/logo";
import { siteContent, type SiteContent } from "@/lib/site-data";

const defaultContent = siteContent.fr.footer;

type LegalFooterProps = {
  content?: SiteContent["footer"];
};

export function LegalFooter({ content = defaultContent }: LegalFooterProps) {
  return (
    <footer className="border-t border-cocoa/10 bg-cream/65">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 text-center text-sm text-cocoa/65 sm:flex-row sm:px-6 sm:py-8 sm:text-left lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo size="sm" showSubtitle />
          <p>{content.tagline}</p>
        </div>
        <nav
          aria-label={content.legalAria}
          className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <Link href={content.privacyHref} className="transition hover:text-caramel">
            {content.privacy}
          </Link>
          <Link href={content.termsHref} className="transition hover:text-caramel">
            {content.terms}
          </Link>
        </nav>
      </div>
    </footer>
  );
}
