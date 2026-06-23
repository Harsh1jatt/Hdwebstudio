import connectDB from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_NAME } from '../../../../lib/jwt';

export async function POST(req){
  try{
    const { email, password } = await req.json();
    if (!email || !password) return new Response(JSON.stringify({ error: 'Missing' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    await connectDB();
    const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
    if (!admin) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const ok = bcrypt.compareSync(password, admin.passwordHash);
    if (!ok) return new Response(JSON.stringify({ error: 'Invalid credentials' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    const token = signToken({ adminId: admin._id.toString() });
    const secure = process.env.NODE_ENV === 'production';
    return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict${secure?'; Secure':''}` } });
  }catch(e){
    console.error('admin login error', e);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
