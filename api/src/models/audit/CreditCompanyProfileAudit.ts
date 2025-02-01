// module.exports = (sequelize, DataTypes) => {
//   const CreditCompanyProfileAudit = sequelize.define(
//     "credit_company_profile_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       creditCompanyProfile_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "creditcompanyprofiles",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       tin: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       representative_name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       representative_phone: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       phone: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
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
//   CreditCompanyProfileAudit.sync({ alter: false });
//   return CreditCompanyProfileAudit;
// };
