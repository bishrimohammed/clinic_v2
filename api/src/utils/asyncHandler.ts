import { NextFunction, Request, Response } from "express";

const asyncHandler =
  <T extends Record<string, any>>(
    fn: (req: Request & T, res: Response, next: NextFunction) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req as Request & T, res, next)).catch(next);
  };

export default asyncHandler;
