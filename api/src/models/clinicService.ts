// Clinic Servive model. it store services clinic will provide. sequilize model

// module.exports = (sequelize, DataTypes) => {
//   const ClinicService = sequelize.define("clinicservice", {
//     service_name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       // unique: true,
//     },
//     is_laboratory: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     is_imaging: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     is_registration: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     is_others: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: false,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   ClinicService.sync({ alter: false });
//   return ClinicService;
// };
import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import ServiceCategory from "./serviceCategory";

class ClinicService extends Model<
  InferAttributes<ClinicService>,
  InferCreationAttributes<ClinicService>
> {
  declare id: CreationOptional<number>;
  declare service_name: string;
  declare is_laboratory: boolean;
  declare is_imaging: boolean;
  declare is_registration: boolean;
  declare is_others: boolean;
  declare status: boolean;
  declare hasManyCategory: boolean;

  declare getServiceCategories: HasManyGetAssociationsMixin<ServiceCategory>;

  declare serviceCategories?: NonAttribute<ServiceCategory[]>;
}

ClinicService.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
    },
    is_laboratory: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_imaging: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_registration: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_others: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    hasManyCategory: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, modelName: "clinicservice", tableName: "clinicservices" }
);
ClinicService.hasMany(ServiceCategory, {
  foreignKey: "clinicService_id",
  as: "serviceCategories",
});
ClinicService.sync({ alter: false });
export default ClinicService;
