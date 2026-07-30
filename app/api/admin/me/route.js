import { requireAdminApi } from '../../../../lib/auth';

export async function GET(req) {
  const admin = await requireAdminApi(req);
  if (admin instanceof Response) return admin;

  return new Response(JSON.stringify({
    success: true,
    admin: {
      id: admin._id.toString(),
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt,
    },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
