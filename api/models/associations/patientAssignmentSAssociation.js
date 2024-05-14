// const db = require("..");
//
module.exports.patientAssignmentSAssociation = (db) => {
  db.PatientAssignment.belongsTo(db.MedicalRecord, {
    foreignKey: "medicalRecord_id",
    as: "medical_record",
  });
  db.PatientAssignment.belongsTo(db.VisitType, {
    foreignKey: "visitType_id",
    as: "visitType",
  });
  db.PatientAssignment.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.PatientAssignment.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
};
