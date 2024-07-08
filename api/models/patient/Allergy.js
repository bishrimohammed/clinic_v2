module.exports = (sequelize, DataTypes) => {
  const Allergy = sequelize.define(
    "allergy",
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
      //Mild, Moderate, Severe
      allergy_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      severity: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Mild", "Moderate", "Severe"],
      },
      reaction_details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
      hooks: {
        afterCreate: async (allergy, options) => {
          await sequelize.models.allergies_audit.create({
            allergy_id: allergy.id,
            patient_id: allergy.patient_id,
            allergy_type: allergy.allergy_type,
            severity: allergy.severity,
            reaction_details: allergy.reaction_details,
            created_by: allergy.created_by,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (allergy, options) => {
          const previousAllergy = allergy._previousDataValues;
          await sequelize.models.allergies_audit.create({
            allergy_id: previousAllergy.id,
            patient_id: previousAllergy.patient_id,
            allergy_type: previousAllergy.allergy_type,
            severity: previousAllergy.severity,
            reaction_details: previousAllergy.reaction_details,
            created_by: previousAllergy.created_by,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (allergy, options) => {
          await sequelize.models.allergies_audit.create({
            allergy_id: allergy.id,
            patient_id: allergy.patient_id,
            allergy_type: allergy.allergy_type,
            severity: allergy.severity,
            reaction_details: allergy.reaction_details,
            created_by: allergy.created_by,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Allergy.sync({ alter: true });
  return Allergy;
};
