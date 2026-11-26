import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { site, tracking } from "@/config/site";
import { defaultDescription, defaultTitle, JsonLd, localBusinessJsonLd } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ContactDock } from "@/components/layout/ContactDock";
import { RevealObserver } from "@/components/ui/RevealObserver";
import { PendingNotice } from "@/components/ui/PendingNotice";
import { Tracking } from "@/components/tracking/Tracking";
import { CookieConsent } from "@/components/tracking/CookieConsent";
import { consentDefaultsScript } from "@/components/tracking/consent";

// Fontes hospedadas no próprio site (Sora e Manrope, licença OFL): sem dependência do Google no build ou no acesso.
const sora = localFont({ src: "../fonts/sora-latin-wght-normal.woff2", variable: "--font-sora", display: "swap", weight: "100 800" });
const manrope = localFont({ src: "../fonts/manrope-latin-wght-normal.woff2", variable: "--font-manrope", display: "swap", weight: "200 800" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: defaultTitle, template: "%s | PH Filtros" },
  description: defaultDescription,
  applicationName: site.name,
  alternates: { canonical: "/" },
  keywords: [
    "filtros de água em Salvador",
    "purificadores de água em Salvador",
    "manutenção de filtros Salvador",
    "troca de refil Salvador",
    "filtragem de água Bahia",
    "empresa de filtros Salvador",
  ],
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: { card: "summary_large_image", title: defaultTitle, description: defaultDescription },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } },
  verification: tracking.googleSiteVerification ? { google: tracking.googleSiteVerification } : undefined,
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#020810",
  colorScheme: "dark light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${sora.variable} ${manrope.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: consentDefaultsScript }} />
        <JsonLd data={localBusinessJsonLd()} />
      </head>
      <body>
        <Header />
        <main id="conteudo">{children}</main>
        <Footer />
        <ContactDock />
        <CookieConsent />
        <PendingNotice />
        <RevealObserver />
        <Tracking />
      </body>
    </html>
  );
}
