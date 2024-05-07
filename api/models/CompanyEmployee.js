const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const CompanyEmployee = sequelize.define("companyemployee", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    // emp_no: {
    //   type: DataTypes.STRING,
    //   allowNull: true,
    // },
    empl_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gender: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["Male", "Female"],
    },
    date_of_birth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    date_of_hire: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: false,
      // values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
    },

    photo_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    company_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  CompanyEmployee.sync({ alter: false, force: false });
  return CompanyEmployee;
};
