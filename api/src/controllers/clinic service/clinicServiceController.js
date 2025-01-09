const asyncHandler = require("express-async-handler");
const db = require("../models");

// Get all ClinicServices
const getClinicServices = asyncHandler(async (req, res) => {
  const clinicServices = await db.ClinicService.findAll();
  res.json(clinicServices);
});

// Get a single ClinicService by ID
const getClinicServiceById = asyncHandler(async (req, res) => {
  const clinicService = await db.ClinicService.findByPk(req.params.id);
  if (!clinicService) {
    throw new Error("ClinicService not found");
  }
  res.json(clinicService);
});

// Create a new ClinicService
const createClinicService = asyncHandler(async (req, res) => {
  const {
    service_name,
    is_laboratory,
    is_imaging,
    is_registration,
    is_others,
  } = req.body;
  const clinicService = await db.ClinicService.create({
    service_name,
    is_laboratory,
    is_imaging,
    is_registration,
    is_others,
  });
  res.status(201).json(clinicService);
});

// Update an existing ClinicService
const updateClinicService = asyncHandler(async (req, res) => {
  const {
    service_name,
    is_laboratory,
    is_imaging,
    is_registration,
    is_others,
  } = req.body;
  const clinicService = await db.ClinicService.findByPk(req.params.id);
  if (!clinicService) {
    res.status(404);
    throw new Error("ClinicService not found");
  } else {
    clinicService.service_name = service_name;
    clinicService.is_laboratory = is_laboratory;
    clinicService.is_imaging = is_imaging;
    clinicService.is_registration = is_registration;
    clinicService.is_others = is_others;
    await clinicService.save();
    res.json(clinicService);
  }
});

// Delete a ClinicService
const deleteClinicService = asyncHandler(async (req, res) => {
  const clinicService = await db.ClinicService.findByPk(req.params.id);
  if (!clinicService) {
    res.status(404);
    throw new Error("ClinicService not found");
  } else {
    await clinicService.destroy();
    res.json({ message: "ClinicService deleted successfully" });
  }
});

module.exports = {
  getClinicServices,
  getClinicServiceById,
  createClinicService,
  updateClinicService,
  deleteClinicService,
};
