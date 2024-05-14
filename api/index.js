// const { fileURLToPath } = require("url");

const express = require("express");
require("dotenv").config();
// const { Sequelize } = require("sequelize");
const cors = require("cors");
const sequelize = require("./config/database.js");
// const db = require("./models");
const userRoute = require("./routes/user.router.js");
const woredaRoute = require("./routes/address/woreda.router.js");
const RegionRoute = require("./routes/address/region.router.js");
const CityRoute = require("./routes/address/city.router.js");
const SubCityRoute = require("./routes/address/subCity.router.js");

const patientRoute = require("./routes/patient.router.js");
const AppointmentRoute = require("./routes/Appointment.router.js");
const visitTypeRoute = require("./routes/visitType.router.js");
const assignPatientRoute = require("./routes/PatientAssignment.router.js");
const medicalRecordRoute = require("./routes/MedicalRecord.router.js");
const serviceRoute = require("./routes/cilicService.router.js");
const unitsRoute = require("./routes/unit.router.js");
const clinicprofileRoute = require("./routes/ClinicProfile.router.js");
const fieldRoute = require("./routes/FieldConfig.router.js");
// employye route
const employeeRoute = require("./routes/employee.router.js");
// role and permission
const roleRoute = require("./routes/Role.router.js");
const permissionsRoute = require("./routes/permission.router.js");

const creditCompanyRoute = require("./routes/CreditCompany.router.js");
const dutyRoute = require("./routes/Duty.router.js");

const patientVisitRoute = require("./routes/patientVisit.router.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare.js");
const cookieParser = require("cookie-parser");
const path = require("path");
const upload = require("./config/multerConfig.js");
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
app.use("/api/v1/user", userRoute);

app.use("/api/v1/patient", patientRoute);
app.use("/api/v1/woreda", woredaRoute);
app.use("/api/v1/region", RegionRoute);

app.use("/api/v1/city", CityRoute);

app.use("/api/v1/subcity", SubCityRoute);

app.use("/api/v1/visittype", visitTypeRoute);

app.use("/api/v1/assignpatient", assignPatientRoute);

app.use("/api/v1/medicalrecords", medicalRecordRoute);

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
