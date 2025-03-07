import sequelize from "../db";
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
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManySetAssociationsMixin,
  HasManyHasAssociationsMixin,
} from "sequelize";
import bcrypt from "bcryptjs";
import Role from "./Role";
import Employee from "./Employee";
import Permission from "./Permission";
import UserPermission from "./UserPermissions";
import Schedule from "./Schedule";
import { HasManyGetAssociationsMixin } from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  // declare email: string | null;
  declare password: string;
  declare employee_id: ForeignKey<Employee["id"]>;
  declare role_id: ForeignKey<Role["id"]>;
  declare is_new?: boolean; // Default value
  declare status?: boolean; // Default value
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getRole: BelongsToGetAssociationMixin<Role>;
  declare getEmployee: BelongsToGetAssociationMixin<Employee>;
  declare getSchedules: HasManyGetAssociationsMixin<Schedule>;
  // declare getSchedule: HasManyGetAssociationsMixin<Schedule>;
  declare getUserPermissions: BelongsToManyGetAssociationsMixin<Permission>;
  declare setUserPermissions: BelongsToManySetAssociationsMixin<
    Permission,
    number
  >;
  declare removeUserPermissions: BelongsToManyRemoveAssociationMixin<
    Permission,
    number
  >;
  declare role?: NonAttribute<Role>;
  declare employee?: NonAttribute<Employee>;
  declare userPermissions?: NonAttribute<Permission[]>;

  // Hash password before saving
  public setPassword(password: string) {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(password, salt);
    this.setDataValue("password", hashPassword);
  }
  public isPasswordMatch(password: string) {
    return bcrypt.compareSync(password, this.password);
  }
  public async hasRole(roleName: string): Promise<boolean> {
    const role = await this.getRole(); // Fetch the associated role
    return role?.name?.toLowerCase() === roleName.toLowerCase(); // Check if the role name matches
  }
  public async isDoctorRole(): Promise<boolean> {
    const role = await this.getRole(); // Fetch the associated role
    return role?.name?.toLowerCase() === "doctor"; // Check if the role name matches
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
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    //   validate: {
    //     isEmail: true,
    //   },
    // },
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
      unique: {
        msg: "Employee has already an account",
        name: "employeeId",
      },
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
    modelName: "user",
    tableName: "users", // Specify the actual table name
    timestamps: true,
  }
);

User.belongsTo(Role, { foreignKey: "role_id", as: "role" });
User.belongsTo(Employee, { foreignKey: "employee_id", as: "employee" });
User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: "user_id",
  otherKey: "permission_id",
  as: "userPermissions",
});

User.hasMany(Schedule, {
  foreignKey: "doctor_id",
  as: "schedules",
});
User.sync({ alter: false });

export default User;
