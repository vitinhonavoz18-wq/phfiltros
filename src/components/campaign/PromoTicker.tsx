import type { Campaign } from "@/config/campaigns";

/** Faixa contínua com as mensagens da campanha. */
export function PromoTicker({ campaign }: { campaign: Campaign }) {
  const items = [...campaign.texts.ticker, ...campaign.texts.ticker];
  return (
    <div className="cmp-on relative overflow-hidden border-y border-white/[.06] bg-[var(--cmp-surface)] py-4" aria-hidden="true">
      <div className="ticker-track flex w-max gap-10 whitespace-nowrap">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-10">
            {items.map((t, i) => (
              <span key={`${k}-${i}`} className="flex items-center gap-10 font-display text-lg font-semibold uppercase tracking-[0.08em] text-white/85 md:text-xl">
                {t}
                <svg viewBox="0 0 24 24" className="size-4 text-[var(--cmp-accent)]" fill="currentColor">
                  <path d="M12 3.5c3.2 4 5.5 7.1 5.5 10.2A5.5 5.5 0 0 1 12 19.2a5.5 5.5 0 0 1-5.5-5.5C6.5 10.6 8.8 7.5 12 3.5Z" />
                </svg>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
