import connectDB from './db';
import Admin from '../models/Admin';
import { verifyToken, COOKIE_NAME } from './jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server-side helper for pages (redirects to login if missing)
export async function requireAdmin(){
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    redirect('/admin/login');
  }
  const data = verifyToken(token);
  if (!data || !data.adminId) redirect('/admin/login');
  await connectDB();
  const admin = await Admin.findById(data.adminId).lean();
  if (!admin) redirect('/admin/login');
  return { user: { email: admin.email, name: admin.name, role: admin.role } };
}

// API helper that accepts a Request and returns admin or throws Response
export async function requireAdminApi(req){
  try{
    const cookieHeader = req.headers.get('cookie') || '';
    const match = cookieHeader.split(';').map(s=>s.trim()).find(s=>s.startsWith(COOKIE_NAME+'='));
    const token = match ? match.split('=')[1] : null;
    if (!token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const data = verifyToken(token);
    if (!data?.adminId) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    await connectDB();
    const admin = await Admin.findById(data.adminId);
    if (!admin) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    return admin;
  }catch(e){
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
}
