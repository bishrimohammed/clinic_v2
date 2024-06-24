module.exports = (sequelize, DataTypes) => {
  const ApprovalRequestAction = sequelize.define("approval-request-action", {
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
      allowNull: false,
    },
  });
  ApprovalRequestAction.sync({ alter: false });
  return ApprovalRequestAction;
};
