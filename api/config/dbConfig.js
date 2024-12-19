// const DB =
//   process.env.NODE_ENV === "development"
//     ? "clinic_db"
//     : process.env.DATABASE_NAME;
// const PASSWORD =
//   process.env.NODE_ENV === "development" ? "" : process.env.DATABASE_PASSWORD;
// const USER =
//   process.env.NODE_ENV === "development" ? "root" : process.env.DATABASE_USER;
// const HOST =
//   process.env.NODE_ENV === "development"
//     ? "localhost"
//     : process.env.DATABASE_HOST;
// console.log(HOST);
module.exports = {
  HOST: process.env.DATABASE_HOST,
  // HOST: "104.192.7.115",
  USER: process.env.DATABASE_USER,
  // PASSWORD: "bimo@1234",
  // PASSWORD: "",
  DB: process.env.DATABASE_NAME,
  PORT: 3306,
  // HOST,
  // USER,
  // PASSWORD,
  // DB,
  dialect: "mysql",

  pool: {
    max: 10,
    min: 2,
    acquire: 30000,
    idle: 10000,
  },
};
