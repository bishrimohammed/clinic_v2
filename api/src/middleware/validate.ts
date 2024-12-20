import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "../shared/error/ApiError";
export const validate =
  <T>(schema: ZodSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        message: error.message,
        path: error.path,
      }));
      throw new ApiError(400, "Required field", errors);
    }
    next();
  };
