module.exports = (sequelize, DataTypes) => {
  const DiscontinuedMedication = sequelize.define("discontinued_medication", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medication_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  DiscontinuedMedication.sync({ alter: false, force: false });
  return DiscontinuedMedication;
};
