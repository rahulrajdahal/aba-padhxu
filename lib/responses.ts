import "server-only";

import { isAuthenticated } from "@/app/(auth)/middleware";
import {
  BadRequestError,
  ForbiddenError,
  InternalServerError,
  NotFoundError,
  UnAuthorizedError,
  UnprocessableEntityError,
} from "./errors";

export type ValidationErrors = { [field: string]: string[] };

type SuccessStatusCode = 200 | 201 | 204;
type ErrorStatusCode = 400 | 401 | 403 | 404 | 409 | 422 | 500;
type StatusCode = SuccessStatusCode | ErrorStatusCode;
type ResponseType = "error" | "success";

interface ActionResponse {
  type: ResponseType;
  message: string;
  status: StatusCode;
  data?: unknown;
  error?: unknown;
  errors?: ValidationErrors;
}

const response = (
  type: ResponseType,
  message: string,
  status: StatusCode,
  data?: unknown,
  error?: unknown,
  errors?: ValidationErrors,
): ActionResponse => ({ type, message, status, data, error, errors });

export const successResponse = (
  message: string,
  status: SuccessStatusCode = 200,
  data?: unknown,
): ActionResponse => response("success", message, status, data);

export const errorResponse = (
  message = "Server Error",
  status: ErrorStatusCode = 500,
  error?: unknown,
  errors?: ValidationErrors,
): ActionResponse =>
  response("error", message, status, undefined, error, errors);

export const okResponse = (message = "ok", data?: unknown): ActionResponse =>
  successResponse(message, 200, data);

export const createdResponse = (
  message = "created",
  data?: unknown,
): ActionResponse => successResponse(message, 201, data);

export const noContentResponse = (message = "No Content") =>
  successResponse(message, 204);

export const validationError = (errors: ValidationErrors): ActionResponse =>
  errorResponse("Validation Error", 400, undefined, errors);

export const invalidCredentialsError = (error?: unknown): ActionResponse =>
  errorResponse("Invalid Credentials", 400, error);

export const serverError = (error?: unknown): ActionResponse =>
  errorResponse(
    "An unexpected server error occurred. Please try again later.",
    500,
    error,
  );

export const notFoundError = (title?: string): ActionResponse =>
  errorResponse(`${title ?? "Resource"} not found`, 404);

export const unauthorizedError = (): ActionResponse =>
  errorResponse("Unauthorized", 401);

export const forbiddenError = (): ActionResponse =>
  errorResponse("Forbidden", 403);

export const badRequestError = (
  message = "Bad Request",
  error?: unknown,
): ActionResponse => errorResponse(message, 400, error);

export const invalidRequestError = (error?: unknown): ActionResponse =>
  badRequestError("Invalid Request", error);

export const conflictError = (title?: string): ActionResponse =>
  errorResponse(`${title ?? "Resource"} already exists`, 409);

export const actionWrapper = (
  fn: (...args: any[]) => Promise<ActionResponse>,
) => {
  return async (...args: any[]): Promise<ActionResponse> => {
    try {
      return await fn(...args);
    } catch (error) {
      console.error("Error in action wrapper", error);

      if (error instanceof UnAuthorizedError) {
        return errorResponse(error.message, 401, error);
      }
      if (error instanceof ForbiddenError) {
        return errorResponse(error.message, 403, error);
      }
      if (error instanceof BadRequestError) {
        return badRequestError(error.message, error);
      }
      if (error instanceof NotFoundError) {
        return errorResponse(error.message, 404, error);
      }
      if (error instanceof UnprocessableEntityError) {
        return errorResponse(error.message, 422, error);
      }
      if (error instanceof Error) {
        return errorResponse(error.message, 400, error);
      }
      if (error instanceof InternalServerError) {
        return errorResponse(error.message, 500, error);
      }
      return serverError(error);
    }
  };
};

export const authActionWrapper = (
  fn: (...args: any[]) => Promise<ActionResponse>,
) => {
  return actionWrapper(async (...args: any[]) => {
    try {
      const isAuth = await isAuthenticated();
      if (!isAuth) throw new UnAuthorizedError();

      return await fn(...args);
    } catch (error) {
      throw error;
    }
  });
};
