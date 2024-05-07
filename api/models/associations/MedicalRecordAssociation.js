// const db = require("..");

module.exports.MedicalRecordAssociation = (db) => {
  // medical record and patient as`
  db.MedicalRecord.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  // medical record and doctor patient Assignments
  db.MedicalRecord.hasMany(db.PatientAssignment, {
    foreignKey: "medicalRecord_id",
    as: "recordassignments",
  });
  db.MedicalRecord.hasMany(db.MedicalRecordDetail, {
    foreignKey: "medicalRecord_id",
    as: "recorddetails",
  });
  db.MedicalRecord.hasMany(db.Vital, {
    foreignKey: "medicalRecord_id",
    as: "vitals",
  });
  db.MedicalRecord.hasOne(db.InvestigationOrder, {
    foreignKey: "medicalRecord_id",
    as: "investigationOrder",
  });
};
