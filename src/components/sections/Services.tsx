import { services } from "@/config/content";
import { Icon } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { ViewTracker } from "@/components/tracking/ViewTracker";

export function Services() {
  return (
    <section id="servicos" aria-labelledby="servicos-title" className="grain relative overflow-hidden bg-deep py-24 text-white md:py-32">
      <ViewTracker event="service_view" label="servicos_home" />
      <div aria-hidden className="absolute -right-32 -top-32 size-[480px] rounded-full bg-brand/25 blur-[140px]" />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-crystal">Serviços</p>
            <h2 id="servicos-title" className="font-display mt-4 max-w-3xl text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05]">
              Cuidado com a sua água em cada detalhe.
            </h2>
          </div>
          <p data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="max-w-sm text-white/60">
            Do primeiro contato à manutenção, um atendimento que acompanha o seu equipamento.
          </p>
        </div>

        <ul className="mt-14 border-t border-white/10">
          {services.map((s, i) => (
            <li key={s.slug} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }} className="group relative border-b border-white/10">
              <span aria-hidden className="absolute inset-y-0 left-0 w-0 bg-gradient-to-r from-crystal/[.09] to-transparent transition-all duration-700 group-hover:w-full" />
              <div className="relative grid gap-4 py-7 md:grid-cols-[3.5rem_minmax(0,1fr)_minmax(0,1.3fr)_auto] md:items-center md:gap-8 md:py-8">
                <span className="font-display hidden text-sm font-semibold tabular-nums text-white/30 md:block">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="flex items-center gap-4 font-display text-xl font-semibold tracking-tight md:text-2xl">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/[.04] text-crystal transition-colors duration-500 group-hover:border-crystal/40">
                    <Icon name={s.icon} className="size-5" />
                  </span>
                  {s.name}
                </h3>
                <p className="leading-relaxed text-white/60">{s.description}</p>
                <WhatsAppLink
                  location="service_row"
                  label={s.name}
                  message={s.whatsappMessage}
                  interest={s.name}
                  className="inline-flex items-center gap-2 justify-self-start rounded-full border border-white/15 px-5 py-3 text-sm font-semibold transition-all duration-500 hover:border-crystal hover:bg-crystal hover:text-abyss md:justify-self-end"
                >
                  Solicitar
                  <Icon name="arrowUpRight" className="size-4" />
                </WhatsAppLink>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
