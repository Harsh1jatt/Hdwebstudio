import { COOKIE_NAME } from '../../../../lib/jwt';

export async function POST(){
  const secure = process.env.NODE_ENV === 'production';
  return new Response(JSON.stringify({ success: true }), { status: 200, headers: { 'Content-Type': 'application/json', 'Set-Cookie': `${COOKIE_NAME}=deleted; HttpOnly; Path=/; Max-Age=0; SameSite=Strict${secure?'; Secure':''}` } });
}
