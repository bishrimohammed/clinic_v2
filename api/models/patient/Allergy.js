module.exports = (sequelize, DataTypes) => {
  const Allergy = sequelize.define("allergy", {
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
    //Mild, Moderate, Severe
    allergy_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    severity: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Mild", "Moderate", "Severe"],
    },
    reaction_details: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Allergy.sync({ alter: false });
  return Allergy;
};
