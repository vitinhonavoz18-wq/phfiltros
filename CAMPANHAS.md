# Campanhas promocionais

Configuração única: **`src/config/campaigns.ts`**.

## Como funciona
- O HTML já sai do build com os elementos da campanha (barra, hero, selos, mensagens).
- Um script no `<head>` compara o relógio com `startsAt`/`endsAt` (datas com fuso `-03:00`, America/Bahia) **antes da página aparecer** e marca `<html data-campaign="id">`.
- Fora do período, os elementos `.cmp-on` ficam ocultos e o site original (`.cmp-off`) aparece — **sem novo deploy**.
- Se a página estiver aberta no momento do encerramento, o layout original volta sozinho (contador chega a zero).
- Durante a campanha, todos os botões de WhatsApp usam `whatsappMessage` (com o produto/serviço de interesse anexado quando houver), e os eventos de conversão recebem o parâmetro `campaign`.

## Testar
- `?campanha=off` → força a versão original.
- `?campanha=on` → força a campanha (enquanto ela não tiver terminado).

## Nova campanha (ex.: Natal)
1. Copie o objeto `black-friday-2026` em `campaigns.ts`, troque `id`, datas, textos, cores e mensagem.
2. Faça o deploy **antes** da data de início. A ativação e o encerramento ocorrem sozinhos.
3. `enabled: false` desliga uma campanha imediatamente (requer deploy).

## Preços
O site não exibe preços. Se forem adicionados, o desconto deve ser calculado uma única vez sobre o preço original (preço × (1 − desconto/100)) e confirmado no atendimento.
