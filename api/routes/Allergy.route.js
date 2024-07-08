const express = require("express");
const AllergyController = require("../controllers/patient/AllergyController");
const { protect } = require("../middleware/authMiddleWare");

const router = express.Router();

router.get("/:patientId/patient", AllergyController.getPatientAllergies);

router.post(
  "/:patientId/patient",
  protect,
  AllergyController.createPatientAllergy
);

router.put("/:id", protect, AllergyController.updatePatientAllergy);

router.delete("/:id", protect, AllergyController.deletePatientAllergy);

module.exports = router;
