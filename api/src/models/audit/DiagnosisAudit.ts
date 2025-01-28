// module.exports = (sequelize, DataTypes) => {
//   const DiagnosisAudit = sequelize.define(
//     "diagnoses_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       diagnosis_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "diagnoses",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       medical_record_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       diagnosis: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       sick_leave_note_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.ENUM,
//         values: ["Suspected", "Confirmed", "Ruled out"],
//         defaultValue: "Suspected",
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
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     },
//     {
//       timestamps: false,
//       freezeTableName: true,
//     }
//   );
//   DiagnosisAudit.sync({ alter: false });
//   return DiagnosisAudit;
// };
