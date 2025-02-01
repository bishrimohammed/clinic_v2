// module.exports = (sequelize, DataTypes) => {
//   const ClinicProfileAudit = sequelize.define(
//     "clinic_profile_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       clinicProfile_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "clinicprofiles",
//           key: "id",
//         },
//       },
//       name: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: false,
//       },
//       logo: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       card_valid_date: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       website_url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         validate: {
//           isUrl: true,
//         },
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       brand_color: {
//         type: DataTypes.STRING,
//       },
//       motto: {
//         type: DataTypes.STRING,
//       },
//       number_of_branch: {
//         type: DataTypes.INTEGER,
//       },
//       branch_addresses: {
//         type: DataTypes.STRING,
//       },
//       clinic_type: DataTypes.STRING,
//       has_triage: DataTypes.BOOLEAN,
//       clinic_seal: {
//         type: DataTypes.STRING,
//         allowNull: true,
//         defaultValue: null,
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
//   ClinicProfileAudit.sync({ alter: false });
//   return ClinicProfileAudit;
// };
