import { Sequelize, ValidationError } from "sequelize";
import { NextFunction, Request, Response } from "express";
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`URL is not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // res.status(500);
  if (err instanceof ValidationError) {
    let errors = err.errors.map((err) => err.message);
    statusCode = 400;
    console.log(errors);
    console.log(err);
    message = "Validation Error" + err.errors;
    // res.status(400).json({ errors });
  }
  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_DEV === "development" ? err.stack : null,
  });
};
