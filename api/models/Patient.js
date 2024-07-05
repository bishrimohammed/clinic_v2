const { Op } = require("sequelize");
const db = require(".");
// const PatientAudit = db.PatientAudit;
module.exports = (sequelize, DataTypes) => {
  const Patient = sequelize.define(
    "patient",
    {
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
      patient_type: {
        type: DataTypes.ENUM,
        values: ["inpatient", "outpatient"],
        allowNull: true,
        defaultValue: "outpatient",
      },
      // Mobility Impairment, Hearing Impairment, Visual Impairment, Speech Impairment
      disability: {
        type: DataTypes.ENUM,
        values: ["None", "Mobility", "Hearing", "Visual", "Speech"],
        defaultValue: "None",
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (patient, options) => {
          console.log("\n\nf\n");
          // console.log(sequelize.models.patients_audit);
          // console.log(patient);
          // console.log("\n\nf\n\n");
          await sequelize.models.patients_audit.create({
            patient_id: patient.id,
            firstName: patient.firstName,
            middleName: patient.middleName,
            lastName: patient.lastName,
            card_number: patient.card_number,
            gender: patient.gender,
            birth_date: patient.birth_date,
            has_phone: patient.has_phone,
            blood_type: patient.blood_type,
            nationality: patient.nationality,
            has_HIV: patient.has_HIV,
            phone: patient.phone,
            is_new: patient.is_new,
            manual_card_id: patient.manual_card_id,
            is_credit: patient.is_credit,
            address_id: patient.address_id,
            emergence_contact_id: patient.emergence_contact_id,
            company_id: patient.company_id,
            marital_status: patient.marital_status,
            occupation: patient.occupation,
            guardian_name: patient.guardian_name,
            guardian_relationship: patient.guardian_relationship,
            empoyeeId_url: patient.empoyeeId_url,
            patient_type: patient.patient_type,
            disability: patient.disability,
            status: patient.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },

        beforeUpdate: async (patient, options) => {
          console.log("\n\nf\n");
          // console.log(sequelize.models.patients_audit);
          console.log(patient._previousDataValues);
          console.log("\n\nf\n\n");
          const previousPatientData = patient._previousDataValues;
          await sequelize.models.patients_audit.create({
            patient_id: previousPatientData.id,
            firstName: previousPatientData.firstName,
            middleName: previousPatientData.middleName,
            lastName: previousPatientData.lastName,
            card_number: previousPatientData.card_number,
            gender: previousPatientData.gender,
            birth_date: previousPatientData.birth_date,
            has_phone: previousPatientData.has_phone,
            blood_type: previousPatientData.blood_type,
            nationality: previousPatientData.nationality,
            has_HIV: previousPatientData.has_HIV,
            phone: previousPatientData.phone,
            is_new: previousPatientData.is_new,
            manual_card_id: previousPatientData.manual_card_id,
            is_credit: previousPatientData.is_credit,
            address_id: previousPatientData.address_id,
            emergence_contact_id: previousPatientData.emergence_contact_id,
            company_id: previousPatientData.company_id,
            marital_status: previousPatientData.marital_status,
            occupation: previousPatientData.occupation,
            guardian_name: previousPatientData.guardian_name,
            guardian_relationship: previousPatientData.guardian_relationship,
            empoyeeId_url: previousPatientData.empoyeeId_url,
            patient_type: previousPatientData.patient_type,
            disability: previousPatientData.disability,
            status: previousPatientData.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (patient, options) => {
          await sequelize.models.patients_audit.create({
            patient_id: patient.id,
            firstName: patient.firstName,
            middleName: patient.middleName,
            lastName: patient.lastName,
            card_number: patient.card_number,
            gender: patient.gender,
            birth_date: patient.birth_date,
            has_phone: patient.has_phone,
            blood_type: patient.blood_type,
            nationality: patient.nationality,
            has_HIV: patient.has_HIV,
            phone: patient.phone,
            is_new: patient.is_new,
            manual_card_id: patient.manual_card_id,
            is_credit: patient.is_credit,
            address_id: patient.address_id,
            emergency_contact_id: patient.emergency_contact_id,
            company_id: patient.company_id,
            marital_status: patient.marital_status,
            occupation: patient.occupation,
            guardian_name: patient.guardian_name,
            guardian_relationship: patient.guardian_relationship,
            empoyeeId_url: patient.empoyeeId_url,
            patient_type: patient.patient_type,
            disability: patient.disability,
            status: patient.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );

  Patient.sync({ force: false, alter: false });
  return Patient;
};
// Patient.beforeCreate((patient, options) => {
//   console.log(options);
//   db.PatientAudit.create({
//     patient_id: patient.id,
//     firstName: patient.firstName,
//     middleName: patient.middleName,
//     lastName: patient.lastName,
//     card_number: patient.card_number,
//     gender: patient.gender,
//     birth_date: patient.birth_date,
//     has_phone: patient.has_phone,
//     blood_type: patient.blood_type,
//     nationality: patient.nationality,
//     has_HIV: patient.has_HIV,
//     phone: patient.phone,
//     is_new: patient.is_new,
//     manual_card_id: patient.manual_card_id,
//     is_credit: patient.is_credit,
//     address_id: patient.address_id,
//     emergency_contact_id: patient.emergency_contact_id,
//     company_id: patient.company_id,
//     marital_status: patient.marital_status,
//     occupation: patient.occupation,
//     guardian_name: patient.guardian_name,
//     guardian_relationship: patient.guardian_relationship,
//     empoyeeId_url: patient.empoyeeId_url,
//     patient_type: patient.patient_type,
//     disability: patient.disability,
//     status: patient.status,
//     operation_type: "I",
//     // change_status: "P",
//     changed_by: options.userId,
//     changed_at: Date.now(),
//   });
// });
// before update hook

// Patient.beforeUpdate(async (patient, options) => {

//   await db.PatientAudit.create({
//     patient_id: patient.id,
//     firstName: patient.firstName,
//     middleName: patient.middleName,
//     lastName: patient.lastName,
//     card_number: patient.card_number,
//     gender: patient.gender,
//     birth_date: patient.birth_date,
//     has_phone: patient.has_phone,
//     blood_type: patient.blood_type,
//     nationality: patient.nationality,
//     has_HIV: patient.has_HIV,
//     phone: patient.phone,
//     is_new: patient.is_new,
//     manual_card_id: patient.manual_card_id,
//     is_credit: patient.is_credit,
//     address_id: patient.address_id,
//     emergency_contact_id: patient.emergency_contact_id,
//     company_id: patient.company_id,
//     marital_status: patient.marital_status,
//     occupation: patient.occupation,
//     guardian_name: patient.guardian_name,
//     guardian_relationship: patient.guardian_relationship,
//     empoyeeId_url: patient.empoyeeId_url,
//     patient_type: patient.patient_type,
//     disability: patient.disability,
//     status: patient.status,
//     operation_type: "U",
//     // change_status: "P",
//     changed_by: options.userId.mjhv,
//     changed_at: Date.now(),
//   });
// });
