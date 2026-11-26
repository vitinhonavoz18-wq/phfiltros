import { faqs } from "@/config/content";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { JsonLd, faqJsonLd } from "@/lib/seo";

export function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="relative bg-white py-24 md:py-32">
      <JsonLd data={faqJsonLd()} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="eyebrow text-brand">
            Perguntas frequentes
          </p>
          <h2 id="duvidas-title" data-reveal className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-ink">
            Tire suas dúvidas antes de escolher.
          </h2>
          <div data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="mt-8 rounded-3xl bg-ice p-6">
            <p className="font-display text-lg font-semibold text-ink">Não encontrou sua resposta?</p>
            <p className="mt-1 text-slate">Fale direto com um especialista.</p>
            <WhatsAppLink location="faq" message="Olá! Tenho uma dúvida sobre filtros de água e gostaria de ajuda." className="btn btn-wa mt-5 min-h-12 px-5 text-sm">
              <WhatsAppGlyph className="size-5" />
              Perguntar pelo WhatsApp
            </WhatsAppLink>
          </div>
        </div>

        <div className="divide-y divide-ink/[.08] border-y border-ink/[.08]">
          {faqs.map((f, i) => (
            <details key={f.q} className="group" {...(i === 0 ? { open: true } : {})}>
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 text-left font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-brand md:text-xl">
                {f.q}
                <span className="grid size-9 shrink-0 place-items-center rounded-full border border-ink/10 text-brand transition-all duration-500 group-open:rotate-45 group-open:border-brand group-open:bg-brand group-open:text-white">
                  <Icon name="plus" className="size-4" />
                </span>
              </summary>
              <div className="faq-body">
                <div className="overflow-hidden">
                  <p className="max-w-2xl pb-7 pr-12 leading-relaxed text-slate">{f.a}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
