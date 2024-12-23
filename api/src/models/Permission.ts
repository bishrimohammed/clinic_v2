import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

// module.exports = (sequelize, DataTypes) => {
//   const Permission = sequelize.define("permission", {
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
//   Permission.sync({ alter: false, force: false });
//   return Permission;
// };
import sequelize from "../db";
class Permission extends Model<
  InferAttributes<Permission>,
  InferCreationAttributes<Permission>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare status?: boolean;
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

export default Permission;
