const DB =
  process.env.NODE_ENV === "development"
    ? "clinic_db"
    : process.env.DATABASE_NAME;
const PASSWORD =
  process.env.NODE_ENV === "development" ? "" : process.env.DATABASE_PASSWORD;
const USER =
  process.env.NODE_ENV === "development" ? "root" : process.env.DATABASE_USER;
const HOST =
  process.env.NODE_ENV === "development"
    ? "localhost"
    : process.env.DATABASE_HOST;
// console.log(HOST);
module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "",
  DB: "clinic_db",
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
