module.exports = (sequelize, DataTypes) => {
  const Diagnosis = sequelize.define("diagnosis", {
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
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sick_leave_note_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM,
      values: ["Suspected", "Confirmed", "Ruled out"],
      defaultValue: "Suspected",
    },
  });
  Diagnosis.sync({ alter: true });
  return Diagnosis;
};
