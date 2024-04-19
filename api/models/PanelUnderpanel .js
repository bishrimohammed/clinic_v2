const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const PanelUnderpanel = sequelize.define("panelunderpanel", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    panel_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    underpanel_id: {
      type: DataTypes.INTEGER,
      defaultValue: false,
    },
  });
  PanelUnderpanel.sync({ alter: false, force: false });
  return PanelUnderpanel;
};
