module.exports = (sequelize, DataTypes) => {
  const ProgressNoteAudit = sequelize.define(
    "progress_notes_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      progressNote_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "progress_notes",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taken_date: {
        type: DataTypes.DATE,
        allowNull: false,
        // defaultValue: new Date(),
      },
      plan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      problem_list: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      current_management: {
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
  ProgressNoteAudit.sync({ alter: true });
  return ProgressNoteAudit;
};
