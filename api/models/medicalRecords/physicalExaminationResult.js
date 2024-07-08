module.exports = (sequelize, DataTypes) => {
  const physicalExaminationResult = sequelize.define(
    "physical_examination_result",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      physicalExamination_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "physical_examinations",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      physical_ExaminationField_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      result: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      tableName: "physical_examination_result",
      timestamps: false,
    }
  );
  physicalExaminationResult.sync({ alter: false, force: false });
  return physicalExaminationResult;
};
