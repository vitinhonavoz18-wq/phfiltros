import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { solutions } from "@/config/content";
import { site } from "@/config/site";
import { PageHero } from "@/components/layout/PageHero";
import { SolutionArt } from "@/components/visuals/SolutionArt";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { ViewTracker } from "@/components/tracking/ViewTracker";
import { FinalCta } from "@/components/sections/FinalCta";
import { JsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) return {};
  const title = `${s.name} em Salvador`;
  const description = `${s.tagline} ${s.description.split(".")[0]}. Atendimento da PH Filtros em Salvador e região, há mais de ${site.yearsOfExperience} anos.`;
  return {
    title,
    description: description.slice(0, 160),
    alternates: { canonical: `/solucoes/${s.slug}` },
    openGraph: { title: `${title} | PH Filtros`, description, url: `/solucoes/${s.slug}` },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = solutions.find((x) => x.slug === slug);
  if (!s) notFound();
  const others = solutions.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.name,
          description: s.description,
          provider: { "@id": `${site.url}/#empresa` },
          areaServed: { "@type": "City", name: "Salvador" },
          url: `${site.url}/solucoes/${s.slug}`,
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Início", item: site.url },
            { "@type": "ListItem", position: 2, name: "Soluções", item: `${site.url}/#solucoes` },
            { "@type": "ListItem", position: 3, name: s.name, item: `${site.url}/solucoes/${s.slug}` },
          ],
        }}
      />
      <PageHero
        eyebrow="Soluções PH Filtros"
        title={`${s.name} em Salvador`}
        intro={s.tagline}
        crumbs={[{ href: "/", label: "Início" }, { href: "/#solucoes", label: "Soluções" }, { label: s.name }]}
      />

      <section className="relative bg-white py-20 md:py-28">
        <ViewTracker event="product_view" label={s.name} />
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
          <div>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">Como podemos ajudar</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate">{s.description}</p>
            <h3 className="font-display mt-12 text-xl font-semibold text-ink">Principais benefícios</h3>
            <ul className="mt-5 space-y-4">
              {s.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-ink">
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                    <Icon name="check" className="size-4" strokeWidth={2.2} />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
            <h3 className="font-display mt-12 text-xl font-semibold text-ink">Indicado para</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {s.idealFor.map((t) => (
                <span key={t} className="rounded-full bg-ice px-4 py-2 text-sm font-semibold text-ink">
                  {t}
                </span>
              ))}
            </div>
            <p className="mt-10 text-sm leading-relaxed text-slate/80">
              As características variam conforme o modelo e as especificações do fabricante. Nossa equipe ajuda você a escolher a opção adequada.
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="overflow-hidden rounded-[28px] bg-deep text-white shadow-[0_40px_90px_-40px_rgba(4,20,38,.6)]">
              <SolutionArt solution={s} priority className="aspect-[4/3] w-full" />
              <div className="p-7 md:p-8">
                <p className="font-display text-xl font-semibold">Fale com um especialista</p>
                <p className="mt-2 text-white/65">Tire dúvidas e solicite seu orçamento sem compromisso.</p>
                <WhatsAppLink location="solution_page" label={s.name} message={s.whatsappMessage} className="btn btn-primary mt-6 w-full">
                  <WhatsAppGlyph className="size-5" />
                  Solicitar orçamento
                </WhatsAppLink>
                <Link href="/#orcamento" className="btn btn-ghost-dark mt-3 w-full">
                  Usar o assistente de orçamento
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-ice py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-semibold tracking-tight text-ink md:text-3xl">Outras soluções</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {others.map((o) => (
              <Link key={o.slug} href={`/solucoes/${o.slug}`} className="group flex items-center gap-4 rounded-2xl bg-white p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_-25px_rgba(4,20,38,.35)]">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-ice text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                  <Icon name={o.icon} className="size-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-ink">{o.name}</span>
                  <span className="block truncate text-sm text-slate">{o.tagline}</span>
                </span>
                <Icon name="arrow" className="ml-auto size-5 shrink-0 text-brand transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <FinalCta />
    </>
  );
}
