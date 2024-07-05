const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const creditCompanyProfile = sequelize.define("creditcompanyprofile", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    // },
    tin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representative_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    representative_phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      // allowNull:false,
      defaultValue: true,
    },
  });
  creditCompanyProfile.sync({ alter: false, force: false });
  return creditCompanyProfile;
};
