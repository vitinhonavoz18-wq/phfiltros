import type { Campaign } from "@/config/campaigns";
import { site } from "@/config/site";
import { HeroVisual } from "@/components/visuals/HeroVisual";
import { WaterCanvas } from "@/components/visuals/WaterCanvas";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { Countdown } from "./Countdown";
import { PromoSeal } from "./PromoSeal";

/** Hero da campanha: substitui o hero original apenas durante o período promocional. */
export function CampaignHero({ campaign }: { campaign: Campaign }) {
  const t = campaign.texts;
  return (
    <section
      id="black-friday"
      aria-labelledby="bf-title"
      className="cmp-on grain relative isolate overflow-hidden bg-[var(--cmp-surface)] pt-[calc(72px+var(--promo-h))] text-white"
    >
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(75%_70%_at_78%_38%,rgba(0,123,219,.38)_0%,rgba(4,20,38,.55)_38%,transparent_70%),linear-gradient(180deg,#050608_0%,#0b0e13_60%,#050608_100%)]" />
      <div aria-hidden className="bf-grid absolute inset-0 -z-10 opacity-[.35]" />
      <WaterCanvas className="-z-10 opacity-60 mix-blend-screen" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-b from-transparent to-[var(--cmp-surface)]" />

      <div className="mx-auto grid min-h-[calc(100svh-72px-var(--promo-h))] max-w-7xl items-center gap-10 px-5 pb-16 pt-8 md:px-8 lg:grid-cols-[1.12fr_.88fr] lg:pb-20">
        <div className="relative z-10">
          <p className="reveal-fade inline-flex items-center gap-3 rounded-full border border-white/12 bg-white/[.04] py-1.5 pl-2 pr-4 backdrop-blur-sm" style={{ animationDelay: "60ms" }}>
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--cmp-accent)] opacity-60" />
              <span className="relative inline-flex size-2.5 rounded-full bg-[var(--cmp-accent)]" />
            </span>
            <span className="eyebrow text-[0.7rem] text-white">Oferta por tempo limitado</span>
            <span className="hidden text-xs text-white/55 sm:inline">· há mais de {site.yearsOfExperience} anos no mercado</span>
          </p>

          <h1 id="bf-title" className="mt-7">
            <span className="sr-only">
              {t.eyebrow}: {t.title} {t.headline}
            </span>
            <span aria-hidden className="reveal-line font-display text-[clamp(1rem,2.2vw,1.35rem)] font-semibold uppercase tracking-[0.32em] text-white/75">
              <span style={{ animationDelay: "120ms" }}>{t.eyebrow}</span>
            </span>
            <span aria-hidden className="reveal-line">
              <span className="bf-chrome font-display whitespace-nowrap text-[clamp(4.2rem,16vw,8.4rem)] font-bold leading-[.95] tracking-[-0.055em]" style={{ animationDelay: "220ms" }}>
                {t.title}
              </span>
            </span>
            <span aria-hidden className="reveal-line font-display text-[clamp(1.5rem,3.6vw,2.6rem)] font-semibold uppercase leading-tight tracking-[-0.01em]">
              <span style={{ animationDelay: "360ms" }}>
                {t.headline.split(" ").slice(0, -1).join(" ")} <span className="text-[var(--cmp-accent)]">{t.headline.split(" ").slice(-1)}</span>
              </span>
            </span>
          </h1>

          <p className="reveal-fade mt-6 max-w-xl text-[1.05rem] leading-relaxed text-white/72 md:text-lg" style={{ animationDelay: "520ms" }}>
            {t.subtitle}
          </p>

          <div className="reveal-fade mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6" style={{ animationDelay: "640ms" }}>
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-white">
              <Icon name="clock" className="size-5 text-[var(--cmp-accent)]" />
              {t.urgency}
            </p>
            <Countdown endsAt={campaign.endsAt} label={`A promoção termina em ${campaign.endsLabel}`} />
          </div>

          <div className="reveal-fade mt-9 flex flex-col gap-3 sm:flex-row" style={{ animationDelay: "760ms" }}>
            <WhatsAppLink location="bf_hero" label={t.primaryCta} className="btn btn-bf min-h-14 px-7 text-base sm:whitespace-nowrap">
              <WhatsAppGlyph className="size-5" />
              {t.primaryCta}
            </WhatsAppLink>
            <a href="#solucoes" className="btn btn-ghost-dark min-h-14 px-7 text-base sm:whitespace-nowrap">
              {t.secondaryCta}
              <Icon name="arrow" className="size-4" />
            </a>
          </div>
        </div>

        <div className="reveal-fade relative mx-auto w-[min(74vw,380px)] lg:w-full" style={{ animationDelay: "300ms" }}>
          <HeroVisual />
          <PromoSeal percent={campaign.discountPercent} className="absolute -left-4 top-[30%] sm:-left-10 lg:-left-16" />
        </div>
      </div>
    </section>
  );
}
