import { create, findById, findByToken, remove, update } from "./tokens.dal";
import { CreateTokenDTO, PatchTokenDTO } from "./tokens.dto";

export const createToken = async (data: CreateTokenDTO) => {
  const token = await create(data);
  return token.id;
};

export const getTokenById = async (id: string) => {
  return await findById(id);
};

export const getTokenByToken = async (token: string) => {
  return await findByToken(token);
};

export const putToken = async (id: string, data: CreateTokenDTO) =>
  await update(id, data);

export const patchToken = async (id: string, data: PatchTokenDTO) =>
  await update(id, data);

export const deleteToken = async (id: string) => await remove(id);
