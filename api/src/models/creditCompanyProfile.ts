// module.exports = (sequelize, DataTypes) => {
//   const creditCompanyProfile = sequelize.define(
//     "creditcompanyprofile",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       tin: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       representative_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       representative_phone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },

//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         // allowNull:false,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (creditCompanyProfile, options) => {
//           await sequelize.models.credit_company_profile_audit.create({
//             creditCompanyProfile_id: creditCompanyProfile.id,
//             name: creditCompanyProfile.name,
//             tin: creditCompanyProfile.tin,
//             representative_name: creditCompanyProfile.representative_name,
//             representative_phone: creditCompanyProfile.representative_phone,
//             phone: creditCompanyProfile.phone,
//             address_id: creditCompanyProfile.address_id,
//             status: creditCompanyProfile.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (creditCompanyProfile, options) => {
//           const previousValue = creditCompanyProfile._previousDataValues;
//           await sequelize.models.credit_company_profile_audit.create({
//             creditCompanyProfile_id: previousValue.id,
//             name: previousValue.name,
//             tin: previousValue.tin,
//             representative_name: previousValue.representative_name,
//             representative_phone: previousValue.representative_phone,
//             phone: previousValue.phone,
//             address_id: previousValue.address_id,
//             old_status: previousValue.status,
//             status: creditCompanyProfile.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   creditCompanyProfile.sync({ alter: false, force: false });
//   return creditCompanyProfile;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
  HasManyHasAssociationMixin,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import CreditAgreement from "./creditAgreement";
import CompanyEmployee from "./CompanyEmployee";

class CreditCompanyProfile extends Model<
  InferAttributes<CreditCompanyProfile>,
  InferCreationAttributes<CreditCompanyProfile>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare tin: string;
  declare representative_name: string;
  declare representative_phone: string;
  declare phone?: string | null;
  declare address_id: number;
  declare status: CreationOptional<boolean>;

  declare getAgreements: HasManyGetAssociationsMixin<CreditAgreement>;
  declare getEmployees: HasManyGetAssociationsMixin<CompanyEmployee>;
  declare hasEmployee: HasManyHasAssociationMixin<CompanyEmployee, number>;
  declare createAgreementt: HasManyCreateAssociationMixin<
    CreditAgreement,
    "company_id"
  >;

  public getActiveAgreement = async () => {
    const companyId = this.id;
    const agreement = await CreditAgreement.findOne({
      where: {
        company_id: companyId,
        status: true,
      },
    });
    return agreement;
  };
}

CreditCompanyProfile.init(
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
    },
    tin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representative_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representative_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    tableName: "creditcompanyprofiles",
    // hooks: {
    //   afterCreate: async (creditCompanyProfile, options) => {
    //     await sequelize.models.credit_company_profile_audit.create({
    //       creditCompanyProfile_id: creditCompanyProfile.id,
    //       name: creditCompanyProfile.name,
    //       tin: creditCompanyProfile.tin,
    //       representative_name: creditCompanyProfile.representative_name,
    //       representative_phone: creditCompanyProfile.representative_phone,
    //       phone: creditCompanyProfile.phone,
    //       address_id: creditCompanyProfile.address_id,
    //       status: creditCompanyProfile.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    //   beforeUpdate: async (creditCompanyProfile, options) => {
    //     const previousValue = creditCompanyProfile._previousDataValues;
    //     await sequelize.models.credit_company_profile_audit.create({
    //       creditCompanyProfile_id: previousValue.id,
    //       name: previousValue.name,
    //       tin: previousValue.tin,
    //       representative_name: previousValue.representative_name,
    //       representative_phone: previousValue.representative_phone,
    //       phone: previousValue.phone,
    //       address_id: previousValue.address_id,
    //       old_status: previousValue.status,
    //       status: creditCompanyProfile.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// CreditCompanyProfile.sync({ alter: false, force: false });
CreditCompanyProfile.hasMany(CreditAgreement, {
  foreignKey: "company_id",
  as: "agreements",
});
CreditCompanyProfile.hasMany(CompanyEmployee, {
  foreignKey: "company_id",
  as: "employees",
});
export default CreditCompanyProfile;
