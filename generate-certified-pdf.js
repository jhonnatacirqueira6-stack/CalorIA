// /api/generate-certified-pdf.js
import formidable from 'formidable';
import fs from 'fs';
import { PDFDocument, rgb } from 'pdf-lib';
export const config = { api: { bodyParser: false } };
export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).end();
  const form = new formidable.IncomingForm();
  form.parse(req, async (err,fields,files)=>{
    if(err) return res.status(500).json({ error: err.message });
    try{
      const file = files.file;
      const data = fs.readFileSync(file.filepath);
      const pdfDoc = await PDFDocument.load(data);
      const pages = pdfDoc.getPages();
      const first = pages[0];
      first.drawText('CERTIFICADO CALORIA', { x:50, y:700, size:18, color: rgb(1,0.2,0) });
      const out = await pdfDoc.save();
      res.setHeader('Content-Type','application/pdf');
      res.setHeader('Content-Disposition','attachment; filename=certified_'+file.originalFilename);
      res.send(Buffer.from(out));
    }catch(e){ console.error(e); res.status(500).json({ error: e.message }); }
  });
}
