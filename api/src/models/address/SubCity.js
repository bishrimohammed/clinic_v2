// const { DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");
// const City = require("./City.js");
// const Woreda = require("./Woreda.js");

const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const SubCity = sequelize.define("subcity", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Subcity_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return SubCity;
};
