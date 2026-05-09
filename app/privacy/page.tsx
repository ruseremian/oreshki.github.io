import type { Metadata } from "next";
import Link from "next/link";

import { LegalFooter } from "@/components/legal-footer";

export const metadata: Metadata = {
  title: "Politique de confidentialité | Oreshki",
  description:
    "Politique de confidentialité du site Oreshki concernant les commandes, les données clients et leur utilisation."
};

const collectedData = [
  "nom",
  "numéro de téléphone",
  "adresse email si elle est fournie",
  "adresse de livraison si la livraison est sélectionnée",
  "détails de la commande, dont les produits, quantités, notes et date souhaitée"
];

const purposes = [
  "traiter et confirmer les commandes",
  "contacter les clients au sujet de leur commande",
  "organiser le retrait ou la livraison locale",
  "assurer le support client et répondre aux demandes"
];

export default function PrivacyPage() {
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
              Politique de confidentialité
            </h1>
            <p className="mt-5 text-base leading-7 text-cocoa/70 sm:leading-8">
              Cette politique explique quelles données sont collectées lors d&apos;une
              commande sur le site Oreshki, pourquoi elles sont utilisées et comment
              elles sont protégées.
            </p>
          </header>

          <div className="mt-8 space-y-7 text-base leading-7 text-cocoa/75 sm:mt-10 sm:space-y-8 sm:leading-8">
            <section>
              <h2 className="font-serif text-2xl text-cocoa">Données collectées</h2>
              <p className="mt-3">
                Lorsqu&apos;un client passe commande, le site peut collecter les
                informations suivantes :
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {collectedData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">Utilisation des données</h2>
              <p className="mt-3">Ces informations sont utilisées uniquement pour :</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {purposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">Stockage et accès</h2>
              <p className="mt-3">
                Les données de commande sont stockées dans la base de données Supabase
                utilisée par le site. Seul le propriétaire du site ou l&apos;administrateur
                autorisé peut accéder aux informations nécessaires au traitement des
                commandes.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">Partage des données</h2>
              <p className="mt-3">
                Les données clients ne sont pas vendues, louées ni partagées à des fins
                publicitaires. Elles ne sont utilisées que pour la gestion des commandes
                et la communication avec les clients.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">Cookies et stockage local</h2>
              <p className="mt-3">
                Le site peut utiliser le stockage local du navigateur (localStorage)
                pour conserver temporairement le panier et la préférence de langue. Ces
                informations restent dans le navigateur du client et servent à améliorer
                l&apos;expérience de commande.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">Correction ou suppression</h2>
              <p className="mt-3">
                Les clients peuvent demander la correction ou la suppression de leurs
                données personnelles liées à une commande. Pour toute demande concernant
                vos données, contactez-nous via le formulaire de contact ou nos réseaux
                sociaux.
              </p>
            </section>
          </div>
        </article>
      </main>
      <LegalFooter />
    </div>
  );
}
