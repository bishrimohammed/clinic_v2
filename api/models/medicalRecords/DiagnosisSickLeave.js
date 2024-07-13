module.exports = (sequelize, DataTypes) => {
  const DiagnosisSickLeave = sequelize.define(
    "diagnosis_sick_Leave",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      diagnosis_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "diagnoses",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      sick_leave_note_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sick_leave_notes",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
      indexes: [
        {
          name: "diagnosis_sick_leave_diagnosis_id_sick_leave_note_id_uq",
          unique: true,
          fields: ["diagnosis_id", "sick_leave_note_id"],
        },
      ],
    }
  );
  DiagnosisSickLeave.sync({ alter: false, force: false });
  return DiagnosisSickLeave;
};
