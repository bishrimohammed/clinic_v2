const asyncHandler = require("express-async-handler");
const db = require("../models");

module.exports = ApprovalSettingController = {
  getApprovalSettings: asyncHandler(async (req, res) => {
    let where = {};
    if (req.query.status) {
      if (req.query.status === "true") {
        where.status = true;
      } else if (req.query.status === "false") {
        where.status = false;
      }
    }
    console.log(where);
    console.log(req.query);
    const approvalSettings = await db.ApprovalSetting.findAll({
      where,
      include: [
        {
          model: db.Permission,
          as: "permission",
          attributes: ["id", "name"],
        },
        {
          model: db.ApprovalSettingApprover,
          as: "approval_setting_approvers",

          include: [
            {
              model: db.User,
              as: "user",
              include: {
                model: db.Employee,
                as: "employee",
                // attributes: ["name"],
                // include: [
                //   {
                //     model: db.Address,
                //     as: "address",
                //     // attributes: ["name"],
                //   },
                // ],
                attributes: ["id", "firstName", "lastName", "middleName"],
              },
              attributes: ["id"],
            },
          ],
        },
      ],
    });
    res.status(200).json(approvalSettings);
  }),
  getApprovalSetting: asyncHandler(async (req, res) => {
    const approvalSetting = await db.ApprovalSetting.findByPk(req.params.id);
    res.status(200).json(approvalSetting);
  }),
  createApprovalSetting: asyncHandler(async (req, res) => {
    const { name, approvalUser, action, approvalLevel, permissionId } =
      req.body;
    const existing = await db.ApprovalSetting.findOne({
      where: {
        permission_id: permissionId,
        action,
      },
    });
    if (existing) {
      res.status(400);
      //   .json({
      //     message: "Approval setting already exists",
      //   });
      //   throw new Error({
      //     msg: "Approval setting already exists",
      //     path: "permissionId",
      //   });
      throw new Error("Approval setting already exists");
    }
    const approvalSetting = await db.ApprovalSetting.create({
      name: name,
      action: action,
      approval_level: approvalLevel,
      permission_id: permissionId,
    });
    const users = await Promise.all(
      approvalUser.map((u) => {
        return db.ApprovalSettingApprover.create({
          approval_setting_id: approvalSetting.id,
          user_id: u.userId,
          level: u.level,
        });
      })
    );
    console.log(users);
    // const approvalSetting = await db.ApprovalSetting.create({ name });
    console.log(req.body);
    res.status(201).json(approvalSetting);
  }),
  activateApprovalSetting: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const approvalSetting = await db.ApprovalSetting.findByPk(id);
    if (!approvalSetting) {
      res.status(404);
      throw new Error("Approval setting not found");
    }
    approvalSetting.status = true;
    await approvalSetting.save();
    res.status(200).json(approvalSetting);
  }),
  deactivateApprovalSetting: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const approvalSetting = await db.ApprovalSetting.findByPk(id);
    if (!approvalSetting) {
      res.status(404);
      throw new Error("Approval setting not found");
    }
    approvalSetting.status = false;
    await approvalSetting.save();
    res.status(200).json(approvalSetting);
  }),
};
