CALOR_IA_PUSH_ONESIGNAL_FINAL - README (PT)

Este pacote foi gerado com seu OneSignal App ID já inserido: 4f5a2575-9b06-4b20-a604-6d8ba7b1da82

Objetivo: redirecionar imediatamente para https://calor-ia-1eab0949.base44.app e oferecer integração OneSignal/SendGrid no domínio do Vercel.

Passos para deploy no Vercel:
1) Faça upload do ZIP via https://vercel.com/new → Upload Project (Framework: Other). Output dir: .
2) No Vercel Project Settings > Environment Variables, adicione:
   - ONESIGNAL_APP_ID = 4f5a2575-9b06-4b20-a604-6d8ba7b1da82
   - ONESIGNAL_API_KEY = <sua OneSignal REST API Key>
   - SENDGRID_API_KEY = <sua SendGrid API Key>
   - SENDGRID_FROM = no-reply@calor-ia-1eab0949.base44.app
   - APP_URL = https://calor-ia-1eab0949.base44.app
3) Após deploy, abra o link do Vercel; ele fará redirect imediato para o app Base44.
   - Se desejar usar o prompt de notificação antes do redirect, edite /index.html (o redirect atualmente é imediato).
4) Para enviar broadcast: POST /api/broadcast-onesignal (no deploy) — o endpoint usa ONESIGNAL_API_KEY para autenticar.
5) Em produção, substitua armazenamento /tmp por Supabase ou DB e proteja endpoints com token.

Observações importantes:
- Para que os usuários recebam push ligados ao app real (calor-ia-1eab0949.base44.app), recomendamos também adicionar OneSignal SDK ao próprio app Base44 — isso garante que o playerId seja associado ao domínio que o usuário usa.
- iOS behavior: OneSignal amplia suporte; teste em dispositivos reais.
