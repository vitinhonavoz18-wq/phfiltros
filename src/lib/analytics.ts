/**
 * Camada única de eventos de conversão.
 * Os eventos vão para o dataLayer (Google Tag Manager / GA4).
 * O Meta Pixel só recebe eventos se o visitante autorizou cookies de marketing.
 */
import { getAttribution } from "./utm";

export type ConversionEvent =
  | "whatsapp_click"
  | "quote_start"
  | "quote_complete"
  | "product_view"
  | "service_view"
  | "contact_click"
  | "phone_click"
  | "instagram_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const META_MAP: Partial<Record<ConversionEvent, string>> = {
  whatsapp_click: "Contact",
  phone_click: "Contact",
  quote_complete: "Lead",
  product_view: "ViewContent",
};

export function track(event: ConversionEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  const a = getAttribution();
  const payload = {
    event,
    ...params,
    utm_source: a.utm_source,
    utm_medium: a.utm_medium,
    utm_campaign: a.utm_campaign,
    page_path: window.location.pathname,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);

  const metaEvent = META_MAP[event];
  if (metaEvent && typeof window.fbq === "function") {
    window.fbq("track", metaEvent, { content_name: String(params.label ?? event) });
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[track]", payload);
  }
}
