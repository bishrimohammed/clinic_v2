import express from "express";
import * as ClinicProfileController from "../controllers/ClinicProfile.Controller";
import upload from "../config/multerConfig";
import { protect } from "../middleware/authMiddleWare";
import { validate } from "../middleware/validate";
import { updateClinicProfileSchema } from "../types/clinic-profile";
import { TypedRequest } from "../types/TypedRequest";
import asyncHandler from "../utils/asyncHandler";
import { parseJSON } from "../utils/helpers";

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

// PUT /clinicprofile/:id

router.put(
  "/:id",
  protect,
  upload.fields([{ name: "logo" }, { name: "clinic_seal" }]),
  validate(updateClinicProfileSchema, {
    address: parseJSON,
  }),
  ClinicProfileController.updateClinicProfile
);

// DELETE /clinicprofile/:id

// router.delete("/:id", ClinicProfileController.deleteClinicProfile);

module.exports = router;
