module.exports = (sequelize, DataTypes) => {
  const ApprovalSetting = sequelize.define("approval_setting", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    permission_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["delete", "read", "update", "create"],
    },
    approval_level: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Approval level must be greater than 0",
        },
        max: {
          args: 5,
          msg: "Approval level must be less than 6",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  ApprovalSetting.sync({ alter: true });
  return ApprovalSetting;
};
