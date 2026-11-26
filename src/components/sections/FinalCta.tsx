import Image from "next/image";
import { site } from "@/config/site";
import { WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WaterCanvas } from "@/components/visuals/WaterCanvas";
import { getBuildCampaign } from "@/config/campaigns";
import { Countdown } from "@/components/campaign/Countdown";
import { PromoSeal } from "@/components/campaign/PromoSeal";

const campaign = getBuildCampaign();

export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="grain relative isolate overflow-hidden bg-abyss py-28 text-white md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_100%,#0a5bb0_0%,#041426_55%,#020810_100%)]" />
      <WaterCanvas className="-z-10 opacity-90 mix-blend-screen" scale={6} intensity={1.2} />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crystal/10 blur-[120px]" />

      {campaign && (
        <div aria-hidden className="cmp-on absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_100%,rgba(0,123,219,.55)_0%,rgba(5,6,8,.85)_55%,#050608_100%)]" />
      )}
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        {campaign && (
          <div className="cmp-on">
            <div data-reveal="scale" className="mx-auto w-fit">
              <PromoSeal percent={campaign.discountPercent} />
            </div>
            <p data-reveal className="eyebrow mt-10 text-[var(--cmp-accent)]">
              {campaign.texts.eyebrow}
            </p>
            <h2 data-reveal className="font-display mt-4 text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-[1.04]">
              {campaign.texts.finalTitle.replace(`${campaign.discountPercent}% OFF.`, "")}
              <span className="bf-chrome">{campaign.discountPercent}% OFF.</span>
            </h2>
            <p data-reveal className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/72">
              {campaign.texts.finalSubtitle}
            </p>
            <div data-reveal className="mt-9 flex justify-center">
              <Countdown endsAt={campaign.endsAt} label={`A promoção termina em ${campaign.endsLabel}`} />
            </div>
            <div data-reveal className="mt-10 flex flex-col items-center gap-4">
              <WhatsAppLink location="bf_final_cta" label={campaign.texts.primaryCta} className="btn btn-bf min-h-16 px-9 text-lg">
                <WhatsAppGlyph className="size-6" />
                {campaign.texts.primaryCta}
              </WhatsAppLink>
              <p className="text-sm text-white/60">{campaign.texts.urgency} Atendimento pelo WhatsApp em Salvador e região.</p>
            </div>
          </div>
        )}
        <div className="cmp-off">
        <div data-reveal="scale" className="mx-auto w-16">
          <Image src="/brand/ph-drop.webp" alt="" width={160} height={240} className="h-auto w-full animate-float drop-shadow-[0_20px_40px_rgba(0,200,245,.45)]" />
        </div>
        <h2 id="cta-final-title" data-reveal className="font-display mt-10 text-[clamp(2.2rem,5.4vw,4.4rem)] font-semibold leading-[1.04]">
          Sua próxima escolha pode transformar a <span className="text-water">qualidade da sua água.</span>
        </h2>
        <p data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/70">
          Conte com quem possui mais de {site.yearsOfExperience} anos de experiência para encontrar a solução adequada para você.
        </p>
        <div data-reveal style={{ ["--reveal-delay" as string]: "180ms" }} className="mt-11 flex flex-col items-center gap-4">
          <WhatsAppLink location="final_cta" label="Falar com um especialista" className="btn btn-primary min-h-16 px-9 text-lg">
            <WhatsAppGlyph className="size-6" />
            Falar com um especialista
          </WhatsAppLink>
          <p className="text-sm text-white/55">Solicite seu orçamento pelo WhatsApp.</p>
        </div>
        </div>
      </div>
    </section>
  );
}
