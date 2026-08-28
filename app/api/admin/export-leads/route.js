import { NextResponse } from 'next/server';
import { requireAdminApi } from '../../../../lib/auth';
import connectDB from '../../../../lib/db';
import Contact from '../../../../models/Contact';
import { parse } from 'url';
let xlsx = null;
try{ xlsx = require('xlsx'); }catch(e){ xlsx = null; }

function sanitizeFormula(v) {
  if (v == null) return '';
  const str = String(v);
  // Neutralize CSV/Formula injection triggers (=, +, -, @, tab, CR)
  if (/^[=+\-@\t\r]/.test(str)) {
    return "'" + str;
  }
  return str;
}

function csvEscape(v) {
  if (v == null) return '""';
  const clean = sanitizeFormula(v);
  return '"' + clean.replace(/"/g, '""') + '"';
}

export async function GET(req) {
  try {
    const authCheck = await requireAdminApi(req);
    if (authCheck instanceof Response) return authCheck;
    await connectDB();
    const leads = await Contact.find().sort({ createdAt: -1 }).lean();
    const url = new URL(req.url);
    const format = url.searchParams.get('format');
    const header = ['Name', 'Phone', 'Email', 'Business', 'Website', 'Service', 'Budget', 'Status', 'Priority', 'Source', 'Message', 'Notes', 'Received'];
    const rows = leads.map(l => [
      csvEscape(l.name),
      csvEscape(l.phone),
      csvEscape(l.email),
      csvEscape(l.business),
      csvEscape(l.website),
      csvEscape(l.service),
      csvEscape(l.budget),
      csvEscape(l.status || 'new'),
      csvEscape(l.priority || 'normal'),
      csvEscape(l.source || 'website'),
      csvEscape(l.message),
      csvEscape(l.notes),
      csvEscape(l.createdAt ? new Date(l.createdAt).toISOString() : ''),
    ]);

    const csv = [header.map(csvEscape).join(','), ...rows.map(r=>r.join(','))].join('\n');

    if (format === 'xlsx' && xlsx){
      const rawRows = leads.map(l => [
        sanitizeFormula(l.name || ''),
        sanitizeFormula(l.phone || ''),
        sanitizeFormula(l.email || ''),
        sanitizeFormula(l.business || ''),
        sanitizeFormula(l.website || ''),
        sanitizeFormula(l.service || ''),
        sanitizeFormula(l.budget || ''),
        sanitizeFormula(l.status || 'new'),
        sanitizeFormula(l.priority || 'normal'),
        sanitizeFormula(l.source || 'website'),
        sanitizeFormula(l.message || ''),
        sanitizeFormula(l.notes || ''),
        l.createdAt ? new Date(l.createdAt).toISOString() : '',
      ]);
      const ws = xlsx.utils.aoa_to_sheet([header, ...rawRows]);
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
