import {
  Association,
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

import sequelize from "../db";
import { User, UserPermission } from ".";
// import UserPermission from "./UserPermissions";
class Permission extends Model<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status?: boolean;

  declare static associations: {
    users: Association<Permission, User>;
    // employee: Association<User, Employee>;
  };
}
// Permission.create({})
Permission.init(
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
  { sequelize }
);

// Permission.belongsToMany(, {
//   through: "UserPermission",
//   foreignKey: "permission_id",
//   otherKey: "user_id",
// });
export default Permission;
