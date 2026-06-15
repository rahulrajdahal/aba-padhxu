import { findByEmail, findById } from "./users.dal";

export const getUserById = async (id: string) => {
  const user = await findById(id);

  return user;
};

export const getUserByEmail = async (email: string) => {
  const user = await findByEmail(email);

  return user;
};
