module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define(
    "medicalrecord",
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (record, options) => {
          await sequelize.models.medicalrecords_audit.create({
            medicalRecord_id: record.id,
            patient_id: record.id,
            status: record.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (record, options) => {
          const previousValue = record._previousDataValues;
          await sequelize.models.medicalrecords_audit.create({
            medicalRecord_id: previousValue.id,
            patient_id: previousValue.patient_id,
            status: previousValue.status,
            old_status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  MedicalRecord.sync({ force: false, alter: false });
  return MedicalRecord;
};
