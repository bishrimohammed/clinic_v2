import express from "express";
import * as ClinicProfileController from "../controllers/ClinicProfile.Controller";

import { protect } from "../middleware/authMiddleWare";
import { validate } from "../middleware/validate";
import { updateClinicProfileSchema } from "../types/clinic-profile";

import { parseJSON } from "../utils/helpers";
import upload from "../config/multerConfig";

// import { parseJSON } from "date-fns";
const router = express.Router();

// GET /clinicprofile

router.get("/", ClinicProfileController.getClinicProfiles);

// GET /clinicprofile/:id

router.get("/:id", ClinicProfileController.getClinicProfileById);

// POST /clinicprofile

// router.post(
//   "/",
//   protect,
//   upload.fields([{ name: "logo" }, { name: "clinic_seal" }]),
//   ClinicProfileController.createClinicProfile
// );

// PUT /clinic-profile/:id

router.put(
  "/:id",
  protect,
  upload.fields([{ name: "logo" }, { name: "clinic_seal" }]),
  validate(updateClinicProfileSchema, {
    address: parseJSON,
    working_hours: parseJSON,
  }),
  ClinicProfileController.updateClinicProfile
);

// DELETE /clinicprofile/:id

// router.delete("/:id", ClinicProfileController.deleteClinicProfile);

module.exports = router;
