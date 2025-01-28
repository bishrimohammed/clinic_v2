// module.exports = (sequelize, DataTypes) => {
//   const PastMedicalHistoryAudit = sequelize.define(
//     "past_medical_history_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       pastMedicalHistory_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "past_medical_histories",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       medical_condition: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       treatment: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
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
//   PastMedicalHistoryAudit.sync({ alter: false });
//   return PastMedicalHistoryAudit;
// };
