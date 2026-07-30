import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET;

if (!SECRET) {
  throw new Error("JWT_SECRET is missing from environment variables");
}

export const COOKIE_NAME = "hd_admin_token";

export function signToken(payload, options = {}) {
  return jwt.sign(payload, SECRET, {
    expiresIn: options.expiresIn || "7d",
  });
}

export function verifyToken(token) {
  try {
    if (!token) {
      return null;
    }

    return jwt.verify(token, SECRET);
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}