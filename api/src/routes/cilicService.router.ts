import express from "express";
import * as clinicServiceController from "../controllers/clinicServiceController";
import { validate } from "../middleware/validate";
import {
  createClinicServiceSchema,
  createServiceCategorySchema,
  updateClinicServiceSchema,
  updateServiceCategorySchema,
} from "../types/clinic-services";
const router = express.Router();

router.get("/", clinicServiceController.getClinicServices);
router.get(
  "/:id/servicegroup",
  clinicServiceController.getClinicServiceCategoriesByServiceId
);
router.get(
  "/service-category/:category_id",
  clinicServiceController.getServiceCategoryById
);
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

router.post(
  "/",
  validate(createClinicServiceSchema),
  clinicServiceController.createClinicService
);

// router.post("/createLabService", clinicServiceController.createLabServiceItem);
router.post("/serviceitem", clinicServiceController.addServiceItems);
router.post(
  "/:id/service-category",
  validate(createServiceCategorySchema),
  clinicServiceController.createServiceCategory
);

router.put("/serviceitem/:id", clinicServiceController.updateServiceItems);
router.put(
  "/service-category/:category_id",
  validate(updateServiceCategorySchema),
  clinicServiceController.updateServiceCategory
);
router.put(
  "/:id/updateLabService",
  clinicServiceController.updateLabServiceItem
);
router.put(
  "/:id/updateimagingService",
  clinicServiceController.updateImagingServiceItem
);

router.put(
  "/:id",
  validate(updateClinicServiceSchema),
  clinicServiceController.updateClinicService
);
router.patch("/:id/deactivate", clinicServiceController.deactiveClinicService);
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
  "/service-category/:category_id/deactivate",
  clinicServiceController.deactiveServiceCategory
);
router.patch(
  "/service-category/:category_id/activate",
  clinicServiceController.activateServiceCategory
);

router.delete("/:id", clinicServiceController.deleteClinicService);
router.delete(
  "/service-category/:category_id",
  clinicServiceController.deleteServiceCategory
);
// router.delete("/:id", clinicServiceController.deleteClinicService);

export default router;
