import { requireAdminApi } from '../lib/adminAuth';

export async function requireAdmin(request){
  if (!request) return Response.json({ success: false, message: 'Unauthorized' }, { status: 401 });
  const res = await requireAdminApi(request);
  if (res instanceof Response) return res;
  return res;
}
