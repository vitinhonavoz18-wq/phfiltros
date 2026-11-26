import Link from "next/link";
import type { Campaign } from "@/config/campaigns";
import { Countdown } from "./Countdown";

/** Barra promocional fixa no topo, integrada ao cabeçalho. */
export function PromoBar({ campaign }: { campaign: Campaign }) {
  return (
    <Link
      href="/#black-friday"
      className="cmp-on promo-bar group relative flex h-[var(--promo-h)] items-center justify-center gap-3 overflow-hidden px-4 text-[0.78rem] font-semibold text-white sm:text-[0.82rem]"
    >
      <span aria-hidden className="promo-bar-sheen" />
      <span className="rounded-full bg-white px-2 py-0.5 font-display text-[0.65rem] font-bold uppercase tracking-[0.14em] text-black">Black Friday</span>
      <span className="hidden sm:inline">{campaign.texts.bar}</span>
      <span className="sm:hidden">{campaign.discountPercent}% OFF em tudo</span>
      <span aria-hidden className="h-3.5 w-px bg-white/25" />
      <span className="flex items-center gap-1.5 text-white/80">
        <span className="hidden md:inline">Termina em</span>
        <span className="text-[var(--cmp-accent)]">
          <Countdown endsAt={campaign.endsAt} variant="inline" label={`A promoção termina em ${campaign.endsLabel}`} />
        </span>
      </span>
    </Link>
  );
}
