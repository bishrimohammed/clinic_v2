const { Op } = require("sequelize");
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
      // unique: true,
    },
    gender: {
      type: DataTypes.ENUM,
      // allowNull: false,
      values: ["Male", "Female"],
    },
    birth_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    has_phone: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    blood_type: {
      type: DataTypes.ENUM,
      allowNull: true,
      values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    has_HIV: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        async checkPhone(value) {
          if (value) {
            const patient = await Patient.findOne({
              where: {
                id: { [Op.ne]: this.id },
                phone: this.phone,
                has_phone: true,
              },
            });
            if (patient) {
              throw new Error("Phone number already");
            }
          }
        },
      },
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
    emergence_contact_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    marital_status: {
      type: DataTypes.STRING,
      // values: ['Single', 'Married', 'Divorced', 'Widowed'],
      allowNull: true,
    },
    occupation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    guardian_relationship: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    empoyeeId_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });

  Patient.sync({ force: false, alter: true });
  return Patient;
};
