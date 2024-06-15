// const db = require("..");

module.exports.MedicalRecordDetailAssocations = (db) => {
  db.MedicalRecordDetail.belongsTo(db.MedicalRecord, {
    foreignKey: "medicalRecord_id",
    as: "medicalRecord",
  });
  db.MedicalRecordDetail.hasMany(db.PhysicalExamination, {
    foreignKey: "medicalRecordDetail_id",
    as: "physicalExamination",
  });
  db.MedicalRecordDetail.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.PhysicalExamination.belongsTo(db.User, {
    foreignKey: "examiner_id",
    as: "examiner",
  });
  db.PhysicalExamination.belongsTo(db.ProgressNote, {
    foreignKey: "progressNote_id",
    as: "progressNote",
  });
  db.PhysicalExamination.hasMany(db.physicalExaminationResult, {
    foreignKey: "physicalExamination_id",
    as: "physicalExaminationResults",
  });
  db.physicalExaminationResult.belongsTo(db.PhysicalExaminationField, {
    foreignKey: "physical_ExaminationField_id",
    as: "physicalExaminationField",
  });
  db.physicalExaminationResult.belongsTo(db.PhysicalExamination, {
    foreignKey: "physicalExamination_id",
    as: "physicalExamination",
  });
  db.ProgressNote.hasOne(db.PhysicalExamination, {
    foreignKey: "progressNote_id",
    as: "physical_Examination",
  });
};
