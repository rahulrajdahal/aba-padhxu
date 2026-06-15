import crypto from "node:crypto";

export const generateToken = () => {
  return crypto.randomBytes(32).toString("base64");
};
