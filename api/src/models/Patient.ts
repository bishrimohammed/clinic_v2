// const { Op } = require("sequelize");
// const db = require(".");
// // const PatientAudit = db.PatientAudit;
// module.exports = (sequelize, DataTypes) => {
//   const Patient = sequelize.define(
//     "patient",
//     {
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       middleName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       card_number: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         // unique: true,
//       },
//       gender: {
//         type: DataTypes.ENUM,
//         // allowNull: false,
//         values: ["Male", "Female"],
//       },
//       birth_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       has_phone: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//       blood_type: {
//         type: DataTypes.ENUM,
//         allowNull: true,
//         values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
//       },
//       nationality: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       has_HIV: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         validate: {
//           async checkPhone(value) {
//             if (value) {
//               const patient = await Patient.findOne({
//                 where: {
//                   id: { [Op.ne]: this.id },
//                   phone: this.phone,
//                   has_phone: true,
//                 },
//               });
//               if (patient) {
//                 throw new Error("Phone number already");
//               }
//             }
//           },
//         },
//       },
//       is_new: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       manual_card_id: {
//         type: DataTypes.STRING,
//         allowNull: function () {
//           const is_new = this.getDataValue("is_new");
//           return !is_new;
//         },
//         // manual_card_id is required when patient is not new
//         validate: {
//           is_new: function (value) {
//             const is_new = this.getDataValue("is_new");

//             if (!is_new && !value) {
//               throw new Error(
//                 "manual_card_id is required when patient is not new"
//               );
//             }
//           },
//         },
//       },
//       is_credit: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       emergence_contact_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       company_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "creditcompanyprofiles",
//           key: "id",
//         },
//       },
//       marital_status: {
//         type: DataTypes.STRING,
//         // values: ['Single', 'Married', 'Divorced', 'Widowed'],
//         allowNull: true,
//       },
//       occupation: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       guardian_name: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       guardian_relationship: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },

//       empoyeeId_url: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       patient_type: {
//         type: DataTypes.ENUM,
//         values: ["inpatient", "outpatient"],
//         allowNull: true,
//         defaultValue: "outpatient",
//       },
//       // Mobility Impairment, Hearing Impairment, Visual Impairment, Speech Impairment
//       disability: {
//         type: DataTypes.ENUM,
//         values: ["None", "Mobility", "Hearing", "Visual", "Speech"],
//         defaultValue: "None",
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//     },
//     {
//       hooks: {
//         afterCreate: async (patient, options) => {
//           console.log("\n\nf\n");
//           // console.log(sequelize.models.patients_audit);
//           // console.log(patient);
//           // console.log("\n\nf\n\n");
//           await sequelize.models.patients_audit.create({
//             patient_id: patient.id,
//             firstName: patient.firstName,
//             middleName: patient.middleName,
//             lastName: patient.lastName,
//             card_number: patient.card_number,
//             gender: patient.gender,
//             birth_date: patient.birth_date,
//             has_phone: patient.has_phone,
//             blood_type: patient.blood_type,
//             nationality: patient.nationality,
//             has_HIV: patient.has_HIV,
//             phone: patient.phone,
//             is_new: patient.is_new,
//             manual_card_id: patient.manual_card_id,
//             is_credit: patient.is_credit,
//             address_id: patient.address_id,
//             emergence_contact_id: patient.emergence_contact_id,
//             company_id: patient.company_id,
//             marital_status: patient.marital_status,
//             occupation: patient.occupation,
//             guardian_name: patient.guardian_name,
//             guardian_relationship: patient.guardian_relationship,
//             empoyeeId_url: patient.empoyeeId_url,
//             patient_type: patient.patient_type,
//             disability: patient.disability,
//             status: patient.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },

