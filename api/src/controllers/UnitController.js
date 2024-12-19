const db = require("../models");
const asyncHandler = require("express-async-handler");

module.exports = UnitController = {
  // @desc    Get all Units
  // @route   GET /api/units
  // @access  Public
  getUnits: asyncHandler(async (req, res) => {
    const units = await db.Unit.findAll();
    res.json(units);
  }),
  // @desc    Get a single Unit
  // @route   GET /api/units/:id
  // @access  Public
  getUnitById: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const unit = await db.Unit.findByPk(id);
    if (!unit) {
      res.status(404).json({ error: "Unit not found" });
      return;
    }
    res.json(unit);
  }),
  // @desc    Create a new Unit
  // @route   POST /api/units
  // @access  Private
  createUnit: asyncHandler(async (req, res) => {
    const { name } = req.body;
    const unit = await db.Unit.create({ name });
    res.status(201).json(unit);
  }),
  // @desc    Update an existing Unit
  // @route   PUT /api/units/:id
  // @access  Private
  updateUnit: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const unit = await db.Unit.update({ name }, { where: { id } });
    res.status(201).json(unit);
  }),
  // @desc    Delete an existing Unit
  // @route   DELETE /api/units/:id
  // @access  Private
  deleteUnit: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const unit = await db.Unit.destroy({ where: { id } });
    res.status(201).json(unit);
  }),
};
