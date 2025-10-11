// api/broadcast-onesignal.js
import fs from 'fs';
export default async function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  try{
    let players = [];
    try{ players = JSON.parse(fs.readFileSync('/tmp/onesignal_players.json')); }catch(e){ players = []; }
    const payload = { app_id: process.env.ONESIGNAL_APP_ID, include_player_ids: players, headings: { en: 'CalorIA' }, contents: { en: 'Mensagem: volte ao CalorIA e gere seu relatório.' } };
    const r = await fetch('https://onesignal.com/api/v1/notifications', { method: 'POST', headers: { 'Content-Type':'application/json', 'Authorization': 'Basic ' + (process.env.ONESIGNAL_API_KEY || '') }, body: JSON.stringify(payload) });
    const j = await r.json();
    res.json({ ok:true, result: j, total_players: players.length });
  }catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
}