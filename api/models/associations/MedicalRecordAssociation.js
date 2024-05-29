// const db = require("..");

module.exports.MedicalRecordAssociation = (db) => {
  // medical record and patient as`
  db.MedicalRecord.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  // medical record and doctor patient Assignments
  db.MedicalRecord.hasOne(db.PatientAssignment, {
    foreignKey: "medicalRecord_id",
    as: "visit",
  });
  db.MedicalRecord.hasMany(db.MedicalRecordDetail, {
    foreignKey: "medicalRecord_id",
    as: "medicalRecordDetails",
  });
  db.MedicalRecord.hasMany(db.Vital, {
    foreignKey: "medicalRecord_id",
    as: "vitals",
  });
  db.MedicalRecord.hasOne(db.InvestigationOrder, {
    foreignKey: "medicalRecord_id",
    as: "investigationOrder",
  });
  // db.MedicalRecord.hasMany(db.Vital, {
  //   foreignKey: "medicalRecord_id",
  //   as: "vitals",
  // });
  db.Vital.belongsTo(db.VitalSignField, {
    foreignKey: "vitalSignField_id",
    as: "vitalSignField",
  });
  db.Vital.belongsTo(db.User, {
    foreignKey: "examiner_id",
    as: "examiner",
  });
  db.MedicalRecord.hasMany(db.Diagnosis, {
    foreignKey: "medical_record_id",
    as: "diagnosis",
  });
  db.Diagnosis.belongsTo(db.MedicalRecord, {
    foreignKey: "medical_record_id",
    as: "medicalRecord",
  });
  db.Diagnosis.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
};
