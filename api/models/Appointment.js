const { Op } = require("sequelize");
const db = require(".");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "appointment",
    {
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
        validate: {},
      },
      appointment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      appointment_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      reason: DataTypes.STRING,
      appointment_type: DataTypes.STRING,
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["upcoming", "overdue", "cancelled"],
        defaultValue: "upcoming",
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
      // (upcoming, overdue, cancelled)
    },
    {
      paranoid: true,
    }
  );
  Appointment.sync({ alter: false });
  return Appointment;
};
