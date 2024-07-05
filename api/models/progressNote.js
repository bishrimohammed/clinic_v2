module.exports = (sequelize, DataTypes) => {
  const ProgressNote = sequelize.define("progress_note", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    // patient_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // },
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
  });
  ProgressNote.sync({ alter: false });
  return ProgressNote;
};
