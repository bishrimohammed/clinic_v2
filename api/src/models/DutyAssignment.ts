// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const DutyAssignment = sequelize.define("dutyassignment", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     dutyprogram_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     employee_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     duty_date: {
//       type: DataTypes.DATEONLY,
//       allowNull: false,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       allowNull: true,
//       defaultValue: true,
//     },
//   });

//   DutyAssignment.sync({ alter: false, force: false });
//   return DutyAssignment;
// };
