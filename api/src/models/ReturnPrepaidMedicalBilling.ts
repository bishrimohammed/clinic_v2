// module.exports = (sequelize, DataTypes) => {
//   const ReturnPrepaidMedicalBilling = sequelize.define(
//     "return_prepaid_medical_billing",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       medical_billing_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "medicalbillings",
//           key: "id",
//         },
//         // unique: true,
//       },
//       amount_returned: {
//         type: DataTypes.DECIMAL(10, 2),
//         allowNull: false,
//       },
//       returned_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       return_date: {
//         type: DataTypes.DATE,
//         defaultValue: new Date(),
//       },
//     },
//     {
//       timestamps: false,
//       // freezeTableName: true,
//     }
//   );
//   ReturnPrepaidMedicalBilling.sync({ alter: false });
//   return ReturnPrepaidMedicalBilling;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class ReturnPrepaidMedicalBilling extends Model<
  InferAttributes<ReturnPrepaidMedicalBilling>,
  InferCreationAttributes<ReturnPrepaidMedicalBilling>
> {
  declare id: CreationOptional<number>;
  declare medical_billing_id: number;
  declare amount_returned: number; // Decimal type
  declare returned_by: number;
  declare return_date: Date;
}

ReturnPrepaidMedicalBilling.init(
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
      references: {
        model: "medicalbillings",
        key: "id",
      },
      // unique: true, // Uncomment if you want to enforce uniqueness
    },
    amount_returned: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    returned_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    return_date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
    },
  },
  {
    sequelize,
    modelName: "return_prepaid_medical_billing",
    tableName: "return_prepaid_medical_billings",
    timestamps: false,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// ReturnPrepaidMedicalBilling.sync({ alter: false });

export default ReturnPrepaidMedicalBilling;
