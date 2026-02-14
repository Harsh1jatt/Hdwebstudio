import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../../../../controllers/userController';
import dbConnect from '../../../../lib/db';

export async function GET(request, { params }) {
  await dbConnect();
  if (params.id === 'all') {
    const users = await getAllUsers();
    return Response.json({ success: true, data: users, message: 'Fetched all users' });
  } else {
    const user = await getUserById(params.id);
    return Response.json({ success: true, data: user, message: 'Fetched user' });
  }
}

export async function POST(request) {
  await dbConnect();
  const data = await request.json();
  const user = await createUser(data);
  return Response.json({ success: true, data: user, message: 'User created' });
}

export async function PUT(request, { params }) {
  await dbConnect();
  const data = await request.json();
  const user = await updateUser(params.id, data);
  return Response.json({ success: true, data: user, message: 'User updated' });
}

export async function DELETE(request, { params }) {
  await dbConnect();
  await deleteUser(params.id);
  return Response.json({ success: true, data: null, message: 'User deleted' });
}
