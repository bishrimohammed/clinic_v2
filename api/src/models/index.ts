import ClinicProfile from "./ClinicProfile";
import User from "./User";
import Employee from "./Employee";
import Role from "./Role";
import Permission from "./Permission";
import UserPermission from "./UserPermissions";
import Appointment from "./Appointment";
import Patient from "./Patient";
import PatientAssignment from "./PatientAssignment";
import InvestigationOrder from "./medicalRecords/InvestigationOrder";

// InvestigationOrder

Role.hasMany(User, {
  foreignKey: "role_id",
  sourceKey: "id",
  as: "users",
});

export {
  User,
  ClinicProfile,
  Employee,
  Role,
  Permission,
  UserPermission,
  Appointment,
  Patient,
  PatientAssignment,
  InvestigationOrder,
};
