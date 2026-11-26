import Link from "next/link";
import Image from "next/image";
import { site, instagramUrl, phoneHref } from "@/config/site";
import { solutions } from "@/config/content";
import { navItems } from "./nav";
import { Icon, WhatsAppGlyph } from "@/components/ui/Icon";
import { WhatsAppLink } from "@/components/ui/WhatsAppLink";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { CookiePreferencesButton } from "@/components/tracking/CookieConsent";
import { getBuildCampaign } from "@/config/campaigns";

const campaign = getBuildCampaign();

export function Footer() {
  const year = new Date().getFullYear();
  const a = site.address;
  return (
    <footer className="relative overflow-hidden bg-abyss pb-28 pt-20 text-white/70 md:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-crystal/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <Link href="/" aria-label="PH Filtros — página inicial" className="inline-flex items-center gap-3">
              <Image src="/brand/ph-drop.webp" alt="" width={160} height={240} className="h-12 w-auto" />
              <Image src="/brand/ph-wordmark.webp" alt="PH Filtros" width={560} height={95} className="h-7 w-auto" />
            </Link>
            <p className="mt-6 max-w-xs text-[0.95rem] leading-relaxed">
              Há mais de {site.yearsOfExperience} anos oferecendo soluções em filtragem de água, com experiência e atendimento especializado em {site.region}.
            </p>
            <WhatsAppLink location="footer" className="btn btn-wa mt-7 min-h-12 px-5 text-sm">
              <WhatsAppGlyph className="size-5" />
              Falar no WhatsApp
            </WhatsAppLink>
          </div>

          <nav aria-label="Navegação do rodapé">
            <h2 className="eyebrow text-white/60">Navegação</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {navItems.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="link-flow hover:text-white">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/a-empresa" className="link-flow hover:text-white">
                  A empresa
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Soluções">
            <h2 className="eyebrow text-white/60">Soluções</h2>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              {solutions.map((s) => (
                <li key={s.slug}>
                  <Link href={`/solucoes/${s.slug}`} className="link-flow hover:text-white">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-white/60">Atendimento</h2>
            <ul className="mt-5 space-y-4 text-[0.95rem]">
              <li className="flex gap-3">
                <Icon name="pin" className="mt-0.5 size-5 shrink-0 text-crystal" />
                <span>
                  {a.street ? (
                    <>
                      {a.street}
                      {a.district && ` — ${a.district}`}
                      <br />
                      {a.city}/{a.state}
                    </>
                  ) : (
                    <>Atendimento em {site.region}</>
                  )}
                </span>
              </li>
              {site.openingHours && (
                <li className="flex gap-3">
                  <Icon name="clock" className="mt-0.5 size-5 shrink-0 text-crystal" />
                  <span>{site.openingHours}</span>
                </li>
              )}
              {site.phone && (
                <li className="flex gap-3">
                  <Icon name="phone" className="mt-0.5 size-5 shrink-0 text-crystal" />
                  <TrackedLink href={phoneHref} event="phone_click" location="footer" className="link-flow hover:text-white">
                    {site.phone}
                  </TrackedLink>
                </li>
              )}
              {instagramUrl && (
                <li className="flex gap-3">
                  <Icon name="instagram" className="mt-0.5 size-5 shrink-0 text-crystal" />
                  <TrackedLink href={instagramUrl} event="instagram_click" location="footer" external className="link-flow hover:text-white">
                    @{site.instagram.handle.replace("@", "")}
                  </TrackedLink>
                </li>
              )}
              {site.email && (
                <li className="flex gap-3">
                  <Icon name="chat" className="mt-0.5 size-5 shrink-0 text-crystal" />
                  <TrackedLink href={`mailto:${site.email}`} event="contact_click" location="footer_email" className="link-flow break-all hover:text-white">
                    {site.email}
                  </TrackedLink>
                </li>
              )}
            </ul>
          </div>
        </div>

        {campaign && (
          <p className="cmp-on mt-14 rounded-2xl border border-white/[.08] bg-white/[.03] p-5 text-sm leading-relaxed text-white/70">
            <span className="tag-off mr-2 align-middle">Black Friday</span>
            {campaign.texts.finePrint}
          </p>
        )}
        <div className="mt-16 flex flex-col gap-5 border-t border-white/[.07] pt-8 text-sm text-white/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}
            {site.cnpj && ` · CNPJ ${site.cnpj}`}. Todos os direitos reservados.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/politica-de-privacidade" className="link-flow hover:text-white">
              Política de privacidade
            </Link>
            <CookiePreferencesButton className="link-flow hover:text-white" />
            <span>
              Desenvolvido pela{" "}
              {site.credits.url ? (
                <a href={site.credits.url} target="_blank" rel="noopener" className="font-semibold text-white/70 hover:text-white">
                  {site.credits.label}
                </a>
              ) : (
                <span className="font-semibold text-white/70">{site.credits.label}</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
