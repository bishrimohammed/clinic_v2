import { Request } from "express";
import { TypeOf, ZodObject, ZodSchema } from "zod";

export type TypedRequest<T extends ZodObject<any>> = Request & {
  validatedData: T["_output"];
};
// export interface TypedRequest<T extends ZodSchema> extends Request {
//   validatedData: TypeOf<T>;
// }
