import { Model, DataTypes } from "sequelize";
import sequelize from "../../db"; // Your Sequelize instance

class AppointmentAuditLog extends Model {
  declare id: number;
  declare appointment_id: number;
  declare changed_by: number; // User ID who made the change
  declare change_type: "create" | "update" | "delete";
  declare old_values: Record<string, any>; // Old values of the appointment
  declare new_values: Record<string, any>; // New values of the appointment
  declare changed_at: Date;
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
      type: DataTypes.ENUM("create", "update", "delete"),
      allowNull: false,
    },
    old_values: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    new_values: {
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
    timestamps: false,
  }
);

export default AppointmentAuditLog;
