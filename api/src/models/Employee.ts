import sequelize from "../db";
import {
  DataTypes,
  Model,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasOneGetAssociationMixin,
  NonAttribute,
  Association,
  BelongsToGetAssociationMixin,
} from "sequelize";

// import User from "./User";
import Address from "./address/Address";
import { User } from "./";
import EmergencyContact from "./EmergencyContact";

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
  declare position: string;
  //  "Doctor" | "Nurse" | "Laboratorian" | "Cashier" | "Other";
  declare other_position: string | null;
  declare photo: string | null;
  declare address_id: number;
  declare emergence_contact_id: number;
  declare has_digital_signature: CreationOptional<boolean>;
  declare digital_signature: string | null;
  declare doctor_titer: string | null;
  declare status?: CreationOptional<boolean>;
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: HasOneGetAssociationMixin<User>;
  declare getEmergencyContact: BelongsToGetAssociationMixin<EmergencyContact>;
  declare user?: NonAttribute<User>;
  declare emergencyContact?: NonAttribute<EmergencyContact>;

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
//   as: "user",
// });
Employee.belongsTo(Address, {
  foreignKey: "address_id",
  as: "address",
});
Employee.belongsTo(EmergencyContact, {
  foreignKey: "emergence_contact_id",
  as: "emergencyContact",
});
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
