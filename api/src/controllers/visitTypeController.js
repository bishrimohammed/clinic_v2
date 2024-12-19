const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = VisitTypeController = {
  getVisitTypes: asyncHandler(async (req, res) => {
    const visitTypes = await db.VisitType.findAll();
    res.status(200).json(visitTypes);
  }),
  getVisitTypeById: asyncHandler(async (req, res) => {
    const visitType = await db.VisitType.findByPk(req.params.id);
    res.status(200).json(visitType);
  }),
  createVisitType: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const visitType = await db.VisitType.create({ name });
    res.status(201).json(visitType);
  }),
  updateVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const visitType = await db.VisitType.update({ name }, { where: { id } });
    res.status(201).json(visitType);
  }),
  deleteVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visitType = await db.VisitType.destroy({ where: { id } });
    res.status(201).json(visitType);
  }),
  // @desc acivate visit type
  activateVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visitType = await db.VisitType.update(
      { status: true },
      { where: { id } }
    );
    res.status(200).json(visitType);
  }),
  // @desc deactivate visit type
  deactivateVisitType: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const visitType = await db.VisitType.update(
      { status: false },
      { where: { id } }
    );
    res.status(200).json(visitType);
  }),
};
