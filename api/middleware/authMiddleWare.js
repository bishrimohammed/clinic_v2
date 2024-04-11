// authentication using cookies Authorization header
const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const jwt = require("jsonwebtoken");
// const jwt = require(JsonWebTokenError)
// module.exports.isAuthenticated = (req, res, next) => {};
module.exports.protect = expressAsyncHandler(async (req, res, next) => {
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
      console.log("hbghvjygh");
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(token);
      req.user = await db.User.findByPk(decoded.userId, {
        attributes: { exclude: ["password"] },
      });
      const uu = await db.User.findByPk(decoded.userId, {
        attributes: { exclude: ["password"] },
      });
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
});
