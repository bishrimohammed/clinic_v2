// authentication using cookies Authorization header
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/index";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express-serve-static-core";
import { ApiError } from "../shared/error/ApiError";
import { permissionService } from "../services";
import { TokenPayload, verifyAccessToken } from "../utils/token";
// const jwt = require(JsonWebTokenError)
// module.exports.isAuthenticated = (req, res, next) => {};

export const protect = expressAsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let accessToken;

    try {
      // console.log("hbghvjygh");
      // req.cookies?.token ||
      accessToken =
        req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
      // console.log(req.cookies?.accessToken);

      if (!accessToken) {
        next(new ApiError(401, "Not Authorized, no token"));
      }
      // const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      //   userId: string;
      // };
      const decoded = verifyAccessToken(JSON.parse(accessToken));

      const user = await User.findByPk(decoded.id);

      if (!user) {
        next(new ApiError(401, "Not Authorized, user not found"));
        return;
      }
      // console.log(user);
      const role = await user.getRole({ attributes: ["name"] });

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
