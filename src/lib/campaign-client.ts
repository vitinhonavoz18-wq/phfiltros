import { campaigns, toMs, type Campaign } from "@/config/campaigns";

export const CAMPAIGN_END_EVENT = "ph:campaign-end";

/** Campanha ativa no navegador (definida pelo script do <head> e ainda dentro do prazo). */
export function liveCampaign(): Campaign | null {
  if (typeof document === "undefined") return null;
  const id = document.documentElement.getAttribute("data-campaign");
  if (!id) return null;
  const c = campaigns.find((x) => x.id === id);
  if (!c || Date.now() > toMs(c.endsAt)) return null;
  return c;
}

/** Encerra a campanha na página aberta, restaurando o layout original sem recarregar. */
export function endCampaignNow() {
  const d = document.documentElement;
  if (!d.hasAttribute("data-campaign")) return;
  d.removeAttribute("data-campaign");
  ["--cmp-accent", "--cmp-accent-soft", "--cmp-surface", "--cmp-surface-2"].forEach((v) => d.style.removeProperty(v));
  window.dispatchEvent(new CustomEvent(CAMPAIGN_END_EVENT));
}
