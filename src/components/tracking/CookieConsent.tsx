"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { tracking } from "@/config/site";
import { CONSENT_OPEN_EVENT, readConsent, saveConsent } from "./consent";

const hasTracking = Boolean(tracking.gtmId || tracking.ga4Id || tracking.metaPixelId);

/** Banner de consentimento (LGPD). Só aparece se houver ferramentas de medição configuradas. */
export function CookieConsent() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    if (hasTracking && !readConsent()) setOpen(true);
    const reopen = () => {
      const c = readConsent();
      setAnalytics(c?.analytics ?? true);
      setMarketing(c?.marketing ?? false);
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  if (!open) return null;

  const done = (a: boolean, m: boolean) => {
    saveConsent({ analytics: a, marketing: m });
    setOpen(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="cookie-title"
      className="fixed inset-x-3 bottom-[5.25rem] z-[70] mx-auto max-w-xl rounded-2xl border border-white/10 bg-deep/95 p-5 text-white shadow-[0_30px_80px_-20px_rgba(0,0,0,.8)] backdrop-blur-xl md:bottom-6 md:left-6 md:right-auto"
    >
      <h2 id="cookie-title" className="font-display text-base font-semibold">
        Sua privacidade importa
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/70">
        Usamos cookies para entender como o site é utilizado e melhorar nossos anúncios. Você escolhe o que autorizar.{" "}
        <Link href="/politica-de-privacidade" className="text-crystal underline underline-offset-2">
          Política de privacidade
        </Link>
      </p>

      {custom && (
        <div className="mt-4 space-y-3 rounded-xl border border-white/10 p-3 text-sm">
          <label className="flex items-center justify-between gap-4">
            <span>
              <strong className="block font-semibold">Necessários</strong>
              <span className="text-white/60">Funcionamento básico do site.</span>
            </span>
            <input type="checkbox" checked disabled className="size-4 accent-crystal" />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span>
              <strong className="block font-semibold">Estatísticas</strong>
              <span className="text-white/60">Medição de visitas (Google Analytics).</span>
            </span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} className="size-4 accent-crystal" />
          </label>
          <label className="flex cursor-pointer items-center justify-between gap-4">
            <span>
              <strong className="block font-semibold">Marketing</strong>
              <span className="text-white/60">Anúncios do Google e Meta/Instagram.</span>
            </span>
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className="size-4 accent-crystal" />
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        {custom ? (
          <button type="button" onClick={() => done(analytics, marketing)} className="btn btn-primary min-h-11 px-5 text-sm">
            Salvar preferências
          </button>
        ) : (
          <>
            <button type="button" onClick={() => done(true, true)} className="btn btn-primary min-h-11 px-5 text-sm">
              Aceitar todos
            </button>
            <button type="button" onClick={() => done(false, false)} className="btn btn-ghost-dark min-h-11 px-5 text-sm">
              Somente necessários
            </button>
            <button type="button" onClick={() => setCustom(true)} className="min-h-11 px-3 text-sm font-semibold text-white/70 underline-offset-4 hover:text-white hover:underline">
              Personalizar
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function CookiePreferencesButton({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_OPEN_EVENT))}>
      Preferências de cookies
    </button>
  );
}
