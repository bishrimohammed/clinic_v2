// module.exports = (sequelize, DataTypes) => {
//   const ServiceItem = sequelize.define("serviceitem", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     service_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       defaultValue: 0,
//       valiate: {
//         min: 0,
//       },
//     },
//     serviceCategory_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       // references: {
//       //     model: ServiceCategory,
//       //     key: "id",
//       // },
//     },
//     unit: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       allowNull: false,
//       defaultValue: true,
//     },
//     isFixed: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: false,
//     },
//   });
//   ServiceItem.sync({
//     force: false,
//     alter: false,
//   });
//   return ServiceItem;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasOneCreateAssociationMixin,
  BelongsToManyAddAssociationMixin,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
// import ServiceCategory from "./serviceCategory";
import LabTestProfile from "./labTestProfile";
import PanelUnderpanel from "./PanelUnderpanel";
import { BelongsToManyAddAssociationsMixin } from "sequelize";
import ServiceCategory from "./serviceCategory";

class ServiceItem extends Model<
  InferAttributes<ServiceItem>,
  InferCreationAttributes<ServiceItem>
> {
  declare id: CreationOptional<number>;
  declare service_name: string;
  declare price: number;
  declare serviceCategory_id: number;
  declare unit?: string | null; // Optional field
  declare status?: boolean;
  declare isFixed: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  declare createLabTestProfile: HasOneCreateAssociationMixin<LabTestProfile>;
  declare addUnderPanels: BelongsToManyAddAssociationsMixin<
    PanelUnderpanel,
    number
  >;
}

ServiceItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DOUBLE(8, 2),
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0, // Fixed typo from "valiate" to "validate"
      },
    },
    serviceCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "servicecategories",
      },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
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
    modelName: "ServiceItem",
    timestamps: true,
  }
);
// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
ServiceItem.sync({ force: false, alter: false });

// ServiceItem.belongsTo(ServiceCategory, {
//   foreignKey: "serviceCategory_id",
//   as: "category",
// });

ServiceItem.hasOne(LabTestProfile, {
  foreignKey: "labTest_id",
  as: "labTestProfile",
});

ServiceItem.belongsToMany(ServiceItem, {
  through: PanelUnderpanel,
  foreignKey: "parent_id",
  otherKey: "child_id",
  as: "underPanels",
});
export default ServiceItem;
