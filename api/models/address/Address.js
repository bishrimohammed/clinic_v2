// const { DataTypes } = require("sequelize");
// const sequelize = require("../../config/database.js");
// const Woreda = require("./Woreda.js");

const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define("address", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    woreda_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone_1: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: true,
    },
    phone_2: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      // unique: true,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    house_number: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  Address.sync({ force: false, alter: false });
  return Address;
};
