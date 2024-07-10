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
      main_tableName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      main_targetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      audit_tableName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      audit_targetId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      requested_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
          as: "requestedBy",
        },
      },
      current_approval_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      current_approval_user: {
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
  ApprovalRequest.sync({ alter: true });
  return ApprovalRequest;
};
