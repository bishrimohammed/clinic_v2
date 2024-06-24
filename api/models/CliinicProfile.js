const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const ClinicProfile = sequelize.define("clinicprofile", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    logo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    card_valid_date: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    website_url: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
      },
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    brand_color: {
      type: DataTypes.STRING,
    },
    motto: {
      type: DataTypes.STRING,
    },
    number_of_branch: {
      type: DataTypes.INTEGER,
    },
    branch_addresses: {
      type: DataTypes.STRING,
    },
    clinic_type: DataTypes.STRING,
    has_triage: DataTypes.BOOLEAN,
    clinic_seal: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });
  ClinicProfile.sync({ alter: true, force: false });
  return ClinicProfile;
};
