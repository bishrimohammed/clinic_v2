// const db = require("..");

module.exports.ApprovalSettingAssocoation = (db) => {
  db.ApprovalSetting.belongsTo(db.Permission, {
    foreignKey: "permission_id",
    as: "permission",
  });
  db.ApprovalSetting.hasMany(db.ApprovalSettingApprover, {
    foreignKey: "approval_setting_id",
    as: "approvers",
  });
  db.ApprovalSettingApprover.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user",
  });
  db.ApprovalSettingApprover.belongsTo(db.ApprovalSetting, {
    foreignKey: "approval_setting_id",
    as: "approval_setting",
  });
  db.ApprovalRequest.belongsTo(db.ApprovalSetting, {
    foreignKey: "approval_setting_id",
    as: "approvalSetting",
  });
  db.ApprovalRequest.belongsTo(db.User, {
    foreignKey: "requested_by",
    as: "requestedBy",
  });
  db.ApprovalRequest.hasMany(db.ApprovalRequestApproverAction, {
    foreignKey: "approval_request_id",
    as: "approverActions",
  });
  db.ApprovalRequestApproverAction.belongsTo(db.User, {
    foreignKey: "created_by",
    as: "createdBy",
  });
};
