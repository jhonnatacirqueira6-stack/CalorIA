// api/send-email.js (SendGrid)
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  try {
    const { type, email, nome, app_url } = req.body || {};
    let subject = 'CalorIA', html = '<p>Notificação</p>';
    if(type === 'welcome'){ subject = '🎉 Bem-vindo ao CalorIA'; html = '<p>Olá '+(nome||'Usuário')+', bem-vindo ao CalorIA.</p><p><a href="'+(app_url||process.env.APP_URL||'')+'">Abrir App</a></p>'; }
    else if(type === 'remarketing'){ subject = '⚡ Oferta Premium'; html = '<p>Oferta: 20% OFF</p>'; }
    await sgMail.send({ to: email, from: process.env.SENDGRID_FROM || 'no-reply@calor-ia-1eab0949.base44.app', subject, html });
    res.json({ ok:true });
  } catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
}