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
  declare amountPaid: number;
  declare paymentStatus: "pending" | "completed" | "failed" | "partial paid";
  declare issuedAt: Date;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
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
    amountPaid: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    paymentStatus: {
      type: DataTypes.ENUM("pending", "completed", "failed"),
      allowNull: false,
    },
    issuedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
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

Invoice.belongsTo(MedicalBilling, {
  foreignKey: "medicalBillingId",
  as: "medicalBilling",
});
export default Invoice;
