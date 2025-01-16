import clinicprofileRoute from "./ClinicProfile.router";
import serviceRoute from "./cilicService.router";
// role and permission
import employeeRoute from "./employee.router";
import roleRoute from "./Role.router";
import userRoute from "./user.router";
import DashbordDataRoute from "./DashboardData.route";
import RegionRoute from "./address/region.router";
import patientRoute from "./patient.router";

const woredaRoute = require("./address/woreda.router.js");
const CityRoute = require("./address/city.router.js");
const SubCityRoute = require("./address/subCity.router.js");

const AllergyRoute = require("./Allergy.route.js");
const AppointmentRoute = require("./Appointment.router.js");
const visitTypeRoute = require("./visitType.router.js");
const assignPatientRoute = require("./PatientAssignment.router.js");
const medicalRecordRoute = require("./MedicalRecord.router.ts");
const MedicalRecordConsultaionRoute = require("./MedicalRecordConsultaion.router.js");
const progressNoteRoute = require("./progressNote.router.ts");

const unitsRoute = require("./unit.router.js");
const fieldRoute = require("./FieldConfig.router.js");

const permissionsRoute = require("./permission.router.js");

const creditCompanyRoute = require("./CreditCompany.router.js");
const dutyRoute = require("./Duty.router.js");

const patientVisitRoute = require("./patientVisit.router.js");

const BillingRoute = require("./Billing.route.js");
const InventoryRoute = require("./Inventory.router.js");

const InvestigationRoute = require("./Investigation.route.js");
const ApprovalSettingRoute = require("./ApprovalSetting.route.js");
const ApprovalRequestRoute = require("./ApprovalRequest.router.js");

const TemporarySavedDataRoute = require("./TemporarySavedData.route.js");
const ConditionsAndMedicationRoute = require("./ConditionsAndMedication.route.js");
const PatientOverViewRoute = require("./PatientOverView.route.js");
const NurseTreatmentRoute = require("./NurseTreatment.Route.js");
const ExternalServiceRoute = require("./ExternalService.route.js");
const ProcedureRoute = require("./Procedure.route.js");
const ReportRoute = require("./Report.route.js");
const printRoute = require("./print.route.js");

export {
  userRoute,
  woredaRoute,
  RegionRoute,
  CityRoute,
  SubCityRoute,
  patientRoute,
  AppointmentRoute,
  visitTypeRoute,
  assignPatientRoute,
  medicalRecordRoute,
  serviceRoute,
  unitsRoute,
  clinicprofileRoute,
  fieldRoute,
  employeeRoute,
  roleRoute,
  permissionsRoute,
  creditCompanyRoute,
  dutyRoute,
  patientVisitRoute,
  BillingRoute,
  InventoryRoute,
  InvestigationRoute,
  DashbordDataRoute,
  MedicalRecordConsultaionRoute,
  progressNoteRoute,
  ApprovalSettingRoute,
  TemporarySavedDataRoute,
  AllergyRoute,
  ConditionsAndMedicationRoute,
  ApprovalRequestRoute,
  PatientOverViewRoute,
  NurseTreatmentRoute,
  ExternalServiceRoute,
  ProcedureRoute,
  ReportRoute,
  printRoute,
};
