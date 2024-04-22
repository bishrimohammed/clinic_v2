const express = require("express");
const visitTypeController = require("../controllers/visitTypeController");
const router = express.Router();

router.get("/", visitTypeController.getVisitTypes);

router.get("/:id", visitTypeController.getVisitTypeById);

router.post("/", visitTypeController.createVisitType);

router.put("/:id", visitTypeController.updateVisitType);

router.delete("/:id", visitTypeController.deleteVisitType);
// activate visit type

router.patch("/activate/:id", visitTypeController.activateVisitType);

// deactivate visit type

router.patch("/deactivate/:id", visitTypeController.deactivateVisitType);

module.exports = router;
