const asynHandler = require("express-async-handler");
const db = require("../models");
module.exports = FieldConfigController = {
  getPhycicalExaminationFields: asynHandler(async (req, res) => {
    const fields = await db.PhysicalExaminationField.findAll({});
    res.status(200).json(fields);
  }),
  getVitalSignFields: asynHandler(async (req, res) => {
    // console.log("\n\nvital sign fields\n\n");
    const fields = await db.VitalSignField.findAll();
    // console.log(fields);
    res.status(200).json(fields);
  }),
};
