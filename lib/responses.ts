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

export const notFoundError = (title?: string): ActionResponse =>
  errorResponse(`${title ?? "Resource"} not found`, 404);

export const unauthorizedError = (): ActionResponse =>
  errorResponse("Unauthorized", 401);

export const forbiddenError = (): ActionResponse =>
  errorResponse("Forbidden", 403);

export const validationError = (errors: ValidationErrors): ActionResponse =>
  errorResponse("Validation Error", 400, undefined, errors);

export const invalidCredentialsError = (error?: unknown): ActionResponse =>
  errorResponse("Invalid Credentials", 401, error);

export const invalidRequestError = (error?: unknown): ActionResponse =>
  errorResponse("Invalid Request", 400, error);

export const serverError = (error?: unknown): ActionResponse =>
  errorResponse(
    "An unexpected server error occurred. Please try again later.",
    500,
    error,
  );

export const conflictError = (title?: string): ActionResponse =>
  errorResponse(`${title ?? "Resource"} already exists`, 409);
