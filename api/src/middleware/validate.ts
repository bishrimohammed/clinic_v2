import { Request, Response, NextFunction } from "express";
import { TypeOf, z, ZodSchema } from "zod";
import { ApiError } from "../shared/error/ApiError";
import { TypedRequest } from "../types/TypedRequest";

type TransformationMap = { [key: string]: (value: any) => any };

export const validate =
  <T extends ZodSchema<any>>(schema: T, transformations?: TransformationMap) =>
  (req: Request, res: Response, next: NextFunction) => {
    const formData = { ...req.body };

    let requiresTransformation = false;
    // console.log(req.body);

    // Apply transformations if provided and if there are matching keys
    if (transformations) {
      // console.log(true);

      Object.entries(transformations).forEach(([key, transformFn]) => {
        if (formData[key] !== undefined) {
          formData[key] = transformFn(formData[key]);
          requiresTransformation = true;
        }
      });
    }
    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors = result.error.errors.map((error) => ({
        message: error.message,
        path: error.path,
      }));
      throw new ApiError(400, "Valiadtion error", errors);
    }
    const validatedData: TypeOf<T> = schema.parse(formData);
    // console.log(validatedData);

    // Attach the validated data to the request object if transformations were applied
    if (requiresTransformation) {
      // (req as TypedRequest<TypeOf<T>>).validatedData = validatedData;
    }
    (
      req as Request & {
        validatedData: TypeOf<T>;
      }
    ).validatedData = validatedData;

    // const result = schema.safeParse(req.body);
    // if (!result.success) {
    //   const errors = result.error.errors.map((error) => ({
    //     message: error.message,
    //     path: error.path,
    //   }));
    //   throw new ApiError(400, "Required field", errors);
    // }
    next();
  };
