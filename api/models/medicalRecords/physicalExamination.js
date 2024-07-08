// const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const physicalExamination = sequelize.define(
    "physical_examination",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      medicalRecordDetail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalrecorddetails",
          key: "id",
        },
        onDelete: "CASCADE",
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
    },
    {
      hooks: {
        afterCreate: async (physicalExamination, options) => {
          await sequelize.models.physical_examination_audit.create({
            physicalExamination_id: physicalExamination.id,
            medicalRecordDetail_id: physicalExamination.medicalRecordDetail_id,
            // physical_ExaminationField_id: physicalExamination.physical_ExaminationField_id,
            progressNote_id: physicalExamination.progressNote_id,
            // value: physicalExamination.value,
            examiner_id: physicalExamination.examiner_id,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (physicalExamination, options) => {
          const previousValue = physicalExamination._previousDataValues;
          await sequelize.models.physical_examination_audit.create({
            physicalExamination_id: previousValue.id,
            medicalRecordDetail_id: previousValue.medicalRecordDetail_id,
            // physical_ExaminationField_id: previousValue.physical_ExaminationField_id,
            progressNote_id: previousValue.progressNote_id,
            // value: previousValue.value,
            examiner_id: previousValue.examiner_id,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  physicalExamination.sync({ alter: false, force: false });
  return physicalExamination;
};
