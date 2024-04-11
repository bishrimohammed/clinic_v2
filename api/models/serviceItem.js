// service item sequilize model. it contain service name, price , service_category id , unit_id, status

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const ServiceItem = sequelize.define("serviceitem", {
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      valiate: {
        min: 0,
      },
    },
    serviceCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: ServiceCategory,
      //     key: "id",
      // },
    },
    unit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      // references: {
      //     model: Unit,
      //     key: "id",
      // },
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: true,
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
  });
  ServiceItem.sync({
    force: false,
    alter: false,
  });
  return ServiceItem;
};
