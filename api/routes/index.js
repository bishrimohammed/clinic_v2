const userRoute = require("./user.router.js");
const woredaRoute = require("./address/woreda.router.js");
const RegionRoute = require("./address/region.router.js");
const CityRoute = require("./address/city.router.js");
const SubCityRoute = require("./address/subCity.router.js");

const patientRoute = require("./patient.router.js");
const AppointmentRoute = require("./Appointment.router.js");
const visitTypeRoute = require("./visitType.router.js");
const assignPatientRoute = require("./PatientAssignment.router.js");
const medicalRecordRoute = require("./MedicalRecord.router.js");
const MedicalRecordConsultaionRoute = require("./MedicalRecordConsultaion.router.js");
const progressNoteRoute = require("./progressNote.router.js");

const serviceRoute = require("./cilicService.router.js");
const unitsRoute = require("./unit.router.js");
const clinicprofileRoute = require("./ClinicProfile.router.js");
const fieldRoute = require("./FieldConfig.router.js");
// employye route
const employeeRoute = require("./employee.router.js");
// role and permission
const roleRoute = require("./Role.router.js");
const permissionsRoute = require("./permission.router.js");

const creditCompanyRoute = require("./CreditCompany.router.js");
const dutyRoute = require("./Duty.router.js");

const patientVisitRoute = require("./patientVisit.router.js");

const BillingRoute = require("./Billing.route.js");
const InventoryRoute = require("./Inventory.router.js");

const InvestigationRoute = require("./Investigation.route.js");
const DashbordDataRoute = require("./DashboardData.route.js");
const ApprovalSettingRoute = require("./ApprovalSetting.route.js");

const TemporarySavedDataRoute = require("./TemporarySavedData.route.js");

module.exports = {
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
};
