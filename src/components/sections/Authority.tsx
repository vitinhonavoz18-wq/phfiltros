import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/config/site";
import { getBuildCampaign } from "@/config/campaigns";

const campaign = getBuildCampaign();

export function Authority() {
  return (
    <section id="sobre" aria-labelledby="sobre-title" className="relative overflow-hidden bg-white py-24 md:py-36">
      {/* Linhas líquidas de fundo */}
      <svg aria-hidden className="pointer-events-none absolute -right-40 top-10 h-[620px] w-[900px] text-brand/[.07]" viewBox="0 0 900 620" fill="none">
        {Array.from({ length: 9 }).map((_, i) => (
          <path key={i} d={`M0 ${120 + i * 48} C 220 ${40 + i * 48}, 420 ${220 + i * 48}, 900 ${90 + i * 48}`} stroke="currentColor" strokeWidth="1.5" />
        ))}
      </svg>

      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <div data-reveal="left" className="relative">
          <p className="eyebrow text-brand">Nossa trajetória</p>
          <div className="relative mt-4">
            <span className="font-display block select-none text-[clamp(9rem,26vw,19rem)] font-semibold leading-[.82] tracking-[-0.06em] text-water-deep" aria-hidden="true">
              {site.yearsOfExperience}+
            </span>
            <span className="sr-only">Mais de {site.yearsOfExperience} anos</span>
          </div>
          <p className="mt-6 max-w-sm border-l-2 border-crystal pl-5 text-lg font-medium leading-snug text-ink">
            anos dedicados à filtragem de água em Salvador e região.
          </p>
          {campaign && (
            <p className="cmp-on mt-6 inline-flex items-center gap-3 rounded-2xl bg-[var(--cmp-surface)] px-5 py-3.5 text-[0.95rem] font-semibold text-white shadow-[0_20px_40px_-20px_rgba(0,0,0,.6)]">
              <span className="tag-off">{campaign.discountPercent}% OFF</span>
              {campaign.texts.authority}
            </p>
          )}
        </div>

        <div>
          <h2 id="sobre-title" data-reveal className="font-display text-[clamp(2rem,4.2vw,3.3rem)] font-semibold leading-[1.06] text-ink">
            Mais de quatro décadas construindo confiança.
          </h2>
          <div data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="mt-8 space-y-5 text-[1.075rem] leading-relaxed text-slate">
            <p className="text-xl font-medium leading-snug text-ink">A qualidade de um serviço não se constrói da noite para o dia.</p>
            <p>São mais de {site.yearsOfExperience} anos de experiência, conhecimento e dedicação ao segmento de filtragem de água.</p>
            <p>
              A PH Filtros acredita que oferecer uma boa solução vai além de vender um produto. É entender a necessidade de cada cliente e proporcionar um
              atendimento baseado em experiência e qualidade.
            </p>
          </div>
          <div data-reveal style={{ ["--reveal-delay" as string]: "220ms" }} className="mt-10">
            <Link href="/a-empresa" className="btn btn-ghost-light">
              Conheça a PH Filtros
              <Icon name="arrow" className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
