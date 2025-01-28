// module.exports = (sequelize, DataTypes) => {
//   const CreditAgreementAudit = sequelize.define(
//     "credit_agreements_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       creditAgreement_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "creditagreements",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       company_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       agreement_doc: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       start_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       end_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       max_limit: {
//         type: DataTypes.DOUBLE,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         // allowNull:false,
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
//   CreditAgreementAudit.sync({ alter: false });
//   return CreditAgreementAudit;
// };
