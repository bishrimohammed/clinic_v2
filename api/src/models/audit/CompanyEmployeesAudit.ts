// module.exports = (sequelize, DataTypes) => {
//   const CompanyEmployeesAudit = sequelize.define(
//     "company_employees_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       companyEmployee_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "companyemployees",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       middleName: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       // emp_no: {
//       //   type: DataTypes.STRING,
//       //   allowNull: true,
//       // },
//       empl_id: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       gender: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: ["Male", "Female"],
//       },
//       date_of_birth: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       date_of_hire: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       position: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         // values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
//       },

//       photo_url: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       address_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },

//       company_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
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
//       freezeTableName: true,
//     }
//   );
//   CompanyEmployeesAudit.sync({ alter: false });
//   return CompanyEmployeesAudit;
// };
