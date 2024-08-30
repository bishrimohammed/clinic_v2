module.exports = (sequelize, DataTypes) => {
  const ReturnPrepaidMedicalBilling = sequelize.define(
    "return_prepaid_medical_billing",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      medical_billing_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalbillings",
          key: "id",
        },
        // unique: true,
      },
      amount_returned: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      returned_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      return_date: {
        type: DataTypes.DATE,
        defaultValue: new Date(),
      },
    },
    {
      timestamps: false,
      // freezeTableName: true,
    }
  );
  ReturnPrepaidMedicalBilling.sync({ alter: false });
  return ReturnPrepaidMedicalBilling;
};
