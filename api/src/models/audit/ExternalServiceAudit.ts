// module.exports = (sequelize, DataTypes) => {
//   const ExternalServiceAudit = sequelize.define(
//     "external_service_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       externalService_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       patient_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       examiner: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       service_type: {
//         type: DataTypes.ENUM,
//         values: ["procedure", "lab"],
//         allowNull: false,
//       },
//       reason: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       service_time: {
//         type: DataTypes.DATE,
//         allowNull: false,
//       },
//       orderd_by: {
//         type: DataTypes.STRING,
//         allowNull: true,
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
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//     },
//     {
//       timestamps: false,
//     }
//   );
//   ExternalServiceAudit.sync({ alter: false, force: false });
//   return ExternalServiceAudit;
// };
