import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import ServiceItem from "./serviceItem";

class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<number>;
  declare payment_amount: number;
  declare payment_date?: Date; // Can be null
  declare medical_billing_id: number;
  declare item_id: number;
  declare cashier_id?: number | null; // Can be null
  declare status: "Paid" | "Unpaid" | "Void"; // Enum type
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    payment_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
    },
    medical_billing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medicalbillings",
        key: "id",
      },
      // onDelete: "CASCADE",
    },
    item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: ServiceItem,
        key: "id",
      },
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Paid", "Unpaid", "Void"),
      allowNull: false,
      defaultValue: "Unpaid",
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
    modelName: "payment",
    tableName: "payments",
    timestamps: true,
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Payment.sync({ alter: false, force: false });

export default Payment;
