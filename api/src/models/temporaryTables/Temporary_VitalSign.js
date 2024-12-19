module.exports = (sequelize, DataTypes) => {
  const TemporaryVitalSign = sequelize.define("temporary_vitalsign", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    data: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    progress_note_id: { type: DataTypes.INTEGER, allowNull: true },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  TemporaryVitalSign.sync({ alter: false });
  return TemporaryVitalSign;
};
