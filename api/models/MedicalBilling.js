const { sequelize } = require(".");
module.exports = (sequelize, DataTypes) => {
  const MedicalBilling = sequelize.define("medicalbilling", {
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
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: false,
    },
  });
  MedicalBilling.sync({ alter: false });
  return MedicalBilling;
};
