import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

export function PageHero({ eyebrow, title, intro, crumbs }: { eyebrow: string; title: React.ReactNode; intro?: string; crumbs: { href?: string; label: string }[] }) {
  return (
    <section className="grain relative isolate overflow-hidden bg-abyss pb-20 pt-36 text-white md:pb-28 md:pt-44">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(90%_80%_at_80%_0%,#0a3a6e_0%,#041426_45%,#020810_80%)]" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <nav aria-label="Você está em" className="reveal-fade">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/50">
            {crumbs.map((c, i) => (
              <li key={c.label} className="flex items-center gap-2">
                {c.href ? (
                  <Link href={c.href} className="link-flow hover:text-white">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-white/80">
                    {c.label}
                  </span>
                )}
                {i < crumbs.length - 1 && <Icon name="arrow" className="size-3.5" />}
              </li>
            ))}
          </ol>
        </nav>
        <p className="eyebrow reveal-fade mt-10 text-crystal" style={{ animationDelay: "80ms" }}>
          {eyebrow}
        </p>
        <h1 className="font-display mt-4 max-w-4xl text-[clamp(2.4rem,6vw,4.6rem)] font-semibold leading-[1.03]">
          <span className="reveal-line">
            <span style={{ animationDelay: "120ms" }}>{title}</span>
          </span>
        </h1>
        {intro && (
          <p className="reveal-fade mt-6 max-w-2xl text-lg leading-relaxed text-white/70" style={{ animationDelay: "300ms" }}>
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
