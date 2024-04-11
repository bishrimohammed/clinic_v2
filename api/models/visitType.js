// const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
// visitType model
module.exports = (sequelize, DataTypes) => {
  const VisitType = sequelize.define("visittype", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  //   VisitType.sync({ alter: false }).then(() => {
  //     console.log("visitType model synced");
  //   });
  return VisitType;
};
