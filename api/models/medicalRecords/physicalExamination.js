// const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const physicalExamination = sequelize.define("physical_examination", {
    medicalRecordDetail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    physical_ExaminationField_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  physicalExamination.sync({ alter: false });
  return physicalExamination;
};
