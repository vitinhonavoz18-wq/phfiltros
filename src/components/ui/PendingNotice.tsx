"use client";

import { useEffect, useState } from "react";
import { WA_PENDING_EVENT } from "./WhatsAppLink";
import { Icon } from "./Icon";

/**
 * Aviso exibido somente enquanto o número de WhatsApp não foi configurado
 * em src/config/site.ts. Evita que o botão leve a um número errado.
 */
export function PendingNotice() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const show = () => {
      setOpen(true);
      clearTimeout(timer);
      timer = setTimeout(() => setOpen(false), 5000);
    };
    window.addEventListener(WA_PENDING_EVENT, show);
    return () => {
      window.removeEventListener(WA_PENDING_EVENT, show);
      clearTimeout(timer);
    };
  }, []);
  if (!open) return null;
  return (
    <div role="status" className="fixed inset-x-4 top-24 z-[80] mx-auto max-w-md rounded-2xl border border-white/10 bg-deep/95 p-4 text-sm text-white shadow-2xl backdrop-blur-md">
      <div className="flex items-start gap-3">
        <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-crystal" />
        <p>
          <strong className="font-semibold">Nosso WhatsApp está sendo configurado.</strong>
          <br />
          <span className="text-white/70">Em breve você poderá falar com a PH Filtros por aqui.</span>
        </p>
      </div>
    </div>
  );
}
