// module.exports = (sequelize, DataTypes) => {
//   const PatientAudit = sequelize.define(
//     "patients_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
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
//       },
//       is_new: {
//         type: DataTypes.BOOLEAN,
//         allowNull: false,
//       },
//       manual_card_id: {
//         type: DataTypes.STRING,
//         allowNull: true,
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
//       operation_type: {
//         type: DataTypes.ENUM,
//         values: ["I", "U", "D"],
//       },
//       change_status: {
//         type: DataTypes.ENUM,
//         values: ["P", "A", "R"],
//         allowNull: true,
//       },
//       changed_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       changed_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },
//       approved_by: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       approved_at: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       comment: {
//         type: DataTypes.TEXT,
//         allowNull: true,
//       },
//     },
//     {
//       timestamps: false,

//       freezeTableName: true,
//     }
//   );
//   PatientAudit.sync({ alter: false });
//   return PatientAudit;
// };
