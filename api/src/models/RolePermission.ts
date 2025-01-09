//#region
// module.exports = (sequelize, DataTypes) => {
//   const RolePermission = sequelize.define(
//     "rolepermission",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       role_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       permission_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       create: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       read: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       update: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       delete: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//     },

//     {
//       timestamps: false,
//     }
//   );
//   RolePermission.sync({ alter: false, force: false });
//   return RolePermission;
// };

//#endregion

import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import Role from "./Role";
import Permission from "./Permission";

class RolePermission extends Model<
  InferAttributes<RolePermission>,
  InferCreationAttributes<RolePermission>
> {
  declare id: CreationOptional<number>; // Optional because it's auto-increment
  declare role_id: ForeignKey<Role["id"]>; // Assuming role_id references a Role model
  declare permission_id: ForeignKey<Permission["id"]>; // Assuming permission_id references a Permission model
  declare create: boolean;
  declare read: boolean;
  declare delete: boolean;
  declare edit: boolean;
}
// Initialize the RolePermission model
RolePermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    create: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    edit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    delete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    // modelName: 'RolePermission', // Optional: specify the model name
    tableName: "rolepermissions", // Specify the actual table name
    timestamps: false, // Disable timestamps
  }
);
// RolePermission.create({})
export default RolePermission;
