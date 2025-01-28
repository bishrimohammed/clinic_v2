import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  InstanceUpdateOptions,
  InstanceDestroyOptions,
} from "sequelize";

import sequelize from "../../db/index"; // Ensure the correct path
import Patient from "../Patient";
import User from "../User";
import PatientVisit from "../PatientVisit";
import AppointmentAuditLog from "./AppointmentAuditLog ";
// import AppointmentAuditLog from "./AppointmentAuditLog";

interface CustomUpdateOptions extends InstanceUpdateOptions {
  userId?: number; // Add the userId property
}

interface CustomCreateOptions extends InstanceUpdateOptions {
  userId?: number;
}

interface CustomDestroyOptions extends InstanceDestroyOptions {
  userId: number;
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
  // declare cancelled_by: number | null;
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
      async afterUpdate(instance, options: CustomUpdateOptions) {
        const oldValues = instance.previous() as Record<string, any> | null;
        const newValues = instance.get() as Record<string, any>;

        // console.log(options);
        // console.log(oldValues);
        // console.log(newValues);
        if (!oldValues || !newValues) {
          console.warn("Unable to retrieve instance values for audit logging.");
          return;
        }

        // Determine which fields were changed
        const changedFields: Record<
          string,
          { old_value: any; new_value: any }
        > = {};

        for (const key of Object.keys(newValues)) {
          if (key in oldValues && oldValues[key] !== newValues[key]) {
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
        // console.log(changedFields);
      },
      async afterDestroy(instance, options: CustomDestroyOptions) {
        // if(!options.userId) return
        const changedBy = options.userId;
        await AppointmentAuditLog.create({
          appointment_id: instance.id,
          changed_by: changedBy, // Access userId from the options object
          change_type: "D",
          // old_values: {},
          // changed_values: {},
          // deleted_at: new Date(),
        });
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
