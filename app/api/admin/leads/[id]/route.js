import connectDB from '../../../../../lib/db';
import Contact from '../../../../../models/Contact';
import { requireAdminApi } from '../../../../../lib/adminAuth';

export async function DELETE(req, { params }){
  try{
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    await connectDB();
    const id = params.id;
    await Contact.deleteOne({ _id: id });
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  }catch(e){
    console.error('delete lead error', e);
    return new Response(JSON.stringify({ error: 'Server' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
