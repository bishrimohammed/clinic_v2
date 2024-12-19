// const { Hooks } = require("sequelize/lib/hooks");

module.exports = (sequilize, DataTypes) => {
  const Prescription = sequilize.define(
    "prescription",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async (prescription, options) => {
          await sequilize.models.prescriptions_audit.create({
            prescription_id: prescription.id,
            medical_record_id: prescription.medical_record_id,
            patient_id: prescription.patient_id,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (prescription, options) => {
          const previousValue = prescription._previousDataValues;
          await sequilize.models.prescriptions_audit.create({
            prescription_id: previousValue.id,
            medical_record_id: previousValue.medical_record_id,
            patient_id: previousValue.patient_id,

            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Prescription.sync({ alter: false, force: false });
  return Prescription;
};
