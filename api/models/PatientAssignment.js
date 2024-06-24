const db = require(".");
const { sequelize, PatientAssignment } = require(".");

module.exports = (sequelize, DataTypes) => {
  const patientAssignment = sequelize.define("patientassignment", {
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
  });
  // patientAssignment.associate = (models) => {
  //   Patient.belongsTo(models.Patient, {
  //     foreignKey: "patient_id",
  //     as: "patient",
  //   });
  // };
  patientAssignment.sync({ force: false, alter: false });
  return patientAssignment;
};
