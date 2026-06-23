import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import Contact from '../../../models/Contact';
import { contactSchema } from '../../../utils/validation';
import { sendLeadEmail } from '../../../lib/mail';

// Simple in-memory rate limiter (per IP) — suitable for initial rollout
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 6;
const ipMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const entry = ipMap.get(ip) || { count: 0, first: now };
  if (now - entry.first > RATE_LIMIT_WINDOW) {
    ipMap.set(ip, { count: 1, first: now });
    return false;
  }
  entry.count += 1;
  ipMap.set(ip, entry);
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    if (isRateLimited(ip)) {
      return NextResponse.json({ success: false, data: null, message: 'Too many requests' }, { status: 429 });
    }

    const body = await req.json();

    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: false, data: null, message: 'Spam detected' }, { status: 400 });
    }

    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ success: false, data: null, message: parsed.error.errors.map(e=>e.message).join(', ') }, { status: 400 });
    }

    await connectDB();

    const contact = await Contact.create({
      name: parsed.data.name,
      email: parsed.data.email || null,
      phone: parsed.data.phone,
      business: parsed.data.business || null,
      message: parsed.data.message,
      source: body.source || 'website',
    });

    // try to send email notification (best-effort)
    try {
      await sendLeadEmail(contact);
    } catch (e) {
      console.error('Email send failed', e);
    }

    return NextResponse.json({ success: true, data: contact, message: 'Lead saved' }, { status: 201 });
  } catch (err) {
    console.error('contacts POST error', err);
    return NextResponse.json({ success: false, data: null, message: 'Server error' }, { status: 500 });
  }
}
