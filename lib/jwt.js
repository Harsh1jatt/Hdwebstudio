import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET || 'dev-secret-change-me';
const COOKIE_NAME = 'hd_admin_token';

export function signToken(payload, opts = {}){
  return jwt.sign(payload, SECRET, { expiresIn: opts.expiresIn || '7d' });
}

export function verifyToken(token){
  try{
    return jwt.verify(token, SECRET);
  }catch(e){
    return null;
  }
}

export { COOKIE_NAME };
