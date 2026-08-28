import mongoose from 'mongoose';
import connectDB from '../../../../../lib/db';
import Contact from '../../../../../models/Contact';
import { requireAdminApi } from '../../../../../lib/auth';

function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

export async function GET(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidId(id)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid lead ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    const lead = await Contact.findById(id).lean();
    if (!lead) {
      return new Response(JSON.stringify({ success: false, error: 'Lead not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, lead }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('lead detail error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function PATCH(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidId(id)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid lead ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    const body = await req.json();
    const allowedStatuses = ['new', 'contacted', 'qualified', 'proposal', 'won', 'lost', 'spam'];
    const allowedPriorities = ['low', 'normal', 'high', 'urgent'];
    const update = {};

    if (body.status && allowedStatuses.includes(body.status)) update.status = body.status;
    if (body.priority && allowedPriorities.includes(body.priority)) update.priority = body.priority;
    if (body.notes !== undefined) update.notes = String(body.notes || '').trim();
    if (body.service !== undefined) update.service = String(body.service || '').trim();
    if (body.budget !== undefined) update.budget = String(body.budget || '').trim();
    if (body.business !== undefined) update.business = String(body.business || '').trim();
    if (body.website !== undefined) update.website = String(body.website || '').trim();

    const lead = await Contact.findByIdAndUpdate(id, update, { new: true }).lean();
    if (!lead) {
      return new Response(JSON.stringify({ success: false, error: 'Lead not found' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    return new Response(JSON.stringify({ success: true, lead }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('update lead error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export async function DELETE(req, { params }) {
  try {
    const auth = await requireAdminApi(req);
    if (auth instanceof Response) return auth;

    const { id } = await params;
    if (!isValidId(id)) {
      return new Response(JSON.stringify({ success: false, error: 'Invalid lead ID' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await connectDB();
    await Contact.deleteOne({ _id: id });
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e) {
    console.error('delete lead error', e);
    return new Response(JSON.stringify({ success: false, error: 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
