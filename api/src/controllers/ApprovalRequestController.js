const asyncHandler = require("express-async-handler");
const db = require("../models");
const { processApproval } = require("../helpers/processApproval");

module.exports = ApprovalRequestController = {
  getApprovalPendingRequests: asyncHandler(async (req, res) => {
    const approvalRequests = await db.ApprovalRequest.findAll({
      where: {
        status: "Pending",
        current_approval_user: req.user.id,
      },
      include: [
        {
          model: db.ApprovalSetting,
          as: "approvalSetting",
        },
        {
          model: db.User,
          as: "requestedBy",
          include: [
            {
              model: db.Employee,
              as: "employee",
              attributes: ["id", "firstName", "lastName", "middleName"],
            },
          ],
          attributes: ["id"],
        },
      ],
    });
    res.json(approvalRequests);
  }),

  getApprovalRequestById: asyncHandler(async (req, res) => {}),

  updateApprovalRequest: asyncHandler(async (req, res) => {}),

  deleteApprovalRequest: asyncHandler(async (req, res) => {}),

  createApprovalRequest: asyncHandler(async (req, res) => {}),
  approveRequest: asyncHandler(async (req, res) => {
    const { id } = req.params;
    const approvalRequest = await db.ApprovalRequest.findByPk(id);
    if (!approvalRequest) {
      res.status(404);
      throw new Error("Approval Request not found");
    }
    const approvalSetting = await db.ApprovalSetting.findByPk(
      approvalRequest.approval_setting_id
    );
    let hasNextApprover;
    let nextApprover = null;
    if (
      approvalSetting.approval_level === approvalRequest.current_approval_level
    ) {
      hasNextApprover = false;
    } else if (
      approvalSetting.approval_level > approvalRequest.current_approval_level
    ) {
      hasNextApprover = true;
      nextApprover = await db.ApprovalSettingApprover.findOne({
        where: {
          level: approvalRequest.current_approval_level + 1,
          approval_setting_id: approvalSetting.id,
        },
      });
    }
    const approvalProcessResult = await processApproval(
      approvalRequest.audit_tableName,
      approvalRequest.audit_targetId,
      hasNextApprover,
      nextApprover,
      req.user,
      approvalRequest
    );
    console.log(approvalProcessResult);
    res.json(approvalProcessResult);
  }),
  rejectRequest: asyncHandler(async (req, res) => {}),
  getModelName: asyncHandler(async (req, res) => {}),
};
