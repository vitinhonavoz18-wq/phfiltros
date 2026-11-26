import { site } from "@/config/site";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { RegionMap } from "@/components/visuals/RegionMap";

export function Regional() {
  const a = site.address;
  const mapQuery = a.street ? encodeURIComponent(`${a.street}, ${a.district ? a.district + ", " : ""}${a.city} - ${a.state}`) : "";
  return (
    <section id="atendimento" aria-labelledby="atendimento-title" className="grain relative overflow-hidden bg-deep py-24 text-white md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <p data-reveal className="eyebrow text-crystal">
            Atendimento regional
          </p>
          <h2 id="atendimento-title" data-reveal className="font-display mt-4 text-[clamp(2.1rem,4.6vw,3.6rem)] font-semibold leading-[1.05]">
            Perto de você.
            <br />
            <span className="text-water">Presente em Salvador e região.</span>
          </h2>
          <p data-reveal style={{ ["--reveal-delay" as string]: "100ms" }} className="mt-6 max-w-lg text-lg leading-relaxed text-white/65">
            Conte com a experiência da PH Filtros para encontrar a solução de filtragem adequada à sua necessidade em Salvador e região.
          </p>
          <div data-reveal style={{ ["--reveal-delay" as string]: "180ms" }} className="mt-9">
            <WhatsAppLink
              location="regional"
              message="Olá! Gostaria de saber se a PH Filtros atende na minha região. Meu bairro/cidade é: "
              className="btn btn-primary"
            >
              <WhatsAppGlyph className="size-5" />
              Consultar atendimento na minha região
            </WhatsAppLink>
          </div>
          {a.street && (
            <p className="mt-8 flex items-start gap-3 text-white/70">
              <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-crystal" />
              {a.street}
              {a.district && ` — ${a.district}`}, {a.city}/{a.state}
            </p>
          )}
        </div>

        <div data-reveal="scale" className="relative">
          {mapQuery ? (
            <div className="overflow-hidden rounded-[28px] border border-white/10">
              <iframe
                title="Localização da PH Filtros no Google Maps"
                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="aspect-square w-full grayscale-[.3]"
              />
            </div>
          ) : (
            <div className="mx-auto max-w-[520px]">
              <RegionMap />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
