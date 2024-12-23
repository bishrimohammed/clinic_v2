// Clinic Servive model. it store services clinic will provide. sequilize model

module.exports = (sequelize, DataTypes) => {
  const ClinicService = sequelize.define("clinicservice", {
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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  ClinicService.sync({ alter: false });
  return ClinicService;
};
import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

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
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize, tableName: "clinicservice" }
);

export default ClinicService;
