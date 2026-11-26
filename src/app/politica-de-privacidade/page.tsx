import type { Metadata } from "next";
import { site } from "@/config/site";
import { PageHero } from "@/components/layout/PageHero";
import { CookiePreferencesButton } from "@/components/tracking/CookieConsent";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Saiba como a PH Filtros trata os dados pessoais de quem visita o site, conforme a LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

// ⚠️ Texto-base. Recomenda-se revisão jurídica antes da publicação.
export default function PrivacyPage() {
  const controller = site.legalName + (site.cnpj ? `, inscrita no CNPJ ${site.cnpj}` : "");
  return (
    <>
      <PageHero eyebrow="Transparência" title="Política de privacidade" crumbs={[{ href: "/", label: "Início" }, { label: "Política de privacidade" }]} />
      <section className="bg-white py-20">
        <div className="mx-auto max-w-3xl space-y-10 px-5 text-[1.02rem] leading-relaxed text-slate md:px-8 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink">
          <p>
            Esta política explica como {controller} (“PH Filtros”) trata os dados pessoais de quem utiliza este site, em conformidade com a Lei Geral de Proteção de
            Dados (Lei nº 13.709/2018 — LGPD).
          </p>
          <div className="space-y-4">
            <h2>Quais dados coletamos</h2>
            <p>
              <strong className="text-ink">Dados que você informa:</strong> ao usar o assistente de orçamento, você pode informar nome, bairro, cidade e detalhes da sua
              necessidade. Essas informações não ficam armazenadas no site: elas apenas compõem a mensagem que você decide enviar pelo WhatsApp.
            </p>
            <p>
              <strong className="text-ink">Dados de navegação:</strong> com a sua autorização, utilizamos ferramentas como Google Analytics, Google Ads e Meta Pixel para
              entender como o site é usado e medir o resultado de anúncios. Também registramos a origem da visita (por exemplo, parâmetros de campanha) durante a
              sessão.
            </p>
          </div>
          <div className="space-y-4">
            <h2>Para que usamos</h2>
            <p>Para responder às suas solicitações de orçamento e atendimento, melhorar o site e avaliar a efetividade das nossas campanhas.</p>
          </div>
          <div className="space-y-4">
            <h2>Cookies e consentimento</h2>
            <p>
              Cookies de estatística e marketing só são ativados após o seu consentimento. Você pode alterar sua escolha a qualquer momento:{" "}
              <CookiePreferencesButton className="font-semibold text-brand underline underline-offset-2" />.
            </p>
          </div>
          <div className="space-y-4">
            <h2>Compartilhamento</h2>
            <p>
              Não vendemos dados pessoais. As mensagens enviadas pelo WhatsApp seguem também a política de privacidade do WhatsApp/Meta. Ferramentas de medição são
              fornecidas por Google e Meta, conforme suas próprias políticas.
            </p>
          </div>
          <div className="space-y-4">
            <h2>Seus direitos</h2>
            <p>
              Você pode solicitar confirmação, acesso, correção ou exclusão dos seus dados, entre outros direitos previstos na LGPD, entrando em contato pelos canais
              informados neste site{site.email ? ` ou pelo e-mail ${site.email}` : ""}.
            </p>
          </div>
          <p className="text-sm">Última atualização: {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}.</p>
        </div>
      </section>
    </>
  );
}
