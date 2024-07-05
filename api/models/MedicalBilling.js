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
    has_advanced_payment: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    is_advanced_payment_amount_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
