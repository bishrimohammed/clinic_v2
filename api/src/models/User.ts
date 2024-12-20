// const { Sequelize, DataTypes } = require("sequelize");
//#region
// const { sequelize } = require(".");
// const db = require(".");

// const bcrypt = require("bcryptjs");
// module.exports = (sequelize, DataTypes) => {
//   const User = sequelize.define("user", {
//     id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     username: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       unique: {
//         msg: "Username is taken",
//       },
//     },
//     email: {
//       type: DataTypes.STRING,
//       allowNull: true,
//       // unique: true,
//       validate: {
//         isEmail: true,
//       },
//     },
//     password: {
//       type: DataTypes.STRING,
//       allowNull: false,
//       set(password) {
//         const salt = bcrypt.genSaltSync(10);
//         const hashPassword = bcrypt.hashSync(password, salt);
//         // const hashPassword = bcryptjs.
//         this.setDataValue("password", hashPassword);
//       },
//     },
//     employee_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     role_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     is_new: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   User.sync({ force: false, alter: false });

//   return User;
// };

//#endregion

import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../db/index";
import { UserEntity } from "./types";

// Optional attributes for creation
type UserCreationAttributes = Optional<
  UserEntity,
  "id" | "email" | "is_new" | "status"
>;

class User
  extends Model<UserEntity, UserCreationAttributes>
  implements UserEntity
{
  declare id: number;
  declare username: string;
  declare email?: string;
  declare password: string;
  declare employee_id: number;
  declare role_id: number;
  declare is_new: boolean; // Default value
  declare status: boolean; // Default value

  // Hash password before saving
  public setPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    this.setDataValue("password", hashPassword);
  }

  // public static initModel(sequelize: Sequelize) {
  //   User.init(
  //     {
  //       id: {
  //         type: DataTypes.INTEGER,
  //         allowNull: false,
  //         primaryKey: true,
  //         autoIncrement: true,
  //       },
  //       username: {
  //         type: DataTypes.STRING,
  //         allowNull: false,
  //         unique: {
  //           name: "username",
  //           msg: "Username is taken",
  //         },
  //       },
  //       email: {
  //         type: DataTypes.STRING,
  //         allowNull: true,
  //         validate: {
  //           isEmail: true,
  //         },
  //       },
  //       password: {
  //         type: DataTypes.STRING,
  //         allowNull: false,
  //         // Set the password using the method defined
  //         set(value: string) {
  //           this.setPassword(value);
  //         },
  //       },
  //       employee_id: {
  //         type: DataTypes.INTEGER,
  //         allowNull: false,
  //       },
  //       role_id: {
  //         type: DataTypes.INTEGER,
  //         allowNull: false,
  //       },
  //       is_new: {
  //         type: DataTypes.BOOLEAN,
  //         defaultValue: true,
  //       },
  //       status: {
  //         type: DataTypes.BOOLEAN,
  //         defaultValue: true,
  //       },
  //     },
  //     {
  //       sequelize,
  //       modelName: "user",
  //       tableName: "users", // Specify the actual table name
  //       timestamps: true, // Set to true if you have createdAt and updatedAt fields
  //     }
  //   );
  // }
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        name: "username",
        msg: "Username is taken",
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      // Set the password using the method defined
      set(value: string) {
        this.setPassword(value);
      },
    },
    employee_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users", // Specify the actual table name
    timestamps: true,
  }
);

export default User;
