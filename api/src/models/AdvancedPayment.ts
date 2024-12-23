// module.exports = (sequelize, DataTypes) => {
//   const AdvancedPayment = sequelize.define("advanced_payment", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     medical_billing_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     cashier_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     amount_paid: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//       defaultValue: 0.0,
//       validate: {
//         min: 0,
//       },
//     },
//     total_amount: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//       defaultValue: 0.0,
//       validate: {
//         min: 0,
//       },
//     },
//     remaining_amount: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//       defaultValue: 0.0,
//       validate: {
//         min: 0,
//       },
//     },
//     amount_remaining_from_previous_payment: {
//       type: DataTypes.DOUBLE,
//       allowNull: false,
//       defaultValue: 0.0,
//       validate: {
//         min: 0,
//       },
//     },
//     payment_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//       defaultValue: new Date(),
//     },
//     // payment_type: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false,
//     //     defaultValue: "advanced",
//     // },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.ENUM,
//       allowNull: false,
//       values: ["Open", "Closed"],
//       defaultValue: "Open",
//     },
//     // payment_method: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false,
//     //     defaultValue: "cash",
//     // },
//   });
//   AdvancedPayment.sync({ alter: false });
//   return AdvancedPayment;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class AdvancedPayment extends Model<
  InferAttributes<AdvancedPayment>,
  InferCreationAttributes<AdvancedPayment>
> {
  declare id: CreationOptional<number>;
  declare medical_billing_id: number;
  declare cashier_id?: number | null; // Optional field
  declare amount_paid: number;
  declare total_amount: number;
  declare remaining_amount: number;
  declare amount_remaining_from_previous_payment: number;
  declare payment_date: Date;
  declare description?: string | null; // Optional field
  declare status?: "Open" | "Closed";
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

AdvancedPayment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_billing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    remaining_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    amount_remaining_from_previous_payment: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default value
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Open", "Closed"),
      allowNull: false,
      defaultValue: "Open",
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
    modelName: "advanced_payment",
    tableName: "advanced_payments",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// AdvancedPayment.sync({ alter: false });

export default AdvancedPayment;
