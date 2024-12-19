const asyncHandler = require("express-async-handler");
const db = require("../../models");
module.exports = ConditionsAndMedicationController = {
  getCurrentMedication: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const MedicalRecord = await db.MedicalRecord.findByPk(medicalRecordId);
    if (!MedicalRecord) {
      res.status(404);
      throw new Error("Medical Record not found");
    }
    const currentMedication = await db.CurrentMedication.findAll({
      where: {
        medical_record_id: MedicalRecord.id,
      },
    });
    res.json(currentMedication);
  }),
  getDiscontinuedMedication: asyncHandler(async (req, res) => {
    const { medicalRecordId } = req.params;
    const MedicalRecord = await db.MedicalRecord.findByPk(medicalRecordId);
    if (!MedicalRecord) {
      res.status(404);
      throw new Error("Medical Record not found");
    }
    const discontinuedMedication = await db.DiscontinuedMedication.findAll({
      where: {
        medical_record_id: MedicalRecord.id,
      },
    });
    res.json(discontinuedMedication);
  }),
  getPatientPastMedicalHistories: asyncHandler(async (req, res) => {
    const { patientId } = req.params;
    const patient = await db.Patient.findByPk(patientId);
    if (!patient) {
      res.status(404);
      throw new Error("Patient not found");
    }
    const pastMedicalHistories = await db.PastMedicalHistory.findAll({
      where: {
        patient_id: patient.id,
      },
    });
    res.json(pastMedicalHistories);
  }),
  createCurrentMedication: asyncHandler(async (req, res) => {
    const { condition, treatment } = req.body;
    const { medicalRecordId } = req.params;
    const MedicalRecord = await db.MedicalRecord.findByPk(medicalRecordId);
    if (!MedicalRecord) {
      res.status(404);
      throw new Error("Patient not found");
    }
    await db.CurrentMedication.create(
      {
        medical_record_id: MedicalRecord.id,
        treatment: treatment,
        condition: condition,
        created_by: req.user.id,
      },
      { userId: req.user.id }
    );
    res.status(201).json({ message: "Currrent Medication added successfully" });
  }),
  createDiscontinuedMedication: asyncHandler(async (req, res) => {
    const { medicationName } = req.body;
    const { medicalRecordId } = req.params;
    const MedicalRecord = await db.MedicalRecord.findByPk(medicalRecordId);
    if (!MedicalRecord) {
      res.status(404);
      throw new Error("Medical Record not found");
    }
    await db.DiscontinuedMedication.create(
      {
        medical_record_id: MedicalRecord.id,
        medication_name: medicationName,
        created_by: req.user.id,
      },
      { userId: req.user.id }
    );
    res.status(201).json({ message: "" });
  }),
  createPastMedicalHistory: asyncHandler(async (req, res) => {
    const { condition, treatment } = req.body;
    const { patientId } = req.params;
    const patient = await db.Patient.findByPk(patientId);
    if (!patient) {
      res.status(404);
      throw new Error("Patient not found");
    }
    await db.PastMedicalHistory.create(
      {
        patient_id: patient.id,
        treatment: treatment,
        medical_condition: condition,
        created_by: req.user.id,
      },
      { userId: req.user.id }
    );
    res
      .status(201)
      .json({ message: "Past medical History added successfully" });
  }),
  updateCurrentMedication: asyncHandler(async (req, res) => {
    const { condition, treatment } = req.body;
    const currentMedication = await db.CurrentMedication.findByPk(
      req.params.id
    );
    if (!currentMedication) {
      res.status(400);
      throw new Error("Current Medication doesn't exist");
    }
    await currentMedication.update(
      {
        treatment: treatment,
        condition: condition,
      },
      { userId: req.user.id }
    );
    res.json({ message: "current Medication updated successfully" });
  }),
  updateDiscontinuedMedication: asyncHandler(async (req, res) => {
    const { medicationName } = req.body;
    const discontinuedMedication = await db.DiscontinuedMedication.findByPk(
      req.params.id
    );
    console.log(req.params.id);
    if (!discontinuedMedication) {
      res.status(400);
      throw new Error(`Discontinued Medication doesn't exist ${req.params.id}`);
    }
    await discontinuedMedication.update(
      {
        medication_name: medicationName,
      },
      { userId: req.user.id }
    );
    res.json({ message: "Discontinued Medication updated successfully" });
  }),
  updatePastMedicalHistory: asyncHandler(async (req, res) => {
    const { condition, treatment } = req.body;
    const pastMedicalHistory = await db.PastMedicalHistory.findByPk(
      req.params.id
    );
    console.log(req.user);
    if (!pastMedicalHistory) {
      res.status(400);
      throw new Error("Past Medical History doesn't exist");
    }
    await pastMedicalHistory.update(
      {
        treatment: treatment,
        medical_condition: condition,
      },
      { userId: req.user.id }
    );
    res.json({ message: "Past Medical History updated successfully" });
  }),
  deleteCurrentMedication: asyncHandler(async (req, res) => {
    const CurrentMedication = await db.CurrentMedication.findByPk(
      req.params.id
    );
    if (!CurrentMedication) {
      res.status(400);
      throw new Error("Current Medication doesn't exist");
    }
    await CurrentMedication.destroy({ userId: req.user.id });
    res
      .status(201)
      .json({ message: "Current Medication deleted successfully" });
  }),
  deleteDiscontinuedMedication: asyncHandler(async (req, res) => {
    const DiscontinuedMedication = await db.DiscontinuedMedication.findByPk(
      req.params.id
    );
    console.log(req.user);
    if (!DiscontinuedMedication) {
      res.status(400);
      throw new Error("Discontinued Medication doesn't exist");
    }
    await DiscontinuedMedication.destroy({ userId: req.user.id });
    res
      .status(200)
      .json({ message: "Discontinued Medication deleted successfully" });
  }),
  deletePastMedicalHistory: asyncHandler(async (req, res) => {
    const PastMedicalHistory = await db.PastMedicalHistory.findByPk(
      req.params.id
    );
    if (!PastMedicalHistory) {
      res.status(400);
      throw new Error("Past Medical History doesn't exist");
    }
    await PastMedicalHistory.destroy({ userId: req.user.id });
    res
      .status(201)
      .json({ message: "Past Medical History deleted successfully" });
  }),
};
