import express from "express";
import * as PatientVisitController from "../controllers/PatientVisitController";
import { protect } from "../middleware/authMiddleWare";
const router = express.Router();

router.get("/", protect, PatientVisitController.getPatientVisits);
router.get("/active", protect, PatientVisitController.getActivePatientVisits);
// router.get(
//   "/doctor/upcoming",
//   protect,
//   PatientVisitController.getUpcomingPatientVisitByDoctorId
// );
// router.get(
//   "/doctor/assigned",
//   protect,
//   PatientVisitController.getPreviousPatientVisitByDoctorId
// );

router.get("/:id", PatientVisitController.getPatientVisitById);

router.post("/", protect, PatientVisitController.createPatientVisit);

// router.put("/:id", PatientVisitController.updatePatientVisit);
router.patch(
  "/:id/cancel",
  protect,
  PatientVisitController.cancelPatientAssignment
);

router.patch(
  "/:id/transfer",
  protect,
  PatientVisitController.transferPatientVisitToOtherDoctor
);
router.patch("/:id/start-traige", protect, PatientVisitController.startTraige);

router.patch(
  "/:id/finish-traige",
  protect,
  PatientVisitController.finishTraige
);
router.patch("/:id/admit", protect, PatientVisitController.admitVisit);
// router.delete("/:id", PatientVisitController.deletePatientVisit);

// router.get('/:id/patient', PatientVisitController.getPatient)

export default router;
