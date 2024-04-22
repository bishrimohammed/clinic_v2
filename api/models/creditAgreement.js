const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const creditAgreement = sequelize.define("creditagreement", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    agreement_doc: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    max_limit: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      // allowNull:false,
      defaultValue: true,
    },
  });
  creditAgreement.sync({ alter: false, force: false });
  return creditAgreement;
};
