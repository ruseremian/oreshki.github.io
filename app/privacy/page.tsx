import type { Metadata } from "next";
import Link from "next/link";

import { LegalFooter } from "@/components/legal-footer";
import { BRAND_NAME } from "@/lib/brand";
import { siteContent, type Language } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Politique de confidentialité | ${BRAND_NAME}`,
  description:
    `Politique de confidentialité du site ${BRAND_NAME} concernant les commandes de spécialités maison, les données clients et leur utilisation.`
};

const privacyContent = {
  fr: {
    back: "Retour à l'accueil",
    title: "Politique de confidentialité",
    intro:
      "Cette politique explique quelles données sont collectées lors d'une commande de spécialités maison, pourquoi elles sont utilisées et comment elles sont protégées.",
    collectedTitle: "Données collectées",
    collectedIntro:
      "Lorsqu'un client passe commande, le site peut collecter les informations suivantes :",
    collectedData: [
      "nom",
      "numéro de téléphone",
      "détails de retrait ou de livraison",
      "détails de la commande, dont les produits, quantités, notes et date souhaitée"
    ],
    purposesTitle: "Utilisation des données",
    purposesIntro: "Ces informations sont utilisées uniquement pour :",
    purposes: [
      "traiter et confirmer les commandes",
      "contacter les clients au sujet de leur commande",
      "organiser le retrait sur rendez-vous ou la livraison",
      "assurer le support client et répondre aux demandes"
    ],
    consent:
      "Avant l'envoi d'une demande de commande, le client doit cocher une case de consentement confirmant que ces données peuvent être utilisées pour traiter la demande.",
    storageTitle: "Stockage et accès",
    storage:
      "Les données de commande sont stockées dans la base de données Supabase utilisée par le site. Seul le propriétaire du site ou l'administrateur autorisé peut accéder aux informations nécessaires au traitement des commandes. Elles sont conservées uniquement le temps nécessaire au suivi et à la gestion des commandes.",
    sharingTitle: "Partage des données",
    sharing:
      "Les données clients ne sont pas vendues, louées ni partagées à des fins publicitaires. Elles ne sont utilisées que pour la gestion des commandes et la communication avec les clients. WhatsApp, Telegram ou SMS peuvent être utilisés pour confirmer une commande, organiser un retrait ou une livraison, répondre aux questions clients et envoyer les instructions de paiement. Aucun message marketing n'est envoyé sans accord explicite.",
    cookiesTitle: "Cookies et stockage local",
    cookies:
      "Le site peut utiliser le stockage local du navigateur (localStorage) pour conserver temporairement le panier et la préférence de langue. Ces informations restent dans le navigateur du client et servent à améliorer l'expérience de commande.",
    correctionTitle: "Correction ou suppression",
    correction:
      "Les clients peuvent demander la correction ou la suppression de leurs données personnelles liées à une commande. Pour toute demande concernant vos données, contactez-nous au + 33 6 09 13 12 95."
  },
  ru: {
    back: "Вернуться на главную",
    title: "Политика конфиденциальности",
    intro:
      "Эта политика объясняет, какие данные собираются при заказе домашних специалитетов, зачем они используются и как защищаются.",
    collectedTitle: "Какие данные собираются",
    collectedIntro:
      "Когда клиент оформляет заказ, сайт может собрать следующие данные:",
    collectedData: [
      "имя",
      "номер телефона",
      "детали самовывоза или доставки",
      "детали заказа, включая продукты, количество, комментарии и желаемую дату"
    ],
    purposesTitle: "Использование данных",
    purposesIntro: "Эти данные используются только для того, чтобы:",
    purposes: [
      "обработать и подтвердить заказ",
      "связаться с клиентом по поводу заказа",
      "организовать самовывоз по договорённости или доставку",
      "ответить на вопросы клиента и помочь с заказом"
    ],
    consent:
      "Перед отправкой заявки на заказ клиент должен отметить согласие на использование этих данных для обработки заявки.",
    storageTitle: "Хранение и доступ",
    storage:
      "Данные заказов хранятся в базе данных Supabase, которую использует сайт. Доступ к информации, необходимой для обработки заказов, есть только у владельца сайта или уполномоченного администратора. Данные хранятся только столько, сколько необходимо для сопровождения и управления заказами.",
    sharingTitle: "Передача данных",
    sharing:
      "Данные клиентов не продаются, не сдаются в аренду и не передаются в рекламных целях. Они используются только для управления заказами и общения с клиентами. WhatsApp, Telegram или SMS могут использоваться для подтверждения заказа, организации самовывоза или доставки, ответа на вопросы и отправки инструкций по оплате. Маркетинговые сообщения не отправляются без явного согласия.",
    cookiesTitle: "Cookies и локальное хранение",
    cookies:
      "Сайт может использовать локальное хранилище браузера (localStorage), чтобы временно сохранять корзину и выбранный язык. Эти данные остаются в браузере клиента и помогают улучшить оформление заказа.",
    correctionTitle: "Исправление или удаление",
    correction:
      "Клиенты могут запросить исправление или удаление персональных данных, связанных с заказом. По вопросам данных свяжитесь с нами по номеру + 33 6 09 13 12 95."
  }
} as const;

type PrivacyPageProps = {
  searchParams?: Promise<{ lang?: string | string[] }>;
};

export default async function PrivacyPage({ searchParams }: PrivacyPageProps) {
  const language = getLanguage(await searchParams);
  const content = privacyContent[language];

  return (
    <div className="min-h-screen bg-cream text-cocoa">
      <main className="px-4 py-10 sm:px-6 sm:py-20 lg:px-8">
        <article className="mx-auto max-w-3xl rounded-2xl border border-cocoa/10 bg-white/55 px-4 py-8 shadow-soft backdrop-blur sm:px-10 sm:py-10">
          <Link
            href="/"
            className="text-sm font-semibold text-caramel transition hover:text-cocoa"
          >
            {content.back}
          </Link>

          <header className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-caramel sm:tracking-[0.28em]">
              {BRAND_NAME}
            </p>
            <h1 className="mt-3 font-serif text-[2rem] leading-tight text-cocoa sm:text-5xl">
              {content.title}
            </h1>
            <p className="mt-5 text-base leading-7 text-cocoa/70 sm:leading-8">
              {content.intro}
            </p>
          </header>

          <div className="mt-8 space-y-7 text-base leading-7 text-cocoa/75 sm:mt-10 sm:space-y-8 sm:leading-8">
            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.collectedTitle}</h2>
              <p className="mt-3">{content.collectedIntro}</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {content.collectedData.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.purposesTitle}</h2>
              <p className="mt-3">{content.purposesIntro}</p>
              <ul className="mt-4 list-disc space-y-2 pl-6">
                {content.purposes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="mt-4">{content.consent}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.storageTitle}</h2>
              <p className="mt-3">{content.storage}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.sharingTitle}</h2>
              <p className="mt-3">{content.sharing}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.cookiesTitle}</h2>
              <p className="mt-3">{content.cookies}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-cocoa">{content.correctionTitle}</h2>
              <p className="mt-3">{content.correction}</p>
            </section>
          </div>
        </article>
      </main>
      <LegalFooter content={siteContent[language].footer} />
    </div>
  );
}

function getLanguage(searchParams?: { lang?: string | string[] }): Language {
  const lang = searchParams?.lang;

  return lang === "ru" || lang?.[0] === "ru" ? "ru" : "fr";
}
