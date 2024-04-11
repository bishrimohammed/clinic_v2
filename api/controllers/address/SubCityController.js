const asyncHandler = require("express-async-handler");
// const SubCity = require("../model/SubCity");
const db = require("../../models");

module.exports = SubCityController = {
  // @desc    Get all SubCitys
  // @route   GET /api/SubCitys
  // @access  Public
  getSubCities: asyncHandler(async (req, res) => {
    const SubCities = await db.SubCity.findAll();
    // console.log(SubCitys);
    res.json(SubCities);
  }),

  // @desc    Get a single SubCity
  // @route   GET /api/SubCitys/:id
  // @access  Public
  getSubCity: asyncHandler(async (req, res) => {
    const SubCity = await db.SubCity.findByPk(req.params.id);
    if (SubCity) {
      res.json(SubCity);
    } else {
      res.status(404);
      throw new Error("SubCity not found");
    }
  }),

  // @desc    Create a SubCity
  // @route   POST /api/SubCitys
  // @access  Public
  createSubCity: asyncHandler(async (req, res) => {
    const { SubCity_name } = req.body;
    const SubCity = await db.SubCity.create({ SubCity_name });
    res.status(201).json(SubCity);
  }),

  // @desc    Update a SubCity
  // @route   PUT /api/SubCitys/:id
  // @access  Public
  updateSubCity: asyncHandler(async (req, res) => {
    const { SubCity_name, SubCity_id } = req.body;
    const SubCity = await db.SubCity.findByPk(req.params.id);
    if (SubCity) {
      SubCity.SubCity_name = SubCity_name;
      SubCity.SubCity_id = SubCity_id;
      await SubCity.save();
      res.json(SubCity);
    } else {
      res.status(404);
      throw new Error("SubCity not found");
    }
  }),

  // @desc    Delete a SubCity
  // @route   DELETE /api/SubCitys/:id
  // @access  Public
  deleteSubCity: asyncHandler(async (req, res) => {
    const SubCity = await db.SubCity.findByPk(req.params.id);
    if (SubCity) {
      await SubCity.destroy();
      res.json({ message: "SubCity removed" });
    } else {
      res.status(404);
      throw new Error("SubCity not found");
    }
  }),
};
