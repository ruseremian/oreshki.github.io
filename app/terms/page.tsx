import type { Metadata } from "next";
import Link from "next/link";

import { LegalFooter } from "@/components/legal-footer";

export const metadata: Metadata = {
  title: "Conditions d'utilisation | Oreshki",
  description:
    "Conditions d'utilisation du site Oreshki pour les commandes de spécialités artisanales faites maison."
};

const terms = [
  {
    title: "Activité",
    body:
      "Le site Oreshki présente et permet de commander des pâtisseries, desserts et plats salés artisanaux préparés maison en petites quantités."
  },
  {
    title: "Disponibilité et préparation",
    body:
      "Les commandes sont soumises à disponibilité. Les produits sont faits maison et préparés en petites séries. Un délai minimum de 3 jours est demandé pour les commandes."
  },
  {
    title: "Retrait et livraison",
    body:
      "Le retrait est possible uniquement sur rendez-vous. La livraison coûte 7 € et devient offerte à partir de 35 € de commande. Les détails pratiques de retrait ou de livraison sont confirmés manuellement avec le client."
  },
  {
    title: "Prix et paiement",
    body:
      "Les prix sont indiqués en euros. Le paiement n'est pas effectué en ligne sur le site. Le client envoie une demande de commande, puis la confirmation finale et les instructions de paiement sont envoyées manuellement par WhatsApp, Telegram ou SMS."
  },
  {
    title: "Annulation",
    body:
      "Pour annuler une commande, le client doit contacter Oreshki dès que possible. Les commandes annulées ne sont pas comptabilisées comme chiffre d'affaires."
  },
  {
    title: "Allergènes",
    body:
      "Les produits peuvent contenir du gluten, des oeufs, du lait, des fruits à coque et d'autres allergènes. Les clients concernés par des allergies peuvent contacter Oreshki avant de commander pour poser leurs questions."
  },
  {
    title: "Communication",
    body:
      "WhatsApp est utilisé uniquement pour confirmer les commandes, organiser les détails de retrait ou de livraison et répondre aux questions clients. Aucun message marketing n'est envoyé sans accord explicite du client."
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
      <main className="px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-cocoa/10 bg-white/55 px-4 py-8 shadow-soft backdrop-blur sm:px-10 sm:py-10">
          <Link
            href="/"
            className="text-sm font-semibold text-caramel transition hover:text-cocoa"
          >
            Retour à l&apos;accueil
          </Link>

          <header className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-caramel sm:tracking-[0.28em]">
              Oreshki
            </p>
            <h1 className="mt-3 font-serif text-[2rem] leading-tight text-cocoa sm:text-5xl">
              Conditions d&apos;utilisation
            </h1>
            <p className="mt-5 text-base leading-7 text-cocoa/70 sm:leading-8">
              Ces conditions encadrent l&apos;utilisation du site Oreshki et les commandes
              de spécialités artisanales faites maison proposées aux clients.
            </p>
          </header>

          <div className="mt-8 space-y-7 text-base leading-7 text-cocoa/75 sm:mt-10 sm:space-y-8 sm:leading-8">
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
