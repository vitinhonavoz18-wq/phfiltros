/**
 * ============================================================
 *  CAMPANHAS PROMOCIONAIS — configuração central
 * ============================================================
 *  A ativação e o encerramento são AUTOMÁTICOS, pelo relógio do
 *  visitante comparado às datas abaixo (com fuso explícito).
 *  Não é preciso novo deploy para ligar ou desligar a campanha.
 *  Fora do período, o site exibe exatamente a versão original.
 *
 *  Para uma nova campanha (Natal, Ano-Novo...): copie o objeto,
 *  troque id, datas, textos e cores e adicione à lista.
 * ============================================================
 */

export type Campaign = {
  id: string;
  name: string;
  /** Interruptor manual. false = nunca exibe, mesmo dentro do período. */
  enabled: boolean;
  discountPercent: number;
  /** Datas ISO com o deslocamento do fuso (America/Bahia = -03:00, sem horário de verão). */
  startsAt: string;
  endsAt: string;
  timezone: string;
  /** Rótulo humano do encerramento, exibido nos textos. */
  endsLabel: string;
  texts: {
    bar: string;
    eyebrow: string;
    title: string;
    headline: string;
    subtitle: string;
    urgency: string;
    primaryCta: string;
    secondaryCta: string;
    ticker: string[];
    authority: string;
    finalTitle: string;
    finalSubtitle: string;
    finePrint: string;
    productCta: string;
  };
  theme: {
    /** Cor de destaque principal (usa a identidade PH Filtros). */
    accent: string;
    accentSoft: string;
    surface: string;
    surface2: string;
  };
  whatsappMessage: string;
};

export const campaigns: Campaign[] = [
  {
    id: "black-friday-2026",
    name: "Black Friday PH Filtros",
    enabled: true,
    discountPercent: 30,
    startsAt: "2026-11-20T00:00:00-03:00",
    endsAt: "2026-11-30T23:59:59-03:00",
    timezone: "America/Bahia",
    endsLabel: "30 de novembro, às 23h59",
    texts: {
      bar: "30% OFF em todos os itens",
      eyebrow: "Black Friday PH Filtros",
      title: "30% OFF",
      headline: "em todos os itens",
      subtitle:
        "Mais qualidade, economia e confiança. Aproveite condições especiais de quem está há mais de 40 anos no mercado.",
      urgency: "Somente até 30 de novembro!",
      primaryCta: "Quero aproveitar os 30% OFF",
      secondaryCta: "Conhecer os produtos",
      ticker: [
        "Black Friday PH Filtros",
        "30% OFF em todos os itens",
        "40 anos de confiança",
        "Somente até 30/11",
        "Salvador e região",
      ],
      authority: "40 anos de confiança. Agora com 30% de desconto.",
      finalTitle: "Sua próxima compra começa com 30% OFF.",
      finalSubtitle:
        "A maior oportunidade do ano chegou à PH Filtros. Fale com um especialista e garanta seu desconto até 30 de novembro.",
      finePrint:
        "Black Friday PH Filtros: 30% de desconto em todos os itens, válido até 30/11/2026 às 23h59 (horário de Salvador). Consulte as condições com nosso atendimento.",
      productCta: "Quero 30% OFF neste item",
    },
    theme: {
      accent: "#00c8f5",
      accentSoft: "#007bdb",
      surface: "#050608",
      surface2: "#101318",
    },
    whatsappMessage:
      "Olá! Vim pelo site da PH Filtros e gostaria de aproveitar a promoção de Black Friday com 30% de desconto. Poderia me ajudar?",
  },
];

export const toMs = (iso: string) => new Date(iso).getTime();

export function isCampaignLive(c: Campaign, now = Date.now()) {
  return c.enabled && now >= toMs(c.startsAt) && now <= toMs(c.endsAt);
}

/**
 * Campanha cujo conteúdo é incluído no build: a ativa ou a próxima.
 * O HTML já sai com os elementos promocionais, mas eles só aparecem
 * quando o script de inicialização confirma que a campanha está no período.
 */
const BUILD_TIME = Number(process.env.NEXT_PUBLIC_BUILD_TIME) || Date.now();

export function getBuildCampaign(now = BUILD_TIME): Campaign | null {
  return (
    campaigns
      .filter((c) => c.enabled && toMs(c.endsAt) > now)
      .sort((a, b) => toMs(a.startsAt) - toMs(b.startsAt))[0] ?? null
  );
}

/** Campanha ativa agora (lado do navegador). */
export function getLiveCampaign(now = Date.now()): Campaign | null {
  return campaigns.find((c) => isCampaignLive(c, now)) ?? null;
}

/**
 * Script executado no <head>, antes da página aparecer: marca o <html>
 * com a campanha ativa. Evita "piscar" a versão errada.
 * Parâmetro de teste: ?campanha=off (força versão original) ou
 * ?campanha=on (força a campanha) — útil para revisão.
 */
export const campaignBootScript = `(function(){try{
var list=${JSON.stringify(
  campaigns.map((c) => ({ id: c.id, s: toMs(c.startsAt), e: toMs(c.endsAt), on: c.enabled, t: c.theme })),
)};
var q=new URLSearchParams(location.search).get('campanha');var now=Date.now();var d=document.documentElement;
for(var i=0;i<list.length;i++){var c=list[i];
var live=c.on&&now>=c.s&&now<=c.e;if(q==='off')live=false;if(q==='on'&&c.on&&now<=c.e)live=true;
if(live){d.setAttribute('data-campaign',c.id);d.style.setProperty('--cmp-accent',c.t.accent);d.style.setProperty('--cmp-accent-soft',c.t.accentSoft);d.style.setProperty('--cmp-surface',c.t.surface);d.style.setProperty('--cmp-surface-2',c.t.surface2);break;}}
}catch(e){}})();`;
