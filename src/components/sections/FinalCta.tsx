import Image from "next/image";
import { site } from "@/config/site";
import { WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { WaterCanvas } from "@/components/visuals/WaterCanvas";

export function FinalCta() {
  return (
    <section aria-labelledby="cta-final-title" className="grain relative isolate overflow-hidden bg-abyss py-28 text-white md:py-40">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_70%_at_50%_100%,#0a5bb0_0%,#041426_55%,#020810_100%)]" />
      <WaterCanvas className="-z-10 opacity-90 mix-blend-screen" scale={6} intensity={1.2} />
      <div aria-hidden className="absolute left-1/2 top-1/2 -z-10 size-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crystal/10 blur-[120px]" />

      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
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
    </section>
  );
}
