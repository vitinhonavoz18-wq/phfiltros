import { HeroVisual } from "@/components/visuals/HeroVisual";
import { WaterCanvas } from "@/components/visuals/WaterCanvas";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { site } from "@/config/site";

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-abyss pt-[calc(72px+var(--promo-h))] text-white" aria-labelledby="hero-title">
      {/* Fundo cinematográfico */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(120%_80%_at_75%_30%,#0a3a6e_0%,#041426_42%,#020810_75%)]" />
      <div aria-hidden className="absolute -left-40 top-1/3 -z-10 size-[520px] rounded-full bg-brand/20 blur-[120px]" />
      <WaterCanvas className="-z-10 opacity-80 mix-blend-screen" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-abyss" />

      <div className="mx-auto grid min-h-[calc(100svh-72px-var(--promo-h))] max-w-7xl items-center gap-6 px-5 pb-16 pt-10 md:px-8 lg:grid-cols-[1.15fr_.85fr] lg:gap-10 lg:pb-24">
        <div className="relative z-10 max-w-2xl">
          <p className="reveal-fade inline-flex items-center gap-3 rounded-full border border-crystal/25 bg-crystal/[.06] py-1.5 pl-1.5 pr-4 backdrop-blur-sm" style={{ animationDelay: "80ms" }}>
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-crystal to-brand">
              <Icon name="medal" className="size-4 text-white" />
            </span>
            <span className="eyebrow text-[0.7rem] text-white/90">Mais de {site.yearsOfExperience} anos de experiência</span>
          </p>

          <h1 id="hero-title" className="font-display mt-7 text-[clamp(2.6rem,7.2vw,5.4rem)] font-semibold leading-[1.02]">
            <span className="reveal-line">
              <span style={{ animationDelay: "150ms" }}>Sua água merece mais.</span>
            </span>
            <span className="reveal-line">
              <span className="text-water" style={{ animationDelay: "300ms" }}>
                Sua família também.
              </span>
            </span>
          </h1>

          <p className="reveal-fade mt-7 max-w-xl text-[1.075rem] leading-relaxed text-white/72 md:text-lg" style={{ animationDelay: "520ms" }}>
            Há mais de {site.yearsOfExperience} anos, a PH Filtros oferece soluções em filtragem de água, unindo experiência, qualidade e atendimento
            especializado em Salvador e região.
          </p>

          <div className="reveal-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "680ms" }}>
            <WhatsAppLink location="hero" label="Solicitar meu orçamento" className="btn btn-primary min-h-14 px-7 text-base">
              <WhatsAppGlyph className="size-5" />
              Solicitar meu orçamento
            </WhatsAppLink>
            <a href="#solucoes" className="btn btn-ghost-dark min-h-14 px-7 text-base">
              Conhecer nossas soluções
              <Icon name="arrow" className="size-4" />
            </a>
          </div>

          <ul className="reveal-fade mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/60" style={{ animationDelay: "820ms" }}>
            <li className="flex items-center gap-2">
              <Icon name="pin" className="size-4 text-crystal" /> Salvador e região
            </li>
            <li className="flex items-center gap-2">
              <Icon name="headset" className="size-4 text-crystal" /> Atendimento especializado
            </li>
            <li className="flex items-center gap-2">
              <Icon name="chat" className="size-4 text-crystal" /> Orçamento pelo WhatsApp
            </li>
          </ul>
        </div>

        <div className="reveal-fade relative mx-auto w-[min(78vw,400px)] lg:w-full" style={{ animationDelay: "400ms" }}>
          <HeroVisual />
        </div>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#credibilidade"
        aria-label="Explore o site"
        className="absolute bottom-10 right-8 hidden flex-col items-center gap-3 xl:right-12 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/45 transition-colors hover:text-white lg:flex"
      >
        <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
          <span className="block h-2 w-1 rounded-full bg-crystal" style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }} />
        </span>
        Explore
      </a>
    </section>
  );
}
