import { getAllServices, getServiceById, createService, updateService, deleteService } from '../../../../controllers/serviceController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const services = await getAllServices();
    return Response.json({ success: true, data: services, message: 'Fetched all services' });
  } else {
    const service = await getServiceById(params.id);
    return Response.json({ success: true, data: service, message: 'Fetched service' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const service = await createService(data);
  return Response.json({ success: true, data: service, message: 'Service created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const service = await updateService(params.id, data);
  return Response.json({ success: true, data: service, message: 'Service updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteService(params.id);
  return Response.json({ success: true, data: null, message: 'Service deleted' });
}
