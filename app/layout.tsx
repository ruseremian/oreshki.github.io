import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

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

const metadataTitle = "Oreshki faits maison au caramel | Dessert artisanal";
const metadataDescription =
  "Découvrez des oreshki faits maison : biscuits croustillants en forme de noix, garnis de lait concentré caramélisé. Petites séries, formats 12, 24 et 48 pièces, commande en ligne.";

export const metadata: Metadata = {
  metadataBase: new URL("https://oreshki-github-io.vercel.app"),
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
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
      </body>
    </html>
  );
}
