const db = require("..");

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
  db.MedicalRecord.hasMany(db.ProgressNote, {
    foreignKey: "medical_record_id",
    as: "progressNotes",
  });
  db.MedicalRecord.hasOne(db.InvestigationOrder, {
    foreignKey: "medicalRecord_id",
    as: "investigationOrder",
  });
  db.MedicalRecord.hasMany(db.CurrentMedication, {
    foreignKey: "medical_record_id",
    as: "currentMedications",
  });
  db.MedicalRecord.hasMany(db.DiscontinuedMedication, {
    foreignKey: "medical_record_id",
    as: "discontinuedMedications",
  });
  db.MedicalRecord.hasOne(db.SickLeaveNote, {
    foreignKey: "medical_record_id",
    as: "sickLeaveNotes",
  });
  db.MedicalRecord.hasOne(db.ReferralNote, {
    foreignKey: "medical_record_id",
    as: "referralNote",
  });

  // db.MedicalRecord.hasMany(db.Vital, {
  //   foreignKey: "medicalRecord_id",
  //   as: "vitals",
  // });
  db.VitalResult.belongsTo(db.VitalSignField, {
    foreignKey: "vitalSignField_id",
    as: "vitalSignField",
  });
  db.Vital.belongsTo(db.User, {
    foreignKey: "examiner_id",
    as: "examiner",
  });
  db.Vital.belongsTo(db.MedicalRecord, {
    foreignKey: "medicalRecord_id",
    as: "medicalRecord",
  });
  db.Vital.hasMany(db.VitalResult, {
    foreignKey: "vital_id",
    as: "vitalResults",
  });
  db.VitalResult.belongsTo(db.Vital, {
    foreignKey: "vital_id",
    as: "vital",
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
  db.ProgressNote.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.ProgressNote.hasOne(db.PhysicalExamination, {
    foreignKey: "progressNote_id",
    as: "physicalExamination",
  });
  db.ProgressNote.hasOne(db.Vital, {
    foreignKey: "progressNote_id",
    as: "vital",
  });
  db.CurrentMedication.belongsTo(db.User, {
    foreignKey: "created_by",
    as: "createdBy",
  });
  db.DiscontinuedMedication.belongsTo(db.User, {
    foreignKey: "created_by",
    as: "createdBy",
  });
  db.SickLeaveNote.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.SickLeaveNote.belongsTo(db.MedicalRecord, {
    foreignKey: "medical_record_id",
    as: "medicalRecord",
  });
  db.SickLeaveNote.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.SickLeaveNote.hasMany(db.Diagnosis, {
    foreignKey: "sick_leave_note_id",
    as: "diagnosis",
  });
  db.ReferralNote.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.ReferralNote.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  // db.RefferalNote.hasMany(db.Diagnosis, {
  //   foreignKey: "refferal_note_id",
  //   as: "diagnosis",
  // });
};
