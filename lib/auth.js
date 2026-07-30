import connectDB from './db';
import Admin from '../models/Admin';
import { verifyToken, COOKIE_NAME } from './jwt';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

function getTokenFromRequest(req) {
  if (!req) return null;
  if (req.cookies) {
    const cookie = req.cookies.get(COOKIE_NAME);
    return cookie?.value || null;
  }
  const cookieHeader = req.headers.get('cookie') || '';
  const match = cookieHeader
    .split(';')
    .map((cookie) => cookie.trim())
    .find((cookie) => cookie.startsWith(`${COOKIE_NAME}=`));
  return match ? match.split('=')[1] : null;
}

export async function getCurrentAdmin(req) {
  const token = getTokenFromRequest(req);
  if (!token) return null;
  const data = verifyToken(token);
  if (!data?.adminId) return null;
  await connectDB();
  return await Admin.findById(data.adminId).lean();
}

export async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) {
    redirect('/admin/login');
  }
  const data = verifyToken(token);
  if (!data?.adminId) {
    redirect('/admin/login');
  }
  await connectDB();
  const admin = await Admin.findById(data.adminId).lean();
  if (!admin) {
    redirect('/admin/login');
  }
  return { user: { id: admin._id.toString(), name: admin.name, email: admin.email, role: admin.role, createdAt: admin.createdAt } };
}

export async function requireAdminApi(req) {
  const token = getTokenFromRequest(req);
  if (!token) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const data = verifyToken(token);
  if (!data?.adminId) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  await connectDB();
  const admin = await Admin.findById(data.adminId).lean();
  if (!admin) {
    return new Response(JSON.stringify({ success: false, error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return admin;
}
