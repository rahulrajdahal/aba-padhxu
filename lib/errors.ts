export class InternalServerError extends Error {
  constructor(
    message = "An unexpected server error occurred. Please try again later.",
  ) {
    super(message);
    this.name = "Internal Server Error";
  }
}

export class BadRequestError extends Error {
  constructor(
    message = "The server cannot process the request because it is malformed.",
  ) {
    super(message);
    this.name = "Bad Request Error";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "You do not have permission to access this resource.") {
    super(message);
    this.name = "Forbidden Error";
  }
}

export class UnAuthorizedError extends Error {
  constructor(message = "You do not have permission to perform this action.") {
    super(message);
    this.name = "UnAuthorized Error";
  }
}

export class NotFoundError extends Error {
  constructor(message = "Resource") {
    super(message);
    this.name = "Not Found Error";
    this.message = `${message ?? "Resource"} not found`;
  }
}

export class UnprocessableEntityError extends Error {
  constructor(
    message = "The server could not process the request due to a client error.",
  ) {
    super(message);
    this.name = "UnprocessableEntity Error";
  }
}
