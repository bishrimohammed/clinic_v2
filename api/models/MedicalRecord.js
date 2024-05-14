// MedicalRecord model

const { DataTypes } = require("sequelize");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const MedicalRecord = sequelize.define("medicalrecord", {
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });
  MedicalRecord.sync({ force: false, alter: false });
  return MedicalRecord;
};
