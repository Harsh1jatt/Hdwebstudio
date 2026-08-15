import jwt from "jsonwebtoken";

export const COOKIE_NAME = "hd_admin_token";

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;

  if (secret) {
    return secret;
  }

  const message =
    "JWT_SECRET is missing. Add it to your .env.local file to enable admin authentication.";

  if (process.env.NODE_ENV === "production") {
    throw new Error(`${message} JWT_SECRET is required in production.`);
  }

  throw new Error(message);
}

export function signToken(payload, options = {}) {
  return jwt.sign(payload, getJwtSecret(), {
    expiresIn: options.expiresIn || "7d",
  });
}

export function verifyToken(token) {
  try {
    if (!token) {
      return null;
    }

    return jwt.verify(token, getJwtSecret());
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return null;
  }
}
