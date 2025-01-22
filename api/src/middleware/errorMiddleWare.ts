import { ValidationError } from "sequelize";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../shared/error/ApiError";
import configs from "../config/configs";
import { removeUnusedMulterImageFilesOnError } from "../utils/helpers";

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new ApiError(404, `URL is not found: ${req.originalUrl}`);
  next(error);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;
  let error = err;
  if (err instanceof ValidationError) {
    let errors = err.errors.map((err) => ({
      message: err.message,
      path: [err.path],
    }));
    statusCode = 400;

    // message = "Validation Error" + err.errors;
    error = new ApiError(400, err.message, errors, err.stack);
    // res.status(400).json({ errors });
  }
  if (err.name === "SequelizeForeignKeyConstraintError") {
    // Handle Sequelize foreign key constraint errors
    statusCode = 400;
    message =
      "Foreign key constraint error. Ensure the referenced data exists.";
    error = new ApiError(
      statusCode,
      message,
      [
        {
          message: `Ensure the referenced data(${err.value}) exists.`,
          path: err.fields,
        },
      ],
      err.stack
    );
  }

  const response = {
    ...error,
    message: error.message,
    ...(configs.NODE_DEV === "development" ? { stack: error.stack } : {}), // Error stack traces should be visible in development for debugging
  };
  removeUnusedMulterImageFilesOnError(req);
  // res.status(error.statusCode || 500);
  res.status(error.statusCode || 500).json(response);
};
