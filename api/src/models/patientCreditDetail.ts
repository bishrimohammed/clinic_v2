// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const CreditPatient = sequelize.define("creditpatient", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     patient_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     agreement_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     employee_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   return CreditPatient;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class patientCreditDetail extends Model<
  InferAttributes<patientCreditDetail>,
  InferCreationAttributes<patientCreditDetail>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare credit_company_id: number;
  declare agreement_id: number;
  declare employee_id: number;
  declare credit_limit: number;
  declare credit_balance: number;
  declare status: CreationOptional<boolean>;
}

patientCreditDetail.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agreement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    credit_company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    credit_limit: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    credit_balance: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "patientCreditDetail", // Specify the model name
    tableName: "patient_credit_details",
  }
);

export default patientCreditDetail;
