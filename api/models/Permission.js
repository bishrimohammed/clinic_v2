module.exports = (sequelize, DataTypes) => {
  const Permission = sequelize.define("permission", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      required: true,
      unique: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  Permission.sync({ alter: false, force: false });
  return Permission;
};
