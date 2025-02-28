import { RequestHandler } from "express";
import expressAsyncHandler from "express-async-handler";
import { roleService } from "../services";
import asyncHandler from "../utils/asyncHandler";
import { createRoleSchema } from "../types/role";

export const getRoles: RequestHandler = expressAsyncHandler(
  async (req, res) => {
    const query = req.query as { status: "true" | "false" | undefined };
    let where: any = {};
    if (req.query.status) {
      where.status = Boolean(req.query.status);
    }

    const roles = await roleService.getRoles(query);

    res.status(200).json(roles);
  }
);
export const getActiveRoles = expressAsyncHandler(async (req, res) => {
  const roles = await roleService.getActiveRoles();
  // db.Role.findAll({
  //   where: {
  //     status: true,
  //   },
  //   order: [["name", "ASC"]],
  //   include: [
  //     {
  //       model: db.Permission,
  //       as: "permissions",
  //       attributes: ["id", "name"],
  //     },
  //   ],
  // });
  res.status(200).json(roles);
});
export const getRole = expressAsyncHandler(async (req, res) => {
  const role = await roleService.getRoleById(req.params.id);

  res.status(200).json(role);
});
/**
 * 
 */
export const createRole = asyncHandler<{
  validatedData: typeof createRoleSchema._type;
}>(async (req, res) => {
  const role = await roleService.createRole(req.validatedData);

  res.status(201).json({
    success: true,
    message: "Role created successfully",
    data: role,
  });
});
export const updateRole = asyncHandler<{
  validatedData: typeof createRoleSchema._type;
}>(async (req, res) => {
  const { id } = req.params;

  const role = await roleService.updateRole(id, req.validatedData);

  res.status(201).json({
    success: true,
    message: "Role updated successfully",
    data: role,
  });
});
export const deleteRole = expressAsyncHandler(async (req, res) => {
  // const role = await db.Role.destroy({
  //   where: {
  //     id: req.params.id,
  //   },
  // });
  // res.status(200).json(role);
});
// export const assignRole = asyncHandler(async (req, res) => {
//   const role = await db.Role.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   });
//   res.status(200).json(role);
// });
export const deactivateRole = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const role = await roleService.deactivateRole(id);

  res.json({ success: true, data: role });
});
export const activateRole = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await roleService.activateRole(id);

  res.json({ success: true, data: role });
});
