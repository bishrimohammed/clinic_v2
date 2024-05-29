// const db = require("..");

module.exports.MedicalRecordDetailAssocations = (db) => {
  db.MedicalRecordDetail.belongsTo(db.MedicalRecord, {
    foreignKey: "medicalRecord_id",
    as: "medicalRecord",
  });
  db.MedicalRecordDetail.hasOne(db.PhysicalExamination, {
    foreignKey: "medicalRecordDetail_id",
    as: "physicalExamination",
  });
  db.MedicalRecordDetail.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.PhysicalExamination.belongsTo(db.PhysicalExaminationField, {
    foreignKey: "physical_ExaminationField_id",
    as: "physicalExaminationField",
  });
  db.PhysicalExamination.belongsTo(db.User, {
    foreignKey: "examiner_id",
    as: "examiner",
  });
};
