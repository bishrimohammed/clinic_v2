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
import Appointment from "./appointment/Appointment";
import Patient from "./Patient";
import PatientVisit from "./PatientVisit";
import InvestigationOrder from "./medicalRecords/InvestigationOrder";
import Schedule from "./Schedule";

// Adresss
import Region from "./address/Region";
import City from "./address/City";
import SubCity from "./address/SubCity";
import Woreda from "./address/Woreda";
import Address from "./address/Address";
import EmergencyContact from "./EmergencyContact";
import CreditCompanyProfile from "./creditCompanyProfile";
import CreditAgreement from "./creditAgreement";
import PatientCreditDetail from "./patientCreditDetail";
import MedicalBilling from "./MedicalBilling";
import Invoice from "./billing/Invoice";
import ExternalService from "./ExternalService";
import MedicalRecord from "./MedicalRecord";
import CurrentMedication from "./medicalRecords/CurrentMedication";
import DiscontinuedMedication from "./medicalRecords/DiscontinuedMedication";
import VitalSign from "./medicalRecords/VitalSign";
import VitalSignField from "./VitalSignField";
import VitalSignResult from "./medicalRecords/VitalSignResult";
import MedicalRecordDetail from "./MedicalRecordDetail";

// PatientCreditDetail
// Role.hasMany(User, {
//   foreignKey: "role_id",
//   sourceKey: "id",
//   as: "users",
// });
// UserPermission.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });
// CreditCompanyProfile
// CreditAgreement
// Appointment

ServiceItem.belongsTo(ServiceCategory, {
  foreignKey: "serviceCategory_id",
  as: "category",
});

Employee.hasOne(User, {
  foreignKey: "employee_id",
  as: "user",
});
Invoice.belongsTo(MedicalBilling, {
  foreignKey: "medicalBillingId",
  as: "medicalBilling",
});

// MedicalBilling.belongsTo(ExternalService, {
//   foreignKey: "billableId",
//   constraints: false,
//   scope: { billableType: "ExternalService" },
//   as: "billableExternalService",
// });
// MedicalBilling.belongsTo(MedicalRecord, {
//   foreignKey: "billableId",
//   constraints: false,
//   scope: { billableType: "MedicalRecord" },
//   as: "billableMedicalRecord",
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
  PatientVisit,
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
  CreditAgreement,
  CreditCompanyProfile,
  PatientCreditDetail,
  Invoice,
  MedicalRecord,
  MedicalRecordDetail,
  VitalSign,
  VitalSignField,
  VitalSignResult,
  CurrentMedication,
  DiscontinuedMedication,
  ExternalService,
};
