const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = PermissionController = {
  getPermissions: asyncHandler(async (req, res) => {
    console.log(this.getPermissions);
    const permissions = await db.Permission.findAll();
    res.json(permissions);
  }),
  getActivePermissions: asyncHandler(async (req, res) => {
    const permissions = await db.Permission.findAll({
      where: {
        status: true,
      },
    });
    res.json(permissions);
  }),
  createPermission: asyncHandler(async (req, res) => {
    const permission = await db.Permission.create(req.body);
    res.status(201).json(permission);
  }),
  updatePermission: asyncHandler(async (req, res) => {
    const permission = await db.Permission.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    res.json(permission);
  }),
  deletePermission: asyncHandler(async (req, res) => {
    const permission = await db.Permission.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(permission);
  }),
  getPermissionById: asyncHandler(async (req, res) => {
    const permission = await db.Permission.findByPk(req.params.id);
    res.json(permission);
  }),
};