//         beforeUpdate: async (patient, options) => {
//           console.log("\n\nf\n");
//           // console.log(sequelize.models.patients_audit);
//           console.log(patient._previousDataValues);
//           console.log("\n\nf\n\n");
//           const previousPatientData = patient._previousDataValues;
//           await sequelize.models.patients_audit.create({
//             patient_id: previousPatientData.id,
//             firstName: previousPatientData.firstName,
//             middleName: previousPatientData.middleName,
//             lastName: previousPatientData.lastName,
//             card_number: previousPatientData.card_number,
//             gender: previousPatientData.gender,
//             birth_date: previousPatientData.birth_date,
//             has_phone: previousPatientData.has_phone,
//             blood_type: previousPatientData.blood_type,
//             nationality: previousPatientData.nationality,
//             has_HIV: previousPatientData.has_HIV,
//             phone: previousPatientData.phone,
//             is_new: previousPatientData.is_new,
//             manual_card_id: previousPatientData.manual_card_id,
//             is_credit: previousPatientData.is_credit,
//             address_id: previousPatientData.address_id,
//             emergence_contact_id: previousPatientData.emergence_contact_id,
//             company_id: previousPatientData.company_id,
//             marital_status: previousPatientData.marital_status,
//             occupation: previousPatientData.occupation,
//             guardian_name: previousPatientData.guardian_name,
//             guardian_relationship: previousPatientData.guardian_relationship,
//             empoyeeId_url: previousPatientData.empoyeeId_url,
//             patient_type: previousPatientData.patient_type,
//             disability: previousPatientData.disability,
//             status: previousPatientData.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (patient, options) => {
//           await sequelize.models.patients_audit.create({
//             patient_id: patient.id,
//             firstName: patient.firstName,
//             middleName: patient.middleName,
//             lastName: patient.lastName,
//             card_number: patient.card_number,
//             gender: patient.gender,
//             birth_date: patient.birth_date,
//             has_phone: patient.has_phone,
//             blood_type: patient.blood_type,
//             nationality: patient.nationality,
//             has_HIV: patient.has_HIV,
//             phone: patient.phone,
//             is_new: patient.is_new,
//             manual_card_id: patient.manual_card_id,
//             is_credit: patient.is_credit,
//             address_id: patient.address_id,
//             emergency_contact_id: patient.emergency_contact_id,
//             company_id: patient.company_id,
//             marital_status: patient.marital_status,
//             occupation: patient.occupation,
//             guardian_name: patient.guardian_name,
//             guardian_relationship: patient.guardian_relationship,
//             empoyeeId_url: patient.empoyeeId_url,
//             patient_type: patient.patient_type,
//             disability: patient.disability,
//             status: patient.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );

//   Patient.sync({ force: false, alter: false });
//   return Patient;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  HasManyGetAssociationsMixin,
  HasManyCreateAssociationMixin,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path
import Allergy from "./patient/Allergy";
import FamilyHistory from "./patient/FamilyHistory";
import SocialHistory from "./patient/SocialHistory";
import PastMedicalHistory from "./patient/PastMedicalHistory";

class Patient extends Model<
  InferAttributes<Patient>,
  InferCreationAttributes<Patient>
> {
  declare id: CreationOptional<number>;
  declare firstName: string;
  declare middleName: string;
  declare lastName?: string | null;
  declare card_number?: string | null;
  declare gender?: "Male" | "Female"; // Specify enum type
  declare birth_date: Date;
  declare has_phone?: boolean;
  declare blood_type?:
    | "A+"
    | "A-"
    | "B+"
    | "B-"
    | "AB+"
    | "AB-"
    | "O+"
    | "O-"
    | null;
  declare nationality?: string | null;
  declare has_HIV?: boolean;
  declare phone?: string | null;
  declare is_new: boolean;
  declare manual_card_id?: string | null;
  declare is_credit: boolean;
  declare address_id: number;
  declare emergence_contact_id: number;
  declare company_id?: number | null;
  declare marital_status?: string | null;
  declare occupation?: string | null;
  declare guardian_name?: string | null;
  declare guardian_relationship?: string | null;
  declare empoyeeId_url?: string | null;
  declare patient_type?: "inpatient" | "outpatient"; // Specify enum type
  declare disability?: "None" | "Mobility" | "Hearing" | "Visual" | "Speech";
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  declare getAllergies: HasManyGetAssociationsMixin<Allergy>;
  declare getFamilyHistories: HasManyGetAssociationsMixin<FamilyHistory>;
  declare getSocialHistories: HasManyGetAssociationsMixin<SocialHistory>;
  declare getPastMedicalHistories: HasManyGetAssociationsMixin<PastMedicalHistory>;

  declare createAllergy: HasManyCreateAssociationMixin<Allergy, "patient_id">;
  declare createSocialHistory: HasManyCreateAssociationMixin<
    SocialHistory,
    "patient_id"
  >;
  declare createFamilyHistory: HasManyCreateAssociationMixin<
    FamilyHistory,
    "patient_id"
  >;
  declare createPastMedicalHistory: HasManyCreateAssociationMixin<
    PastMedicalHistory,
    "patient_id"
  >;

  getFullName() {
    return `${this.firstName} ${this.middleName} ${this.lastName}`;
  }
}

