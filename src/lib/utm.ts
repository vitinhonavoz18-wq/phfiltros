/**
 * Captura e preserva parâmetros de campanha (UTM, gclid, fbclid)
 * durante toda a visita, para identificar a origem dos leads.
 */
const KEY = "ph_attribution";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid"] as const;

export type Attribution = Partial<Record<(typeof PARAMS)[number] | "landing_page" | "referrer", string>>;

export function captureAttribution() {
  if (typeof window === "undefined") return;
  try {
    const url = new URL(window.location.href);
    const found: Attribution = {};
    PARAMS.forEach((p) => {
      const v = url.searchParams.get(p);
      if (v) found[p] = v.slice(0, 120);
    });
    const existing = getAttribution();
    // Só sobrescreve se a nova visita veio de uma campanha (último clique).
    if (Object.keys(found).length > 0 || !existing.landing_page) {
      const data: Attribution = {
        ...(Object.keys(found).length > 0 ? found : existing),
        landing_page: url.pathname,
        referrer: document.referrer ? new URL(document.referrer).hostname : existing.referrer || "",
      };
      sessionStorage.setItem(KEY, JSON.stringify(data));
    }
  } catch {
    /* navegação privada ou storage bloqueado: segue sem atribuição */
  }
}

export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}") as Attribution;
  } catch {
    return {};
  }
}

/** Texto curto anexado à mensagem do WhatsApp quando há origem de campanha. */
export function attributionTag(): string {
  const a = getAttribution();
  if (a.gclid && !a.utm_source) return "Origem: Google Ads";
  if (a.fbclid && !a.utm_source) return "Origem: Meta/Instagram";
  if (!a.utm_source) return "";
  return `Origem: ${[a.utm_source, a.utm_medium, a.utm_campaign].filter(Boolean).join(" / ")}`;
}
