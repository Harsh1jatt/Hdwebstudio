import { getServerSession } from 'next-auth';
import { authOptions } from '../lib/adminAuth';

export async function requireAdmin(request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user || !session.user.isAdmin) {
    return Response.json({ success: false, data: null, message: 'Unauthorized' }, { status: 401 });
  }
  return session;
}
