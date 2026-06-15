import { logger } from "@/lib/logger";
import {
  createdResponse,
  forbiddenError,
  serverError,
  validationError,
} from "@/lib/responses";
import { authUserId, isAuthenticated } from "../(auth)/middleware";
import { generateToken } from "./middleware";
import { createToken } from "./tokens.service";
import { addTokenSchema } from "./tokens.validation";

export const addToken = async (prevState: unknown, formData: FormData) => {
  try {
    const isAuth = await isAuthenticated();
    if (!isAuth) {
      return forbiddenError();
    }

    const body = {
      type: formData.get("type") as string,
    };

    const validateBody = addTokenSchema.safeParse(body);
    if (!validateBody.success) {
      return validationError(validateBody.error.flatten().fieldErrors);
    }

    const userId = (await authUserId()) as string;
    if (!userId) {
      return forbiddenError();
    }

    const tokenId = await createToken({
      ...validateBody.data,
      token: generateToken(),
      userId,
    });
    return createdResponse("Token created successfully.", tokenId);
  } catch (error) {
    logger.error("Error adding token.", error);
    return serverError();
  }
};
