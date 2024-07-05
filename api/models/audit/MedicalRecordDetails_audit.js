module.exports = (sequelize, DataTypes) => {
  const medicalRecordDetailAudit = sequelize.define(
    "medicalrecorddetails_audit",
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
      },
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
      // Add audit fields here...
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,

      freezeTableName: true,
    }
  );
  return medicalRecordDetailAudit;
};
