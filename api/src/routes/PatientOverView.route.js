const express = require("express");
// const MedicalRecordConsultaionController = require("../controllers/medical record/MedicalRecordConsultaionController");
const { protect } = require("../middleware/authMiddleWare");
const PatientOverViewController = require("../controllers/patient/PatientOverViewController");
const router = express.Router();

router.get("/:patientId/resent", PatientOverViewController.getResentData);
router.get(
  "/:patientId/clinic-data",
  PatientOverViewController.getPatientClinicData
);

router.get(
  "/:patientId/prescriptions",
  //   protect,
  PatientOverViewController.getPatientPrescriptions
);

// router.get(
//   "/:patientId/prescriptions",
//   //   protect,
//   PatientOverViewController.getPatientPrescriptions
// );
router.get(
  "/:patientId/medical-certificates",
  //   protect,
  PatientOverViewController.getPatientMedicalCertificates
);
router.get(
  "/:patientId/referral-notes",
  //   protect,
  PatientOverViewController.getPatientReferralNotes
);
router.get(
  "/:patientId/labs",
  //   protect,
  PatientOverViewController.getPatientLabs
);
router.get(
  "/:patientId/imaging",
  //   protect,
  PatientOverViewController.getPatientImagingStudies
);
router.get(
  "/:patientId/procedure",
  //   protect,
  PatientOverViewController.getPatientProcedure
);
module.exports = router;