Patient.init(
  {
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
      unique: {
        msg: "Patient Id is taken",
        name: "card_number",
      }, // Uncomment if unique constraint is needed
    },
    gender: {
      type: DataTypes.ENUM("Male", "Female"),
      allowNull: true,
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
      type: DataTypes.ENUM("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"),
      allowNull: true,
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
      // validate: {
      //   async checkPhone(value: string) {
      //     if (value) {
      //       const patient = await Patient.findOne({
      //         where: {
      //           id: { [Op.ne]: this.id },
      //           phone: value,
      //           has_phone: true,
      //         },
      //       });
      //       if (patient) {
      //         throw new Error("Phone number already exists");
      //       }
      //     }
      //   },
      // },
    },
    is_new: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    manual_card_id: {
      type: DataTypes.STRING,
      allowNull: true,
      // function () {
      //   const is_new = this.getDataValue("is_new");
      //   return !is_new;
      // },
      // validate: {
      //   is_new(value: string) {
      //     const is_new = this.getDataValue("is_new");
      //     if (!is_new && !value) {
      //       throw new Error("manual_card_id is required when patient is not new");
      //     }
      //   },
      // },
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
      references: {
        model: "creditcompanyprofiles",
        key: "id",
      },
    },
    marital_status: {
      type: DataTypes.STRING,
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
      type: DataTypes.ENUM("inpatient", "outpatient"),
      allowNull: true,
      defaultValue: "outpatient",
    },
    disability: {
      type: DataTypes.ENUM("None", "Mobility", "Hearing", "Visual", "Speech"),
      defaultValue: "None",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "patient",
    tableName: "patients",
    timestamps: true,
    // hooks: {
    //   afterCreate: async (patient, options) => {
    //     await sequelize.models.patients_audit.create({
    //       patient_id: patient.id,
    //       firstName: patient.firstName,
    //       middleName: patient.middleName,
    //       lastName: patient.lastName,
    //       card_number: patient.card_number,
    //       gender: patient.gender,
    //       birth_date: patient.birth_date,
    //       has_phone: patient.has_phone,
    //       blood_type: patient.blood_type,
    //       nationality: patient.nationality,
    //       has_HIV: patient.has_HIV,
    //       phone: patient.phone,
    //       is_new: patient.is_new,
    //       manual_card_id: patient.manual_card_id,
    //       is_credit: patient.is_credit,
    //       address_id: patient.address_id,
    //       emergence_contact_id: patient.emergence_contact_id,
    //       company_id: patient.company_id,
    //       marital_status: patient.marital_status,
    //       occupation: patient.occupation,
    //       guardian_name: patient.guardian_name,
    //       guardian_relationship: patient.guardian_relationship,
    //       empoyeeId_url: patient.empoyeeId_url,
    //       patient_type: patient.patient_type,
    //       disability: patient.disability,
    //       status: patient.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (patient, options) => {
    //     const previousPatientData = patient._previousDataValues;
    //     await sequelize.models.patients_audit.create({
    //       patient_id: previousPatientData.id,
    //       firstName: previousPatientData.firstName,
    //       middleName: previousPatientData.middleName,
    //       lastName: previousPatientData.lastName,
    //       card_number: previousPatientData.card_number,
    //       gender: previousPatientData.gender,
    //       birth_date: previousPatientData.birth_date,
    //       has_phone: previousPatientData.has_phone,
    //       blood_type: previousPatientData.blood_type,
    //       nationality: previousPatientData.nationality,
    //       has_HIV: previousPatientData.has_HIV,
    //       phone: previousPatientData.phone,
    //       is_new: previousPatientData.is_new,
    //       manual_card_id: previousPatientData.manual_card_id,
    //       is_credit: previousPatientData.is_credit,
    //       address_id: previousPatientData.address_id,
    //       emergence_contact_id: previousPatientData.emergence_contact_id,
    //       company_id: previousPatientData.company_id,
    //       marital_status: previousPatientData.marital_status,
    //       occupation: previousPatientData.occupation,
    //       guardian_name: previousPatientData.guardian_name,
    //       guardian_relationship: previousPatientData.guardian_relationship,
    //       empoyeeId_url: previousPatientData.empoyeeId_url,
    //       patient_type: previousPatientData.patient_type,
    //       disability: previousPatientData.disability,
    //       status: previousPatientData.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (patient, options) => {
    //     await sequelize.models.patients_audit.create({
    //       patient_id: patient.id,
    //       firstName: patient.firstName,
    //       middleName: patient.middleName,
    //       lastName: patient.lastName,
    //       card_number: patient.card_number,
    //       gender: patient.gender,
    //       birth_date: patient.birth_date,
    //       has_phone: patient.has_phone,
    //       blood_type: patient.blood_type,
    //       nationality: patient.nationality,
    //       has_HIV: patient.has_HIV,
    //       phone: patient.phone,
    //       is_new: patient.is_new,
    //       manual_card_id: patient.manual_card_id,
    //       is_credit: patient.is_credit,
    //       address_id: patient.address_id,
    //       emergence_contact_id: patient.emergence_contact_id,
    //       company_id: patient.company_id,
    //       marital_status: patient.marital_status,
    //       occupation: patient.occupation,
    //       guardian_name: patient.guardian_name,
    //       guardian_relationship: patient.guardian_relationship,
    //       empoyeeId_url: patient.empoyeeId_url,
    //       patient_type: patient.patient_type,
    //       disability: patient.disability,
    //       status: patient.status,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Patient.sync({ force: false, alter: false });
Patient.hasMany(Allergy, {
  foreignKey: "patient_id",
  as: "allergies",
});

Patient.hasMany(FamilyHistory, {
  foreignKey: "patient_id",
  as: "familyHistories",
});
Patient.hasMany(SocialHistory, {
  foreignKey: "patient_id",
  as: "socialHistories",
});

Patient.hasMany(PastMedicalHistory, {
  foreignKey: "patient_id",
  as: "pastMedicalHistories",
});

export default Patient;
