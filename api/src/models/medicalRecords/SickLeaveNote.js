module.exports = (sequelize, DataTypes) => {
  const SickLeaveNote = sequelize.define("sick_leave_note", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    end_date: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date_of_examination: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    sick_leave_day: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  });
  SickLeaveNote.sync({ alter: false, force: false });
  return SickLeaveNote;
};
