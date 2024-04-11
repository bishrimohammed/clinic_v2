const expressAsyncHandler = require("express-async-handler");
const db = require("../models");
const { json } = require("sequelize");

module.exports = RoleController = {
  getRoles: expressAsyncHandler(async (req, res) => {
    // const rp = await Role.getpermissions();
    // const { status } = req.query;
    // console.log(req.query);
    let where = {};
    if (req.query.status) {
      where.status = Boolean(req.query.status);
    }
    const roles = await db.Role.findAll({
      // include: ["permissions"],
      where: where,
      order: [["name", "ASC"]],
      include: [
        {
          model: db.Permission,
          as: "permissions",
          attributes: ["id", "name"],
        },
      ],
    });
    // console.log("get hkvhgkvmgmchvh");
    // console.log(roles);
    res.status(200).json(roles);
  }),
  getRole: expressAsyncHandler(async (req, res) => {
    // console.log(req.params);
    const role = await db.Role.findByPk(req.params.id, {
      include: [
        {
          model: db.Permission,
          as: "permissions",
          attributes: ["id", "name"],
        },
      ],
    });
    res.status(200).json(role);
  }),
  createRole: expressAsyncHandler(async (req, res) => {
    const { name, permissions } = req.body;
    // console.log(req.body);

    // res.status(404).json({ err: "dfvgrsg" });
    // return;
    const role = await db.Role.create({
      name: name,
    });
    if (!role) {
      res.status(500);
      throw new Error("Role not created");
    }
    // await role
    // console.log(permissions);
    await Promise.all(
      permissions.map((p) => {
        return db.rolePermission.create({
          role_id: role.id,
          permission_id: p.permissionId,
          create: p.create,
          read: p.read,
          update: p.update,
          delete: p.delete,
        });
      })
    );
    res.status(201).json({ msg: "Role created successfully" });
  }),
  updateRole: expressAsyncHandler(async (req, res) => {
    // console.log(req.params.id);
    const { name, selectedPermission } = req.body;
    // return;
    // console.log(selectedPermission);
    // res.status(404).json({ err: "dfvgrsg" });
    // return;
    const role = await db.Role.findByPk(req.params.id);
    if (!role) {
      res.status(404);
      throw new Error("Role not found");
    }
    // console.log(role);
    // res.status(404).json({ err: "dfvgrsg" });
    // return;
    await role.setPermissions([]);
    await db.rolePermission.bulkCreate(selectedPermission);
    // for (const permission of selectedPermission) {
    //   const {
    //     permission_id,
    //     create,
    //     read,
    //     update,
    //     delete: remove,
    //   } = permission;
    //   console.log(permission);

    //   await role.setPermissions(permission_id, {
    //     create,
    //     read,
    //     update,
    //     delete: remove,
    //   });
    // }
    // role.setPermissions(selectedPermission);
    role.name = name;
    role.save();

    res.json(role);
    return;
  }),
  deleteRole: expressAsyncHandler(async (req, res) => {
    const role = await db.Role.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(role);
  }),
  assignRole: expressAsyncHandler(async (req, res) => {
    const role = await db.Role.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(role);
  }),
  deactivateRole: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const role = await db.Role.findByPk(id);
    if (!role) {
      res.status(404);
      throw new Error("Role not found");
    }
    role.status = false;
    role.save();
    res.json(role);
  }),
  activateRole: expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    const role = await db.Role.findByPk(id);
    if (!role) {
      res.status(404);
      throw new Error("Role not found");
    }
    role.status = true;
    role.save();
    res.json(role);
  }),
};
