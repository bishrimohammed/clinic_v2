// module.exports = (sequelize, DataTypes) => {
//   const InvestigationOrderAudit = sequelize.define(
//     "investigation_orders_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       investigationOrder_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "investigationorders",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       medicalRecord_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       externalService_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "external_services",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       is_internal_service: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       // clinical_finding: DataTypes.STRING,
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
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
//       freezeTableName: true,
//     }
//   );
//   InvestigationOrderAudit.sync({ alter: false });
//   return InvestigationOrderAudit;
// };
