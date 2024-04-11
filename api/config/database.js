const Sequelize = require("sequelize");

const sequelize = new Sequelize("clinic_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});
// const main = async () => {
//   await sequelize.sync({ alter: true });
// };
// main();
module.exports = sequelize;
