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
  BelongsToGetAssociationMixin,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import ClinicService from "./ClinicService";
import ServiceItem from "./serviceItem";
import { HasManyCountAssociationsMixin } from "sequelize";

class ServiceCategory extends Model<
  InferAttributes<ServiceCategory>,
  InferCreationAttributes<ServiceCategory>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare clinicService_id: ForeignKey<ClinicService["id"]>;
  declare has_many_items: boolean;
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  declare getClinicService: BelongsToGetAssociationMixin<ClinicService>;
  declare countItems: HasManyCountAssociationsMixin;
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
      references: {
        model: ClinicService,
        key: "id",
      },
    },
    has_many_items: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "ServiceCategory",
    tableName: "servicecategories",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
ServiceCategory.sync({ alter: false });
// ServiceCategory.belongsTo(ClinicService, {
//   foreignKey: "clinicService_id",
//   as: "clinicService",
// });

ServiceCategory.hasMany(ServiceItem, {
  foreignKey: "serviceCategory_id",
  as: "items",
});
export default ServiceCategory;
