const { sequelize } = require(".");

// module.exports = Role;

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define("role", {
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
  // Role.sync({ alter: true });
  // Role.hasMany(User);
  // Role.belongsToMany(Permission, {
  //   through: RolePermission,
  //   foreignKey: "role_id",
  // });
  return Role;
};
