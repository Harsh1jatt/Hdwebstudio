// lib/adminAuth.js
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { NextResponse } from 'next/server';

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    const res = new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: { 'Content-Type': 'application/json' } });
    throw res;
  }
  // Optionally check role (if you stored role in token/session). For now session.user exists => allow.
  return session;
}