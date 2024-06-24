const express = require("express");
const RoleController = require("../controllers/RoleController");
// const PermissionController = require("../controllers/PermissionController");
// const PermissionController =

const router = express.Router();

router.get("/", RoleController.getRoles);
router.get("/active", RoleController.getActiveRoles);
router.get("/:id", RoleController.getRole);

router.post("/", RoleController.createRole);

router.put("/:id", RoleController.updateRole);
router.patch("/:id/deactivate", RoleController.deactivateRole);
router.patch("/:id/activate", RoleController.activateRole);

router.delete("/:id", RoleController.deleteRole);

module.exports = router;
