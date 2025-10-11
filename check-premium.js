// /api/check-premium.js
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_KEY);
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  try{
    const { customerId } = req.body || {};
    if(!customerId) return res.status(400).json({ error:'missing customerId' });
    const subs = await stripe.subscriptions.list({ customer: customerId, status: 'all', limit: 10 });
    const active = subs.data.some(s => ['active','trialing'].includes(s.status));
    res.json({ premium: active });
  }catch(e){ console.error(e); res.status(500).json({ error:e.message }); }
}
