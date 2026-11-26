"use client";

import { useEffect, useRef, useState } from "react";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { Icon } from "@/components/ui/Icon";

const steps = [
  {
    title: "Entrada da água",
    text: "A água da rede chega ao filtro trazendo o que encontrou pelo caminho, como sedimentos e partículas.",
  },
  {
    title: "Passagem pelo elemento filtrante",
    text: "Ela atravessa as camadas filtrantes, que variam conforme o modelo — como mantas, carvão ativado e outros elementos.",
  },
  {
    title: "Retenção das partículas",
    text: "Partículas compatíveis com o elemento filtrante ficam retidas. Por isso o refil precisa ser trocado no prazo indicado.",
  },
  {
    title: "Saída da água filtrada",
    text: "A água segue para o seu copo com melhor aspecto, sabor e odor, de acordo com a capacidade de cada filtro.",
  },
];

// Geometria do visual (viewBox 0 0 360 540)
const TOP = 70;
const MEDIA_TOP = 250;
const MEDIA_BOTTOM = 322;
const BOTTOM = 492;
const LEFT = 64;
const RIGHT = 296;

type P = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  kind: "imp" | "water";
  state: "idle" | "fall" | "stuck" | "pass" | "out";
  t: number;
  tx: number;
  color: string;
};

const IMP_COLORS = ["#c99a5b", "#a8794a", "#8e9aa6", "#b9a27a"];

