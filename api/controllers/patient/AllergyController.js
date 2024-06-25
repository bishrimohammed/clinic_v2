const asyncHandler = require("express-async-handler");
const db = require("../../models");

module.exports = AllergyController = {
  getPatientAllergies: asyncHandler(async (req, res) => {
    const allergies = await db.Allergy.findAll({
      where: {
        patient_id: req.params.patientId,
      },
    });
    res.json(allergies);
  }),
  createPatientAllergy: asyncHandler(async (req, res) => {
    const { severity, allergy_type, reaction_details } = req.body;
    const patient = await db.Patient.findByPk(req.params.patientId);
    if (!patient) {
      res.status(400);
      throw new Error("Patient doesn't exist");
    }
    await db.Allergy.create({
      patient_id: patient.id,
      severity: severity,
      allergy_type: allergy_type,
      reaction_details: reaction_details,
      created_by: req.user.id,
    });
    res.status(201).json({ message: "Patient allergies added successfully" });
  }),
  deletePatientAllergy: asyncHandler(async (req, res) => {
    const Allergy = await db.Allergy.findByPk(req.params.id);
    if (!Allergy) {
      res.status(400);
      throw new Error("Patient doesn't exist");
    }
    await Allergy.destroy();
    res.status(201).json({ message: "Patient allergies deleted successfully" });
  }),
  updatePatientAllergy: asyncHandler(async (req, res) => {
    const { severity, allergy_type, reaction_details } = req.body;
    const Allergy = await db.Allergy.findByPk(req.params.id);
    if (!Allergy) {
      res.status(400);
      throw new Error("Patient doesn't exist");
    }
    await Allergy.update({
      severity: severity,
      allergy_type: allergy_type,
      reaction_details: reaction_details,
      //   created_by: req.user.id,
    });
    res.status(200).json({ message: "Patient allergies updated successfully" });
  }),
  getPatientAllergy: asyncHandler(async (req, res) => {}),
  getPatientAllergyById: asyncHandler(async (req, res) => {}),
  getPatientAllergyByPatientId: asyncHandler(async (req, res) => {}),
  getPatientAllergyByAllergyId: asyncHandler(async (req, res) => {}),
};
