"use client";

import { useEffect } from "react";
import { campaigns, toMs } from "@/config/campaigns";
import { endCampaignNow } from "@/lib/campaign-client";

/** Se a página ficar aberta até o fim da campanha, volta sozinha ao layout original. */
export function CampaignClock() {
  useEffect(() => {
    const id = document.documentElement.getAttribute("data-campaign");
    const c = campaigns.find((x) => x.id === id);
    if (!c) return;
    const ms = toMs(c.endsAt) - Date.now();
    if (ms <= 0) {
      endCampaignNow();
      return;
    }
    // setTimeout aceita no máximo ~24,8 dias; acima disso o fim é checado na próxima visita.
    if (ms > 2_000_000_000) return;
    const t = window.setTimeout(endCampaignNow, ms + 500);
    return () => window.clearTimeout(t);
  }, []);
  return null;
}