export function FiltrationExperience() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const levelRef = useRef<SVGRectElement>(null);
  const progressRef = useRef(0);
  const [step, setStep] = useState(0);
  const [reduced, setReduced] = useState(false);

  // Progresso conforme a rolagem
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      progressRef.current = 1;
      setStep(3);
      return;
    }
    const wrap = wrapRef.current;
    if (!wrap) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const r = wrap.getBoundingClientRect();
      const total = r.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, total)));
      progressRef.current = p;
      setStep(Math.min(3, Math.floor(p * 4)));
      if (levelRef.current) {
        const fill = Math.min(1, Math.max(0, (p - 0.5) / 0.45));
        const h = 12 + fill * (BOTTOM - MEDIA_BOTTOM - 20);
        levelRef.current.setAttribute("y", String(BOTTOM - h));
        levelRef.current.setAttribute("height", String(h));
      }
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Sistema de partículas (atualiza o SVG diretamente, sem re-render)
  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || reduced) return;
    const nodes = Array.from(svg.querySelectorAll<SVGCircleElement>("[data-p]"));
    const ps: P[] = nodes.map((_, i) => ({
      x: 180,
      y: TOP,
      vx: 0,
      vy: 0,
      r: 2,
      kind: i % 5 < 3 ? "imp" : "water",
      state: "idle",
      t: Math.random() * 3000,
      tx: 180,
      color: "#fff",
    }));

    const spawn = (p: P) => {
      p.x = 172 + Math.random() * 16;
      p.y = TOP - 6;
      p.tx = LEFT + 18 + Math.random() * (RIGHT - LEFT - 36);
      p.vy = 0.5 + Math.random() * 0.5;
      p.vx = 0;
      p.state = "fall";
      if (p.kind === "imp") {
        p.r = 1.8 + Math.random() * 2.4;
        p.color = IMP_COLORS[Math.floor(Math.random() * IMP_COLORS.length)];
      } else {
        p.r = 1.4 + Math.random() * 1.2;
        p.color = "#9fdcf5";
      }
    };

    let raf = 0;
    let running = false;
    let last = performance.now();
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(48, now - last) / 16.67;
      last = now;
      const prog = progressRef.current;
      const flow = prog > 0.01 ? 1 : 0.35;
      for (let i = 0; i < ps.length; i++) {
        const p = ps[i];
        const n = nodes[i];
        if (p.state === "idle") {
          p.t -= 16.67 * dt * flow;
          if (p.t <= 0) spawn(p);
          n.setAttribute("opacity", "0");
          continue;
        }
        if (p.state === "fall") {
          p.vx += (p.tx - p.x) * 0.0016 * dt;
          p.vx *= 0.96;
          p.x += p.vx * dt + Math.sin((now / 700) + i) * 0.15;
          p.y += p.vy * dt;
          if (p.y >= MEDIA_TOP - p.r) {
            if (p.kind === "imp") {
              p.state = "stuck";
              p.y = MEDIA_TOP - p.r - Math.random() * 7;
              p.t = 5000 + Math.random() * 4000;
            } else {
              p.state = "pass";
            }
          }
        } else if (p.state === "stuck") {
          p.t -= 16.67 * dt;
          if (p.t <= 0) {
            p.state = "idle";
            p.t = 400 + Math.random() * 2600;
          }
        } else if (p.state === "pass") {
          p.y += 0.28 * dt;
          p.x += Math.sin(now / 300 + i) * 0.2;
          if (p.y > MEDIA_BOTTOM) {
            p.state = "out";
            p.color = "#d9f7ff";
            p.vy = 0.9;
          }
        } else if (p.state === "out") {
          p.y += p.vy * dt;
          p.x += (RIGHT - 30 - p.x) * 0.006 * dt;
          if (p.y > BOTTOM - 14) {
            p.state = "idle";
            p.t = 300 + Math.random() * 2400;
          }
        }
        let op = 1;
        if (p.state === "stuck") op = Math.min(1, p.t / 800);
        if (p.state === "pass") op = 0.45;
        n.setAttribute("cx", p.x.toFixed(1));
        n.setAttribute("cy", p.y.toFixed(1));
        n.setAttribute("r", p.r.toFixed(1));
        n.setAttribute("fill", p.color);
        n.setAttribute("opacity", op.toFixed(2));
      }
    };
    const start = () => {
      if (running) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: "100px" });
    io.observe(svg);
    return () => {
      stop();
      io.disconnect();
    };
  }, [reduced]);

  const goTo = (i: number) => {
    const wrap = wrapRef.current;
    if (!wrap || reduced) return;
    const total = wrap.offsetHeight - window.innerHeight;
    const top = wrap.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + total * ((i + 0.5) / 4), behavior: "smooth" });
  };

  const zoneOpacity = (i: number) => (step === i ? 1 : 0);

  return (
    <section id="como-funciona" aria-labelledby="filtragem-title" className="relative overflow-clip bg-abyss text-white">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 pt-24 md:px-8 md:pt-32">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <div data-reveal>
            <p className="eyebrow text-crystal">Conheça o poder da filtragem</p>
            <h2 id="filtragem-title" className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05]">
              A qualidade da água começa pelo <span className="text-water">filtro certo.</span>
            </h2>
          </div>
          <p data-reveal style={{ ["--reveal-delay" as string]: "120ms" }} className="max-w-lg text-lg leading-relaxed text-white/65 lg:justify-self-end">
            Cada ambiente possui necessidades diferentes. Conheça soluções de filtragem adequadas à sua rotina e conte com orientação especializada para escolher a
            melhor opção.
          </p>
        </div>
      </div>

      <div ref={wrapRef} className={reduced ? "" : "relative h-[320vh]"}>
        <div className={reduced ? "py-16" : "sticky top-0 flex h-[100svh] items-center pt-[72px]"}>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-4 px-5 md:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            {/* Etapas */}
            <ol className="order-2 lg:order-1" aria-label="Etapas da filtragem">
              {steps.map((s, i) => {
                const on = reduced || step === i;
                const done = step > i;
                return (
                  <li key={s.title} className={`${!reduced && step !== i ? "hidden lg:block" : ""}`}>
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-current={step === i ? "step" : undefined}
                      className={`group flex w-full gap-5 border-l py-4 pl-6 text-left transition-all duration-500 lg:py-5 ${
                        on ? "border-crystal" : done ? "border-crystal/40" : "border-white/10"
                      }`}
                    >
                      <span
                        className={`font-display grid size-9 shrink-0 place-items-center rounded-full border text-sm font-semibold transition-all duration-500 ${
                          on ? "border-crystal bg-crystal text-abyss" : "border-white/20 text-white/50"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <span>
                        <span className={`block font-display text-lg font-semibold tracking-tight transition-colors lg:text-xl ${on ? "text-white" : "text-white/45"}`}>
                          {s.title}
                        </span>
                        <span
                          className={`block overflow-hidden text-[0.95rem] leading-relaxed text-white/65 transition-all duration-700 ${
                            on ? "mt-2 max-h-40 opacity-100" : "max-h-0 opacity-0"
                          }`}
                        >
                          {s.text}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
              <li className="hidden pt-8 lg:block">
                <WhatsAppLink
                  location="filtration_section"
                  message="Olá! Vi no site como funciona a filtragem e gostaria de ajuda para escolher o filtro certo."
                  className="btn btn-ghost-dark"
                >
                  Quero ajuda para escolher
                  <Icon name="arrow" className="size-4" />
                </WhatsAppLink>
              </li>
            </ol>

            {/* Visual em corte */}
            <div className="order-1 mx-auto w-full max-w-[min(440px,46svh)] lg:order-2 lg:max-w-[min(520px,72svh)]">
              <svg ref={svgRef} viewBox="-30 0 450 540" className="h-auto w-full" role="img" aria-label="Ilustração do caminho da água dentro de um filtro">
                <defs>
                  <linearGradient id="fx-raw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#2f5a73" stopOpacity=".55" />
                    <stop offset="1" stopColor="#3b5f6e" stopOpacity=".75" />
                  </linearGradient>
                  <linearGradient id="fx-clean" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#00c8f5" stopOpacity=".6" />
                    <stop offset="1" stopColor="#007bdb" stopOpacity=".55" />
                  </linearGradient>
                  <pattern id="fx-l1" width="10" height="10" patternUnits="userSpaceOnUse">
                    <rect width="10" height="10" fill="#cfd9e2" fillOpacity=".18" />
                    <path d="M0 5h10" stroke="#e6eef5" strokeOpacity=".35" />
                  </pattern>
                  <pattern id="fx-l2" width="8" height="8" patternUnits="userSpaceOnUse">
                    <rect width="8" height="8" fill="#0d1c2b" />
                    <circle cx="2" cy="2" r="1.4" fill="#2b3d50" />
                    <circle cx="6" cy="5.5" r="1.7" fill="#1c2c3d" />
                  </pattern>
                  <pattern id="fx-l3" width="6" height="12" patternUnits="userSpaceOnUse">
                    <rect width="6" height="12" fill="#dfeaf3" fillOpacity=".14" />
                    <path d="M3 0v12" stroke="#e6f6ff" strokeOpacity=".35" />
                  </pattern>
                  <clipPath id="fx-house">
                    <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={BOTTOM - TOP} rx="28" />
                  </clipPath>
                  <linearGradient id="fx-glass" x1="0" x2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity=".12" />
                    <stop offset=".2" stopColor="#fff" stopOpacity=".02" />
                    <stop offset=".85" stopColor="#fff" stopOpacity=".02" />
                    <stop offset="1" stopColor="#fff" stopOpacity=".1" />
                  </linearGradient>
                </defs>

                {/* Tubo de entrada */}
                <rect x="166" y="0" width="28" height={TOP + 4} fill="#0c2034" stroke="#9fdcf5" strokeOpacity=".3" />
                <rect x="172" y="0" width="16" height={TOP + 4} fill="url(#fx-raw)" />

                <g clipPath="url(#fx-house)">
                  <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={MEDIA_TOP - TOP} fill="url(#fx-raw)" />
                  <rect x={LEFT} y={MEDIA_TOP} width={RIGHT - LEFT} height="22" fill="url(#fx-l1)" />
                  <rect x={LEFT} y={MEDIA_TOP + 22} width={RIGHT - LEFT} height="30" fill="url(#fx-l2)" />
                  <rect x={LEFT} y={MEDIA_TOP + 52} width={RIGHT - LEFT} height={MEDIA_BOTTOM - MEDIA_TOP - 52} fill="url(#fx-l3)" />
                  <rect x={LEFT} y={MEDIA_BOTTOM} width={RIGHT - LEFT} height={BOTTOM - MEDIA_BOTTOM} fill="#041426" />
                  <rect
                    ref={levelRef}
                    x={LEFT}
                    y={reduced ? MEDIA_BOTTOM + 8 : BOTTOM - 12}
                    width={RIGHT - LEFT}
                    height={reduced ? BOTTOM - MEDIA_BOTTOM - 8 : 12}
                    fill="url(#fx-clean)"
                  />

                  {/* Destaques por etapa */}
                  <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={MEDIA_TOP - TOP} fill="#00c8f5" opacity={zoneOpacity(0) * 0.1} className="transition-opacity duration-700" />
                  <rect x={LEFT} y={MEDIA_TOP} width={RIGHT - LEFT} height={MEDIA_BOTTOM - MEDIA_TOP} fill="#00c8f5" opacity={zoneOpacity(1) * 0.18} className="transition-opacity duration-700" />
                  <rect x={LEFT} y={MEDIA_TOP - 16} width={RIGHT - LEFT} height="20" fill="#ffc56b" opacity={zoneOpacity(2) * 0.16} className="transition-opacity duration-700" />
                  <rect x={LEFT} y={MEDIA_BOTTOM} width={RIGHT - LEFT} height={BOTTOM - MEDIA_BOTTOM} fill="#7fe3ff" opacity={zoneOpacity(3) * 0.12} className="transition-opacity duration-700" />

                  {/* Partículas */}
                  {Array.from({ length: 64 }).map((_, i) => (
                    <circle key={i} data-p r="2" cx="180" cy={TOP} opacity="0" />
                  ))}

                  <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={BOTTOM - TOP} fill="url(#fx-glass)" />
                  <rect x={LEFT + 14} y={TOP} width="8" height={BOTTOM - TOP} fill="#fff" fillOpacity=".07" />
                </g>
                <rect x={LEFT} y={TOP} width={RIGHT - LEFT} height={BOTTOM - TOP} rx="28" stroke="#bfefff" strokeOpacity=".3" fill="none" />

                {/* Saída */}
                <path d={`M${RIGHT} ${BOTTOM - 40} h36 a10 10 0 0 1 10 10 v26`} stroke="#0c2034" strokeWidth="18" fill="none" strokeLinecap="round" />
                <path d={`M${RIGHT} ${BOTTOM - 40} h36 a10 10 0 0 1 10 10 v26`} stroke="#00c8f5" strokeOpacity={step === 3 || reduced ? 0.9 : 0.25} strokeWidth="8" fill="none" strokeLinecap="round" className="transition-all duration-700" />
                <path
                  d={`M${RIGHT + 46} ${BOTTOM - 2}c3 4 5 7 5 9.5a5 5 0 0 1-10 0c0-2.5 2-5.5 5-9.5Z`}
                  fill="#7fe3ff"
                  opacity={step === 3 || reduced ? 1 : 0}
                  className="transition-opacity duration-700"
                  style={{ animation: "float 2.2s ease-in-out infinite" }}
                />

                {/* Rótulos */}
                {[
                  { y: TOP + 40, label: "Entrada", i: 0 },
                  { y: MEDIA_TOP + 36, label: "Elemento filtrante", i: 1 },
                  { y: MEDIA_TOP - 8, label: "Retenção", i: 2 },
                  { y: BOTTOM - 70, label: "Água filtrada", i: 3 },
                ].map((l) => {
                  const on = reduced || step === l.i;
                  const left = l.i === 2;
                  return (
                    <g key={l.label} opacity={on ? 1 : 0.28} className="transition-opacity duration-700">
                      <line x1={left ? LEFT - 4 : RIGHT - 6} x2={left ? LEFT - 4 : RIGHT + 4} y1={l.y} y2={l.y} stroke="#7fe3ff" />
                      <circle cx={left ? LEFT + 6 : RIGHT - 10} cy={l.y} r="3" fill="#7fe3ff" />
                      <text
                        x={left ? LEFT - 10 : RIGHT + 10}
                        y={l.y + 4}
                        textAnchor={left ? "end" : "start"}
                        fill="#e6f9ff"
                        fontSize="12"
                        fontWeight="600"
                        fontFamily="var(--font-manrope)"
                      >
                        {l.label}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </div>

      <p className="mx-auto max-w-7xl px-5 pb-20 text-xs leading-relaxed text-white/60 md:px-8">
        Ilustração simplificada para fins explicativos. A capacidade de retenção varia conforme o tipo de filtro, o refil e as especificações do fabricante.
      </p>
    </section>
  );
}
