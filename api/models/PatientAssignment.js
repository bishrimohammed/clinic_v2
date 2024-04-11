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
      type: DataTypes.DATE,
      allowNull: false,
      // defaultValue: new Date(),
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
