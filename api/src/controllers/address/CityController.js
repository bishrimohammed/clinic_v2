const asyncHandler = require("express-async-handler");
// const City = require("../model/City");
const db = require("../../models");

module.exports = CityController = {
  // @desc    Get all Citys
  // @route   GET /api/Citys
  // @access  Public
  getCities: asyncHandler(async (req, res) => {
    const Cities = await db.City.findAll();
    // console.log(Citys);
    res.json(Cities);
  }),

  // @desc    Get a single City
  // @route   GET /api/Citys/:id
  // @access  Public
  getCity: asyncHandler(async (req, res) => {
    const City = await db.City.findByPk(req.params.id);
    if (City) {
      res.json(City);
    } else {
      res.status(404);
      throw new Error("City not found");
    }
  }),

  // @desc    Create a City
  // @route   POST /api/Citys
  // @access  Public
  createCity: asyncHandler(async (req, res) => {
    const { City_name } = req.body;
    const City = await db.City.create({ City_name });
    res.status(201).json(City);
  }),

  // @desc    Update a City
  // @route   PUT /api/Citys/:id
  // @access  Public
  updateCity: asyncHandler(async (req, res) => {
    const { City_name, City_id } = req.body;
    const City = await db.City.findByPk(req.params.id);
    if (City) {
      City.City_name = City_name;
      City.City_id = City_id;
      await City.save();
      res.json(City);
    } else {
      res.status(404);
      throw new Error("City not found");
    }
  }),

  // @desc    Delete a City
  // @route   DELETE /api/Citys/:id
  // @access  Public
  deleteCity: asyncHandler(async (req, res) => {
    const City = await db.City.findByPk(req.params.id);
    if (City) {
      await City.destroy();
      res.json({ message: "City removed" });
    } else {
      res.status(404);
      throw new Error("City not found");
    }
  }),
};
