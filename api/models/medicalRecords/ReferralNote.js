module.exports = (sequilize, DataTypes) => {
  const ReferralNote = sequilize.define("referral_note", {
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
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referral_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason_for_referral: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    referral_to: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinical_finding: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    // status: {
    //   type: DataTypes.STRING,
    //   defaultValue: "pending",
    //   allowNull: false,
    // },
    // completed_date: {
    //   type: DataTypes.DATE,
    // },
    // follow_up_date: {
    //   type: DataTypes.DATE,
    // },
    // follow_up_status: {
  });
  ReferralNote.sync({ alter: false });
  return ReferralNote;
};
