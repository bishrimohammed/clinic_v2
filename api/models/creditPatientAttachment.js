const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const CreditPatientAttachment = sequelize.define(
    "credit_patient_attachment",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      creditPatient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      letter_doc: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.BOOLEAN,

        defaultValue: true,
      },
    }
  );
  return CreditPatientAttachment;
};
