const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

// service category for clinic service
module.exports = (sequelize, DataTypes) => {
  const ServiceCategory = sequelize.define("servicecategory", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    clinicService_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  ServiceCategory.sync({ alert: false });
  return ServiceCategory;
};
