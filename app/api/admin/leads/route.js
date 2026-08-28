import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/db';
import Contact from '../../../../models/Contact';
import { requireAdminApi } from '../../../../lib/auth';

export async function GET(req) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    await connectDB();
    const url = new URL(req.url);
    const q = (url.searchParams.get('q') || '').trim();
    const status = (url.searchParams.get('status') || '').trim();
    const source = (url.searchParams.get('source') || '').trim();
    const priority = (url.searchParams.get('priority') || '').trim();
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1', 10) || 1);
    const perPage = Math.min(100, parseInt(url.searchParams.get('perPage') || '20', 10) || 20);

    const filter = {};

    if (status && status !== 'all') {
      filter.status = status;
    }
    if (source && source !== 'all') {
      filter.source = source;
    }
    if (priority && priority !== 'all') {
      filter.priority = priority;
    }

    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.$or = [
        { name: { $regex: escaped, $options: 'i' } },
        { email: { $regex: escaped, $options: 'i' } },
        { phone: { $regex: escaped, $options: 'i' } },
        { business: { $regex: escaped, $options: 'i' } },
        { message: { $regex: escaped, $options: 'i' } },
      ];
    }

    const [total, leads, statusCounts] = await Promise.all([
      Contact.countDocuments(filter),
      Contact.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * perPage)
        .limit(perPage)
        .lean(),
      Contact.aggregate([
        { $group: { _id: '$status', count: { $sum: 1 } } },
      ]),
    ]);

    const counts = { all: 0, new: 0, contacted: 0, qualified: 0, proposal: 0, won: 0, lost: 0, spam: 0 };
    for (const item of statusCounts) {
      if (item._id && counts[item._id] !== undefined) {
        counts[item._id] = item.count;
      }
      counts.all += item.count;
    }

    return NextResponse.json({
      success: true,
      leads,
      total,
      page,
      perPage,
      counts,
    });
  } catch (e) {
    console.error('leads list error', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
