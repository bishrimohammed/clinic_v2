// const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

// Unit sequilze model. it stores unit for service item
module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define("unit", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Unit.sync({ alter: false });
  return Unit;
};
