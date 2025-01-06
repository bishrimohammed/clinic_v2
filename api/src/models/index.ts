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
import Schedule from "./Schedule";
import MedicalBilling from "./MedicalBilling";

// Adresss
import Region from "./address/Region";
import City from "./address/City";
import SubCity from "./address/SubCity";
import Woreda from "./address/Woreda";
import Address from "./address/Address";

// InvestigationOrder
// Schedule
// MedicalBilling
// Role.hasMany(User, {
//   foreignKey: "role_id",
//   sourceKey: "id",
//   as: "users",
// });

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
  Schedule,
  MedicalBilling,
  Address,
  Region,
  City,
  SubCity,
  Woreda,
};
