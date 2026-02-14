import { getAllPricing, getPricingById, createPricing, updatePricing, deletePricing } from '../../../../controllers/pricingController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const pricing = await getAllPricing();
    return Response.json({ success: true, data: pricing, message: 'Fetched all pricing plans' });
  } else {
    const plan = await getPricingById(params.id);
    return Response.json({ success: true, data: plan, message: 'Fetched pricing plan' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const plan = await createPricing(data);
  return Response.json({ success: true, data: plan, message: 'Pricing plan created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const plan = await updatePricing(params.id, data);
  return Response.json({ success: true, data: plan, message: 'Pricing plan updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deletePricing(params.id);
  return Response.json({ success: true, data: null, message: 'Pricing plan deleted' });
}
