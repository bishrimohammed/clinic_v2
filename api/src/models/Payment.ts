// module.exports = (sequelize, DataTypes) => {
//   const Payment = sequelize.define(
//     "payment",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       payment_amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//       },
//       payment_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: new Date(),
//       },
//       medical_billing_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "medicalbillings",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       cashier_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Paid", "Unpaid", "Void"],
//         defaultValue: "Unpaid",
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (payment, options) => {
//           await sequelize.models.payments_audit.create({
//             payment_id: payment.id,
//             payment_amount: payment.payment_amount,
//             payment_date: payment.payment_date,
//             medical_billing_id: payment.medical_billing_id,
//             item_id: payment.item_id,
//             cashier_id: payment.cashier_id,
//             status: payment.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (payment, options) => {
//           const previousValue = payment._previousDataValues;
//           await sequelize.models.payments_audit.create({
//             payment_id: payment.id,
//             payment_amount: previousValue.payment_amount,
//             payment_date: previousValue.payment_date,
//             medical_billing_id: previousValue.medical_billing_id,
//             item_id: previousValue.item_id,
//             cashier_id: previousValue.cashier_id,
//             status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (payment, options) => {
//           await sequelize.models.payments_audit.create({
//             payment_id: payment.id,
//             payment_amount: payment.payment_amount,
//             payment_date: payment.payment_date,
//             medical_billing_id: payment.medical_billing_id,
//             item_id: payment.item_id,
//             cashier_id: payment.cashier_id,
//             status: payment.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   Payment.sync({ alter: false, force: false });
//   return Payment;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;
  declare payment_amount: number;
  declare payment_date?: Date; // Can be null
  declare medical_billing_id: number;
  declare item_id: number;
  declare cashier_id?: number | null; // Can be null
  declare status: "Paid" | "Unpaid" | "Void"; // Enum type
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Payment.init(
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
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
    },
    medical_billing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicalbillings",
        key: "id",
      },
      // onDelete: "CASCADE",
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
      type: DataTypes.ENUM("Paid", "Unpaid", "Void"),
      allowNull: false,
      defaultValue: "Unpaid",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "payment",
    tableName: "payments",
    timestamps: true,
    // hooks: {
    //   afterCreate: async (payment, options) => {
    //     await sequelize.models.payments_audit.create({
    //       payment_id: payment.id,
    //       payment_amount: payment.payment_amount,
    //       payment_date: payment.payment_date,
    //       medical_billing_id: payment.medical_billing_id,
    //       item_id: payment.item_id,
    //       cashier_id: payment.cashier_id,
    //       status: payment.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (payment, options) => {
    //     const previousValue = payment._previousDataValues;
    //     await sequelize.models.payments_audit.create({
    //       payment_id: payment.id,
    //       payment_amount: previousValue.payment_amount,
    //       payment_date: previousValue.payment_date,
    //       medical_billing_id: previousValue.medical_billing_id,
    //       item_id: previousValue.item_id,
    //       cashier_id: previousValue.cashier_id,
    //       status: previousValue.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (payment, options) => {
    //     await sequelize.models.payments_audit.create({
    //       payment_id: payment.id,
    //       payment_amount: payment.payment_amount,
    //       payment_date: payment.payment_date,
    //       medical_billing_id: payment.medical_billing_id,
    //       item_id: payment.item_id,
    //       cashier_id: payment.cashier_id,
    //       status: payment.status,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Payment.sync({ alter: false, force: false });

export default Payment;
