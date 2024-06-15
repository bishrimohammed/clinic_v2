const express = require("express");
const MedicalRecordConsultaionController = require("../controllers/medical record/MedicalRecordConsultaionController");
const { protect } = require("../middleware/authMiddleWare");
const router = express.Router();

// router.get("/", MedicalRecordConsultaionController.getMedicalRecordConsultaions);

module.exports = router;
