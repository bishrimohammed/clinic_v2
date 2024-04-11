const express = require("express");
const PermissionController = require("../controllers/PermissionController");
// const PermissionController =

const router = express.Router();

router.get("/", PermissionController.getPermissions);

router.post("/", PermissionController.createPermission);

router.put("/:id", PermissionController.updatePermission);

router.delete("/:id", PermissionController.deletePermission);

module.exports = router;
