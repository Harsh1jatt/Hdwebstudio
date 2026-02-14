import { getAllContacts, getContactById, createContact, updateContact, deleteContact } from '../../../../controllers/contactController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const contacts = await getAllContacts();
    return Response.json({ success: true, data: contacts, message: 'Fetched all contacts' });
  } else {
    const contact = await getContactById(params.id);
    return Response.json({ success: true, data: contact, message: 'Fetched contact' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const contact = await createContact(data);
  return Response.json({ success: true, data: contact, message: 'Contact message stored' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const contact = await updateContact(params.id, data);
  return Response.json({ success: true, data: contact, message: 'Contact updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteContact(params.id);
  return Response.json({ success: true, data: null, message: 'Contact deleted' });
}
