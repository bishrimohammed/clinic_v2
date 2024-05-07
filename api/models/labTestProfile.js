const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const labTestProfile = sequelize.define("labtestprofile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },

    labTest_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    isPanel: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    // parentId: {
    //   type: DataTypes.INTEGER,
    //   //   defaultValue: false,
    //   allowNull: true,
    // },
  });
  labTestProfile.sync({ alter: false, force: false });
  return labTestProfile;
};
