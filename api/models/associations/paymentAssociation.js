// const db = require("..");

module.exports.paymentAssociation = (db) => {
  db.MedicalBilling.belongsTo(db.MedicalRecord, {
    foreignKey: "medical_record_id",
    as: "medicalRecord",
  });
  db.MedicalBilling.belongsTo(db.Patient, {
    foreignKey: "patient_id",
    as: "patient",
  });
  db.MedicalBilling.belongsTo(db.PatientAssignment, {
    foreignKey: "visit_id",
    as: "visit",
  });
  db.MedicalBilling.hasMany(db.Payment, {
    foreignKey: "medical_billing_id",
    as: "payments",
  });
  db.MedicalBilling.hasMany(db.AdvancedPayment, {
    foreignKey: "medical_billing_id",
    as: "advancedPayments",
  });
  db.Payment.belongsTo(db.MedicalBilling, {
    foreignKey: "medical_billing_id",
    as: "bill",
  });

  db.Payment.belongsTo(db.ServiceItem, {
    foreignKey: "item_id",
    as: "item",
  });

  db.Payment.belongsTo(db.User, {
    foreignKey: "cashier_id",
    as: "cashier",
  });
  db.AdvancedPayment.belongsTo(db.User, {
    foreignKey: "cashier_id",
    as: "cashier",
  });
  db.AdvancedPayment.belongsTo(db.User, {
    foreignKey: "medical_billing_id",
    as: "bill",
  });
};
