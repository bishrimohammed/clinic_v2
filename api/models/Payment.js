// const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define(
    "payment",
    {
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
        references: {
          model: "medicalbillings",
          key: "id",
        },
        onDelete: "CASCADE",
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
    },
    {
      hooks: {
        afterCreate: async (payment, options) => {
          await sequelize.models.payments_audit.create({
            payment_id: payment.id,
            payment_amount: payment.payment_amount,
            payment_date: payment.payment_date,
            medical_billing_id: payment.medical_billing_id,
            item_id: payment.item_id,
            cashier_id: payment.cashier_id,
            status: payment.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (payment, options) => {
          const previousValue = payment._previousDataValues;
          await sequelize.models.payments_audit.create({
            payment_id: payment.id,
            payment_amount: previousValue.payment_amount,
            payment_date: previousValue.payment_date,
            medical_billing_id: previousValue.medical_billing_id,
            item_id: previousValue.item_id,
            cashier_id: previousValue.cashier_id,
            status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (payment, options) => {
          await sequelize.models.payments_audit.create({
            payment_id: payment.id,
            payment_amount: payment.payment_amount,
            payment_date: payment.payment_date,
            medical_billing_id: payment.medical_billing_id,
            item_id: payment.item_id,
            cashier_id: payment.cashier_id,
            status: payment.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Payment.sync({ alter: false, force: false });
  return Payment;
};
