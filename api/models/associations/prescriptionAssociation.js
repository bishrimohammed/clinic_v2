// const db = require("..");

module.exports.prescriptionAssociation = (db) => {
  db.Prescription.belongsTo(db.MedicalRecord, {
    foreignKey: "medical_record_id",
    as: "medicalRecord",
  });

  db.Prescription.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.Prescription.hasMany(db.PrescribedMedicine, {
    // through: db.PrescribedMedicine,
    foreignKey: "prescription_id",
    as: "prescribedMedicines",
  });
  db.PrescribedMedicine.belongsTo(db.Prescription, {
    foreignKey: "prescription_id",
    as: "prescription",
  });

  db.PrescribedMedicine.belongsTo(db.ServiceItem, {
    foreignKey: "medicine_id",
    as: "medicine",
  });
  db.PrescribedMedicine.belongsTo(db.User, {
    foreignKey: "excuted_by",
    as: "excutedBy",
  });
  db.PrescribedMedicine.belongsTo(db.User, {
    foreignKey: "doctor_id",
    as: "doctor",
  });

  db.Medicine.belongsTo(db.ServiceItem, {
    foreignKey: "service_item_id",
    as: "medicineServiceItem",
  });
};
