import express, { Application } from "express";
import cors from "cors";
import { notFound, errorHandler } from "../middleware/errorMiddleWare";
import cookieParser from "cookie-parser";
import path from "path";

import {
  InventoryRoute,
  InvestigationRoute,
  DashbordDataRoute,
  MedicalRecordConsultaionRoute,
  progressNoteRoute,
  ApprovalSettingRoute,
  TemporarySavedDataRoute,
  userRoute,
  patientRoute,
  woredaRoute,
  RegionRoute,
  CityRoute,
  SubCityRoute,
  visitTypeRoute,
  assignPatientRoute,
  medicalRecordRoute,
  serviceRoute,
  unitsRoute,
  clinicprofileRoute,
  employeeRoute,
  roleRoute,
  permissionsRoute,
  fieldRoute,
  creditCompanyRoute,
  dutyRoute,
  AppointmentRoute,
  BillingRoute,
  patientVisitRoute,
  AllergyRoute,
  ConditionsAndMedicationRoute,
  ApprovalRequestRoute,
  PatientOverViewRoute,
  NurseTreatmentRoute,
  ExternalServiceRoute,
  ProcedureRoute,
  ReportRoute,
  printRoute,
  // ExternalServiceRoute,
} from "../routes/index";
// import sequelize from "../db";

const expressLoader = async (app: Application) => {
  //   dotenv.config();
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  const currentFilename = path.basename(__filename);
  const currentDirname = path.dirname(currentFilename);
  app.use(
    "/uploads",
    express.static(path.join(currentDirname, "public/uploads"))
  );

  app.use(cors({ origin: "http://localhost:3000", credentials: true }));
  app.use("/api/v1/users", userRoute);
  app.use("/api/v1/dashboards", DashbordDataRoute);
  app.use("/api/v1/clinic-profiles", clinicprofileRoute);
  app.use("/api/v1/addresses", RegionRoute);
  app.use("/api/v1/roles", roleRoute);

  app.use("/api/v1/clinic-services", serviceRoute);

  app.use("/api/v1/employees", employeeRoute);

  app.use("/api/v1/patients", patientRoute);
  app.use("/api/v1/appointments", AppointmentRoute);
  app.use("/api/v1/visits", patientVisitRoute);

  // app.use("/models", (req, res) => {
  //   res.json(sequelize.models);
  // });
  // app.use("/api/v1/patient", patientRoute);
  // app.use("/api/v1/allergies", AllergyRoute);
  // app.use("/api/v1/woreda", woredaRoute);
  // app.use("/api/v1/region", RegionRoute);

  // app.use("/api/v1/city", CityRoute);

  // app.use("/api/v1/subcity", SubCityRoute);

  // app.use("/api/v1/visittype", visitTypeRoute);

  // app.use("/api/v1/assignpatient", assignPatientRoute);

  // app.use("/api/v1/progressnotes", progressNoteRoute);
  // app.use("/api/v1/conditions-medication", ConditionsAndMedicationRoute);

  // app.use("/api/v1/medicalrecord-consultaion", MedicalRecordConsultaionRoute);

  // app.use("/api/v1/service", serviceRoute);

  // app.use("/api/v1/units", unitsRoute);

  // app.use("/api/v1/clinicprofile", clinicprofileRoute);

  // app.use("/api/v1/employee", employeeRoute);

  // app.use("/api/v1/role", roleRoute);

  // app.use("/api/v1/permissions", permissionsRoute);

  // app.use("/api/v1/fields", fieldRoute);

  // app.use("/api/v1/creditcompany", creditCompanyRoute);

  // app.use("/api/v1/dutyprogram", dutyRoute);

  // app.use("/api/v1/appointment", AppointmentRoute);

  // app.use("/api/v1/patientvisits", patientVisitRoute);

  // app.use("/api/v1/payments", BillingRoute);
  // app.use("/api/v1/inventory", InventoryRoute);
  // app.use("/api/v1/investigation", InvestigationRoute);

  // app.use("/api/v1/approval-settings", ApprovalSettingRoute);
  // app.use("/api/v1/approvalrequests", ApprovalRequestRoute);
  // app.use("/api/v1/temporarydata", TemporarySavedDataRoute);
  // app.use("/api/v1/patientoverview", PatientOverViewRoute);
  // app.use("/api/v1/nursetreatments", NurseTreatmentRoute);
  // app.use("/api/v1/externalservices", ExternalServiceRoute);
  // app.use("/api/v1/procedures", ProcedureRoute);
  // app.use("/api/v1/reports", ReportRoute);
  // app.use("/api/v1/print", printRoute);

  // app.use("/models", async (req, res) => {
  //   // log
  //   console.log(db.sequelize.models);
  //   const mm = db.sequelize.models;
  //   res.json(mm);
  // });
  // app.use("/api/v1/upload", upload.single("file"), (req, res) => {
  //   const file = req.file;
  //   if (!file) {
  //     return res.status(400).send("No file uploaded");
  //   }
  //   res.send(file);
  // });

  app.use(notFound);
  app.use(errorHandler);
  return app;
};

export default expressLoader;
