const db = require("../models");

const createApprovalRequestAction = async (
  approvalrequestId,
  userId,
  action
) => {
  const approvalRequestAction = await db.ApprovalRequestApproverAction.create({
    approval_request_id: approvalrequestId,
    performed_action: action,
    created_by: userId,
  });
  return approvalRequestAction;
};
module.exports = {
  createApprovalRequestAction,
};
