import { Icon } from "@/components/ui/Icon";
import { GlassVisual } from "@/components/visuals/GlassVisual";

const benefits = [
  { icon: "bolt", title: "Mais praticidade", text: "Água filtrada no ponto de uso, sem carregar galões." },
  { icon: "taste", title: "Melhor sabor e odor", text: "Filtros com carvão ativado ajudam a reduzir cloro e odores, conforme o modelo." },
  { icon: "particles", title: "Redução de partículas", text: "O elemento filtrante retém sedimentos compatíveis com sua especificação." },
  { icon: "family", title: "Conforto para a família", text: "Mais vontade de beber água no dia a dia, para todas as idades." },
  { icon: "coin", title: "Possibilidade de economia", text: "Pode reduzir a compra recorrente de água engarrafada." },
  { icon: "tool", title: "Manutenção simples", text: "Trocas de refil programadas, com orientação de quem entende." },
];

export function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center lg:gap-20">
          <div className="relative order-2 lg:order-1">
            <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(closest-side,#dff3ff,transparent)]" />
            <div data-reveal="scale" className="relative mx-auto max-w-[360px]">
              <GlassVisual />
            </div>

          </div>

          <div className="order-1 lg:order-2">
            <p data-reveal className="eyebrow text-brand">
              Benefícios
            </p>
            <h2 id="beneficios-title" data-reveal className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05] text-ink">
              Qualidade da água é <span className="text-water-deep">qualidade de vida.</span>
            </h2>
            <p data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="mt-5 max-w-xl text-lg leading-relaxed text-slate">
              Um bom filtro muda pequenos momentos do dia: o café da manhã, a garrafinha das crianças, o copo d’água depois do trabalho.
            </p>

            <ul className="mt-12 grid gap-x-10 gap-y-9 sm:grid-cols-2">
              {benefits.map((b, i) => (
                <li key={b.title} data-reveal style={{ ["--reveal-delay" as string]: `${i * 70}ms` }} className="flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-ice to-mist text-brand">
                    <Icon name={b.icon} className="size-6" />
                  </span>
                  <span>
                    <strong className="block font-display text-lg font-semibold tracking-tight text-ink">{b.title}</strong>
                    <span className="mt-1 block leading-relaxed text-slate">{b.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xs text-slate">Os benefícios variam conforme o modelo do equipamento e as especificações do fabricante.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
