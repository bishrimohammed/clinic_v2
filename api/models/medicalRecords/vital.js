const { sequelize } = require("..");

// vital signs sequilize model
module.exports = (sequelize, DataTypes) => {
  const Vital = sequelize.define("vital", {
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
    diastolic_blood_pressure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    systolic_blood_pressure: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pulse_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    respiration_rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temperature: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    SPO2: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  return Vital;
};
