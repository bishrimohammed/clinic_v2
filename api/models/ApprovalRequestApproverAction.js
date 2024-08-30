module.exports = (sequelize, DataTypes) => {
  const ApprovalRequestApproverAction = sequelize.define(
    "approval_request_approver_action",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      approval_request_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      performed_action: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Approved", "Rejected"],
      },
      level_user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      created_by: { type: DataTypes.INTEGER, allowNull: false },
    }
  );
  ApprovalRequestApproverAction.sync({ alter: false });
  return ApprovalRequestApproverAction;
};
