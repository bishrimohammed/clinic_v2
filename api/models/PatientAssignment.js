const db = require(".");
const { sequelize, PatientAssignment } = require(".");

module.exports = (sequelize, DataTypes) => {
  const patientAssignment = sequelize.define(
    "patientassignment",
    {
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      visitType_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assignment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // defaultValue: new Date(),
      },
      visit_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      visit_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_referred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      symptom_notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mode_of_arrival: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stage: {
        type: DataTypes.ENUM,
        allowNull: true,
        values: [
          "Waiting for service fee",
          "Waiting for triage",
          "Waiting for examiner",
          "Performing triage",
          "Admitted",
          "Performing consultation",
          "Waiting for payment",
          "Waiting for lab",
          "Waiting for doctor",
          "Done",
        ],
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (visit, options) => {
          await sequelize.models.patientvisits_audit.create({
            patient_visit_id: visit.id,
            doctor_id: visit.doctor_id,
            patient_id: visit.patient_id,
            medicalRecord_id: visit.medicalRecord_id,
            visit_type_id: visit.visit_type_id,
            assignment_date: visit.assignment_date,
            visit_time: visit.visit_time,
            visit_type: visit.visit_type,
            is_referred: visit.is_referred,
            reason: visit.reason,
            created_by: visit.created_by,
            symptom_notes: visit.symptom_notes,
            mode_of_arrival: visit.mode_of_arrival,
            stage: visit.stage,
            status: visit.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (visit, options) => {
          const previousValue = visit._previousDataValues;
          await sequelize.models.patientvisits_audit.create({
            patient_visit_id: previousValue.id,
            doctor_id: previousValue.doctor_id,
            patient_id: previousValue.patient_id,
            visit_type_id: previousValue.visit_type_id,
            assignment_date: previousValue.assignment_date,
            visit_time: previousValue.visit_time,
            visit_type: previousValue.visit_type,
            is_referred: previousValue.is_referred,
            reason: previousValue.reason,
            created_by: previousValue.created_by,
            symptom_notes: previousValue.symptom_notes,
            mode_of_arrival: previousValue.mode_of_arrival,
            stage: previousValue.stage,
            status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  // patientAssignment.associate = (models) => {
  //   Patient.belongsTo(models.Patient, {
  //     foreignKey: "patient_id",
  //     as: "patient",
  //   });
  // };
  patientAssignment.sync({ force: false, alter: false });
  return patientAssignment;
};
