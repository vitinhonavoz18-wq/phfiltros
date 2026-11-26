"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { track } from "@/lib/analytics";

const places = [
  { value: "Minha casa", icon: "home" },
  { value: "Meu apartamento", icon: "apartment" },
  { value: "Minha empresa", icon: "building" },
  { value: "Meu condomínio", icon: "condo" },
  { value: "Outro ambiente", icon: "dots" },
];

// ⚠️ Exibir somente opções compatíveis com os serviços confirmados pela PH Filtros.
const needs = [
  { value: "Comprar um filtro", icon: "cart" },
  { value: "Trocar o refil", icon: "refresh" },
  { value: "Solicitar manutenção", icon: "wrench" },
  { value: "Instalar um equipamento", icon: "install" },
  { value: "Receber orientação", icon: "chat" },
];

const titles = ["Onde você precisa de filtragem?", "O que você procura?", "Qual sua localização?", "Tudo pronto!"];

export function QuoteWizard() {
  const [step, setStep] = useState(0);
  const [place, setPlace] = useState("");
  const [need, setNeed] = useState("");
  const [name, setName] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("Salvador");
  const [details, setDetails] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const started = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  const markStart = () => {
    if (started.current) return;
    started.current = true;
    track("quote_start", { location: "quote_wizard" });
  };

  const choose = (setter: (v: string) => void, value: string) => {
    markStart();
    setter(value);
    window.setTimeout(() => setStep((s) => s + 1), 260);
  };

  const submitLocation = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (name.trim().length < 2) errs.name = "Informe seu nome.";
    if (district.trim().length < 2) errs.district = "Informe seu bairro.";
    if (city.trim().length < 2) errs.city = "Informe sua cidade.";
    setErrors(errs);
    if (Object.keys(errs).length === 0) setStep(3);
  };

  const message = [
    "Olá! Vim pelo site da PH Filtros e gostaria de um orçamento.",
    "",
    `• Local: ${place}`,
    `• Necessidade: ${need}`,
    `• Nome: ${name.trim()}`,
    `• Bairro: ${district.trim()}`,
    `• Cidade: ${city.trim()}`,
    details.trim() ? `• Detalhes: ${details.trim().slice(0, 400)}` : "",
    "",
    "Aguardo o contato. Obrigado!",
  ]
    .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
    .join("\n");

  const reset = () => {
    setStep(0);
    setPlace("");
    setNeed("");
    setDetails("");
  };

  const progress = ((step + (step === 3 ? 1 : 0)) / 4) * 100;

  return (
    <section id="orcamento" aria-labelledby="orcamento-title" className="relative overflow-hidden bg-ice py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-8 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p data-reveal className="eyebrow text-brand">
            Orçamento em 3 passos
          </p>
          <h2 id="orcamento-title" data-reveal className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.4rem)] font-semibold leading-[1.05] text-ink">
            Encontre o filtro ideal para você.
          </h2>
          <p data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="mt-5 max-w-md text-lg leading-relaxed text-slate">
            Responda três perguntas rápidas. Sua solicitação chega organizada no nosso WhatsApp e um especialista orienta você na escolha.
          </p>
          <ul data-reveal style={{ ["--reveal-delay" as string]: "180ms" }} className="mt-8 space-y-3 text-[0.95rem] text-ink">
            {[
              ["clock", "Leva menos de 1 minuto"],
              ["chat", "Mensagem pronta para enviar no WhatsApp"],
              ["shield", "Sem compromisso"],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-white text-brand shadow-sm">
                  <Icon name={icon} className="size-4" />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal="scale" className="relative rounded-[28px] bg-white p-6 shadow-[0_40px_100px_-50px_rgba(4,20,38,.45)] ring-1 ring-ink/5 md:p-10">
          {/* Progresso */}
          <div className="flex items-center justify-between text-sm font-semibold text-slate">
            <span>{step < 3 ? `Etapa ${step + 1} de 3` : "Resumo"}</span>
            {step > 0 && (
              <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-brand hover:bg-brand/5">
                <Icon name="back" className="size-4" /> Voltar
              </button>
            )}
          </div>
          <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-ink/[.06]" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Progresso do orçamento">
            <div className="h-full rounded-full bg-gradient-to-r from-brand to-crystal transition-[width] duration-700 ease-[var(--ease-water)]" style={{ width: `${Math.max(6, progress)}%` }} />
          </div>

          <h3 ref={headingRef} tabIndex={-1} className="font-display mt-8 text-2xl font-semibold tracking-tight text-ink outline-none md:text-[1.75rem]">
            {titles[step]}
          </h3>

          <div key={step} className="reveal-fade mt-6">
            {step === 0 && <OptionGrid name="local" options={places} value={place} onChoose={(v) => choose(setPlace, v)} />}
            {step === 1 && <OptionGrid name="necessidade" options={needs} value={need} onChoose={(v) => choose(setNeed, v)} />}
            {step === 2 && (
              <form onSubmit={submitLocation} noValidate className="grid gap-4 sm:grid-cols-2">
                <Field label="Seu nome" id="q-name" value={name} onChange={setName} error={errors.name} autoComplete="given-name" className="sm:col-span-2" />
                <Field label="Bairro" id="q-district" value={district} onChange={setDistrict} error={errors.district} autoComplete="address-level3" />
                <Field label="Cidade" id="q-city" value={city} onChange={setCity} error={errors.city} autoComplete="address-level2" />
                <label htmlFor="q-details" className="sm:col-span-2">
                  <span className="text-sm font-semibold text-ink">
                    Detalhes <span className="font-normal text-slate">(opcional — ex.: modelo do seu filtro)</span>
                  </span>
                  <textarea
                    id="q-details"
                    rows={3}
                    maxLength={400}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    className="mt-2 w-full resize-none rounded-2xl border border-ink/12 bg-ice/60 px-4 py-3 text-base text-ink outline-none transition focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10"
                  />
                </label>
                <button type="submit" className="btn btn-primary sm:col-span-2">
                  Ver resumo
                  <Icon name="arrow" className="size-4" />
                </button>
              </form>
            )}
            {step === 3 && (
              <div>
                <dl className="divide-y divide-ink/[.07] rounded-2xl border border-ink/[.07] bg-ice/50 text-[0.95rem]">
                  {[
                    ["Local", place, 0],
                    ["Necessidade", need, 1],
                    ["Nome", name, 2],
                    ["Localização", `${district} — ${city}`, 2],
                  ].map(([k, v, s]) => (
                    <div key={k as string} className="flex items-center justify-between gap-4 px-5 py-3.5">
                      <dt className="text-slate">{k}</dt>
                      <dd className="flex items-center gap-3 text-right font-semibold text-ink">
                        {v}
                        <button type="button" onClick={() => setStep(s as number)} className="text-xs font-semibold text-brand underline-offset-2 hover:underline">
                          editar
                        </button>
                      </dd>
                    </div>
                  ))}
                </dl>
                <WhatsAppLink
                  location="quote_wizard"
                  label={`${place} | ${need}`}
                  message={message}
                  onClick={() => track("quote_complete", { place, need, city: city.trim() })}
                  className="btn btn-wa mt-6 min-h-14 w-full text-base"
                >
                  <WhatsAppGlyph className="size-5" />
                  Enviar pelo WhatsApp
                </WhatsAppLink>
                <p className="mt-4 text-center text-xs leading-relaxed text-slate">
                  A indicação da solução é feita pela nossa equipe após entender sua necessidade. Seus dados são usados apenas para este atendimento.
                </p>
                <button type="button" onClick={reset} className="mx-auto mt-3 block text-sm font-semibold text-brand underline-offset-4 hover:underline">
                  Começar de novo
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function OptionGrid({
  name,
  options,
  value,
  onChoose,
}: {
  name: string;
  options: { value: string; icon: string }[];
  value: string;
  onChoose: (v: string) => void;
}) {
  return (
    <fieldset>
      <legend className="sr-only">Escolha uma opção</legend>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((o) => {
          const checked = value === o.value;
          return (
            <label
              key={o.value}
              className={`group flex cursor-pointer items-center gap-4 rounded-2xl border px-4 py-4 transition-all duration-300 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-brand/20 ${
                checked ? "border-brand bg-brand/[.05] shadow-[0_10px_30px_-18px_rgba(0,123,219,.8)]" : "border-ink/10 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-ice/60"
              }`}
            >
              <input type="radio" name={name} value={o.value} checked={checked} onChange={() => onChoose(o.value)} onClick={() => checked && onChoose(o.value)} className="sr-only" />
              <span className={`grid size-11 shrink-0 place-items-center rounded-xl transition-colors ${checked ? "bg-brand text-white" : "bg-ice text-brand group-hover:bg-white"}`}>
                <Icon name={o.icon} className="size-5" />
              </span>
              <span className="font-semibold text-ink">{o.value}</span>
              <span className={`ml-auto grid size-5 place-items-center rounded-full border transition ${checked ? "border-brand bg-brand text-white" : "border-ink/20"}`}>
                {checked && <Icon name="check" className="size-3" strokeWidth={2.5} />}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  error,
  autoComplete,
  className = "",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete?: string;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={className}>
      <span className="text-sm font-semibold text-ink">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        maxLength={80}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-err` : undefined}
        className={`mt-2 h-12 w-full rounded-2xl border bg-ice/60 px-4 text-base text-ink outline-none transition focus:bg-white focus:ring-4 ${
          error ? "border-red-400 focus:ring-red-100" : "border-ink/12 focus:border-brand focus:ring-brand/10"
        }`}
      />
      {error && (
        <span id={`${id}-err`} className="mt-1.5 block text-sm text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}
