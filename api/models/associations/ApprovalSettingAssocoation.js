// const db = require("..");

module.exports.ApprovalSettingAssocoation = (db) => {
  db.ApprovalSetting.belongsTo(db.Permission, {
    foreignKey: "permission_id",
    as: "permission",
  });
  db.ApprovalSetting.hasMany(db.ApprovalSettingApprover, {
    foreignKey: "approval_setting_id",
    as: "approval_setting_approvers",
  });
  db.ApprovalSettingApprover.belongsTo(db.User, {
    foreignKey: "user_id",
    as: "user",
  });
  db.ApprovalSettingApprover.belongsTo(db.ApprovalSetting, {
    foreignKey: "approval_setting_id",
    as: "approval_setting",
  });
};
