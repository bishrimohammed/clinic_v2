const express = require("express");
const {
  clinicServiceController,
} = require("../controllers/clinicServiceController");
const router = express.Router();

router.get("/", clinicServiceController.getClinicServices);
router.get("/:id/serviceitems", clinicServiceController.getClinicServiceItems);
router.get("/withdetail", clinicServiceController.getClinicServiceDetail);
router.get("/getLabServiceItems", clinicServiceController.getLabServiceItems);
router.get(
  "/getImagingServiceItems",
  clinicServiceController.getImagingServiceItems
);
router.get(
  "/getLabServiceCategories",
  clinicServiceController.getLabServiceCategories
);
router.get(
  "/getImagingServiceCategories",
  clinicServiceController.getImagingServiceCategories
);
router.get("/:id", clinicServiceController.getClinicServiceById);

router.post("/", clinicServiceController.createClinicService);

router.post("/createLabService", clinicServiceController.createLabServiceItem);

router.post(
  "/createImagingService",
  clinicServiceController.createImagingServiceItem
);

router.put(
  "/:id/updateLabService",
  clinicServiceController.updateLabServiceItem
);
router.put(
  "/:id/updateimagingService",
  clinicServiceController.updateImagingServiceItem
);

router.put("/:id", clinicServiceController.updateClinicService);
router.patch("/:id/deactive", clinicServiceController.deactiveClinicService);

router.delete("/:id", clinicServiceController.deleteClinicService);

module.exports = router;
