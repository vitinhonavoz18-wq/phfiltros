# Publicação — PH Filtros na Cloudflare

**URL:** https://phfiltros.conectfly.com.br
**Hospedagem:** Cloudflare Workers (Worker `phfiltros`) servindo o site estático gerado pelo Next.js (`output: "export"`).
**Domínio:** domínio personalizado do Worker na zona `conectfly.com.br`. DNS e certificado SSL são gerenciados automaticamente pela Cloudflare.

## Como funciona
1. `npm run build` gera o site completo em `out/` (HTML, CSS, JS, imagens).
2. O Worker (`worker/index.js`) redireciona HTTP → HTTPS e entrega os arquivos.
3. Cabeçalhos de segurança e cache ficam em `public/_headers`.

## Deploy automático (GitHub Actions)
Arquivo: `.github/workflows/deploy.yml`
- **Pull request:** roda lint, checagem de tipos e build (não publica).
- **Push/merge na branch `main`:** valida e publica automaticamente, depois confere se o site responde.

### Configuração única (no GitHub)
Repositório → **Settings → Secrets and variables → Actions → New repository secret**:
| Nome | Valor |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Token da Cloudflare com *Workers Scripts: Edit* (conta) e *Workers Routes: Edit* (zona conectfly.com.br) |
| `CLOUDFLARE_ACCOUNT_ID` | ID da conta Cloudflare (aparece na lateral do painel, em Workers & Pages) |

## Deploy manual
```bash
npm run deploy          # padrão: Workers + Static Assets
npm run deploy:bundle   # alternativo: Worker autocontido (arquivos embutidos no script)
```
O modo `deploy:bundle` (config `wrangler.bundle.jsonc`) foi usado na primeira publicação. Ele existe para ambientes onde o envio de Static Assets é bloqueado. Limite: cerca de 3 MB compactados no plano gratuito — com muitas fotos, use o modo padrão.

## Histórico e rollback
- Painel: **Workers & Pages → phfiltros → Deployments** → escolher versão → *Rollback*.
- Terminal: `npx wrangler deployments list` e `npx wrangler rollback`.
