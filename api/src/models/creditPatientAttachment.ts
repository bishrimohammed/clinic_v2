// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const CreditPatientAttachment = sequelize.define(
//     "credit_patient_attachment",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       creditPatient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },

//       letter_doc: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,

//         defaultValue: true,
//       },
//     }
//   );
//   return CreditPatientAttachment;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class CreditPatientAttachment extends Model<
  InferAttributes<CreditPatientAttachment>,
  InferCreationAttributes<CreditPatientAttachment>
> {
  declare id: CreationOptional<number>;
  declare creditPatient_id: number;
  declare letter_doc: string;
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

CreditPatientAttachment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    creditPatient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    letter_doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "credit_patient_attachments",
  }
);

export default CreditPatientAttachment;
