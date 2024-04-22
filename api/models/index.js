const dbConfig = require("../config/dbConfig.js");

const { Sequelize, DataTypes } = require("sequelize");
const {
  patientAssignmentSAssociation,
} = require("./associations/patientAssignmentSAssociation.js");
const {
  MedicalRecordAssociation,
} = require("./associations/MedicalRecordAssociation.js");
const {
  MedicalRecordDetailAssocations,
  InvestiagtionAssocation,
  employeeAssociation,
  roleAssociation,
  userAssociation,
  clinicServiceAssociation,
  creditCompanyAssociation,
} = require("./associations/index.js");
// const { medicalRecordDetailAssocations } = require("./associations/medicalRecordDetailAssocations.js");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  // host: "127.0.0.1",
  host: dbConfig.HOST,
  port: 3306,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  // pool: {
  //   max: dbConfig.pool.max,
  //   min: dbConfig.pool.min,
  //   acquire: dbConfig.pool.acquire,
  //   idle: dbConfig.pool.idle,
  // },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// @ desc Clinic Profile
db.ClinicProfile = require("./CliinicProfile.js")(sequelize, DataTypes);
db.Schedule = require("./Schedule.js")(sequelize, DataTypes);
// clinic services

db.ClinicService = require("./clinicService.js")(sequelize, DataTypes);
db.ServiceCategory = require("./serviceCategory.js")(sequelize, DataTypes);
db.ServiceItem = require("./serviceItem.js")(sequelize, DataTypes);
db.LabTestProfile = require("./labTestProfile.js")(sequelize, DataTypes);
db.PanelUnderpanel = require("./PanelUnderpanel .js")(sequelize, DataTypes);
db.Unit = require("./Unit.js")(sequelize, DataTypes);

// user
db.User = require("./User.js")(sequelize, DataTypes);
db.Role = require("./Role.js")(sequelize, DataTypes);
db.Permission = require("./Permission.js")(sequelize, DataTypes);
db.rolePermission = require("./RolePermission.js")(sequelize, DataTypes);
db.UserPermission = require("./UserPermissions.js")(sequelize, DataTypes);
// db.roles = require('./Role.js')(sequelize, DataTypes)

// Employee
db.Employee = require("./Employee.js")(sequelize, DataTypes);
db.EmergencyContact = require("./EmergencyContact.js")(sequelize, DataTypes);

// address
db.Address = require("./address/Address.js")(sequelize, DataTypes);
db.Region = require("./address/Region.js")(sequelize, DataTypes);
db.City = require("./address/City.js")(sequelize, DataTypes);
db.SubCity = require("./address/SubCity.js")(sequelize, DataTypes);
db.Woreda = require("./address/Woreda.js")(sequelize, DataTypes);

// patient

db.Patient = require("./Patient.js")(sequelize, DataTypes);
db.PatientAssignment = require("./PatientAssignment.js")(sequelize, DataTypes);
db.VisitType = require("./visitType.js")(sequelize, DataTypes);
db.MedicalRecord = require("./MedicalRecord.js")(sequelize, DataTypes);
db.MedicalRecordDetail = require("./MedicalRecordDetail.js")(
  sequelize,
  DataTypes
);
db.Vital = require("./medicalRecords/vital.js")(sequelize, DataTypes);
db.PhysicalExamination = require("./medicalRecords/physicalExamination.js")(
  sequelize,
  DataTypes
);

db.InvestigationOrder = require("./medicalRecords/InvestigationOrder.js")(
  sequelize,
  DataTypes
);
db.OrderedTest = require("./medicalRecords/orderedTest.js")(
  sequelize,
  DataTypes
);

/// field config

db.VitalSignField = require("./VitalSignField.js")(sequelize, DataTypes);
db.PhysicalExaminationField = require("./PhysicalExaminationField.js")(
  sequelize,
  DataTypes
);

// credit

db.CreditAgreement = require("./creditAgreement.js")(sequelize, DataTypes);
db.CreditCompanyProfile = require("./creditCompanyProfile.js")(
  sequelize,
  DataTypes
);

// db.PatientDetail = require("./patient/PatientDetail.js")(sequelize, DataTypes);
// db.Appointment = require("./patient/Appointment.js")(sequelize, DataTypes);
// db.AppointmentDetail = require("./patient/AppointmentDetail.js")(
//   sequelize,
//   DataTypes
// );

