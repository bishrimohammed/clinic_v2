// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define("payment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: new Date(),
    },
    medical_billing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Paid", "Unpaid", "Void"],
      defaultValue: "Unpaid",
    },
  });
  Payment.sync({ alter: false });
  return Payment;
};
