/**
 * ============================================================
 *  CONTEÚDO EDITÁVEL — soluções, serviços, FAQ e depoimentos
 * ============================================================
 *  Para trocar uma imagem, coloque a foto em /public/images/ e
 *  preencha o campo `image` com o caminho (ex.: "/images/purificador.webp").
 *  Enquanto `image` estiver vazio, o site usa uma ilustração própria.
 *
 *  `confirmed: false` = categoria/serviço sugerido, ainda não validado
 *  com a PH Filtros. Revise antes de publicar (ver PENDENCIAS.md).
 * ============================================================
 */

export type IconKey =
  | "faucet"
  | "purifier"
  | "building"
  | "system"
  | "cartridge"
  | "wrench"
  | "chat"
  | "install"
  | "calendar"
  | "refresh"
  | "sliders"
  | "home";

export type Solution = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  benefits: string[];
  idealFor: string[];
  icon: IconKey;
  image: string;
  imageAlt: string;
  whatsappMessage: string;
  confirmed: boolean;
};

export const solutions: Solution[] = [
  {
    slug: "filtros-residenciais",
    name: "Filtros residenciais",
    tagline: "Água filtrada direto na sua cozinha.",
    description:
      "Filtros para torneira, bancada ou parede que acompanham a rotina da casa. Ajudam a reter partículas e a melhorar o sabor e o odor da água, de acordo com o modelo e as especificações do fabricante.",
    benefits: [
      "Água filtrada disponível a qualquer hora",
      "Ajuda a reduzir partículas visíveis",
      "Contribui para melhorar sabor e odor",
    ],
    idealFor: ["Casas", "Apartamentos"],
    icon: "faucet",
    image: "",
    imageAlt: "Filtro de água residencial instalado em cozinha",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e gostaria de informações sobre filtros residenciais.",
    confirmed: false,
  },
  {
    slug: "purificadores-de-agua",
    name: "Purificadores de água",
    tagline: "Praticidade e água pronta para beber.",
    description:
      "Equipamentos que combinam filtragem e praticidade no dia a dia, com opções de água natural ou gelada conforme o modelo. Indicamos a opção mais adequada para o seu espaço e consumo.",
    benefits: [
      "Água pronta para consumo no ponto de uso",
      "Opções com água natural ou gelada (conforme modelo)",
      "Menos dependência de galões e garrafas",
    ],
    idealFor: ["Famílias", "Escritórios"],
    icon: "purifier",
    image: "",
    imageAlt: "Purificador de água moderno em bancada",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e gostaria de informações sobre purificadores de água.",
    confirmed: false,
  },
  {
    slug: "filtros-comerciais",
    name: "Filtros comerciais",
    tagline: "Desempenho para quem atende muita gente.",
    description:
      "Soluções de filtragem para empresas, restaurantes, clínicas e comércios que precisam de maior volume e confiabilidade na rotina de trabalho.",
    benefits: [
      "Dimensionamento conforme o volume de uso",
      "Água filtrada para equipe e clientes",
      "Rotina de manutenção planejada",
    ],
    idealFor: ["Empresas", "Comércios", "Restaurantes"],
    icon: "building",
    image: "",
    imageAlt: "Sistema de filtragem de água em ambiente comercial",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e gostaria de informações sobre filtros comerciais para minha empresa.",
    confirmed: false,
  },
  {
    slug: "sistemas-de-filtragem",
    name: "Sistemas de filtragem",
    tagline: "Filtragem pensada para o imóvel inteiro.",
    description:
      "Sistemas de entrada e soluções para caixas d'água, que tratam a água antes que ela chegue às torneiras e chuveiros. Avaliamos a necessidade de cada imóvel antes de indicar a configuração.",
    benefits: [
      "Filtragem antes da distribuição pelo imóvel",
      "Ajuda a proteger tubulações e equipamentos de sedimentos",
      "Projeto conforme a necessidade do local",
    ],
    idealFor: ["Casas", "Condomínios", "Empresas"],
    icon: "system",
    image: "",
    imageAlt: "Sistema de filtragem de entrada instalado",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e gostaria de informações sobre sistemas de filtragem para o imóvel.",
    confirmed: false,
  },
  {
    slug: "refis-e-acessorios",
    name: "Refis e acessórios",
    tagline: "O desempenho do filtro depende do refil.",
    description:
      "Refis e acessórios para manter seu filtro ou purificador funcionando como deve. Informe o modelo do seu equipamento e ajudamos a encontrar o refil compatível.",
    benefits: [
      "Ajuda a manter a eficiência da filtragem",
      "Orientação sobre o refil compatível",
      "Lembrete do prazo de troca indicado pelo fabricante",
    ],
    idealFor: ["Quem já possui filtro"],
    icon: "cartridge",
    image: "",
    imageAlt: "Refis de filtro de água",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e preciso de um refil. O modelo do meu filtro é: ",
    confirmed: false,
  },
  {
    slug: "instalacao-e-manutencao",
    name: "Instalação e manutenção",
    tagline: "Cuidado técnico do início ao fim.",
    description:
      "Instalação correta e manutenção periódica fazem diferença no desempenho e na vida útil do equipamento. Conte com atendimento especializado para cuidar disso por você.",
    benefits: [
      "Instalação feita por quem conhece o equipamento",
      "Manutenção preventiva para evitar surpresas",
      "Atendimento residencial e empresarial",
    ],
    idealFor: ["Residências", "Empresas"],
    icon: "wrench",
    image: "",
    imageAlt: "Técnico realizando manutenção em filtro de água",
    whatsappMessage:
      "Olá! Vi no site da PH Filtros e gostaria de agendar instalação ou manutenção.",
    confirmed: false,
  },
];

