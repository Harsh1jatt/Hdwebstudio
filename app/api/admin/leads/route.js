import connectDB from '../../../../lib/db';
import Contact from '../../../../models/Contact';
import { requireAdminApi } from '../../../../lib/adminAuth';

export async function GET(req){
  try{
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    await connectDB();
    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const page = parseInt(url.searchParams.get('page') || '1', 10) || 1;
    const perPage = Math.min(100, parseInt(url.searchParams.get('perPage') || '20', 10) || 20);
    const filter = q ? { $or: [ { name: { $regex: q, $options: 'i' } }, { email: { $regex: q, $options: 'i' } }, { phone: { $regex: q, $options: 'i' } }, { business: { $regex: q, $options: 'i' } } ] } : {};
    const total = await Contact.countDocuments(filter);
    const leads = await Contact.find(filter).sort({ createdAt: -1 }).skip((page-1)*perPage).limit(perPage).lean();
    return new Response(JSON.stringify({ success: true, leads, total, page, perPage }), { headers: { 'Content-Type': 'application/json' } });
  }catch(e){
    console.error('leads list error', e);
    return new Response(JSON.stringify({ error: 'Server' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
