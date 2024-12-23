// Optional attributes for creation
// type UserCreationAttributes = Optional<
//   UserEntity,
//   "id" | "email" | "is_new" | "status"
// >;

// extends Model<UserEntity, UserCreationAttributes>
// implements UserEntity
import {
  DataTypes,
  Model,
  Optional,
  BelongsToGetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  NonAttribute,
  Association,
} from "sequelize";
import bcrypt from "bcryptjs";
import sequelize from "../db";
import { UserEntity } from "./types";
import Role from "./Role";
import Employee from "./Employee";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string | null;
  declare password: string;
  declare employee_id: ForeignKey<Employee["id"]>;
  declare role_id: ForeignKey<Role["id"]>;
  declare is_new?: boolean; // Default value
  declare status?: boolean; // Default value
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getRole: BelongsToGetAssociationMixin<Role>;
  declare getEmployee: BelongsToGetAssociationMixin<Employee>;
  declare role?: NonAttribute<Role>;
  declare employee?: NonAttribute<Employee>;

  // Hash password before saving
  public setPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    this.setDataValue("password", hashPassword);
  }
  declare static associations: {
    role: Association<User, Role>;
    employee: Association<User, Employee>;
  };
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
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    // modelName: "user",
    tableName: "users", // Specify the actual table name
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
User.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });

User.sync({ alter: false });

export default User;
