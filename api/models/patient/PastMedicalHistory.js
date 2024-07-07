module.exports = (sequelize, DataTypes) => {
  const PastMedicalHistory = sequelize.define("past_medical_history", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  PastMedicalHistory.sync({ alter: false });
  return PastMedicalHistory;
};
