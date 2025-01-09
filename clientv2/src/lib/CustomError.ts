// lib/CustomError.ts
export class CustomError extends Error {
  public statusCode: number;
  public errors: { message: string; path: string[] }[];

  constructor(
    statusCode: number,
    message: string,
    errors: { message: string; path: string[] }[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;
    this.name = "CustomError";
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
