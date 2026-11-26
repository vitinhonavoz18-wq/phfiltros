import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/layout/PageHero";
import { Icon } from "@/components/ui/Icon";
import { FinalCta } from "@/components/sections/FinalCta";
import { Services } from "@/components/sections/Services";

export const metadata: Metadata = {
  title: "A empresa",
  description: `Conheça a PH Filtros: mais de ${site.yearsOfExperience} anos de experiência em filtragem de água, com atendimento especializado em Salvador e região.`,
  alternates: { canonical: "/a-empresa" },
};

const values = [
  { icon: "medal", title: "Experiência", text: `Mais de ${site.yearsOfExperience} anos dedicados ao segmento de filtragem de água.` },
  { icon: "headset", title: "Atendimento próximo", text: "Entender a necessidade de cada cliente antes de indicar uma solução." },
  { icon: "shield", title: "Compromisso", text: "Orientação honesta, respeitando as especificações de cada fabricante." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="A empresa"
        title="Mais de quatro décadas construindo confiança."
        intro="A qualidade de um serviço não se constrói da noite para o dia."
        crumbs={[{ href: "/", label: "Início" }, { label: "A empresa" }]}
      />
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
          <div data-reveal="left">
            <span className="font-display block text-[clamp(7rem,20vw,14rem)] font-semibold leading-[.85] tracking-[-0.06em] text-water-deep" aria-hidden>
              {site.yearsOfExperience}+
            </span>
            <p className="mt-4 border-l-2 border-crystal pl-5 text-lg font-medium text-ink">anos de experiência em filtragem de água.</p>
          </div>
          <div data-reveal className="space-y-5 text-[1.075rem] leading-relaxed text-slate">
            <p>
              São mais de {site.yearsOfExperience} anos de experiência, conhecimento e dedicação ao segmento de filtragem de água, atendendo famílias e empresas em{" "}
              {site.region}.
            </p>
            <p>
              A PH Filtros acredita que oferecer uma boa solução vai além de vender um produto. É entender a necessidade de cada cliente e proporcionar um
              atendimento baseado em experiência e qualidade.
            </p>
            {/* ⚠️ Espaço reservado para a história real da empresa (fundação, fotos antigas, marcos). Não inventar. */}
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-7xl gap-6 px-5 md:grid-cols-3 md:px-8">
          {values.map((v, i) => (
            <div key={v.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 90}ms` }} className="rounded-3xl bg-ice p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand">
                <Icon name={v.icon} className="size-6" />
              </span>
              <h2 className="font-display mt-6 text-xl font-semibold text-ink">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-slate">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Services />
      <FinalCta />
    </>
  );
}
