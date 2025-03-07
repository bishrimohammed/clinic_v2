module.exports = (sequelize, DataTypes) => {
  const MedicalBillingAudit = sequelize.define(
    "medical_billings_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      medicalBilling_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalbillings",
          key: "id",
        },
        onDelete: "CASCADE",
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
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: false,
      },
      operation_type: {
        type: DataTypes.ENUM,
        values: ["I", "U", "D"],
      },
      change_status: {
        type: DataTypes.ENUM,
        values: ["P", "A", "R"],
        allowNull: true,
      },
      changed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  MedicalBillingAudit.sync({ alter: false, force: false });
  return MedicalBillingAudit;
};
