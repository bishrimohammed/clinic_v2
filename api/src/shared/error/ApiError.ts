interface ValidationError {
  message: string;
  path?: string[];
}

class ApiError extends Error {
  public statusCode: number;
  public message: string;
  public status: string;
  public isOperational: boolean = true;
  public stack?: string | undefined;
  public errors?: any[] = [];

  constructor(
    statusCode: number,
    message: string,
    errors?: any[],
    stack: string = ""
  ) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;
    this.status = `${this.statusCode}`.startsWith("4") ? "FAIL" : "ERROR";
    if (errors) {
      this.errors = errors;
    }

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
