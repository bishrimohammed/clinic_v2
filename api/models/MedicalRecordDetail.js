const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const MedicalRecordDetail = sequelize.define("medicalrecorddetail", {
    medicalRecord_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    chief_complaint: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    assassement: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    hpi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });
  MedicalRecordDetail.sync({ force: false, alter: false });
  return MedicalRecordDetail;
};
