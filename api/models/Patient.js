const db = require(".");
const { sequelize } = require(".");

module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define("patient", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    middleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    card_number: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    is_dependent: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    manual_card_id: {
      type: DataTypes.STRING,
      allowNull: function () {
        const is_new = this.getDataValue("is_new");
        return !is_new;
      },
      // manual_card_id is required when patient is not new
      validate: {
        is_new: function (value) {
          const is_new = this.getDataValue("is_new");

          if (!is_new && !value) {
            throw new Error(
              "manual_card_id is required when patient is not new"
            );
          }
        },
      },
    },
    is_credit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    address_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });
  // Patient.afterSave(async (patient, options) => {
  //   console.log(patient.id + "mmmm");
  //   console.log(options);
  //   const paddedCount = patient.id.toString().padStart(5, "0");
  //   const card_no = `P${paddedCount}`;
  //   console.log(card_no);
  //   patient.card_number = card_no;
  //   await patient.save();
  // });

  // Patient.hasMany(db.PatientAssignment, {
  //   foreignKey: "patient_id",
  //   as: "patientassignments",
  // });
  Patient.sync({ force: false, alter: false });
  return Patient;
};
