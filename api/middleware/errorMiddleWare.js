const { Sequelize } = require("sequelize");

module.exports.notFound = (req, res, next) => {
  const error = new Error(`URL is not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

module.exports.errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // res.status(500);
  if (err instanceof Sequelize.ValidationError) {
    let errors = err.errors.map((err) => err.message);
    statusCode = 400;
    console.log(errors);
    console.log(err);
    message = err.errors;
    // res.status(400).json({ errors });
  }
  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_DEV === "development" ? err.stack : null,
  });
};
