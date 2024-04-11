// const { DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");
// const Address = require("./Address.js");
// const SubCity = require("./SubCity.js");

const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const Woreda = sequelize.define("woreda", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subCity_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "SubCity",
      //   key: "id",
      // },
    },
  });
  return Woreda;
};
