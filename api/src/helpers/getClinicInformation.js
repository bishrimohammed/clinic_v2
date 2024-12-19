const db = require("../models");

module.exports = getClinicInformation = async (id) => {
  const clinic = await db.ClinicProfile.findOne();
  return clinic;
};
