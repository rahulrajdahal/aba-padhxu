import bcrypt from "bcryptjs";
import { getUserByEmail } from "../users/users.service";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash);
};

export const userEmailExists = async (email: string) => {
  return !!(await getUserByEmail(email));
};

export const isUserActive = async (email: string) => {
  return (await getUserByEmail(email))?.isActive;
};
