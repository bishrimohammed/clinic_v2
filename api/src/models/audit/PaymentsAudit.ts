// module.exports = (sequelize, DataTypes) => {
//   const PaymentAudit = sequelize.define(
//     "payments_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       payment_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "payments",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       payment_amount: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0,
//       },
//       payment_date: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: new Date(),
//       },
//       medical_billing_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       item_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       cashier_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       status: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Paid", "Unpaid", "Void"],
//         defaultValue: "Unpaid",
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
//   PaymentAudit.sync({ alter: false });
//   return PaymentAudit;
// };
