// const db = require("..");
// const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const OrderedTest = sequelize.define("orderedtest", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    investigationOrder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: db.InvestigationOrder,
      //     key: "id",
      //   },
    },
    serviceItem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      //   references: {
      //     model: db.ServiceItem,
      //     key: "id",
      //   },
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    report_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    result: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    requested_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    reported_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    is_underpanel: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: true,
      defaultValue: "pending",
      values: ["pending", "completed"],
    },
  });
  OrderedTest.sync({ force: false, alter: true });
  return OrderedTest;
};
