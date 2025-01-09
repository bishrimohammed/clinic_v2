const db = require("../../../models");

module.exports.getMedicalRecordPrescription = async (medical_record_id) => {
  const prescription = await db.Prescription.findOne({
    where: {
      medical_record_id: medical_record_id,
    },
  });
  return prescription;
};
