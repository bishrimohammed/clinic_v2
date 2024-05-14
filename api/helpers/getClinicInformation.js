const db = require("../models");

module.exports = getClinicInformation = async (id) => {
  const clinic = await db.ClinicProfile.findByPk(id);
  return clinic;
};
