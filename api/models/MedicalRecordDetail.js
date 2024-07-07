const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const MedicalRecordDetail = sequelize.define(
    "medicalrecorddetail",
    {
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      chief_complaint: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      assassement: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      hpi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (record, options) => {
          await sequelize.models.medicalrecorddetails_audit.create({
            medicalRecordDetail_id: record.id,
            medicalRecord_id: record.medicalRecord_id,
            doctor_id: record.doctor_id,
            chief_complaint: record.chief_complaint,
            plan: record.plan,
            assassement: record.assassement,
            hpi: record.hpi,
            notes: record.notes,
            status: record.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (record, options) => {
          const previousValue = record._previousDataValues;
          await sequelize.models.medicalrecorddetails_audit.create({
            medicalRecordDetail_id: previousValue.id,
            medicalRecord_id: previousValue.medicalRecord_id,
            doctor_id: previousValue.doctor_id,
            chief_complaint: previousValue.chief_complaint,
            plan: previousValue.plan,
            assassement: previousValue.assassement,
            hpi: previousValue.hpi,
            notes: previousValue.notes,
            status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  MedicalRecordDetail.sync({ force: false, alter: false });
  return MedicalRecordDetail;
};
