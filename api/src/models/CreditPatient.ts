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

class CreditPatient extends Model<
  InferAttributes<CreditPatient>,
  InferCreationAttributes<CreditPatient>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number;
  declare agreement_id: number;
  declare employee_id: number;
  declare status: boolean;
}

CreditPatient.init(
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "creditpatients", // Specify the model name
  }
);

export default CreditPatient;
