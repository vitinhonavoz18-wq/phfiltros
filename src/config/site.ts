/**
 * ============================================================
 *  PH FILTROS — CONFIGURAÇÃO CENTRAL DO SITE
 * ============================================================
 *  Este é o ÚNICO arquivo que precisa ser editado para atualizar
 *  informações comerciais (WhatsApp, Instagram, endereço, etc.).
 *
 *  Itens marcados com  ⚠️ PENDENTE  ainda NÃO foram confirmados
 *  pela empresa e precisam ser preenchidos antes da publicação.
 *  Veja também o arquivo PENDENCIAS.md na raiz do projeto.
 * ============================================================
 */

export const site = {
  name: "PH Filtros",
  legalName: "PH Filtros", // ⚠️ PENDENTE: razão social (para a Política de Privacidade)
  cnpj: "", // ⚠️ PENDENTE: CNPJ (opcional, exibido no rodapé se preenchido)

  /** Domínio oficial, sem barra no final. Usado em SEO, sitemap e canonical. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://phfiltros.conectfly.com.br",

  yearsOfExperience: 40,
  region: "Salvador e região",
  city: "Salvador",
  state: "BA",

  /**
   * WhatsApp oficial — somente números, com DDI 55 + DDD.
   * Ex.: "5571999998888"
   * ⚠️ PENDENTE (BLOQUEANTE): enquanto estiver vazio, o site mostra um
   * aviso aos visitantes em vez de abrir uma conversa.
   */
  whatsapp: "",

  /** Telefone fixo opcional, no formato exibido. Ex.: "(71) 3333-4444" */
  phone: "", // ⚠️ PENDENTE

  email: "", // ⚠️ PENDENTE (opcional)

  instagram: {
    handle: "", // ⚠️ PENDENTE. Ex.: "phfiltros"
  },

  /** Link público das avaliações no Google (perfil da empresa). */
  googleReviewsUrl: "", // ⚠️ PENDENTE

  /**
   * Endereço oficial. Enquanto `street` estiver vazio, o mapa do Google
   * NÃO é exibido e os dados estruturados não informam endereço.
   */
  address: {
    street: "", // ⚠️ PENDENTE. Ex.: "Rua Exemplo, 123"
    district: "",
    city: "Salvador",
    state: "BA",
    postalCode: "",
    country: "BR",
  },

  /** Horário de atendimento exibido no rodapé. Vazio = não exibe. */
  openingHours: "", // ⚠️ PENDENTE. Ex.: "Seg. a sex., 8h às 18h · Sáb., 8h às 12h"

  /** Mensagem padrão para o WhatsApp. */
  defaultWhatsappMessage:
    "Olá! Conheci a PH Filtros pelo site e gostaria de receber informações sobre as soluções de filtragem de água. Poderiam me ajudar?",

  credits: {
    label: "Conectfly",
    url: "", // ⚠️ PENDENTE: endereço oficial da Conectfly
  },
};

/**
 * IDs de rastreamento. Não são senhas — são identificadores públicos.
 * Preencha pelas variáveis de ambiente da hospedagem (ver .env.example).
 */
export const tracking = {
  gtmId: process.env.NEXT_PUBLIC_GTM_ID || "",
  ga4Id: process.env.NEXT_PUBLIC_GA4_ID || "",
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  googleSiteVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
};

export const isWhatsappConfigured = site.whatsapp.replace(/\D/g, "").length >= 12;

export const instagramUrl = site.instagram.handle
  ? `https://www.instagram.com/${site.instagram.handle.replace("@", "")}/`
  : "";

export const phoneHref = site.phone ? `tel:+55${site.phone.replace(/\D/g, "")}` : "";
