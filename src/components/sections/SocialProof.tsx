import { testimonials } from "@/config/content";
import { site } from "@/config/site";
import { Icon } from "@/components/ui/Icon";
import { TrackedLink } from "@/components/ui/TrackedLink";

/**
 * Prova social. Só é exibida quando houver depoimentos reais cadastrados
 * em src/config/content.ts ou o link das avaliações do Google.
 */
export function SocialProof() {
  if (testimonials.length === 0 && !site.googleReviewsUrl) return null;
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="relative overflow-hidden bg-ice py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="eyebrow text-brand">Prova social</p>
            <h2 id="depoimentos-title" className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05] text-ink">
              Confiança que atravessa gerações.
            </h2>
          </div>
          {site.googleReviewsUrl && (
            <TrackedLink href={site.googleReviewsUrl} event="contact_click" location="google_reviews" external className="btn btn-ghost-light self-start md:self-auto">
              Ver avaliações no Google
              <Icon name="arrowUpRight" className="size-4" />
            </TrackedLink>
          )}
        </div>

        {testimonials.length > 0 && (
          <div className="no-scrollbar -mx-5 mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {testimonials.map((t, i) => (
              <figure
                key={i}
                data-reveal
                style={{ ["--reveal-delay" as string]: `${i * 90}ms` }}
                className={`w-[85%] shrink-0 snap-center rounded-[24px] p-8 md:w-auto ${i % 3 === 1 ? "bg-deep text-white md:-translate-y-6" : "bg-white text-ink"}`}
              >
                {t.rating && (
                  <div className="flex gap-1 text-[#f5b800]" aria-label={`${t.rating} de 5 estrelas`}>
                    {Array.from({ length: t.rating }).map((_, k) => (
                      <svg key={k} viewBox="0 0 20 20" className="size-4" fill="currentColor" aria-hidden>
                        <path d="m10 1.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.8l-5.2 2.8 1-5.8L1.5 7.7l5.9-.9L10 1.5Z" />
                      </svg>
                    ))}
                  </div>
                )}
                <blockquote className="mt-5 text-lg leading-relaxed">“{t.text}”</blockquote>
                <figcaption className="mt-6 text-sm">
                  <strong className="block font-semibold">{t.name}</strong>
                  <span className="opacity-60">{t.source}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
