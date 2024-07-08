module.exports = (sequelize, DataTypes) => {
  const FamilyHistory = sequelize.define(
    "family_history",
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
      relationship: {
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
        afterCreate: async (familyHistory, options) => {
          await sequelize.models.family_history_audit.create({
            familyHistory_id: familyHistory.id,
            patient_id: familyHistory.patient_id,
            medical_condition: familyHistory.medical_condition,
            relationship: familyHistory.relationship,
            created_by: familyHistory.created_by,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (familyHistory, options) => {
          const previousValue = familyHistory._previousDataValues;
          await sequelize.models.family_history_audit.create({
            familyHistory_id: previousValue.id,
            patient_id: previousValue.patient_id,
            medical_condition: previousValue.medical_condition,
            relationship: previousValue.relationship,
            created_by: previousValue.created_by,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
            // old_medical_condition: previousValue.medical_condition,
            // old_relationship: previousValue.relationship,
          });
        },
        beforeDestroy: async (familyHistory, options) => {
          await sequelize.models.family_history_audit.create({
            familyHistory_id: familyHistory.id,
            patient_id: familyHistory.patient_id,
            medical_condition: familyHistory.medical_condition,
            relationship: familyHistory.relationship,
            created_by: familyHistory.created_by,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  FamilyHistory.sync({ alter: false });
  return FamilyHistory;
};
