// const db = require("..");

module.exports.patientAssocation = (db) => {
  db.Patient.belongsTo(db.Address, {
    foreignKey: "address_id",
    as: "address",
  });
  db.Patient.belongsTo(db.CreditCompanyProfile, {
    foreignKey: "company_id",
    as: "creditCompany",
  });

  db.Patient.belongsTo(db.EmergencyContact, {
    foreignKey: "emergence_contact_id",
    as: "emergencyContact",
  });

  db.Patient.hasMany(db.PatientAssignment, {
    foreignKey: "patient_id",
    as: "patientAssignments",
  });
  db.Patient.hasMany(db.MedicalRecord, {
    foreignKey: "patient_id",
    as: "medicalRecords",
  });
  db.Patient.belongsToMany(db.CreditAgreement, {
    through: db.CreditPatient,
    foreignKey: "patient_id",
    as: "creditPatient",
  });
  db.Appointment.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.Appointment.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
};
