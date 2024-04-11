const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const InvestigationOrder = sequelize.define("investigationorder", {
    medicalRecord_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    clinical_finding: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  });
  InvestigationOrder.sync({ force: false, alter: false });
  return InvestigationOrder;
};
