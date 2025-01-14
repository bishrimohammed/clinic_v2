import express from "express";
import * as RoleController from "../controllers/RoleController";
import { validate } from "../middleware/validate";
import { createRoleSchema } from "../types/role";

const router = express.Router();

router.get("/", RoleController.getRoles);
router.get("/active", RoleController.getActiveRoles);
router.get("/:id", RoleController.getRole);

router.post("/", validate(createRoleSchema), RoleController.createRole);

router.put("/:id", validate(createRoleSchema), RoleController.updateRole);
router.patch("/:id/deactivate", RoleController.deactivateRole);
router.patch("/:id/activate", RoleController.activateRole);

router.delete("/:id", RoleController.deleteRole);

export default router;
