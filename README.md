# PH Filtros — Website

Site institucional e comercial da PH Filtros (Next.js 15 + React 19 + TypeScript + Tailwind CSS 4).

## Comandos
```bash
npm install
npm run dev     # desenvolvimento em http://localhost:3000
npm run build   # build de produção
npm run lint
```

## Onde editar
| O quê | Arquivo |
|---|---|
| WhatsApp, Instagram, endereço, telefone, domínio | `src/config/site.ts` |
| Soluções, serviços, FAQ, depoimentos, fotos | `src/config/content.ts` |
| IDs de rastreamento (GTM, GA4, Meta) | variáveis de ambiente (`.env.example`) |

Veja **PENDENCIAS.md** antes de publicar.

## Recursos
- Hero com superfície de água interativa (canvas leve, pausa fora da tela).
- Experiência de filtragem guiada pela rolagem.
- Assistente de orçamento em 3 etapas que gera a mensagem para o WhatsApp.
- Parâmetros UTM/gclid/fbclid preservados e anexados à mensagem.
- Eventos: `whatsapp_click`, `quote_start`, `quote_complete`, `product_view`, `service_view`, `contact_click`, `phone_click`, `instagram_click` (via dataLayer).
- Consent Mode v2 + banner LGPD; Meta Pixel só carrega após consentimento.
- SEO local: metadados, sitemap, robots, Open Graph, JSON-LD (LocalBusiness, FAQPage, Service, Breadcrumb).
- Respeita `prefers-reduced-motion`.

## Deploy
Publicado em https://phfiltros.conectfly.com.br (Cloudflare Workers). Veja **DEPLOY.md**.
