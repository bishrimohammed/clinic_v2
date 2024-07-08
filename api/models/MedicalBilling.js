const { sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  const MedicalBilling = sequelize.define(
    "medicalbilling",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      visit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patientassignments",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalrecords",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      has_advanced_payment: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      is_advanced_payment_amount_completed: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        afterCreate: async (biiling, options) => {
          await sequelize.models.medical_billings_audit.create({
            medicalBilling_id: biiling.id,
            patient_id: biiling.patient_id,
            visit_id: biiling.visit_id,
            medical_record_id: biiling.medical_record_id,
            date: biiling.date,
            has_advanced_payment: biiling.has_advanced_payment,
            is_advanced_payment_amount_completed:
              biiling.is_advanced_payment_amount_completed,
            status: biiling.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (billings, options) => {
          const previousValue = billings._previousDataValues;
          await sequelize.models.medical_billings_audit.create({
            medicalBilling_id: previousValue.id,
            patient_id: previousValue.patient_id,
            visit_id: previousValue.visit_id,
            medical_record_id: previousValue.medical_record_id,
            date: previousValue.date,
            has_advanced_payment: previousValue.has_advanced_payment,
            is_advanced_payment_amount_completed:
              previousValue.is_advanced_payment_amount_completed,
            status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (billings, options) => {
          await sequelize.models.medical_billings_audit.create({
            medicalBilling_id: biiling.id,
            patient_id: biiling.patient_id,
            visit_id: biiling.visit_id,
            medical_record_id: biiling.medical_record_id,
            date: biiling.date,
            has_advanced_payment: biiling.has_advanced_payment,
            is_advanced_payment_amount_completed:
              biiling.is_advanced_payment_amount_completed,
            status: biiling.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  MedicalBilling.sync({ alter: false, force: false });
  return MedicalBilling;
};
