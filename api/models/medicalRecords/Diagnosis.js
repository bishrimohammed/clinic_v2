module.exports = (sequelize, DataTypes) => {
  const Diagnosis = sequelize.define(
    "diagnosis",
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
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      diagnosis: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sick_leave_note_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      status: {
        type: DataTypes.ENUM,
        values: ["Suspected", "Confirmed", "Ruled out"],
        defaultValue: "Suspected",
      },
    },
    {
      hooks: {
        afterCreate: async (diagnosis, options) => {
          await sequelize.models.diagnoses_audit.create({
            diagnosis_id: diagnosis.id,
            medical_record_id: diagnosis.medical_record_id,
            doctor_id: diagnosis.doctor_id,
            diagnosis: diagnosis.diagnosis,
            sick_leave_note_id: diagnosis.sick_leave_note_id,
            status: diagnosis.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (diagnosis, options) => {
          const previousValue = diagnosis._previousDataValues;
          await sequelize.models.diagnoses_audit.create({
            diagnosis_id: previousValue.id,
            medical_record_id: previousValue.medical_record_id,
            doctor_id: previousValue.doctor_id,
            diagnosis: previousValue.diagnosis,
            sick_leave_note_id: previousValue.sick_leave_note_id,
            old_status: previousValue.status,
            new_status: diagnosis.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (diagnosis, options) => {
          await sequelize.models.diagnoses_audit.create({
            diagnosis_id: diagnosis.id,
            medical_record_id: diagnosis.medical_record_id,
            doctor_id: diagnosis.doctor_id,
            diagnosis: diagnosis.diagnosis,
            sick_leave_note_id: diagnosis.sick_leave_note_id,
            status: diagnosis.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Diagnosis.sync({ alter: false, force: false });
  return Diagnosis;
};
