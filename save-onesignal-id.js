// api/save-onesignal-id.js
import fs from 'fs';
const FILE = '/tmp/onesignal_players.json';
export default function handler(req, res) {
  if(req.method !== 'POST') return res.status(405).end();
  const body = req.body || {};
  const id = body.playerId;
  if(!id) return res.status(400).json({ error: 'missing playerId' });
  let arr = [];
  try{ arr = JSON.parse(fs.readFileSync(FILE)); }catch(e){ arr = []; }
  if(!arr.includes(id)) arr.push(id);
  fs.writeFileSync(FILE, JSON.stringify(arr, null,2));
  res.json({ ok:true, total: arr.length });
}