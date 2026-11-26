import { site, instagramUrl } from "@/config/site";
import { faqs } from "@/config/content";

export const defaultTitle = `PH Filtros | Filtros de Água em Salvador – Há Mais de ${site.yearsOfExperience} Anos`;
export const defaultDescription = `Conheça a PH Filtros. Mais de ${site.yearsOfExperience} anos de experiência em soluções de filtragem de água. Atendimento em Salvador e região. Solicite seu orçamento.`;

/** Dados estruturados de empresa local (Schema.org). Só informa o que está confirmado. */
export function localBusinessJsonLd() {
  const a = site.address;
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${site.url}/#empresa`,
    name: site.name,
    description: defaultDescription,
    url: site.url,
    logo: `${site.url}/brand/icon-512.png`,
    image: `${site.url}/opengraph-image.png`,
    areaServed: [
      { "@type": "City", name: "Salvador" },
      { "@type": "AdministrativeArea", name: "Região Metropolitana de Salvador" },
    ],
    knowsAbout: ["Filtros de água", "Purificadores de água", "Troca de refil", "Manutenção de filtros", "Filtragem de água"],
  };
  if (site.whatsapp || site.phone) data.telephone = site.phone || `+${site.whatsapp.replace(/\D/g, "")}`;
  if (site.email) data.email = site.email;
  if (a.street) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: a.street,
      addressLocality: a.city,
      addressRegion: a.state,
      postalCode: a.postalCode || undefined,
      addressCountry: a.country,
    };
  }
  const sameAs = [instagramUrl].filter(Boolean);
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
