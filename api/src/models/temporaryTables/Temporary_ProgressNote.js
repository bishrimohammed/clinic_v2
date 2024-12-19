module.exports = (sequelize, DataTypes) => {
  const TemporaryProgressNote = sequelize.define("temporary_progress_note", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  TemporaryProgressNote.sync({ alter: false });
  return TemporaryProgressNote;
};
