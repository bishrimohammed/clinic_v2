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
  getActiveVitalSignFields: asynHandler(async (req, res) => {
    const fields = await db.VitalSignField.findAll({
      where: {
        status: true,
      },
    });
    res.status(200).json(fields);
  }),
  enableVitalSignField: asynHandler(async (req, res) => {
    const { id } = req.params;
    const fieldExist = await db.VitalSignField.findByPk(id);
    // console.log(fieldExist);
    if (!fieldExist) {
      res.send(404);
      throw new Error(`Vital sign field not found`);
    }
    fieldExist.status = true;
    await fieldExist.save();
    res.status(200).json(fieldExist);
  }),
  disableVitalSignField: asynHandler(async (req, res) => {
    const { id } = req.params;
    const fieldExist = await db.VitalSignField.findByPk(id);
    // console.log(fieldExist);
    if (!fieldExist) {
      res.send(404);
      throw new Error(`Vital sign field not found`);
    }
    fieldExist.status = false;
    await fieldExist.save();
    res.status(200).json(fieldExist);
  }),
  enablePhycicalExaminationField: asynHandler(async (req, res) => {
    const { id } = req.params;
    const fieldExist = await db.PhysicalExaminationField.findByPk(id);
    // console.log(fieldExist);
    if (!fieldExist) {
      res.send(404);
      throw new Error(`Phycical examination field not found`);
    }
    fieldExist.status = true;
    await fieldExist.save();
    res.status(200).json(fieldExist);
  }),
  disablePhycicalExaminationField: asynHandler(async (req, res) => {
    const { id } = req.params;
    const fieldExist = await db.PhysicalExaminationField.findByPk(id);
    // console.log(fieldExist);
    if (!fieldExist) {
      res.send(404);
      throw new Error(`Phycical examination field not found`);
    }
    fieldExist.status = false;
    await fieldExist.save();
    res.status(200).json(fieldExist);
  }),
};
