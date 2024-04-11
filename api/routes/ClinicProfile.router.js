const express = require("express");
const ClinicProfileController = require("../controllers/ClinicProfileController");
const upload = require("../config/multerConfig");

const router = express.Router();

// GET /clinicprofile

router.get("/", ClinicProfileController.getClinicProfiles);

// GET /clinicprofile/:id

router.get(
  "/:id",

  ClinicProfileController.getClinicProfileById
);

// POST /clinicprofile

router.post(
  "/",
  upload.single("logo"),
  ClinicProfileController.createClinicProfile
);

// PUT /clinicprofile/:id

router.put(
  "/:id",
  upload.single("logo"),
  ClinicProfileController.updateClinicProfile
);

// DELETE /clinicprofile/:id

router.delete("/:id", ClinicProfileController.deleteClinicProfile);

module.exports = router;
