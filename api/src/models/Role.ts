import { DataTypes, Model, NonAttribute, Optional } from "sequelize";

// module.exports = (sequelize, DataTypes) => {
//   const Role = sequelize.define("role", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     name: {
//       type: DataTypes.STRING,
//       required: true,
//       unique: true,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });

//   return Role;
// };

import { RoleEntity } from "./types";
import sequelize from "../db";
import User from "./User";
import Permission from "./Permission";
import RolePermission from "./RolePermission";

type RoleAttributes = Optional<RoleEntity, "id">;
class Role extends Model<RoleEntity, RoleAttributes> implements RoleEntity {
  declare id: number;
  declare name: string;
  declare status: boolean;
  declare users?: NonAttribute<User[]>;
}

Role.init(
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
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  { sequelize: sequelize }
);
Role.belongsToMany(Permission, {
  through: RolePermission,
  foreignKey: "role_id",
  otherKey: "permission_id",
});

Role.sync({ alter: false });
export default Role;
