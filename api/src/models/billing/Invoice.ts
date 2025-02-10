import {
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  DataTypes,
  Op,
} from "sequelize";
import sequelize from "../../db";
import MedicalBilling from "../MedicalBilling";
class Invoice extends Model<
  InferAttributes<Invoice>,
  InferCreationAttributes<Invoice>
> {
  declare id: CreationOptional<string>; // UUID primary key
  declare medicalBillingId: string; // Foreign key to MedicalBilling
  declare invoiceNumber: string;
  declare paidAmount: number;
  declare outstandingAmount: number;
  declare totalAmount: number;
  declare paymentStatus: "pending" | "completed" | "failed" | "partial paid";
  declare issuedAt: Date;
}

Invoice.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    medicalBillingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: { model: MedicalBilling, key: "id" },
      onDelete: "CASCADE",
    },
    invoiceNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    paidAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    outstandingAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed", "partial_paid"),
      allowNull: false,
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    hasTrigger: true,
    validate: {
      checkAmountPaid(this: Invoice) {
        if (this.paidAmount > this.totalAmount) {
          throw new Error("Amount paid cannot be greater than total amount.");
        }
      },
    },
    sequelize,
    timestamps: true,
    hooks: {
      async beforeCreate(invoice, options) {
        const year = new Date().getFullYear();
        const lastInvoice = await Invoice.findOne({
          where: { invoiceNumber: { [Op.like]: `INV-${year}-%` } }, // Filter by year prefix
          order: [["createdAt", "DESC"]], // Get last created invoice
        });

        let newInvoiceNumber = `INV-${year}-000001`;

        if (lastInvoice) {
          const lastNumber = parseInt(
            lastInvoice.invoiceNumber.split("-")[2],
            10
          );
          newInvoiceNumber = `INV-${year}-${String(lastNumber + 1).padStart(
            6,
            "0"
          )}`;
        }

        invoice.invoiceNumber = newInvoiceNumber;
      },
    },
  }
);

// Invoice.belongsTo(MedicalBilling, {
//   foreignKey: "medicalBillingId",
//   as: "medicalBilling",
// });
Invoice.sync({ force: false });
export default Invoice;
