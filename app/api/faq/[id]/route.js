import { getAllFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ } from '../../../../controllers/faqController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const faqs = await getAllFAQs();
    return Response.json({ success: true, data: faqs, message: 'Fetched all FAQs' });
  } else {
    const faq = await getFAQById(params.id);
    return Response.json({ success: true, data: faq, message: 'Fetched FAQ' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const faq = await createFAQ(data);
  return Response.json({ success: true, data: faq, message: 'FAQ created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const faq = await updateFAQ(params.id, data);
  return Response.json({ success: true, data: faq, message: 'FAQ updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteFAQ(params.id);
  return Response.json({ success: true, data: null, message: 'FAQ deleted' });
}
