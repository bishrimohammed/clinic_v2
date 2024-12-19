// authentication using cookies Authorization header
import expressAsyncHandler from "express-async-handler";
import { User } from "../models/index";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express-serve-static-core";
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
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        // console.log("hbghvjygh");
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
          userId: string;
        };

        // console.log(token);
        const user = await User.findByPk(decoded.userId);
        if (!user) {
        }
        req.user = { id: user?.dataValues.id! };

        // console.log(uu);
        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not Authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not Authorized, no token");
    }
  }
);
