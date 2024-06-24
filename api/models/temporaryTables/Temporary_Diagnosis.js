module.exports = (sequelize, DataTypes) => {
  const TemporaryDiagnosis = sequelize.define("temporary_diagnosis", {
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
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    progress_note_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  TemporaryDiagnosis.sync({ alter: false });
  return TemporaryDiagnosis;
};
