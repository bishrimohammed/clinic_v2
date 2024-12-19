// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const ClinicProfile = sequelize.define(
//     "clinicprofile",
//     {
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true,
//       },
//       logo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       card_valid_date: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       website_url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isUrl: true,
//         },
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       brand_color: {
//         type: DataTypes.STRING,
//       },
//       motto: {
//         type: DataTypes.STRING,
//       },
//       number_of_branch: {
//         type: DataTypes.INTEGER,
//       },
//       branch_addresses: {
//         type: DataTypes.STRING,
//       },
//       clinic_type: DataTypes.STRING,
//       has_triage: DataTypes.BOOLEAN,
//       clinic_seal: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (clinicprofile, options) => {
//           await sequelize.models.clinic_profile_audit.create({
//             clinicProfile_id: clinicprofile.id,
//             name: clinicprofile.name,
//             logo: clinicprofile.logo,
//             card_valid_date: clinicprofile.card_valid_date,
//             website_url: clinicprofile.website_url,
//             address_id: clinicprofile.address_id,
//             brand_color: clinicprofile.brand_color,
//             motto: clinicprofile.motto,
//             number_of_branch: clinicprofile.number_of_branch,
//             branch_addresses: clinicprofile.branch_addresses,
//             clinic_type: clinicprofile.clinic_type,
//             has_triage: clinicprofile.has_triage,
//             clinic_seal: clinicprofile.clinic_seal,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (clinicprofile, options) => {
//           const previousClinicData = clinicprofile._previousDataValues;
//           await sequelize.models.clinic_profile_audit.create({
//             clinicProfile_id: previousClinicData.id,
//             name: previousClinicData.name,
//             logo: previousClinicData.logo,
//             card_valid_date: previousClinicData.card_valid_date,
//             website_url: previousClinicData.website_url,
//             address_id: previousClinicData.address_id,
//             brand_color: previousClinicData.brand_color,
//             motto: previousClinicData.motto,
//             number_of_branch: previousClinicData.number_of_branch,
//             branch_addresses: previousClinicData.branch_addresses,
//             clinic_type: previousClinicData.clinic_type,
//             has_triage: previousClinicData.has_triage,
//             clinic_seal: previousClinicData.clinic_seal,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (clinicprofile, options) => {
//           await sequelize.models.clinic_profile_audit.create({
//             clinicProfile_id: clinicprofile.id,
//             name: clinicprofile.name,
//             logo: clinicprofile.logo,
//             card_valid_date: clinicprofile.card_valid_date,
//             website_url: clinicprofile.website_url,
//             address_id: clinicprofile.address_id,
//             brand_color: clinicprofile.brand_color,
//             motto: clinicprofile.motto,
//             number_of_branch: clinicprofile.number_of_branch,
//             branch_addresses: clinicprofile.branch_addresses,
//             clinic_type: clinicprofile.clinic_type,
//             has_triage: clinicprofile.has_triage,
//             clinic_seal: clinicprofile.clinic_seal,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   ClinicProfile.sync({ alter: false, force: false });
//   return ClinicProfile;
// };
import { Sequelize, DataTypes, Model, Optional } from "sequelize";

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

export class ClinicProfile
  extends Model<ClinicProfileAttributes, ClinicProfileCreationAttributes>
  implements ClinicProfileAttributes
{
  public id!: number;
  public name!: string;
  public logo!: string;
  public card_valid_date!: number;
  public website_url!: string;
  public address_id!: number;
  public brand_color?: string;
  public motto?: string;
  public number_of_branch?: number;
  public branch_addresses?: string;
  public clinic_type?: string;
  public has_triage?: boolean;
  public clinic_seal?: string | null;

  public static initModel(sequelize: Sequelize) {
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
        tableName: "clinic_profiles", // You can specify the actual table name here
        timestamps: false, // Set to true if you have createdAt and updatedAt fields
      }
    );
  }
}
