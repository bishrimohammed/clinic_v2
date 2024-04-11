// Clinic Servive model. it store services clinic will provide. sequilize model

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const ClinicService = sequelize.define("clinicservice", {
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    is_laboratory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_imaging: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_registration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_others: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  ClinicService.sync({ alter: false });
  return ClinicService;
};
