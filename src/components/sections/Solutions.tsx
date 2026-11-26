"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { solutions } from "@/config/content";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { SolutionArt } from "@/components/visuals/SolutionArt";
import { track } from "@/lib/analytics";

export function Solutions() {
  const [active, setActive] = useState(0);
  const panelRef = useRef<HTMLDivElement>(null);
  const s = solutions[active];

  const select = (i: number, scroll = false) => {
    setActive(i);
    track("product_view", { label: solutions[i].name, location: "showcase" });
    if (scroll && window.innerWidth < 1024) panelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section id="solucoes" aria-labelledby="solucoes-title" className="relative bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-brand">Soluções</p>
            <h2 id="solucoes-title" className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05] text-ink">
              A solução certa para
              <br className="hidden sm:block" /> cada necessidade.
            </h2>
          </div>
          <p data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="max-w-md text-lg leading-relaxed text-slate lg:justify-self-end">
            Encontre a tecnologia de filtragem adequada para transformar a qualidade da água no seu dia a dia.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-[minmax(0,.95fr)_minmax(0,1.25fr)] lg:gap-10">
          {/* Lista de categorias */}
          <div role="tablist" aria-label="Categorias de soluções" aria-orientation="vertical" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 lg:mx-0 lg:block lg:space-y-1 lg:overflow-visible lg:px-0">
            {solutions.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.slug}
                  role="tab"
                  id={`tab-${item.slug}`}
                  aria-selected={selected}
                  aria-controls="painel-solucao"
                  onClick={() => select(i, true)}
                  className={`group relative flex shrink-0 items-center gap-4 rounded-2xl text-left transition-all duration-500 lg:w-full lg:px-5 lg:py-5 ${
                    selected
                      ? "bg-white px-4 py-3 shadow-[0_20px_50px_-25px_rgba(4,20,38,.35)]"
                      : "border border-ink/10 px-4 py-3 hover:bg-white/70 lg:border-transparent"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute left-0 top-1/2 hidden h-10 w-[3px] -translate-y-1/2 rounded-full bg-gradient-to-b from-crystal to-brand transition-opacity lg:block ${selected ? "opacity-100" : "opacity-0"}`}
                  />
                  <span className={`hidden font-display text-sm font-semibold tabular-nums lg:block ${selected ? "text-brand-600" : "text-slate"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl transition-colors ${selected ? "bg-brand text-white" : "bg-white text-brand lg:bg-ink/[.04]"}`}
                  >
                    <Icon name={item.icon} className="size-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block whitespace-nowrap font-display text-[0.98rem] font-semibold tracking-tight text-ink lg:text-lg">{item.name}</span>
                    <span className="hidden text-sm text-slate lg:block">{item.tagline}</span>
                  </span>
                  <Icon name="arrow" className={`ml-auto hidden size-5 transition-all duration-500 lg:block ${selected ? "translate-x-0 text-brand opacity-100" : "-translate-x-2 opacity-0"}`} />
                </button>
              );
            })}
          </div>

          {/* Painel de detalhe */}
          <div
            ref={panelRef}
            id="painel-solucao"
            role="tabpanel"
            aria-labelledby={`tab-${s.slug}`}
            className="scroll-mt-24 overflow-hidden rounded-[28px] bg-deep text-white shadow-[0_40px_90px_-40px_rgba(4,20,38,.6)]"
          >
            <div key={s.slug} className="reveal-fade">
              <SolutionArt solution={s} className="aspect-[16/9] w-full lg:aspect-[16/8]" />
              <div className="p-7 md:p-10">
                <div className="flex flex-wrap gap-2">
                  {s.idealFor.map((tag) => (
                    <span key={tag} className="rounded-full border border-white/15 px-3 py-1 text-xs font-semibold text-white/70">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-display mt-5 text-3xl font-semibold tracking-tight md:text-4xl">{s.name}</h3>
                <p className="mt-4 max-w-xl leading-relaxed text-white/70">{s.description}</p>
                <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                  {s.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-[0.95rem] text-white/85">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-crystal/15 text-crystal">
                        <Icon name="check" className="size-3.5" strokeWidth={2.2} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <WhatsAppLink location="solution_panel" label={s.name} message={s.whatsappMessage} className="btn btn-primary">
                    <WhatsAppGlyph className="size-5" />
                    Consultar pelo WhatsApp
                  </WhatsAppLink>
                  <Link href={`/solucoes/${s.slug}`} className="btn btn-ghost-dark">
                    Ver detalhes
                    <Icon name="arrowUpRight" className="size-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
