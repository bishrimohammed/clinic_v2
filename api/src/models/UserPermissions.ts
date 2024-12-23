// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const UserPermission = sequelize.define(
//     "userpermission",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       user_id: {
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
//   UserPermission.sync({ alter: false, force: false });
//   return UserPermission;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

import Permission from "./Permission";
import User from "./User";

class UserPermission extends Model<
  InferAttributes<UserPermission>,
  InferCreationAttributes<UserPermission>
> {
  declare id: CreationOptional<number>; // Optional because it's auto-increment
  declare user_id: ForeignKey<User["id"]>; // Assuming role_id references a Role model
  declare permission_id: ForeignKey<Permission["id"]>; // Assuming permission_id references a Permission model
  declare create: boolean;
  declare read: boolean;
  declare delete: boolean;
  declare edit: boolean;
}
// Initialize the UserPermission model
UserPermission.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Permission,
        key: "id",
      },
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
    // modelName: 'UserPermission', // Optional: specify the model name
    tableName: "userpermissions", // Specify the actual table name
    timestamps: false, // Disable timestamps
  }
);

UserPermission.belongsTo(Permission, {
  foreignKey: "permission_id",
  as: "permission",
});
// UserPermission.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });
// UserPermission.create({})
export default UserPermission;
