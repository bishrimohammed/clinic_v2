import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import ExternalService from "./ExternalService";
import MedicalRecord from "./MedicalRecord";
import Invoice from "./billing/Invoice";
import ServiceLineItem from "./billing/ServiceLineItem";

class MedicalBilling extends Model<
  InferAttributes<MedicalBilling>,
  InferCreationAttributes<MedicalBilling>
> {
  declare id: CreationOptional<string>;
  declare billableId: string; // UUID of the associated record
  declare billableType: "MedicalRecord" | "ExternalService"; // Type of associated record
  declare isInternalService?: boolean;
  // declare billingDate: Date;
  declare hasAdvancedPayment?: boolean;
  declare isAdvancedPaymentAmountCompleted?: boolean;
  declare status: string;
}

MedicalBilling.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    billableId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    billableType: {
      type: DataTypes.ENUM("MedicalRecord", "ExternalService"),
      allowNull: false,
    },
    isInternalService: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    // billingDate: {
    //   type: DataTypes.DATE,
    //   allowNull: false,
    // },
    hasAdvancedPayment: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    isAdvancedPaymentAmountCompleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "medicalbillings",
    timestamps: true, // Enable timestamps for createdAt and updatedAt
  }
);

MedicalBilling.hasMany(Invoice, {
  foreignKey: "medicalBillingId",
  as: "invoice",
});
MedicalBilling.hasMany(ServiceLineItem, {
  foreignKey: "billingId",
  as: "serviceLineItems",
});
// MedicalBilling.belongsTo(ExternalService, {
//   foreignKey: "billableId",
//   constraints: false,
//   scope: { billableType: "ExternalService" },
//   as: "billableExternalService",
// });
// MedicalBilling.belongsTo(MedicalRecord, {
//   foreignKey: "billableId",
//   constraints: false,
//   scope: { billableType: "MedicalRecord" },
//   as: "billableMedicalRecord",
// });

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
MedicalBilling.sync({ alter: false, force: false });

export default MedicalBilling;
