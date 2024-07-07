module.exports = (sequelize, DataTypes) => {
  const VitilSignsAudit = sequelize.define(
    "vital_signs_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vitalSign_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "vitals",
          key: "id",
          // deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
          // onDelete: 'CASCADE',
          // onUpdate: 'CASCADE',
        },
      },
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      examiner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      taken_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      progressNote_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  VitilSignsAudit.sync({ alter: false });
  return VitilSignsAudit;
};
