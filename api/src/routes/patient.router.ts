import express from "express";
import * as PatientController from "../controllers/PatientController";
import upload from "../config/multerConfig";
import { protect } from "../middleware/authMiddleWare";
const router = express.Router();

router.get("/", PatientController.getAllPatients);
router.get("/select", PatientController.getPatientNameList);
router.get("/search", PatientController.searchPatient);
router.get("/lastPatientID", PatientController.getLastPatientId);
router.get("/:id/general-info", PatientController.getPatientGeneralInforamtion);
router.get("/:id/over-view-data", PatientController.getPatientOverViewData);
router.get("/:id", PatientController.getPatient);

router.get("/:id/family-history", protect, PatientController.getFamilyHistory);

router.get("/:id/social-history", protect, PatientController.getSocialHistory);
router.get("/search", PatientController.searchPatient);
router.post(
  "/",
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  protect,
  PatientController.createPatient
);
router.post("/:id/allergy", protect, PatientController.addPatientAllergy);
router.post(
  "/:id/family-history",
  protect,
  PatientController.addPatientFamilyHistory
);
router.post(
  "/:id/social-history",
  protect,
  PatientController.addPatientSocialHistory
);
router.post(
  "/:id/add_past_medical_history",
  protect,
  PatientController.addPatientPastMedicalHistory
);
router.put(
  "/family-history/:id",
  protect,
  PatientController.updateFamilyhistory
);

router.put(
  "/social-history/:id",
  protect,
  PatientController.updateSocialHistory
);
router.put(
  "/:id",
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  protect,
  PatientController.updatePatient
);
// router
//   .get("/:id", getPatient)
//   .get("/:patientId/overviewdata", getPatientOverviewData);
// router.post("/", createPatient); //.post("/search", searchPatient);
// router.put("/:id", updatePatient);
router.patch("/:id/activate", protect, PatientController.activatePatient);

router.patch("/:id/deactivate", protect, PatientController.deactivatePatient);

router.patch("/:id/hiv", protect, PatientController.updateHivStatus);
router.patch("/:id/disability", protect, PatientController.updateDisablity);

router.delete(
  "/family-history/:id",
  protect,
  PatientController.deleteFamilyHistory
);

router.delete(
  "/social-history/:id",
  protect,
  PatientController.deleteSocialHistory
);

export default router;
