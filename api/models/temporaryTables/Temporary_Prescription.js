module.exports = (sequelize, DataTypes) => {
  const TemporaryPrescription = sequelize.define(
    "temporary_prescription",
    {
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
    },
    {
      timestamps: false,
    }
  );
  TemporaryPrescription.sync({ alter: false });
  return TemporaryPrescription;
};
