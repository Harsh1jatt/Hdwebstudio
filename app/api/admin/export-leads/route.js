import { NextResponse } from 'next/server';
import { requireAdminApi } from '../../../../lib/adminAuth';
import connectDB from '../../../../lib/db';
import Contact from '../../../../models/Contact';
import { parse } from 'url';
let xlsx = null;
try{ xlsx = require('xlsx'); }catch(e){ xlsx = null; }

function csvEscape(v){
  if (v==null) return '';
  return '"'+String(v).replace(/"/g,'""')+'"';
}

export async function GET(req) {
  try {
    const authCheck = await requireAdminApi(req);
    if (authCheck instanceof Response) return authCheck;
    await connectDB();
    const leads = await Contact.find().sort({ createdAt: -1 }).lean();
    const url = new URL(req.url);
    const format = url.searchParams.get('format');
    const header = ['Name','Phone','Email','Business','Message','Received'];
    const rows = leads.map(l => [
      csvEscape(l.name),
      csvEscape(l.phone),
      csvEscape(l.email),
      csvEscape(l.business),
      csvEscape(l.message),
      csvEscape(new Date(l.createdAt).toISOString()),
    ]);

    const csv = [header.map(csvEscape).join(','), ...rows.map(r=>r.join(','))].join('\n');

    if (format === 'xlsx' && xlsx){
      const ws = xlsx.utils.aoa_to_sheet([header, ...leads.map(l=>[l.name,l.phone,l.email,l.business,l.message,new Date(l.createdAt).toISOString()])]);
      const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
      const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
      return new Response(buf, { headers: { 'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'Content-Disposition': 'attachment; filename="leads.xlsx"' } });
    }

    return new Response(csv, { headers: { 'Content-Type': 'text/csv', 'Content-Disposition': 'attachment; filename="leads.csv"' } });
  } catch (e) {
    console.error('export leads error', e);
    return NextResponse.json({ success: false, message: 'Export failed' }, { status: 500 });
  }
}
