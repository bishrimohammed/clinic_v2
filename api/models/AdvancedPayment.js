module.exports = (sequelize, DataTypes) => {
  const AdvancedPayment = sequelize.define("advanced-payment", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_billing_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cashier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    amount_paid: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    total_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    remaining_amount: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    amount_remaining_from_previous_payment: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0.0,
      validate: {
        min: 0,
      },
    },
    payment_date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date(),
    },
    // payment_type: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: "advanced",
    // },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Open", "Closed"],
      defaultValue: "Open",
    },
    // payment_method: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     defaultValue: "cash",
    // },
  });
  AdvancedPayment.sync({ alter: false });
  return AdvancedPayment;
};
