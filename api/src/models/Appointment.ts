// const { Op } = require("sequelize");
// const db = require(".");
// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const Appointment = sequelize.define(
//     "appointment",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },

//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       patient_name: DataTypes.STRING,
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {},
//       },
//       appointment_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       appointment_time: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       reason: DataTypes.STRING,
//       appointment_type: DataTypes.STRING,
//       status: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["upcoming", "overdue", "cancelled"],
//         defaultValue: "upcoming",
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },

//     },
//     {
//       paranoid: true,
//       hooks: {
//         afterCreate: async (appointment, options) => {
//           await sequelize.models.appointments_audit.create({
//             appointment_id: appointment.id,
//             patient_id: appointment.patient_id,
//             patient_name: appointment.patient_name,
//             doctor_id: appointment.doctor_id,
//             appointment_date: appointment.appointment_date,
//             appointment_time: appointment.appointment_time,
//             reason: appointment.reason,
//             appointment_type: appointment.appointment_type,
//             status: appointment.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (appointment, options) => {
//           const previousAppointmentData = appointment._previousDataValues;
//           await sequelize.models.appointments_audit.create({
//             appointment_id: previousAppointmentData.id,
//             patient_id: previousAppointmentData.patient_id,
//             patient_name: previousAppointmentData.patient_name,
//             doctor_id: previousAppointmentData.doctor_id,
//             appointment_date: previousAppointmentData.appointment_date,
//             appointment_time: previousAppointmentData.appointment_time,
//             reason: previousAppointmentData.reason,
//             appointment_type: previousAppointmentData.appointment_type,
//             status: previousAppointmentData.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (appointment, options) => {
//           await sequelize.models.appointments_audit.create({
//             appointment_id: appointment.id,
//             patient_id: appointment.patient_id,
//             patient_name: appointment.patient_name,
//             doctor_id: appointment.doctor_id,
//             appointment_date: appointment.appointment_date,
//             appointment_time: appointment.appointment_time,
//             reason: appointment.reason,
//             appointment_type: appointment.appointment_type,
//             status: appointment.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   Appointment.sync({ alter: false });
//   return Appointment;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";

import sequelize from "../db/index"; // Ensure the correct path
import Patient from "./Patient";
import User from "./User";
import PatientVisit from "./PatientVisit";

class Appointment extends Model<
  InferAttributes<Appointment>,
  InferCreationAttributes<Appointment>
> {
  declare id: CreationOptional<number>;
  declare patient_id: number | null;
  declare patient_name: string;
  declare doctor_id: number;
  declare appointment_date: string;
  declare appointment_time: string;
  declare reason: string | null;
  declare appointment_type: string;

  declare previous_appointment_id: number | null;
  declare next_appointment_date: Date | null;
  declare appointed_by: number;
  declare re_appointed_by: number | null;
  declare cancelled_by: number | null;
  declare patient_visit_id: number | null;
  declare is_new_patient: boolean;
  declare registration_status: "pending" | "compeleted" | null;

  declare status: CreationOptional<
    | "Scheduled"
    | "Completed"
    | "Cancelled"
    | "Missed"
    | "Rescheduled"
    | "Confirmed"
  >;
  declare deletedAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Appointment.init(
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
    patient_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    appointment_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    appointment_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    reason: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    appointment_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_new_patient: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    registration_status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    previous_appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Appointment,
        key: "id",
      },
    },
    next_appointment_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    appointed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    re_appointed_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    cancelled_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: User,
        key: "id",
      },
    },
    patient_visit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: PatientVisit,
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: [
        "Scheduled",
        "Confirmed",
        "Completed",
        "Cancelled",
        "Missed",
        "Rescheduled",
      ],
      defaultValue: "Scheduled",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  { sequelize, paranoid: true }
);

Appointment.belongsTo(Patient, {
  foreignKey: "patient_id",
  targetKey: "id",
  as: "patient",
});

Appointment.belongsTo(User, {
  foreignKey: "doctor_id",
  targetKey: "id",
  as: "doctor",
});

Appointment.sync({ alter: false });

export default Appointment;
