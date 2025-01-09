import { NextFunction, Request, Response } from "express";
import { PermissionAction, PermissionName } from "../utils/constants";
import { ApiError } from "../shared/error/ApiError";

export const permissionGuard = (
  permission_name: PermissionName,
  action: PermissionAction
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const permission = req.user?.permissions.find(
      (p) => p.name.toLowerCase() === permission_name.toLowerCase()
    );
    if (!permission) {
      return next(
        new ApiError(403, "You don't have permission to access this resource")
      );
    }
    if (!permission[action]) {
      return next(
        new ApiError(
          403,
          `You don't have permission to perform ${action.toUpperCase()} on this resource`
        )
      );
    }

    next();
  };
};
