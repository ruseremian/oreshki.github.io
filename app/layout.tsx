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
  `Spécialités maison d’Europe de l’Est à Strasbourg | ${BRAND_NAME}`;
const metadataDescription =
  `${BRAND_NAME} prépare des pâtisseries, desserts et plats salés artisanaux faits maison, inspirés des traditions d’Europe de l’Est et russes. Commandes en ligne, retrait ou livraison locale.`;

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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
