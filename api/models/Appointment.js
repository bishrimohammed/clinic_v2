// const { Op } = require("sequelize");
// const db = require(".");
// const { sequelize } = require(".");

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
      hooks: {
        afterCreate: async (appointment, options) => {
          
          await sequelize.models.appointments_audit.create({
            appointment_id: appointment.id,
            patient_id: appointment.patient_id,
            patient_name: appointment.patient_name,
            doctor_id: appointment.doctor_id,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            reason: appointment.reason,
            appointment_type: appointment.appointment_type,
            status: appointment.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (appointment, options) => {
          const previousAppointmentData = appointment._previousDataValues;
          await sequelize.models.appointments_audit.create({
            appointment_id: previousAppointmentData.id,
            patient_id: previousAppointmentData.patient_id,
            patient_name: previousAppointmentData.patient_name,
            doctor_id: previousAppointmentData.doctor_id,
            appointment_date: previousAppointmentData.appointment_date,
            appointment_time: previousAppointmentData.appointment_time,
            reason: previousAppointmentData.reason,
            appointment_type: previousAppointmentData.appointment_type,
            status: previousAppointmentData.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (appointment, options) => {
          await sequelize.models.appointments_audit.create({
            appointment_id: appointment.id,
            patient_id: appointment.patient_id,
            patient_name: appointment.patient_name,
            doctor_id: appointment.doctor_id,
            appointment_date: appointment.appointment_date,
            appointment_time: appointment.appointment_time,
            reason: appointment.reason,
            appointment_type: appointment.appointment_type,
            status: appointment.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Appointment.sync({ alter: false });
  return Appointment;
};
