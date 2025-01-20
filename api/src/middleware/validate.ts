import { Request, Response, NextFunction } from "express";
import { TypeOf, ZodSchema } from "zod";
import { ApiError } from "../shared/error/ApiError";

type TransformationMap = { [key: string]: (value: any) => any };

export const validate =
  <T extends ZodSchema<any>>(schema: T, transformations?: TransformationMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    const formData = { ...req.body };

    // Apply transformations if provided and if there are matching keys
    if (transformations) {
      // console.log(true);

      Object.entries(transformations).forEach(([key, transformFn]) => {
        if (formData[key] !== undefined) {
          // formData[key] = transformFn(formData[key]);
          // requiresTransformation = true;
          try {
            formData[key] = transformFn(formData[key]);
          } catch (error) {
            const err = error as Error;
            throw new ApiError(400, `Transformation error for field ${key}`, [
              { message: err.message, path: [key] },
            ]);
          }
        }
      });
    }
    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        message: error.message,
        path: error.path,
      }));
      throw new ApiError(400, "Validation error", errors);
    }
    const validatedData: TypeOf<T> = schema.parse(formData);

    // Attach the validated data to the request object

    (
      req as Request & {
        validatedData: TypeOf<T>;
      }
    ).validatedData = validatedData;

    next();
  };

export const validateQuery =
  <T extends ZodSchema<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const query = { ...req.query };
    console.log(query);

    const result = schema.safeParse(query);
    if (!result.success) {
      const message = result.error.errors
        .map((error) => error.message)
        .join(", "); // Joining messages with a comma for readability
      throw new ApiError(400, message);
    }
    next();
  };

export const validateParams =
  <T extends ZodSchema<any>>(schema: T) =>
  (req: Request, res: Response, next: NextFunction) => {
    const params = req.params;
    const result = schema.safeParse(params);
    if (!result.success) {
      const message = result.error.errors
        .map((error) => error.message)
        .join(", "); // Joining messages with a comma for readability
      throw new ApiError(400, message);
    }
    next();
  };
