import connectDB from '../../../../lib/db';
import Admin from '../../../../models/Admin';
import bcrypt from 'bcryptjs';
import { signToken, COOKIE_NAME } from '../../../../lib/jwt';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body || {};
    if (!name || !email || !password) {
      return new Response(JSON.stringify({ success: false, error: 'Missing fields' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (password.length < 8) {
      return new Response(JSON.stringify({ success: false, error: 'Password must be at least 8 characters' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();

    const existing = await Admin.countDocuments();
    if (existing > 0) {
      return new Response(JSON.stringify({ success: false, error: 'Admin already exists' }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const hash = bcrypt.hashSync(password, 10);
    const admin = await Admin.create({ name: name.trim(), email: email.trim().toLowerCase(), passwordHash: hash });
    const token = signToken({ adminId: admin._id.toString() });
    const secure = process.env.NODE_ENV === 'production';

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: {
        'Content-Type': 'application/json',
        'Set-Cookie': `${COOKIE_NAME}=${token}; HttpOnly; Path=/; Max-Age=604800; SameSite=Strict${secure ? '; Secure' : ''}`,
      },
    });
  } catch (error) {
    console.error('admin setup error', error);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
