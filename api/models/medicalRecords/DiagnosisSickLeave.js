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
      },

      sick_leave_note_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "sick_leave_notes",
          key: "id",
        },
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  DiagnosisSickLeave.sync({ alter: false, force: false });
  return DiagnosisSickLeave;
};
