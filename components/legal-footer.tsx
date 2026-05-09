import Link from "next/link";

import { Logo } from "@/components/ui/logo";

export function LegalFooter() {
  return (
    <footer className="border-t border-cocoa/10 bg-cream/65">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-4 py-7 text-center text-sm text-cocoa/65 sm:flex-row sm:px-6 sm:py-8 sm:text-left lg:px-8">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo size="sm" showSubtitle />
          <p>Desserts artisanaux faits maison.</p>
        </div>
        <nav
          aria-label="Liens légaux"
          className="flex max-w-full flex-wrap items-center justify-center gap-x-5 gap-y-2"
        >
          <Link href="/privacy" className="transition hover:text-caramel">
            Politique de confidentialité
          </Link>
          <Link href="/terms" className="transition hover:text-caramel">
            Conditions d&apos;utilisation
          </Link>
        </nav>
      </div>
    </footer>
  );
}
