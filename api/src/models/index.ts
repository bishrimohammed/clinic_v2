import ClinicProfile from "./ClinicProfile";
import User from "./User";
import Employee from "./Employee";
import Role from "./Role";
import Permission from "./Permission";
import UserPermission from "./UserPermissions";

Role.hasMany(User, {
  foreignKey: "role_id",
  sourceKey: "id",
  as: "users",
});

export { User, ClinicProfile, Employee, Role, Permission, UserPermission };
