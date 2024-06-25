const express = require("express");
const AllergyController = require("../controllers/patient/AllergyController");

const router = express.Router();

router.get("/:patientId/patient", AllergyController.getPatientAllergies);

router.post("/:patientId/patient", AllergyController.createPatientAllergy);

router.put("/:id", AllergyController.updatePatientAllergy);

router.delete("/:id", AllergyController.deletePatientAllergy);

module.exports = router;
