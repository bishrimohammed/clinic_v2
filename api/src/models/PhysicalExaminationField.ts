// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const PhysicalExaminationField = sequelize.define(
//     "physical_examination_field",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         required: true,
//         unique: true,
//       },
//       inputType: {
//         type: DataTypes.ENUM,
//         values: ["number", "text", "date", "select", "radio", "checkbox"],
//         defaultValue: "text",
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//     }
//   );

//   return PhysicalExaminationField;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class PhysicalExaminationField extends Model<
  InferAttributes<PhysicalExaminationField>,
  InferCreationAttributes<PhysicalExaminationField>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare inputType:
    | "number"
    | "text"
    | "date"
    | "select"
    | "radio"
    | "checkbox"; // Enum types
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

PhysicalExaminationField.init(
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
      defaultValue: "text",
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
    modelName: "physical_examination_field",
    tableName: "physical_examination_fields",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// PhysicalExaminationField.sync({ alter: false, force: false });

export default PhysicalExaminationField;
