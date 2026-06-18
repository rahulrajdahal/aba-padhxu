import "server-only";

import { SignJWT, jwtVerify } from "jose";

const encodedKey = new TextEncoder().encode(process.env.JWT_SECRET);
export const expiresAt = parseInt(process.env.JWT_EXPIRES as string) * 60;
const alg = "HS256";

type EncryptPayload = {
  userId: string;
};

export const encryptJWT = async (payload: EncryptPayload) => {
  return new SignJWT({ ...payload, exp: expiresAt })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
};

export const decryptJWT = async (token: string | undefined = "") => {
  try {
    const { payload } = await jwtVerify(token, encodedKey, {
      algorithms: [alg],
    });
    return payload;
  } catch (error) {
    // console.log("Failed to verify session", error);
  }
};
