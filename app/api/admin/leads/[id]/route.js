import connectDB from '../../../../../lib/db';
import Contact from '../../../../../models/Contact';
import { requireAdminApi } from '../../../../../lib/auth';

export async function GET(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    await connectDB();
    const lead = await Contact.findById(params.id).lean();
    if (!lead) {
      return new Response(JSON.stringify({ success: false, error: 'Lead not found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
    }
    return new Response(JSON.stringify({ success: true, lead }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('lead detail error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;
    await connectDB();
    const id = params.id;
    await Contact.deleteOne({ _id: id });
    return new Response(JSON.stringify({ success: true }), { headers: { 'Content-Type': 'application/json' } });
  } catch (e) {
    console.error('delete lead error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
