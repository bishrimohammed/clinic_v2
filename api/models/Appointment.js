const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define("appointment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    patient_name: DataTypes.STRING,
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return Appointment;
};
