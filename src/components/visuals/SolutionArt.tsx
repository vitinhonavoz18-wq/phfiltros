import Image from "next/image";
import { Icon } from "@/components/ui/Icon";
import type { Solution } from "@/config/content";

/**
 * Visual de cada solução. Usa a foto real quando houver (campo `image`
 * em src/config/content.ts); caso contrário, uma composição ilustrada.
 */
export function SolutionArt({ solution, priority = false, className = "" }: { solution: Solution; priority?: boolean; className?: string }) {
  if (solution.image) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <Image src={solution.image} alt={solution.imageAlt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" priority={priority} />
        <div className="absolute inset-0 bg-gradient-to-t from-abyss/70 via-transparent to-transparent" />
      </div>
    );
  }
  return (
    <div className={`relative isolate overflow-hidden bg-[radial-gradient(90%_90%_at_70%_20%,#0b4a8a_0%,#041426_55%,#020810_100%)] ${className}`} role="img" aria-label={solution.imageAlt}>
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <radialGradient id={`sa-${solution.slug}`} cx=".5" cy=".5" r=".5">
            <stop offset="0" stopColor="#00c8f5" stopOpacity=".35" />
            <stop offset="1" stopColor="#00c8f5" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="270" cy="120" r="150" fill={`url(#sa-${solution.slug})`} />
        {[60, 95, 130, 165].map((r, i) => (
          <ellipse key={r} cx="270" cy="210" rx={r * 1.4} ry={r * 0.32} fill="none" stroke="#7fe3ff" strokeOpacity={0.22 - i * 0.04} />
        ))}
        <path d="M0 250 C 80 235, 160 265, 240 248 S 360 236, 400 246 V300 H0Z" fill="#00c8f5" fillOpacity=".06" />
      </svg>
      <div className="absolute right-[12%] top-1/2 grid aspect-square w-[30%] max-w-56 -translate-y-1/2 place-items-center rounded-[28%] border border-white/15 bg-white/[.04] shadow-[inset_0_1px_0_rgba(255,255,255,.2),0_30px_60px_-20px_rgba(0,200,245,.35)] backdrop-blur-sm">
        <Icon name={solution.icon} className="size-1/2 text-white" strokeWidth={1} />
      </div>
    </div>
  );
}
