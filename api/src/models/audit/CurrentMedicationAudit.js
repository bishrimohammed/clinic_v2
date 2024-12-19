module.exports = (sequelize, DataTypes) => {
  const CurrentMedicationAudit = sequelize.define(
    "current_medications_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      currentMedication_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "current_medications",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      condition: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      treatment: {
        type: DataTypes.STRING,
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
  CurrentMedicationAudit.sync({ alter: false, force: false });
  return CurrentMedicationAudit;
};
