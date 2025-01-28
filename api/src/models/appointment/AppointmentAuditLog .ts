import {
  Model,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import sequelize from "../../db"; // Your Sequelize instance

class AppointmentAuditLog extends Model<
  InferAttributes<AppointmentAuditLog, {}>,
  InferCreationAttributes<AppointmentAuditLog>
> {
  declare id: CreationOptional<number>;
  declare appointment_id: number;
  declare changed_by: number; // User ID who made the change
  declare change_type: "I" | "U" | "D";
  // declare old_values: CreationOptional<Record<string, any>>; // Old values of the appointment
  // declare new_values: CreationOptional<Record<string, any>>; // New values of the appointment
  declare changed_values: CreationOptional<Record<string, any>>; // Changed values of the appointment
  declare changed_at: CreationOptional<Date>;
}

AppointmentAuditLog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    appointment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    changed_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    change_type: {
      type: DataTypes.ENUM,
      values: ["I", "U", "D"],
      allowNull: false,
    },

    changed_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    changed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "AppointmentAuditLog",
    tableName: "appointment_audit",
    timestamps: false,
  }
);

AppointmentAuditLog.sync({ alter: false });
export default AppointmentAuditLog;
