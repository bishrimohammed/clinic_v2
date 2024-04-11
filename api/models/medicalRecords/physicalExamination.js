const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const physicalExamination = sequelize.define("physicalexamination", {
    medicalRecordDetail_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: {},
    },
    general_appreance: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    general_appreance: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    general_appreance: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    respiratory: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    neurological: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    musculoskeletal: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    cardiovascular: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    abdominal: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    heent: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: {},
    },
    examiner_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: {},
    },
  });
  return physicalExamination;
};