export type Service = {
  slug: string;
  name: string;
  description: string;
  icon: IconKey;
  whatsappMessage: string;
  confirmed: boolean;
};

export const services: Service[] = [
  {
    slug: "orientacao-especializada",
    name: "Orientação especializada",
    description:
      "Antes de comprar, entenda qual tipo de filtragem faz sentido para a sua água, seu espaço e seu consumo.",
    icon: "chat",
    whatsappMessage:
      "Olá! Gostaria de receber uma orientação da PH Filtros para escolher a solução de filtragem adequada.",
    confirmed: false,
  },
  {
    slug: "instalacao-de-filtros",
    name: "Instalação de filtros",
    description:
      "Instalação cuidadosa, seguindo as orientações do fabricante, para o equipamento funcionar corretamente desde o primeiro dia.",
    icon: "install",
    whatsappMessage: "Olá! Gostaria de solicitar a instalação de um filtro.",
    confirmed: false,
  },
  {
    slug: "manutencao-preventiva",
    name: "Manutenção preventiva",
    description:
      "Revisões periódicas ajudam a manter o desempenho da filtragem e a identificar problemas antes que eles apareçam.",
    icon: "calendar",
    whatsappMessage: "Olá! Gostaria de agendar uma manutenção preventiva do meu filtro.",
    confirmed: false,
  },
  {
    slug: "substituicao-de-refis",
    name: "Substituição de refis",
    description:
      "Troca do elemento filtrante no prazo recomendado, com o refil compatível com o seu modelo.",
    icon: "refresh",
    whatsappMessage: "Olá! Preciso trocar o refil do meu filtro. O modelo é: ",
    confirmed: false,
  },
  {
    slug: "solucoes-personalizadas",
    name: "Soluções personalizadas",
    description:
      "Para necessidades específicas, avaliamos o local e indicamos uma configuração de filtragem sob medida.",
    icon: "sliders",
    whatsappMessage:
      "Olá! Tenho uma necessidade específica de filtragem e gostaria de uma avaliação.",
    confirmed: false,
  },
  {
    slug: "atendimento-residencial-e-empresarial",
    name: "Atendimento residencial e empresarial",
    description:
      "Da cozinha de casa ao refeitório da empresa: atendimento adequado para cada tipo de ambiente.",
    icon: "home",
    whatsappMessage:
      "Olá! Gostaria de saber mais sobre o atendimento da PH Filtros para o meu imóvel/empresa.",
    confirmed: false,
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "Qual filtro é ideal para minha residência?",
    a: "Depende do número de pessoas, do consumo diário, do espaço disponível e do que você quer melhorar na água (sabor, odor, partículas). Por isso, a melhor escolha começa com uma conversa rápida: conte sua necessidade pelo WhatsApp e indicamos as opções mais adequadas.",
  },
  {
    q: "Quando devo trocar o refil do meu filtro?",
    a: "O prazo varia conforme o modelo e o volume de água filtrada. Siga sempre a recomendação do fabricante, informada no manual ou na embalagem do refil. Se tiver dúvida, envie o modelo do seu filtro e informamos o prazo e o refil compatível.",
  },
  {
    q: "Qual a diferença entre filtro e purificador?",
    a: "De forma geral, o filtro atua principalmente na retenção de partículas e na melhoria de sabor e odor. O purificador reúne etapas adicionais de tratamento, que variam de acordo com o modelo e sua certificação. A capacidade de cada equipamento está descrita nas especificações do fabricante — ajudamos você a comparar.",
  },
  {
    q: "Vocês atendem em Salvador e região?",
    a: "Sim. A PH Filtros atende Salvador e região. Para confirmar o atendimento no seu bairro ou cidade, fale com a gente pelo WhatsApp.",
  },
  {
    q: "Como solicitar um orçamento?",
    a: "É simples: use o assistente “Encontre o filtro ideal para você”, aqui no site, ou clique em qualquer botão de WhatsApp. Sua mensagem já chega organizada para agilizar o atendimento.",
  },
  {
    q: "Como identificar a necessidade de manutenção?",
    a: "Alguns sinais comuns são a redução da vazão, alteração no sabor ou odor da água, vazamentos ou o prazo de troca do refil vencido. Ao notar qualquer um deles, vale agendar uma avaliação.",
  },
  {
    q: "A PH Filtros realiza atendimento empresarial?",
    a: "Sim. Atendemos também empresas e comércios. Conte o tipo de negócio e o volume de uso, e indicamos a solução adequada.",
  },
];

/**
 * DEPOIMENTOS — preencha SOMENTE com avaliações reais e autorizadas.
 * Enquanto a lista estiver vazia, a seção de prova social fica oculta.
 */
export const testimonials: { name: string; text: string; source: string; rating?: number }[] = [];
