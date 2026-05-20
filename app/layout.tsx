import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import { BRAND_NAME, SITE_URL } from "@/lib/brand";

import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap"
});

const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  variable: "--font-playfair",
  display: "swap"
});

const metadataTitle =
  `Oreshki, pelmeni et spécialités russes près de Strasbourg | ${BRAND_NAME}`;
const metadataDescription =
  `${BRAND_NAME} prépare oreshki, pelmeni, vareniki, pirojki et spécialités maison à Ittenheim près de Strasbourg. Retrait sur rendez-vous et livraison offerte dès 35 €.`;

const structuredData = {
  "@context": "https://schema.org",
  "@type": "FoodEstablishment",
  name: BRAND_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/oreshki-hero.jpg`,
  description:
    "Spécialités russes et d'Europe de l'Est faites maison à Ittenheim près de Strasbourg, avec livraison locale disponible et retrait uniquement sur rendez-vous.",
  areaServed: [
    {
      "@type": "City",
      name: "Ittenheim"
    },
    {
      "@type": "City",
      name: "Strasbourg"
    },
    {
      "@type": "AdministrativeArea",
      name: "Communes voisines de Strasbourg"
    }
  ],
  servesCuisine: ["Russian", "Eastern European"],
  knowsAbout: [
    "oreshki",
    "pelmeni",
    "vareniki",
    "pirojki",
    "blinchiki",
    "sigaretki",
    "gâteaux",
    "gâteaux chocolat-café",
    "kotleti po-kievski"
  ],
  makesOffer: [
    {
      "@type": "Offer",
      name: "Livraison locale",
      description:
        "Livraison disponible à Strasbourg et dans les communes voisines, offerte dès 35 €."
    },
    {
      "@type": "Offer",
      name: "Retrait à Ittenheim",
      description: "Retrait à Ittenheim uniquement sur rendez-vous."
    }
  ]
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: "/",
    languages: {
      fr: "/",
      ru: "/"
    }
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    locale: "fr_FR",
    alternateLocale: ["ru_RU"],
    images: ["/images/oreshki-hero.jpg"]
  },
  twitter: {
    card: "summary_large_image",
    title: metadataTitle,
    description: metadataDescription,
    images: ["/images/oreshki-hero.jpg"]
  },
  icons: {
    icon: [
      {
        url: "/branding/logo-icon.svg",
        type: "image/svg+xml"
      }
    ],
    shortcut: "/branding/logo-icon.svg",
    apple: "/branding/logo-icon.svg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
