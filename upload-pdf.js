// /api/upload-pdf.js
import formidable from 'formidable';
import fs from 'fs';
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export const config = { api: { bodyParser: false } };
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err,fields,files)=>{
    if(err) return res.status(500).json({error:err.message});
    try{
      const file = files.file;
      const data = fs.readFileSync(file.filepath);
      const msg = { to: fields.to||fields.email||'user@example.com', from: process.env.SENDGRID_FROM||'no-reply@calor-ia-1eab0949.base44.app', subject:'Seu Relatório CalorIA', text:'Segue em anexo o relatório.', attachments:[{content:data.toString('base64'), filename:file.originalFilename, type:file.mimetype, disposition:'attachment'}] };
      await sgMail.send(msg);
      res.json({ok:true});
    }catch(e){ console.error(e); res.status(500).json({error:e.message}); }
  });
}
