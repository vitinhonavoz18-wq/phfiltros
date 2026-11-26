import { CountUp } from "@/components/ui/CountUp";
import { Icon } from "@/components/ui/Icon";
import { site } from "@/config/site";

const items = [
  { icon: "headset", title: "Atendimento especializado", text: "Orientação de quem entende de filtragem." },
  { icon: "pin", title: "Salvador e região", text: "Atendimento perto de você." },
  { icon: "drop", title: "Soluções em filtragem", text: "Para casas, apartamentos e empresas." },
];

export function CredibilityBar() {
  return (
    <section id="credibilidade" aria-label="Diferenciais da PH Filtros" className="relative bg-abyss pb-20 text-white md:pb-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-white/[.08] bg-gradient-to-b from-deep to-abyss sm:grid-cols-2 lg:grid-cols-4">
          <div data-reveal className="relative flex items-center gap-5 p-7 lg:p-8">
            <span className="font-display text-water-deep text-6xl font-semibold leading-none md:text-7xl">
              <CountUp to={site.yearsOfExperience} suffix="+" />
            </span>
            <span className="text-sm font-semibold leading-snug text-white/85">
              anos de
              <br />
              mercado
            </span>
          </div>
          {items.map((it, i) => (
            <div
              key={it.title}
              data-reveal
              style={{ ["--reveal-delay" as string]: `${(i + 1) * 110}ms` }}
              className="flex items-start gap-4 border-t border-white/[.08] p-7 sm:border-l lg:border-t-0 lg:p-8 [&:nth-child(3)]:sm:border-l-0 lg:[&:nth-child(3)]:border-l"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-crystal/20 bg-crystal/[.07] text-crystal">
                <Icon name={it.icon} className="size-5" />
              </span>
              <span>
                <strong className="block font-display text-[1.02rem] font-semibold tracking-tight">{it.title}</strong>
                <span className="mt-1 block text-sm text-white/55">{it.text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
