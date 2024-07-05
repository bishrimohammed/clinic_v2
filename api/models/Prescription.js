module.exports = (sequilize, DataTypes) => {
  const Prescription = sequilize.define("prescription", {
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
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Prescription.sync({ alter: false, force: false });
  return Prescription;
};
