import type { Metadata } from "next";
import Link from "next/link";

import { LegalFooter } from "@/components/legal-footer";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Oreshki",
  description:
    "Conditions d'utilisation du site Oreshki pour les commandes de desserts artisanaux."
};

const terms = [
  {
    title: "Activité",
    body:
      "Le site Oreshki présente et permet de commander des oreshki faits maison et des desserts artisanaux préparés en petites quantités."
  },
  {
    title: "Disponibilité et préparation",
    body:
      "Les commandes sont soumises à disponibilité. Les produits sont préparés en petites séries afin de préserver leur fraîcheur et leur qualité. Le délai de préparation est généralement de 24 à 48h."
  },
  {
    title: "Retrait et livraison",
    body:
      "Un retrait ou une livraison locale peut être organisé après confirmation de la commande. Les détails pratiques sont convenus directement avec le client."
  },
  {
    title: "Prix et paiement",
    body:
      "Les prix sont indiqués en euros. Le paiement peut être demandé lors de la confirmation de commande ou effectué au moment du retrait ou de la livraison."
  },
  {
    title: "Annulation",
    body:
      "Pour annuler une commande, le client doit contacter Oreshki dès que possible. Les commandes annulées ne sont pas comptabilisées comme chiffre d'affaires."
  },
  {
    title: "Allergènes",
    body:
      "Les produits peuvent contenir du gluten, du lait, des oeufs, des fruits à coque ou des traces de fruits à coque. Les clients concernés par des allergies doivent le signaler avant de commander."
  },
  {
    title: "Refus ou annulation d'une commande",
    body:
      "Le vendeur peut refuser ou annuler une commande si cela est nécessaire, notamment en cas d'indisponibilité, de contrainte de préparation, d'informations incomplètes ou de situation empêchant le retrait ou la livraison."
  }
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-cream text-cocoa">
      <main className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-cocoa/10 bg-white/55 px-6 py-10 shadow-soft backdrop-blur sm:px-10">
          <Link
            href="/"
            className="text-sm font-semibold text-caramel transition hover:text-cocoa"
          >
            Retour à l&apos;accueil
          </Link>

          <header className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-caramel">
              Oreshki
            </p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-cocoa sm:text-5xl">
              Conditions d&apos;utilisation
            </h1>
            <p className="mt-5 text-base leading-8 text-cocoa/70">
              Ces conditions encadrent l&apos;utilisation du site Oreshki et les commandes
              de desserts artisanaux proposées aux clients.
            </p>
          </header>

          <div className="mt-10 space-y-8 text-base leading-8 text-cocoa/75">
            {terms.map((item) => (
              <section key={item.title}>
                <h2 className="font-serif text-2xl text-cocoa">{item.title}</h2>
                <p className="mt-3">{item.body}</p>
              </section>
            ))}
          </div>
        </article>
      </main>
      <LegalFooter />
    </div>
  );
}
