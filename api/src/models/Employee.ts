//#region
// module.exports = (sequelize, DataTypes) => {
//   const Employee = sequelize.define(
//     "employee",
//     {
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
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
//       },
//       other_position: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       photo: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       emergence_contact_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       has_digital_signature: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//       digital_signature: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       doctor_titer: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       paranoid: true,
//       hooks: {
//         afterCreate: async (employee, options) => {
//           await sequelize.models.employees_audit.create({
//             employee_id: employee.id,
//             firstName: employee.firstName,
//             lastName: employee.lastName,
//             middleName: employee.middleName,
//             gender: employee.gender,
//             date_of_birth: employee.date_of_birth,
//             date_of_hire: employee.date_of_hire,
//             position: employee.position,
//             other_position: employee.other_position,
//             photo: employee.photo,
//             address_id: employee.address_id,
//             emergence_contact_id: employee.emergence_contact_id,
//             has_digital_signature: employee.has_digital_signature,
//             digital_signature: employee.digital_signature,
//             status: employee.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (employee, options) => {
//           const previousValue = employee._previousDataValues;
//           console.log(previousValue);
//           await sequelize.models.employees_audit.create({
//             employee_id: previousValue.id,
//             firstName: previousValue.firstName,
//             lastName: previousValue.lastName,
//             middleName: previousValue.middleName,
//             gender: previousValue.gender,
//             date_of_birth: previousValue.date_of_birth,
//             date_of_hire: previousValue.date_of_hire,
//             position: previousValue.position,
//             other_position: previousValue.other_position,
//             photo: previousValue.photo,
//             address_id: previousValue.address_id,
//             emergence_contact_id: previousValue.emergence_contact_id,
//             has_digital_signature: previousValue.has_digital_signature,
//             digital_signature: previousValue.digital_signature,
//             status: previousValue.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (employee, options) => {
//           await sequelize.models.employees_audit.create({
//             employee_id: employee.id,
//             firstName: employee.firstName,
//             lastName: employee.lastName,
//             middleName: employee.middleName,
//             gender: employee.gender,
//             date_of_birth: employee.date_of_birth,
//             date_of_hire: employee.date_of_hire,
//             position: employee.position,
//             other_position: employee.other_position,
//             photo: employee.photo,
//             address_id: employee.address_id,
//             emergence_contact_id: employee.emergence_contact_id,
//             has_digital_signature: employee.has_digital_signature,
//             digital_signature: employee.digital_signature,
//             status: employee.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   Employee.sync({ alter: false, force: false });
//   return Employee;
// };

//#endregion
import {
  Sequelize,
  DataTypes,
  Model,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasOneGetAssociationMixin,
  NonAttribute,
  Association,
} from "sequelize";
import { EmployeeEntity } from "./types";
import sequelize from "../db";
import User from "./User";
// import User from "./User";
// type EmployeeAttributes = Optional<EmployeeEntity, "id" | "digital_signature">;

class Employee extends Model<
  InferAttributes<Employee, { omit: "user" }>,
  InferCreationAttributes<Employee, { omit: "user" }>
> {
  declare id?: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string;
  declare lastName: string | null;
  declare gender: "Male" | "Female";
  declare date_of_birth: Date;
  declare date_of_hire: Date;
  declare position: "Doctor" | "Nurse" | "Laboratorian" | "Cashier" | "Other";
  declare other_position: string | null;
  declare photo: string | null;
  declare address_id: number;
  declare emergence_contact_id: number;
  declare has_digital_signature: boolean;
  declare digital_signature: string | null;
  declare doctor_titer: string | null;
  declare status?: boolean;
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: HasOneGetAssociationMixin<User>;
  declare user?: NonAttribute<User>;

  getFullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }

  declare static associations: {
    user: Association<Employee, User>;
    // employee: Association<User, Employee>;
  };
}

Employee.init(
  {
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
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Male", "Female"],
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
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
    },
    other_position: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    emergence_contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    has_digital_signature: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    digital_signature: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    doctor_titer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
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
  { sequelize, tableName: "employees", timestamps: true }
);
// sequelize.sync();
// Employee.hasOne(User, {
//   foreignKey: "employee_id",
//   as: "userE",
// });
// Employee.belongsTo(User, {
//   foreignKey: "employee_id",
//   as: "userE",
// });
// Employee.sync({ alter: true });
export default Employee;
