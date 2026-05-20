import type { Metadata } from "next";
import Link from "next/link";

import { LegalFooter } from "@/components/legal-footer";
import { BRAND_NAME } from "@/lib/brand";
import { siteContent, type Language } from "@/lib/site-data";

export const metadata: Metadata = {
  title: `Conditions d'utilisation | ${BRAND_NAME}`,
  description:
    `Conditions d'utilisation du site ${BRAND_NAME} pour les commandes de spécialités artisanales faites maison.`
};

const termsContent = {
  fr: {
    back: "Retour à l'accueil",
    title: "Conditions d'utilisation",
    intro:
      `Ces conditions encadrent l'utilisation du site ${BRAND_NAME} et les commandes de spécialités artisanales faites maison proposées aux clients.`,
    sections: [
      {
        title: "Activité",
        body:
          `Le site ${BRAND_NAME} présente et permet de commander des pâtisseries, desserts et plats salés artisanaux préparés maison en petites quantités.`
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
        title: "Consentement aux données de commande",
        body:
          "Avant l'envoi d'une demande, le client doit confirmer que ses données de commande peuvent être utilisées uniquement pour traiter la demande, organiser le retrait ou la livraison et communiquer au sujet de cette commande."
      },
      {
        title: "Annulation",
        body:
          `Pour annuler une commande, le client doit contacter ${BRAND_NAME} dès que possible. Les commandes annulées ne sont pas comptabilisées comme chiffre d'affaires.`
      },
      {
        title: "Allergènes",
        body:
          `Les produits peuvent contenir du gluten, des oeufs, du lait, des fruits à coque et d'autres allergènes. Les clients concernés par des allergies peuvent contacter ${BRAND_NAME} avant de commander pour poser leurs questions.`
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
    ]
  },
  ru: {
    back: "Вернуться на главную",
    title: "Условия использования",
    intro:
      `Эти условия регулируют использование сайта ${BRAND_NAME} и заказы домашних ремесленных специалитетов для клиентов.`,
    sections: [
      {
        title: "Деятельность",
        body:
          `Сайт ${BRAND_NAME} представляет и позволяет заказывать выпечку, десерты и солёные блюда домашнего приготовления небольшими партиями.`
      },
      {
        title: "Доступность и приготовление",
        body:
          "Заказы зависят от доступности продуктов и времени приготовления. Все изделия готовятся дома небольшими партиями. Для заказов нужен минимум 3-дневный срок подготовки."
      },
      {
        title: "Самовывоз и доставка",
        body:
          "Самовывоз возможен только по договорённости. Доставка стоит 7 € и становится бесплатной при заказе от 35 €. Практические детали самовывоза или доставки подтверждаются вручную с клиентом."
      },
      {
        title: "Цены и оплата",
        body:
          "Цены указаны в евро. Онлайн-оплата на сайте не проводится. Клиент отправляет заявку на заказ, после чего финальное подтверждение и инструкции по оплате отправляются вручную через WhatsApp, Telegram или SMS."
      },
      {
        title: "Согласие на данные заказа",
        body:
          "Перед отправкой заявки клиент должен подтвердить, что данные заказа могут использоваться только для обработки заявки, организации самовывоза или доставки и общения по этому заказу."
      },
      {
        title: "Отмена",
        body:
          `Чтобы отменить заказ, клиент должен как можно скорее связаться с ${BRAND_NAME}. Отменённые заказы не учитываются в выручке.`
      },
      {
        title: "Аллергены",
        body:
          `Продукты могут содержать глютен, яйца, молоко, орехи и другие аллергены. Клиенты с аллергиями могут связаться с ${BRAND_NAME} перед заказом, чтобы задать вопросы.`
      },
      {
        title: "Коммуникация",
        body:
          "WhatsApp используется только для подтверждения заказов, организации самовывоза или доставки и ответов на вопросы клиентов. Маркетинговые сообщения не отправляются без явного согласия клиента."
      },
      {
        title: "Отказ или отмена заказа",
        body:
          "Продавец может отказать в заказе или отменить его, если это необходимо, например из-за недоступности, ограничений по приготовлению, неполных данных или ситуации, которая мешает самовывозу или доставке."
      }
    ]
  }
} as const;

type TermsPageProps = {
  searchParams?: Promise<{ lang?: string | string[] }>;
};

export default async function TermsPage({ searchParams }: TermsPageProps) {
  const language = getLanguage(await searchParams);
  const content = termsContent[language];

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
            {content.sections.map((item) => (
              <section key={item.title}>
                <h2 className="font-serif text-2xl text-cocoa">{item.title}</h2>
                <p className="mt-3">{item.body}</p>
              </section>
            ))}
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
