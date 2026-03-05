export class BaseAppError extends Error {
  statusCode: number;
  errors: object | undefined;
  constructor(message: string, statusCode: number, errors?: object) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
export class ValidationError extends BaseAppError {
  constructor(message: string, errors: object) {
    super(message, 400, errors);
  }
}

export class AuthenticationError extends BaseAppError {
  constructor(message: string = "Authentication required") {
    super(message, 401);
  }
}

export class NotFoundError extends BaseAppError {
  constructor(message = "Resource not found") {
    super(message, 404);
  }
}