db.sequelize.sync({ force: false, alter: false }).then(() => {
  console.log("yes re-sync done!");
});
patientAssignmentSAssociation(db);
MedicalRecordAssociation(db);
MedicalRecordDetailAssocations(db);
InvestiagtionAssocation(db);
employeeAssociation(db);
roleAssociation(db);
userAssociation(db);
clinicServiceAssociation(db);
creditCompanyAssociation(db);

db.ClinicProfile.belongsTo(db.Address, {
  foreignKey: "address_id",
  as: "address",
});
db.ClinicProfile.hasMany(db.Schedule, {
  foreignKey: "clinic_id",
  as: "clinicWorkingHours",
});
// clinic service has many service category

db.ClinicService.hasMany(db.ServiceCategory, {
  foreignKey: "clinicService_id",
  as: "serviceCategory",
});
db.ServiceCategory.belongsTo(db.ClinicService, {
  foreignKey: "clinicService_id",
  as: "clinicService",
});

// service category has many service item

db.ServiceCategory.hasMany(db.ServiceItem, {
  foreignKey: "serviceCategory_id",
  as: "serviceItem",
});
db.ServiceItem.belongsTo(db.ServiceCategory, {
  foreignKey: "serviceCategory_id",
  as: "serviceCategory",
});

// service item belongs to one unit

// unit has many service item

// db.Unit.hasMany(db.ServiceItem, {
//   foreignKey: "unit_id",
//   as: "serviceItem",
// });
// db.ServiceItem.belongsTo(db.Unit, {
//   foreignKey: "unit_id",
//   as: "unit",
// });
// user associations
db.User.belongsTo(db.Role, {
  foreignKey: "role_id",
  as: "role",
});

// db.User.belongsTo(db.Address, { foreignKey: "address_id", as: "address" });
db.Role.hasMany(db.User, {
  foreignKey: "role_id",
  as: "users",
});

// address relationship

db.Region.hasMany(db.City, {
  foreignKey: "region_id",
  as: "cities",
});
db.City.belongsTo(db.Region, {
  foreignKey: "region_id",
  as: "region",
});
// city has many subcities
db.City.hasMany(db.SubCity, {
  foreignKey: "city_id",
  as: "subcities",
});
// subCity belongs to one city
db.SubCity.belongsTo(db.City, {
  foreignKey: "city_id",
  as: "city",
});

// subcity has many woredas
db.SubCity.hasMany(db.Woreda, {
  foreignKey: "subCity_id",
  as: "woreda",
});
// woreda belongs to one subcity
db.Woreda.belongsTo(db.SubCity, {
  foreignKey: "subCity_id",
  as: "SubCity",
});

// woreda has many address

// db.Woreda.hasMany(db.Address, {
//   foreignKey: "woreda_id",
//   as: "addresses",
// });
// address belongs to one woreda

db.Address.belongsTo(db.Woreda, {
  foreignKey: "woreda_id",
  as: "woreda",
});

// address end

// patient associations

db.Patient.belongsTo(db.Address, {
  foreignKey: "address_id",
  as: "address",
});
db.Address.hasMany(db.Patient, {
  foreignKey: "address_id",
  as: "patients",
});

// patient has many patient assignments

db.Patient.hasMany(db.PatientAssignment, {
  foreignKey: "patient_id",
  as: "patientAssignments",
});
// patient assignment belongs to one patient

db.PatientAssignment.belongsTo(db.Patient, {
  foreignKey: "patient_id",
  as: "patient",
});

// patient has many medical records

db.Patient.hasMany(db.MedicalRecord, {
  foreignKey: "patient_id",
  as: "medicalRecords",
});

// medical record belongs to one patient

// db.MedicalRecord.belongsTo(db.Patient, {
//   foreignKey: "patient_id",
//   as: "patient",
// });
// patient has many patient assignments

// db.Patient.hasMany(db.PatientAssignment, {
//   foreignKey: "patient_id",
//   as: "patientAssignments",
// });
// // patient assignment belongs to one patient

// db.PatientAssignment.belongsTo(db.Patient, {
//   foreignKey: "patient_id",
//   as: "patient",
// });

module.exports = db;
