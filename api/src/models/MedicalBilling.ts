import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import Payment from "./Payment";

class MedicalBilling extends Model<
  InferAttributes<MedicalBilling>,
  InferCreationAttributes<MedicalBilling>
> {
  declare id: CreationOptional<number>;
  declare patient_id?: number | null;
  declare visit_id?: number | null;
  declare medical_record_id?: number | null;
  declare externalService_id?: number | null;
  declare is_internal_service?: boolean;
  declare date: Date; // DATE as Date type
  declare has_advanced_payment?: boolean;
  declare is_advanced_payment_amount_completed?: boolean | null;
  declare status: string;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

MedicalBilling.init(
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
      references: {
        model: "patients",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    visit_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "patientassignments",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "medicalrecords",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    externalService_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "external_services",
        key: "id",
      },
      onDelete: "SET NULL",
    },
    is_internal_service: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
      defaultValue: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true, // Changed to string to match the type
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
  {
    sequelize,
    modelName: "medicalbilling",
    tableName: "medicalbillings",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

MedicalBilling.hasMany(Payment, {
  foreignKey: "medical_billing_id",
  as: "payments",
});

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// MedicalBilling.sync({ alter: false, force: false });

export default MedicalBilling;
