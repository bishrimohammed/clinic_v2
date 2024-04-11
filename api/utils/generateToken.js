const jwt = require("jsonwebtoken");
// generate jsonweb token for user
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  //   return token;
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_DEV !== "development",
    sameSite: "strict",
    maxAge: 3 * 60 * 60 * 24,
  });
  return token;
};

module.exports = {
  generateToken,
};
