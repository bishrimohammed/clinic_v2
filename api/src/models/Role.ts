import {
  BelongsToManyAddAssociationsMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  NonAttribute,
  Optional,
} from "sequelize";

import { RoleEntity } from "./types";
import sequelize from "../db";
import User from "./User";
import Permission from "./Permission";
import RolePermission from "./RolePermission";

class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status: CreationOptional<boolean>;
  declare getPermissions: BelongsToManyGetAssociationsMixin<RolePermission>;
  //   declare createRolePermissions: HasManyAd<
  //   RolePermission,
  //   number

  // >;
  declare addPermissions: BelongsToManyAddAssociationsMixin<
    RolePermission,
    number
    // {
    //   permission_id: number;
    //   create: boolean;
    //   read: boolean;
    //   edit: boolean;
    //   delete: boolean;
    // }
  >;
  declare setPermissions: BelongsToManySetAssociationsMixin<
    RolePermission,
    number
  >;
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
  as: "permissions",
});
Role.hasMany(RolePermission, {
  // through: RolePermission,
  foreignKey: "role_id",
  // otherKey: "permission_id",
  as: "rolePermissions",
});
Role.sync({ alter: false });
export default Role;
