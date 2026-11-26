"use client";

import { useEffect, useState } from "react";
import { toMs } from "@/config/campaigns";
import { endCampaignNow } from "@/lib/campaign-client";

type Parts = { d: number; h: number; m: number; s: number };

function diff(end: number): Parts | null {
  const ms = end - Date.now();
  if (ms <= 0) return null;
  const s = Math.floor(ms / 1000);
  return { d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 };
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * Contador regressivo real até o fim da campanha (data fixa com fuso -03:00).
 * Não reinicia ao recarregar: sempre calcula a partir do relógio atual.
 */
export function Countdown({ endsAt, variant = "boxes", label }: { endsAt: string; variant?: "boxes" | "inline"; label: string }) {
  const end = toMs(endsAt);
  const [t, setT] = useState<Parts | null | undefined>(undefined);

  useEffect(() => {
    const tick = () => {
      const p = diff(end);
      setT(p);
      if (!p) endCampaignNow();
      return p;
    };
    if (!tick()) return;
    const id = window.setInterval(() => {
      if (!tick()) window.clearInterval(id);
    }, 1000);
    return () => window.clearInterval(id);
  }, [end]);

  const v = t ?? { d: 0, h: 0, m: 0, s: 0 };
  const ready = t !== undefined;

  if (variant === "inline") {
    return (
      <span className="font-display tabular-nums" role="timer" aria-label={label}>
        <span aria-hidden="true" className={ready ? "" : "opacity-0"}>
          {v.d > 0 && `${v.d}d `}
          {pad(v.h)}:{pad(v.m)}:{pad(v.s)}
        </span>
      </span>
    );
  }

  const units: [number, string][] = [
    [v.d, v.d === 1 ? "dia" : "dias"],
    [v.h, "horas"],
    [v.m, "min"],
    [v.s, "seg"],
  ];
  return (
    <div role="timer" aria-label={label} className="flex gap-2 sm:gap-3">
      {units.map(([n, u], i) => (
        <div
          key={u}
          aria-hidden="true"
          className="relative grid w-[4.1rem] place-items-center overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[.09] to-white/[.02] py-3 shadow-[inset_0_1px_0_rgba(255,255,255,.12)] sm:w-[4.6rem]"
        >
          <span className={`font-display text-[1.7rem] font-semibold leading-none tabular-nums text-white transition-opacity sm:text-3xl ${ready ? "" : "opacity-0"}`}>
            {pad(n)}
          </span>
          <span className="mt-1.5 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/55">{u}</span>
          {i === 3 && <span className="absolute inset-x-3 bottom-0 h-px bg-gradient-to-r from-transparent via-[var(--cmp-accent)] to-transparent" />}
        </div>
      ))}
    </div>
  );
}
