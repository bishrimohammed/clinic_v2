const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const UserPermission = sequelize.define(
    "userpermission",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      create: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      read: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      update: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },

    {
      timestamps: false,
    }
  );
  UserPermission.sync({ alter: false, force: false });
  return UserPermission;
};
