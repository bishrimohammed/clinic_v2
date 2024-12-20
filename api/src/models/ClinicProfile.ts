import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../db";
interface ClinicProfileAttributes {
  id?: number; // Optional if you are using auto-increment
  name: string;
  logo: string;
  card_valid_date: number;
  website_url: string;
  address_id: number;
  brand_color?: string;
  motto?: string;
  number_of_branch?: number;
  branch_addresses?: string;
  clinic_type?: string;
  has_triage?: boolean;
  clinic_seal?: string | null;
}

// Optional attributes for creation
type ClinicProfileCreationAttributes = Optional<ClinicProfileAttributes, "id">;

class ClinicProfile
  extends Model<ClinicProfileAttributes, ClinicProfileCreationAttributes>
  implements ClinicProfileAttributes
{
  declare id: number;
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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
      allowNull: false,
      validate: {
        isUrl: true,
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

export default ClinicProfile;
