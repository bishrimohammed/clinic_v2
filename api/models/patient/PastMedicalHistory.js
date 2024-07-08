module.exports = (sequelize, DataTypes) => {
  const PastMedicalHistory = sequelize.define(
    "past_medical_history",
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
      medical_condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      treatment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      hooks: {
        afterCreate: async (pastMedicalHistory, options) => {
          await sequelize.models.past_medical_history_audit.create({
            pastMedicalHistory_id: pastMedicalHistory.id,
            patient_id: pastMedicalHistory.patient_id,
            medical_condition: pastMedicalHistory.medical_condition,
            treatment: pastMedicalHistory.treatment,
            created_by: pastMedicalHistory.created_by,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (pastMedicalHistory, options) => {
          const previousValue = pastMedicalHistory._previousDataValues;
          await sequelize.models.past_medical_history_audit.create({
            pastMedicalHistory_id: previousValue.id,
            patient_id: previousValue.patient_id,
            medical_condition: previousValue.medical_condition,
            treatment: previousValue.treatment,
            created_by: pastMedicalHistory.created_by,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (pastMedicalHistory, options) => {
          await sequelize.models.past_medical_history_audit.create({
            pastMedicalHistory_id: pastMedicalHistory.id,
            patient_id: pastMedicalHistory.patient_id,
            medical_condition: pastMedicalHistory.medical_condition,
            treatment: pastMedicalHistory.treatment,
            created_by: pastMedicalHistory.created_by,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  PastMedicalHistory.sync({ alter: false });
  return PastMedicalHistory;
};
