const express = require("express");
const {
  clinicServiceController,
} = require("../controllers/clinicServiceController");
const router = express.Router();

router.get("/", clinicServiceController.getClinicServices);
router.get("/:id/servicegroup", clinicServiceController.getServiceGroup);
router.get("/:id/serviceitems", clinicServiceController.getClinicServiceItems);
// router.get("/:id/gggg", clinicServiceController.ggggg);
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
router.get("/get_lab_service", clinicServiceController.getLaboratoryService);
router.get("/procedures", clinicServiceController.getProcedures);
router.get("/:id", clinicServiceController.getClinicServiceById);

router.post("/", clinicServiceController.createClinicService);

// router.post("/createLabService", clinicServiceController.createLabServiceItem);
router.post("/serviceitem", clinicServiceController.addServiceItems);
router.post("/servicegroup", clinicServiceController.addServiceGroup);

router.put("/serviceitem/:id", clinicServiceController.updateServiceItems);
router.put("/servicegroup/:id", clinicServiceController.updateServiceGroup);
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
router.patch("/:id/activate", clinicServiceController.activateClinicService);

// service items

router.patch(
  "/:id/deactive/serviceitem",
  clinicServiceController.deactiveServiceItem
);
router.patch(
  "/:id/activate/serviceitem",
  clinicServiceController.activateServiceItem
);

//service group

router.patch(
  "/servicegroup/:id/deactivate",
  clinicServiceController.deactiveServiceGroup
);
router.patch(
  "/servicegroup/:id/activate",
  clinicServiceController.activateServiceGroup
);

router.delete("/:id", clinicServiceController.deleteClinicService);

module.exports = router;
