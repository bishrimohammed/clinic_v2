// const { DataTypes } = require("sequelize");
// const { sequelize } = require(".");

// // service category for clinic service
// module.exports = (sequelize, DataTypes) => {
//   const ServiceCategory = sequelize.define("servicecategory", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: true,
//     },
//     clinicService_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // references: {
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   ServiceCategory.sync({ alert: false });
//   return ServiceCategory;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  ForeignKey,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import ClinicService from "./clinicService";

class ServiceCategory extends Model<
  InferAttributes<ServiceCategory>,
  InferCreationAttributes<ServiceCategory>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare clinicService_id: ForeignKey<ClinicService["id"]>;
  declare status: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

ServiceCategory.init(
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
    clinicService_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: "clinicServices",
      //   key: "id",
      // },
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
    modelName: "servicecategory",
    tableName: "servicecategories",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// ServiceCategory.sync({ alert: false });

export default ServiceCategory;
