import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class Payment extends Model<
  InferAttributes<Payment>,
  InferCreationAttributes<Payment>
> {
  declare id: CreationOptional<string>;
  declare invoiceId: string;
  declare paymentAmount: number;
  declare paymentDate: Date;
  declare paymentMethod: "Cash" | "Card" | "Insurance" | "Mobile";
  declare referenceNumber: string;
  declare receivedBy?: number;
  declare status: "Paid" | "Void";
}

Payment.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    paymentAmount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    paymentDate: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW, // Use DataTypes.NOW for default
    },
    receivedBy: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    invoiceId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "invoices",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    paymentMethod: {
      type: DataTypes.ENUM("Cash", "Card", "Insurance", "Mobile"),
      allowNull: false,
    },
    referenceNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("Paid", "Void"),
      allowNull: false,
      defaultValue: "Paid",
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
Payment.sync({ alter: false, force: false });

export default Payment;
