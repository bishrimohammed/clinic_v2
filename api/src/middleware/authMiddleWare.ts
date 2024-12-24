// authentication using cookies Authorization header
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/index";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { ApiError } from "../shared/error/ApiError";
import { permissionService } from "../services";
// const jwt = require(JsonWebTokenError)
// module.exports.isAuthenticated = (req, res, next) => {};

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let token;

    // token = req.cookies?.jwt;
    // console.log(req.cookies.jwt);
    // if (token) {
    //   try {
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //     req.user = await db.User.findByPk(decoded.id);

    //     next();
    //   } catch (error) {
    //     console.error(error);
    //     res.status(401);
    //     throw new Error("Not authorized, token failed");
    //   }
    // } else {
    //   res.status(401);
    //   throw new Error("Not authorized, no token");
    // }
    // console.log(req.headers.authorization);
    // if (
    //   req.headers.authorization &&
    //   req.headers.authorization.startsWith("Bearer")
    // ) {
    try {
      // console.log("hbghvjygh");
      // req.cookies?.token ||
      token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
      // console.log(token);

      if (!token) {
        next(new ApiError(401, "Not Authorized, no token"));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
        userId: string;
      };

      const user = await User.findByPk(decoded.userId);

      if (!user) {
        next(new ApiError(401, "Not Authorized, user not found"));
        return;
      }
      // console.log(user);
      const role = await user.getRole({ attributes: ["name"] });
      // const permissions = await user.getUserPermissions();

      // const processedPermissions = permissions.map((p) => {
      //   return {
      //     name: p.name,
      //     permissionId: p.UserPermission?.dataValues.permission_id as number,
      //     create: p.UserPermission?.dataValues.create!,
      //     read: p.UserPermission?.dataValues.read!,
      //     edit: p.UserPermission?.dataValues.edit!,
      //     delete: p.UserPermission?.dataValues.delete!,
      //   };
      // });
      const processedPermissions = await permissionService.formatUserPermission(
        user
      );
      req.user = {
        id: user?.id,
        role: role?.name,
        permissions: processedPermissions,
      };
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        // console.log(error);
        throw new ApiError(401, "Not Authorized, token failed");
      }
      next(error);
      // console.log(error);
    }
    // }

    // if (!token) {
    //   res.status(401);
    //   throw new Error("Not Authorized, no token");
    // }
  }
);
