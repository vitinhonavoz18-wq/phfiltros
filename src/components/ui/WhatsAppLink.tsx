"use client";

import type { ReactNode, MouseEvent } from "react";
import { site } from "@/config/site";
import { track } from "@/lib/analytics";
import { whatsappUrl, isWhatsappConfigured } from "@/lib/whatsapp";

type Props = {
  message?: string;
  /** Onde o botão está (hero, header, produto...). Vai para os eventos. */
  location: string;
  label?: string;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  onClick?: () => void;
};

export const WA_PENDING_EVENT = "ph:wa-pending";

/**
 * Botão/link de WhatsApp com mensagem personalizada, origem da campanha
 * (UTM) e evento de conversão `whatsapp_click`.
 */
export function WhatsAppLink({ message = site.defaultWhatsappMessage, location, label, className, children, ariaLabel, onClick }: Props) {
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.();
    track("whatsapp_click", { location, label: label ?? location });
    if (!isWhatsappConfigured) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent(WA_PENDING_EVENT));
      return;
    }
    // Recalcula no clique para incluir a origem (UTM) capturada na visita.
    e.currentTarget.href = whatsappUrl(message);
  };

  return (
    <a
      href={whatsappUrl(message, false)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handle}
      className={className}
      aria-label={ariaLabel}
      data-wa-location={location}
    >
      {children}
    </a>
  );
}
