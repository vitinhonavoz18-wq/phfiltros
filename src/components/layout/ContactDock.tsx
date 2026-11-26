"use client";

import { useEffect, useState } from "react";
import { WhatsAppGlyph, Icon } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { track } from "@/lib/analytics";

/**
 * Desktop: botão flutuante de WhatsApp.
 * Mobile: barra fixa inferior com WhatsApp + atalho para o orçamento.
 * Aparece depois que o visitante começa a rolar a página.
 */
export function ContactDock() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 420);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Desktop */}
      <div
        className={`fixed bottom-6 right-6 z-40 hidden transition-all duration-500 md:block ${
          visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
        }`}
      >
        <WhatsAppLink
          location="floating_button"
          ariaLabel="Falar com a PH Filtros pelo WhatsApp"
          className="group relative flex items-center gap-3 rounded-full bg-wa py-3 pl-3 pr-3 text-white shadow-[0_18px_40px_-12px_rgba(18,122,64,.7)] transition-all duration-500 hover:pr-5"
        >
          <span className="absolute inset-0 -z-10 rounded-full bg-wa/50 animate-pulse-ring" aria-hidden="true" />
          <span className="grid size-10 place-items-center">
            <WhatsAppGlyph className="size-7" />
          </span>
          <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-500 group-hover:max-w-48">
            Fale com um especialista
          </span>
        </WhatsAppLink>
      </div>

      {/* Mobile */}
      <div
        className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-abyss/90 px-3 pb-[max(.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 md:hidden ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex gap-2">
          <a
            href="#orcamento"
            onClick={() => track("contact_click", { location: "mobile_bar_quote" })}
            className="btn btn-ghost-dark min-h-12 flex-1 whitespace-nowrap px-3 text-sm"
          >
            <Icon name="sliders" className="size-4" />
            Orçamento
          </a>
          <WhatsAppLink location="mobile_bar" className="btn btn-wa min-h-12 flex-[1.4] whitespace-nowrap px-3 text-sm">
            <WhatsAppGlyph className="size-5" />
            Falar no WhatsApp
          </WhatsAppLink>
        </div>
      </div>
    </>
  );
}
