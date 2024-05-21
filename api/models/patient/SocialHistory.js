module.exports = (sequelize, DataTypes) => {
  const SocialHistory = sequelize.define("social_history", {
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
    //Current smoker, Former smoker, Non-smoker
    tobacco_use: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Current smoker", "Former smoker", "Non-smoker"],
    },
    alcohol_use: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  SocialHistory.sync({ alter: false });
  return SocialHistory;
};
