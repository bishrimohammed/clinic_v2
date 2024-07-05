// const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const physicalExamination = sequelize.define("physical_examination", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medicalRecordDetail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // physical_ExaminationField_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
    progressNote_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    // value: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  physicalExamination.sync({ alter: false, force: false });
  return physicalExamination;
};
