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
  dutyAssociation,
  patientAssocation,
  paymentAssociation,
  prescriptionAssociation,
  ApprovalSettingAssocoation,
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
db.Allergy = require("./patient/Allergy.js")(sequelize, DataTypes);
db.FamilyHistory = require("./patient/FamilyHistory.js")(sequelize, DataTypes);
db.SocialHistory = require("./patient/SocialHistory.js")(sequelize, DataTypes);
db.PastMedicalHistory = require("./patient/PastMedicalHistory.js")(
  sequelize,
  DataTypes
);
db.Appointment = require("./Appointment.js")(sequelize, DataTypes);
db.PatientAssignment = require("./PatientAssignment.js")(sequelize, DataTypes);
db.VisitType = require("./visitType.js")(sequelize, DataTypes);
db.MedicalRecord = require("./MedicalRecord.js")(sequelize, DataTypes);
db.Diagnosis = require("./medicalRecords/Diagnosis.js")(sequelize, DataTypes);
db.SickLeaveNote = require("./medicalRecords/SickLeaveNote.js")(
  sequelize,
  DataTypes
);
db.ReferralNote = require("./medicalRecords/ReferralNote.js")(
  sequelize,
  DataTypes
);
db.MedicalRecordDetail = require("./MedicalRecordDetail.js")(
  sequelize,
  DataTypes
);
db.Vital = require("./medicalRecords/vital.js")(sequelize, DataTypes);
db.VitalResult = require("./medicalRecords/VitalResult.js")(
  sequelize,
  DataTypes
);

db.PhysicalExamination = require("./medicalRecords/physicalExamination.js")(
  sequelize,
  DataTypes
);
db.physicalExaminationResult =
  require("./medicalRecords/physicalExaminationResult.js")(
    sequelize,
    DataTypes
  );
db.ProgressNote = require("./progressNote.js")(sequelize, DataTypes);

db.InvestigationOrder = require("./medicalRecords/InvestigationOrder.js")(
  sequelize,
  DataTypes
);
db.OrderedTest = require("./medicalRecords/orderedTest.js")(
  sequelize,
  DataTypes
);
db.DiscontinuedMedication =
  require("./medicalRecords/DiscontinuedMedication.js")(sequelize, DataTypes);
db.CurrentMedication = require("./medicalRecords/CurrentMedication.js")(
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
db.CompanyEmployee = require("./CompanyEmployee.js")(sequelize, DataTypes);
db.CreditPatient = require("./CreditPatient.js")(sequelize, DataTypes);
db.CreditPatientAttachment = require("./creditPatientAttachment.js")(
  sequelize,
  DataTypes
);

//duty

db.DutyProgram = require("./DutyProgram.js")(sequelize, DataTypes);
db.DutyAssignment = require("./DutyAssignment.js")(sequelize, DataTypes);

// billing

db.MedicalBilling = require("./MedicalBilling.js")(sequelize, DataTypes);
db.Payment = require("./Payment.js")(sequelize, DataTypes);
db.AdvancedPayment = require("./AdvancedPayment.js")(sequelize, DataTypes);

// db.sequelize.sync({ force: false, alter: true }).then(() => {
//   console.log("yes re-sync done!");
// });

db.Medicine = require("./Medicine.js")(sequelize, DataTypes);
db.Prescription = require("./Prescription.js")(sequelize, DataTypes);
db.PrescribedMedicine = require("./PrescribedMedicine.js")(
  sequelize,
  DataTypes
);

db.ApprovalSetting = require("./ApprovalSetting.js")(sequelize, DataTypes);
db.ApprovalSettingApprover = require("./ApprovalSettingApprovers.js")(
  sequelize,
  DataTypes
);

// temporary tables
db.Temporary_ProgressNote =
  require("./temporaryTables/Temporary_ProgressNote.js")(sequelize, DataTypes);
db.Temporary_Diagnosis = require("./temporaryTables/Temporary_Diagnosis.js")(
  sequelize,
  DataTypes
);

db.Temporary_LabInvestigationOrder =
  require("./temporaryTables/Temporary_LabInvestiagtion.js")(
    sequelize,
    DataTypes
  );

db.Temporary_VitalSign = require("./temporaryTables/Temporary_VitalSign.js")(
  sequelize,
  DataTypes
);

db.Temporary_PhysicalExamination =
  require("./temporaryTables/Temporary_PhysicalExamination.js")(
    sequelize,
    DataTypes
  );

db.Temporary_Prescription =
  require("./temporaryTables/Temporary_Prescription.js")(sequelize, DataTypes);

// Audit
db.PatientAudit = require("./audit/PatientAudit.js")(sequelize, DataTypes);
db.AppointmentAudit = require("./audit/AppointmentAudit.js")(
  sequelize,
  DataTypes
);

db.ClinicProfileAudit = require("./audit/ClinicProfileAudit.js")(
  sequelize,
  DataTypes
);
db.ScheduleAudit = require("./audit/SchedulesAudit.js")(sequelize, DataTypes);
db.AddressAudit = require("./audit/AddressAudit.js")(sequelize, DataTypes);
db.EmergencyContactAudit = require("./audit/EmergancyContactAudit.js")(
  sequelize,
  DataTypes
);
db.PatientVisitAudit = require("./audit/PatientVisitsAudit.js")(
  sequelize,
  DataTypes
);
db.MedicalRecordAudit = require("./audit/MedicalRecordAudit.js")(
  sequelize,
  DataTypes
);
db.medicalRecordDetailAudit = require("./audit/MedicalRecordDetailsAudit.js")(
  sequelize,
  DataTypes
);
db.VitilSignsAudit = require("./audit/VitalSignAudit.js")(sequelize, DataTypes);

db.PhysicalExaminationAudit = require("./audit/PhysicalExaminationAudit.js")(
  sequelize,
  DataTypes
);
db.InvestigationOrderAudit = require("./audit/InvestigationOrderAudit.js")(
  sequelize,
  DataTypes
);
db.OrderedTestAudit = require("./audit/OrderedTestAudit.js")(
  sequelize,
  DataTypes
);
db.DiagnosisAudit = require("./audit/DiagnosisAudit.js")(sequelize, DataTypes);
db.PrescriptionsAudit = require("./audit/PrescriptionsAudit.js")(
  sequelize,
  DataTypes
);
db.PrescribedMedicinesAudit = require("./audit/PrescribedMedicinesAudit.js")(
  sequelize,
  DataTypes
);
db.MedicalBillingAudit = require("./audit/MedicalBillingsAudit.js")(
  sequelize,
  DataTypes
);
db.PaymentAudit = require("./audit/PaymentsAudit.js")(sequelize, DataTypes);
patientAssignmentSAssociation(db);
MedicalRecordAssociation(db);
MedicalRecordDetailAssocations(db);
InvestiagtionAssocation(db);
employeeAssociation(db);
roleAssociation(db);
userAssociation(db);
clinicServiceAssociation(db);
creditCompanyAssociation(db);
dutyAssociation(db);
patientAssocation(db);
paymentAssociation(db);
prescriptionAssociation(db);
ApprovalSettingAssocoation(db);

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

// db.User.belongsTo(db.Address, { foreignKey: "address_id", as: "address" });
// db.Role.hasMany(db.User, {
//   foreignKey: "role_id",
//   as: "users",
// });

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

// patient has many patient assignments

// patient assignment belongs to one patient

// db.PatientAssignment.belongsTo(db.Patient, {
//   foreignKey: "patient_id",
//   as: "patient",
// });

module.exports = db;
