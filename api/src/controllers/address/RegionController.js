const asyncHandler = require("express-async-handler");
// const Region = require("../model/Region");
const db = require("../../models");

module.exports = RegionController = {
  // @desc    Get all Regions
  // @route   GET /api/Regions
  // @access  Public
  getRegions: asyncHandler(async (req, res) => {
    const Regions = await db.Region.findAll();
    // console.log("kjbjhvnxfcgvhhjkv");
    res.json(Regions);
  }),

  // @desc    Get a single Region
  // @route   GET /api/Regions/:id
  // @access  Public
  getRegion: asyncHandler(async (req, res) => {
    const Region = await db.Region.findByPk(req.params.id);
    if (Region) {
      res.json(Region);
    } else {
      res.status(404);
      throw new Error("Region not found");
    }
  }),

  // @desc    Create a Region
  // @route   POST /api/Regions
  // @access  Public
  createRegion: asyncHandler(async (req, res) => {
    const { Region_name } = req.body;
    const Region = await db.Region.create({ Region_name });
    res.status(201).json(Region);
  }),

  // @desc    Update a Region
  // @route   PUT /api/Regions/:id
  // @access  Public
  updateRegion: asyncHandler(async (req, res) => {
    const { Region_name, region_id } = req.body;
    const Region = await db.Region.findByPk(req.params.id);
    if (Region) {
      Region.Region_name = Region_name;
      Region.region_id = region_id;
      await Region.save();
      res.json(Region);
    } else {
      res.status(404);
      throw new Error("Region not found");
    }
  }),

  // @desc    Delete a Region
  // @route   DELETE /api/Regions/:id
  // @access  Public
  deleteRegion: asyncHandler(async (req, res) => {
    const Region = await db.Region.findByPk(req.params.id);
    if (Region) {
      await Region.destroy();
      res.json({ message: "Region removed" });
    } else {
      res.status(404);
      throw new Error("Region not found");
    }
  }),
};
