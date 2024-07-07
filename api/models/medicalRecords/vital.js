// vital signs sequilize model
module.exports = (sequelize, DataTypes) => {
  const Vital = sequelize.define(
    "vital",
    {
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      examiner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taken_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      progressNote_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      // vital_id: {
      //   type: DataTypes.INTEGER,
      //   allowNull: true,
      // },
    },
    {
      hooks: {
        afterCreate: async (vitalSign, options) => {
          await sequelize.models.vital_signs_audit.create({
            vitalSign_id: vitalSign.id,
            medicalRecord_id: vitalSign.medicalRecord_id,
            examiner_id: vitalSign.examiner_id,
            taken_date: vitalSign.taken_date,
            progressNote_id: vitalSign.progressNote_id,
            // vital_id: vitalSign.vital_id,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (vitalSign, options) => {
          const previousValue = vitalSign._previousDataValues;
          await sequelize.models.vital_signs_audit.create({
            vitalSign_id: previousValue.id,
            medicalRecord_id: previousValue.medicalRecord_id,
            examiner_id: previousValue.examiner_id,
            taken_date: previousValue.taken_date,
            progressNote_id: previousValue.progressNote_id,
            // vital_id: previousValue.vital_id,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (vitalSign, options) => {
          await sequelize.models.vital_signs_audit.create({
            vitalSign_id: vitalSign.id,
            medicalRecord_id: vitalSign.medicalRecord_id,
            examiner_id: vitalSign.examiner_id,
            taken_date: vitalSign.taken_date,
            progressNote_id: vitalSign.progressNote_id,
            // vital_id: vitalSign.vital_id,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Vital.sync({ alter: false, force: false });
  return Vital;
};
