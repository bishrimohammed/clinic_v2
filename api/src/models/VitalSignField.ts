// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const VitalSignField = sequelize.define("vital_sign_field", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       required: true,
//       unique: true,
//     },
//     inputType: {
//       type: DataTypes.ENUM,
//       values: ["number", "text", "date", "select", "radio", "checkbox"],
//       defaultValue: "number",
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   VitalSignField.sync({ alter: false, force: false });
//   return VitalSignField;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class VitalSignField extends Model<
  InferAttributes<VitalSignField>,
  InferCreationAttributes<VitalSignField>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare inputType:
    | "number"
    | "text"
    | "date"
    | "select"
    | "radio"
    | "checkbox";
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

VitalSignField.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    inputType: {
      type: DataTypes.ENUM(
        "number",
        "text",
        "date",
        "select",
        "radio",
        "checkbox"
      ),
      defaultValue: "number",
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
    modelName: "vital_sign_field",
    tableName: "vital_sign_fields",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// VitalSignField.sync({ alter: false, force: false });

export default VitalSignField;
