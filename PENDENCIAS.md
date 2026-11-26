# Pendências antes da publicação — PH Filtros

Todos os dados comerciais ficam em **`src/config/site.ts`** e **`src/config/content.ts`**.

## Bloqueantes (sem isso, não publicar)
- [ ] **Número oficial do WhatsApp** → `site.whatsapp` (ex.: `5571999998888`). Enquanto estiver vazio, os botões mostram o aviso "WhatsApp em configuração".
- [ ] **Domínio oficial** → `NEXT_PUBLIC_SITE_URL` (usado em SEO, sitemap e canonical).
- [ ] **Validar categorias de soluções e serviços** (`content.ts`, campo `confirmed`). Remover as que a PH Filtros não oferece.
- [ ] **Validar opções do assistente de orçamento** (`src/components/sections/QuoteWizard.tsx`, listas `places` e `needs`).

## Importantes
- [ ] Endereço oficial → `site.address` (libera o Google Maps e o endereço nos dados estruturados).
- [ ] Instagram → `site.instagram.handle`
- [ ] Telefone, e-mail e horário de atendimento.
- [ ] Razão social e CNPJ (Política de Privacidade e rodapé).
- [ ] Link das avaliações do Google → `site.googleReviewsUrl`
- [ ] Depoimentos reais e autorizados → `testimonials` (a seção de prova social só aparece quando houver conteúdo).
- [ ] Link oficial da Conectfly → `site.credits.url`
- [ ] IDs de GTM / GA4 / Meta Pixel (`.env.example`). O banner de cookies aparece automaticamente quando houver algum ID.
- [ ] Revisão jurídica da Política de Privacidade.

## Fotografias (substituem as ilustrações)
Colocar em `public/images/` e preencher o campo `image` de cada solução em `content.ts`.
Recomendado: fotos reais dos produtos, da equipe trabalhando, da loja/fachada e fotos antigas da empresa (para a página "A empresa").
