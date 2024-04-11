const asyncHandler = require("express-async-handler");
// const Woreda = require("../model/Woreda");
const db = require("../../models");

module.exports = WoredaController = {
  // @desc    Get all woredas
  // @route   GET /api/woredas
  // @access  Public
  getWoredas: asyncHandler(async (req, res) => {
    const woredas = await db.Woreda.findAll({ include: "SubCity" });
    // console.log(woredas);
    res.json(woredas);
  }),

  // @desc    Get a single woreda
  // @route   GET /api/woredas/:id
  // @access  Public
  getWoreda: asyncHandler(async (req, res) => {
    const woreda = await db.Woreda.findByPk(req.params.id);
    if (woreda) {
      res.json(woreda);
    } else {
      res.status(404);
      throw new Error("Woreda not found");
    }
  }),

  // @desc    Create a woreda
  // @route   POST /api/woredas
  // @access  Public
  createWoreda: asyncHandler(async (req, res) => {
    const { Woreda_name, region_id } = req.body;
    const woreda = await db.Woreda.create({ Woreda_name, region_id });
    res.status(201).json(woreda);
  }),

  // @desc    Update a woreda
  // @route   PUT /api/woredas/:id
  // @access  Public
  updateWoreda: asyncHandler(async (req, res) => {
    const { Woreda_name, region_id } = req.body;
    const woreda = await db.Woreda.findByPk(req.params.id);
    if (woreda) {
      woreda.Woreda_name = Woreda_name;
      woreda.region_id = region_id;
      await woreda.save();
      res.json(woreda);
    } else {
      res.status(404);
      throw new Error("Woreda not found");
    }
  }),

  // @desc    Delete a woreda
  // @route   DELETE /api/woredas/:id
  // @access  Public
  deleteWoreda: asyncHandler(async (req, res) => {
    const woreda = await db.Woreda.findByPk(req.params.id);
    if (woreda) {
      await woreda.destroy();
      res.json({ message: "Woreda removed" });
    } else {
      res.status(404);
      throw new Error("Woreda not found");
    }
  }),
};
