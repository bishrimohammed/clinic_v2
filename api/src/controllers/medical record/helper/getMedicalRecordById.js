const db = require("../../../models");

module.exports.getMedicalRecordById = async (id) => {
  const medicalRecord = await db.MedicalRecord.findByPk(id);
  return medicalRecord;
};
