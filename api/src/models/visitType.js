// const { DataTypes } = require("sequelize");
const { sequelize } = require(".");
// visitType model
module.exports = (sequelize, DataTypes) => {
  const VisitType = sequelize.define("visittype", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  VisitType.sync({ alter: false });
  return VisitType;
};
