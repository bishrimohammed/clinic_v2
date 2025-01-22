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
import sequelize from "../db"; // Ensure the correct path
import Patient from "./Patient";
import CreditAgreement from "./creditAgreement";
import CompanyEmployee from "./CompanyEmployee";
import CreditCompanyProfile from "./creditCompanyProfile";

class PatientCreditDetail extends Model<
  InferAttributes<PatientCreditDetail>,
  InferCreationAttributes<PatientCreditDetail>
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

PatientCreditDetail.init(
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
      references: {
        model: Patient,
        key: "id",
      },
    },
    agreement_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CreditAgreement,
        key: "id",
      },
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CompanyEmployee,
        key: "id",
      },
    },
    credit_company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: CreditCompanyProfile,
        key: "id",
      },
    },
    credit_limit: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    credit_balance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "patientCreditDetail",
    tableName: "patient_credit_details",
  }
);

PatientCreditDetail.sync({ alter: false });

export default PatientCreditDetail;
