import express from "express";
import * as PatientController from "../controllers/PatientController";
import upload from "../config/multerConfig";
import { protect } from "../middleware/authMiddleWare";
import { validate } from "../middleware/validate";
import {
  PatientRegistrationInput,
  patientRegistrationSchema,
  updatePatientSchema,
  createAllergySchema,
  createFamilyHistorySchema,
  createPastMedicalHistorySchema,
  createSocialHistorySchema,
} from "../types/patient";
import { parseJSON } from "../utils/helpers";
const router = express.Router();

router.get("/", PatientController.getAllPatients);
router.get("/names-dropdown", PatientController.getPatientNamesForDropdown);
router.get("/search", PatientController.searchPatient);
router.get("/last-id", PatientController.getLastPatientId);
router.get("/:id", PatientController.getPatient);
router.get("/:id/general-info", PatientController.getPatientGeneralInforamtion);
router.get("/:id/over-view-data", PatientController.getPatientOverViewData);

router.get(
  "/:id/family-history",
  protect,
  PatientController.getPatientFamilyHistory
);

router.get(
  "/:id/social-history",
  protect,
  PatientController.getPatientSocialHistory
);
router.get("/:id/allergy", protect, PatientController.getPatientAllergy);
router.get(
  "/:id/past-medical-history",
  protect,
  PatientController.getPatientPastMedicalHistory
);
// router.get("/search", PatientController.searchPatient);
router.post(
  "/",
  protect,
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  validate(patientRegistrationSchema, {
    address: parseJSON,
    emergencyContact: parseJSON,
  }),
  PatientController.createPatient
);
router.post(
  "/:id/allergy",
  protect,
  validate(createAllergySchema),
  PatientController.addPatientAllergy
);
router.post(
  "/:id/family-history",
  protect,
  validate(createFamilyHistorySchema),
  PatientController.addPatientFamilyHistory
);
router.post(
  "/:id/social-history",
  protect,
  validate(createSocialHistorySchema),
  PatientController.addPatientSocialHistory
);
router.post(
  "/:id/past-medical-history",
  protect,
  validate(createPastMedicalHistorySchema),
  PatientController.addPatientPastMedicalHistory
);

router.put(
  "/:id",
  protect,
  upload.fields([{ name: "employeeId_doc" }, { name: "letter_doc" }]),
  validate(updatePatientSchema, {
    address: parseJSON,
    emergencyContact: parseJSON,
  }),
  PatientController.updatePatient
);
router.put(
  "/family-history/:family_history_id",
  protect,
  validate(createFamilyHistorySchema),
  PatientController.updatePatientFamilyHistory
);

router.put(
  "/social-history/:social_history_id",
  protect,
  validate(createSocialHistorySchema),
  PatientController.updatePatientSocialHistory
);
router.put(
  "/allergy/:allergy_id",
  protect,
  validate(createAllergySchema),
  PatientController.updatePatientAllergy
);

router.put(
  "/past-medical-history/:past_medical_history_id",
  protect,
  validate(createPastMedicalHistorySchema),
  PatientController.updatePatientPastMedicalHistory
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
  "/family-history/:family_history_id",
  protect,
  PatientController.deletePatientFamilyHistory
);

router.delete(
  "/social-history/:social_history_id",
  protect,
  PatientController.deletePatientSocialHistory
);

router.delete(
  "/allergy/:allergy_id",
  protect,
  PatientController.deletePatientAllergy
);
router.delete(
  "/past-medical-history/:past_medical_history_id",
  protect,
  PatientController.deletePatientPastMedicalHistory
);
export default router;
