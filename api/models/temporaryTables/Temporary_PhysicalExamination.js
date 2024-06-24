module.exports = (sequelize, DataTypes) => {
  const TemporaryPhysicalExamination = sequelize.define(
    "temporary_physical_examination",
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
      //   physicalExamination_id: { type: DataTypes.INTEGER, allowNull: true },
      progress_note_id: { type: DataTypes.INTEGER, allowNull: true },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      //   physical_ExaminationField_id: {
      //     type: DataTypes.INTEGER,
      //     allowNull: false,
      //   },
    }
  );
  TemporaryPhysicalExamination.sync({ alter: true });
  return TemporaryPhysicalExamination;
};
