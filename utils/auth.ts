// Duplicate early definitions removed – using the validated block below
import "server-only";

import { SignJWT, jwtVerify } from "jose";

// Ensure environment variables are present
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}
if (!process.env.JWT_EXPIRES) {
  throw new Error("JWT_EXPIRES environment variable is not set");
}

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
export const expiresAt = parseInt(process.env.JWT_EXPIRES as string) * 60; // seconds
const alg = "HS256";

type EncryptPayload = {
  userId: string;
};

export const encryptJWT = async (payload: EncryptPayload) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime(`${expiresAt}s`)
    .sign(encodedKey);
};

export const decryptJWT = async (token: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: [alg],
    });
    return payload;
  } catch (error) {
    // Server‑side logging can be added here if needed
    // console.error("Failed to verify JWT", error);
    return undefined;
  }
};
