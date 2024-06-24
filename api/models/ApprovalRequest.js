module.exports = (sequelize, DataTypes) => {
  const ApprovalRequest = sequelize.define(
    "approval_request",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      approval_setting_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      requested_data: {
        type: DataTypes.JSON,
        allowNull: false,
      },
      requested_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      current_approval_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Pending", "Approved", "Rejected"],
        defaultValue: "Pending",
      },
      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      paranoid: true,
    }
  );
  return ApprovalRequest;
};
