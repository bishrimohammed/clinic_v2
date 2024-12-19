module.exports = (sequelize, DataTypes) => {
  const PhysicalExaminationAudit = sequelize.define(
    "physical_examination_audit",
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
      medicalRecordDetail_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // references: {
        //     model: "medical_record_details",
        //   key: "id",

        // }
      },

      progressNote_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      examiner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      operation_type: {
        type: DataTypes.ENUM,
        values: ["I", "U", "D"],
      },
      change_status: {
        type: DataTypes.ENUM,
        values: ["P", "A", "R"],
        allowNull: true,
      },
      changed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  PhysicalExaminationAudit.sync({ alter: false });
  return PhysicalExaminationAudit;
};
