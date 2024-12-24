import configs from "../config/configs";

const jwt = require("jsonwebtoken");
// generate jsonweb token for user
const generateToken = (userId: number) => {
  const n = userId + 10;
  const token = jwt.sign({ userId }, configs.JWT.SECRET, {
    expiresIn: "30d",
  });
  //   return token;
  // res.cookie("jwt", token, {
  //   httpOnly: true,
  //   secure: process.env.NODE_DEV !== "development",
  //   sameSite: "strict",
  //   maxAge: 3 * 60 * 60 * 24,
  // });
  return token;
};

module.exports = {
  generateToken,
};
