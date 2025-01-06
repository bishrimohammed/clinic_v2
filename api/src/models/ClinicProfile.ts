import {
  DataTypes,
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db";
import Address from "./address/Address";
import Schedule from "./Schedule";

class ClinicProfile extends Model<
  InferAttributes<ClinicProfile>,
  InferCreationAttributes<ClinicProfile>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare logo: string;
  declare card_valid_date: number;
  declare website_url: string;
  declare address_id: number;
  declare brand_color: string;
  declare motto: string;
  declare number_of_branch: number;
  declare branch_addresses: string;
  declare clinic_type: string;
  declare has_triage: boolean;
  declare clinic_seal: string | null;
}
ClinicProfile.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: {
      type: DataTypes.STRING,
      allowNull: false,

      // unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_valid_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: { msg: "Not valid URL" },
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_color: {
      type: DataTypes.STRING,
    },
    motto: {
      type: DataTypes.STRING,
    },
    number_of_branch: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    branch_addresses: {
      type: DataTypes.STRING,
    },
    clinic_type: DataTypes.STRING,
    has_triage: {
      type: DataTypes.BOOLEAN,
    },
    clinic_seal: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: "clinicprofile",
    tableName: "clinicprofiles", // You can specify the actual table name here
    timestamps: false, // Set to true if you have createdAt and updatedAt fields
  }
);

ClinicProfile.belongsTo(Address, {
  foreignKey: "address_id",
  as: "address",
});
ClinicProfile.hasMany(Schedule, {
  foreignKey: "clinic_id",
  as: "working_hours",
});
export default ClinicProfile;
