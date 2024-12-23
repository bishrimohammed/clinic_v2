// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const CompanyEmployee = sequelize.define(
//     "companyemployee",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       middleName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       // emp_no: {
//       //   type: DataTypes.STRING,
//       //   allowNull: true,
//       // },
//       empl_id: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       gender: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Male", "Female"],
//       },
//       date_of_birth: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       date_of_hire: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       position: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         // values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
//       },

//       photo_url: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },

//       company_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (companyEmployee, options) => {
//           await sequelize.models.company_employees_audit.create({
//             companyEmployee_id: companyEmployee.id,
//             firstName: companyEmployee.firstName,
//             lastName: companyEmployee.lastName,
//             middleName: companyEmployee.middleName,
//             // emp_no: companyEmployee.emp_no,
//             empl_id: companyEmployee.empl_id,
//             gender: companyEmployee.gender,
//             date_of_birth: companyEmployee.date_of_birth,
//             date_of_hire: companyEmployee.date_of_hire,
//             position: companyEmployee.position,
//             photo_url: companyEmployee.photo_url,
//             address_id: companyEmployee.address_id,
//             company_id: companyEmployee.company_id,
//             status: companyEmployee.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (companyEmployee, options) => {
//           const previousValue = companyEmployee._previousDataValues;
//           await sequelize.models.company_employees_audit.create({
//             companyEmployee_id: previousValue.id,
//             firstName: previousValue.firstName,
//             lastName: previousValue.lastName,
//             middleName: previousValue.middleName,
//             // emp_no: previousValue.emp_no,
//             empl_id: previousValue.empl_id,
//             gender: previousValue.gender,
//             date_of_birth: previousValue.date_of_birth,
//             date_of_hire: previousValue.date_of_hire,
//             position: previousValue.position,
//             photo_url: previousValue.photo_url,
//             address_id: previousValue.address_id,
//             company_id: previousValue.company_id,
//             status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (companyEmployee, options) => {
//           await sequelize.models.company_employees_audit.create({
//             companyEmployee_id: companyEmployee.id,
//             firstName: companyEmployee.firstName,
//             lastName: companyEmployee.lastName,
//             middleName: companyEmployee.middleName,
//             // emp_no: companyEmployee.emp_no,
//             empl_id: companyEmployee.empl_id,
//             gender: companyEmployee.gender,
//             date_of_birth: companyEmployee.date_of_birth,
//             date_of_hire: companyEmployee.date_of_hire,
//             position: companyEmployee.position,
//             photo_url: companyEmployee.photo_url,
//             address_id: companyEmployee.address_id,
//             company_id: companyEmployee.company_id,
//             status: companyEmployee.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   CompanyEmployee.sync({ alter: false, force: false });
//   return CompanyEmployee;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class CompanyEmployee extends Model<
  InferAttributes<CompanyEmployee>,
  InferCreationAttributes<CompanyEmployee>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string;
  declare lastName?: string | null;
  declare empl_id?: string | null;
  declare gender: "Male" | "Female";
  declare date_of_birth: string; // Use string for DATEONLY
  declare date_of_hire: string; // Use string for DATEONLY
  declare position: string;
  declare photo_url?: string | null;
  declare address_id: number;
  declare company_id: number;
  declare status: boolean;
}

CompanyEmployee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    empl_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: false,
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date_of_hire: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
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
    // hooks: {
    //   afterCreate: async (companyEmployee, options) => {
    //     await sequelize.models.company_employees_audit.create({
    //       companyEmployee_id: companyEmployee.id,
    //       firstName: companyEmployee.firstName,
    //       lastName: companyEmployee.lastName,
    //       middleName: companyEmployee.middleName,
    //       empl_id: companyEmployee.empl_id,
    //       gender: companyEmployee.gender,
    //       date_of_birth: companyEmployee.date_of_birth,
    //       date_of_hire: companyEmployee.date_of_hire,
    //       position: companyEmployee.position,
    //       photo_url: companyEmployee.photo_url,
    //       address_id: companyEmployee.address_id,
    //       company_id: companyEmployee.company_id,
    //       status: companyEmployee.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    //   beforeUpdate: async (companyEmployee, options) => {
    //     const previousValue = companyEmployee._previousDataValues;
    //     await sequelize.models.company_employees_audit.create({
    //       companyEmployee_id: previousValue.id,
    //       firstName: previousValue.firstName,
    //       lastName: previousValue.lastName,
    //       middleName: previousValue.middleName,
    //       empl_id: previousValue.empl_id,
    //       gender: previousValue.gender,
    //       date_of_birth: previousValue.date_of_birth,
    //       date_of_hire: previousValue.date_of_hire,
    //       position: previousValue.position,
    //       photo_url: previousValue.photo_url,
    //       address_id: previousValue.address_id,
    //       company_id: previousValue.company_id,
    //       status: previousValue.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    //   beforeDestroy: async (companyEmployee, options) => {
    //     await sequelize.models.company_employees_audit.create({
    //       companyEmployee_id: companyEmployee.id,
    //       firstName: companyEmployee.firstName,
    //       lastName: companyEmployee.lastName,
    //       middleName: companyEmployee.middleName,
    //       empl_id: companyEmployee.empl_id,
    //       gender: companyEmployee.gender,
    //       date_of_birth: companyEmployee.date_of_birth,
    //       date_of_hire: companyEmployee.date_of_hire,
    //       position: companyEmployee.position,
    //       photo_url: companyEmployee.photo_url,
    //       address_id: companyEmployee.address_id,
    //       company_id: companyEmployee.company_id,
    //       status: companyEmployee.status,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: Date.now(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// CompanyEmployee.sync({ alter: false, force: false });

export default CompanyEmployee;
