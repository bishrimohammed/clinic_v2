// const db = require("..");

module.exports.MedicalRecordAssociation = (db) => {
  // medical record and patient as`
  db.MedicalRecord.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.MedicalRecord.hasMany(db.MedicalRecordDocument, {
    foreignKey: "medical_record_id",
    as: "documents",
  });
  // db.MedicalRecord.hasOne(db.Prescription, {
  //   foreignKey: "medical_record_id",
  //   as: "prescriptions",
  // });
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
  db.MedicalRecord.hasMany(db.SickLeaveNote, {
    foreignKey: "medical_record_id",
    as: "sickLeaveNotes",
  });
  db.MedicalRecord.hasMany(db.ReferralNote, {
    foreignKey: "medical_record_id",
    as: "referralNote",
  });

  db.PatientAssignment.belongsTo(db.User, {
    foreignKey: "discharged_by",
    as: "dischargedBy",
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
  db.SickLeaveNote.belongsToMany(db.Diagnosis, {
    through: db.DiagnosisSickLeave,
    foreignKey: "sick_leave_note_id",
    as: "diagnoses",
  });
  db.Diagnosis.belongsToMany(db.SickLeaveNote, {
    through: db.DiagnosisSickLeave,
    foreignKey: "diagnosis_id",
    as: "diagnoses",
  });
  db.ReferralNote.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });
  db.ReferralNote.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.MedicalRecordDocument.belongsTo(db.User, {
    foreignKey: "created_by",
    as: "createdBy",
  });
  // db.RefferalNote.hasMany(db.Diagnosis, {
  //   foreignKey: "refferal_note_id",
  //   as: "diagnosis",
  // });
};
