import {
  create,
  findById,
  findByToken,
  removeById,
  updateById,
} from "./tokens.dal";
import { CreateTokenDTO, PatchTokenDTO } from "./tokens.dto";

export const createToken = async (data: CreateTokenDTO) => {
  const token = await create(data);
  return token.id;
};

export const getTokenById = async (id: string) => {
  return await findById(id);
};

export const getTokenByToken = async (token: string) => {
  console.log("otken service", token);
  return await findByToken(token);
};

export const putToken = async (id: string, data: CreateTokenDTO) =>
  await updateById(id, data);

export const patchToken = async (id: string, data: PatchTokenDTO) =>
  await updateById(id, data);

export const deleteTokenById = async (id: string) => await removeById(id);
