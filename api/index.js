// const { fileURLToPath } = require("url");

const express = require("express");
require("dotenv").config();
// const { Sequelize } = require("sequelize");
const cors = require("cors");
const sequelize = require("./config/database.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./config/multerConfig.js");
const {
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
  // ExternalServiceRoute,
} = require("./routes/index.js");
const db = require("./models/index.js");
const { Sequelize } = require("sequelize");
const app = express();

// const Role = require("./models/Role.js");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
const currentFilename = path.basename(__filename);
const currentDirname = path.dirname(currentFilename);
app.use(
  "/uploads",
  express.static(path.join(currentDirname, "public/uploads"))
);
// app.use(upload.any());
app.use(cors({ origin: "*" }));
app.use("/api/v1/dashboard", DashbordDataRoute);
app.use("/api/v1/user", userRoute);

app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/allergies", AllergyRoute);
app.use("/api/v1/woreda", woredaRoute);
app.use("/api/v1/region", RegionRoute);

app.use("/api/v1/city", CityRoute);

app.use("/api/v1/subcity", SubCityRoute);

app.use("/api/v1/visittype", visitTypeRoute);

app.use("/api/v1/assignpatient", assignPatientRoute);

app.use("/api/v1/medicalrecords", medicalRecordRoute);
app.use("/api/v1/progressnotes", progressNoteRoute);
app.use("/api/v1/conditions-medication", ConditionsAndMedicationRoute);

app.use("/api/v1/medicalrecord-consultaion", MedicalRecordConsultaionRoute);

app.use("/api/v1/service", serviceRoute);

app.use("/api/v1/units", unitsRoute);

app.use("/api/v1/clinicprofile", clinicprofileRoute);

app.use("/api/v1/employee", employeeRoute);

app.use("/api/v1/role", roleRoute);

app.use("/api/v1/permissions", permissionsRoute);

app.use("/api/v1/fields", fieldRoute);

app.use("/api/v1/creditcompany", creditCompanyRoute);

app.use("/api/v1/dutyprogram", dutyRoute);

app.use("/api/v1/appointment", AppointmentRoute);

app.use("/api/v1/patientvisits", patientVisitRoute);

app.use("/api/v1/payments", BillingRoute);
app.use("/api/v1/inventory", InventoryRoute);
app.use("/api/v1/investigation", InvestigationRoute);

app.use("/api/v1/approval-settings", ApprovalSettingRoute);
app.use("/api/v1/approvalrequests", ApprovalRequestRoute);
app.use("/api/v1/temporarydata", TemporarySavedDataRoute);
app.use("/api/v1/patientoverview", PatientOverViewRoute);
app.use("/api/v1/nursetreatments", NurseTreatmentRoute);
app.use("/api/v1/externalservices", ExternalServiceRoute);
app.use("/api/v1/procedures", ProcedureRoute);
app.use("/api/v1/reports", ReportRoute);

app.use("/models", async (req, res) => {
  // log
  console.log(db.sequelize.models);
  const mm = db.sequelize.models;
  res.json(mm);
});
// app.use("/api/v1/upload", upload.single("file"), (req, res) => {
//   const file = req.file;
//   if (!file) {
//     return res.status(400).send("No file uploaded");
//   }
//   res.send(file);
// });

app.use(notFound);
app.use(errorHandler);
// const Role = require("./models/Role.js");
// const Region = require("./models/address/Region.js");
// const createUser = async () => {
//   // const role_id = await Role.findAll({});
//   // console.log(role_id);
//   const User = db.users;
//   const Roles = db.roles;
//   const role = await User.create({
//     firstName: "john Smith",
//     lastName: "doe",
//     email: "johnSmith@example.com",
//     password: "1234",
//     role_id: 1,
//   });
//   const users = await User.findOne({ where: { id: 1 }, include: ["role"] });
//   const roles = await Roles.findAll({ where: { id: 1 }, include: "users" });
//   console.log(users.toJSON());
//   console.log(JSON.stringify(roles));
// };
// try {
//   sequelize.authenticate().then(() => {
//     console.log("Connection has been established successfully.");
//     // await User.b

//     // getUser();

//   });
// } catch (error) {
//   console.error("Unable to connect to the database:", error);
// }

app.listen(5001, async () => {
  console.log("started listening");
  // createUser();
  // await db.Role.bulkCreate([
  //   {
  //     name: "doctor",
  //   },
  //   {
  //     name: "patient",
  //   },
  //   {
  //     name: "cashier",
  //   },
  //   {
  //     name: "laboratorian",
  //   },
  // ]);
});
