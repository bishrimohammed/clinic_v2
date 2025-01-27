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
  UpdateOptions,
  InstanceUpdateOptions,
  CreateOptions,
} from "sequelize";

import sequelize from "../../db/index"; // Ensure the correct path
import Patient from "../Patient";
import User from "../User";
import PatientVisit from "../PatientVisit";
import AppointmentAuditLog from "./AppointmentAuditLog ";
// import AppointmentAuditLog from "./AppointmentAuditLog";

interface CustomUpdateOptions extends InstanceUpdateOptions<Appointment> {
  userId?: number; // Add the userId property
}

interface CustomCreateOptions extends CreateOptions<Appointment> {
  userId?: number;
}

class Appointment extends Model<
  InferAttributes<Appointment, {}>,
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
  // declare u: string | null;
  declare patient_visit_id: number | null;
  declare is_new_patient: CreationOptional<boolean>;
  declare registration_status: "pending" | "compeleted" | null;

  declare status?:
    | "Scheduled"
    | "Completed"
    | "Cancelled"
    | "Missed"
    | "Rescheduled"
    | "Confirmed";

  declare deletedAt: CreationOptional<Date>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  public static async createFollowUp(
    originalAppointmentId: number,
    followUpDate: string,
    followUpTime: string,
    appointedBy: number,
    options?: { doctorId?: number; reason?: string }
  ): Promise<Appointment> {
    const originalAppointment = await Appointment.findByPk(
      originalAppointmentId
    );

    if (!originalAppointment) {
      throw new Error("Original appointment not found");
    }

    // Mark the original appointment as "Completed"
    originalAppointment.status = "Completed";
    await originalAppointment.save();

    // Create the follow-up appointment
    const followUpAppointment = await Appointment.create({
      patient_id: originalAppointment.patient_id,
      patient_name: originalAppointment.patient_name,
      doctor_id: options?.doctorId || originalAppointment.doctor_id,
      appointment_date: followUpDate,
      appointment_time: followUpTime,
      reason: options?.reason || "Follow-up",
      appointment_type: "Follow-up",
      previous_appointment_id: originalAppointment.id, // Link to the original appointment
      appointed_by: appointedBy,
      status: "Scheduled",
    });

    return followUpAppointment;
  }
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
      type: DataTypes.DATEONLY,
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
  }, // async afterCreate(attributes, options: CustomCreateOptions) {
  {
    sequelize,
    paranoid: true,
    hooks: {
      async afterCreate(appointement, options: CustomCreateOptions) {
        const attributes = appointement.get();
        const { id, deletedAt, createdAt, updatedAt, ...otherAttributes } =
          attributes;
        const changedBy = options?.userId ? options.userId : -1;
        await AppointmentAuditLog.create({
          appointment_id: id,
          changed_by: changedBy, // Pass the user ID who made the change
          change_type: "I",
          // old_values: {},
          changed_values: otherAttributes,
        });
      },
      async afterUpdate(instance, options) {
        const oldValues: Record<string, any> = instance.previous(); // Get the previous values
        const newValues: Record<string, any> = instance.get(); // Get the updated values

        // Determine which fields were changed
        const changedFields: Record<string, any> = {};
        for (const key of Object.keys(newValues)) {
          if (oldValues[key] !== newValues[key]) {
            changedFields[key] = {
              old_value: oldValues[key],
              new_value: newValues[key],
            };
          }
        }
        const changedBy = options.userId ? options.userId : -1;
        // Log only the changed fields
        if (Object.keys(changedFields).length > 0) {
          await AppointmentAuditLog.create({
            appointment_id: instance.id,
            changed_by: changedBy, // Access userId from the options object
            change_type: "U",
            changed_values: changedFields,
          });
        }
      },
    },
  }
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
