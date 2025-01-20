import ClinicProfile from "./ClinicProfile";
import ClinicService from "./ClinicService";
import ServiceCategory from "./serviceCategory";
import ServiceItem from "./serviceItem";
import LabTestProfile from "./labTestProfile";

import User from "./User";
import Employee from "./Employee";
import Role from "./Role";
import RolePermission from "./RolePermission";
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
import EmergencyContact from "./EmergencyContact";

// Role.hasMany(User, {
//   foreignKey: "role_id",
//   sourceKey: "id",
//   as: "users",
// });
// UserPermission.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });
ServiceItem.belongsTo(ServiceCategory, {
  foreignKey: "serviceCategory_id",
  as: "category",
});
Employee.hasOne(User, {
  foreignKey: "employee_id",
  as: "user",
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
  Schedule,
  MedicalBilling,
  Address,
  Region,
  City,
  SubCity,
  Woreda,
  ClinicService,
  ServiceCategory,
  ServiceItem,
  LabTestProfile,
  RolePermission,
  EmergencyContact,
};
