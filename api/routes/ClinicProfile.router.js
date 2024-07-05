const express = require("express");
const ClinicProfileController = require("../controllers/ClinicProfileController");
const upload = require("../config/multerConfig");
const { protect } = require("../middleware/authMiddleWare");

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
  protect,
  upload.fields([{ name: "logo" }, { name: "clinic_seal" }]),
  ClinicProfileController.createClinicProfile
);

// PUT /clinicprofile/:id

router.put(
  "/:id",
  upload.fields([{ name: "logo" }, { name: "clinic_seal" }]),
  protect,
  ClinicProfileController.updateClinicProfile
);

// DELETE /clinicprofile/:id

router.delete("/:id", ClinicProfileController.deleteClinicProfile);

module.exports = router;
