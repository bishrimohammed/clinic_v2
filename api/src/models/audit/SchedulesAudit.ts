// module.exports = (sequelize, DataTypes) => {
//   const ScheduleAudit = sequelize.define(
//     "schedules_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       schedule_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       clinic_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "clinicprofiles",
//           key: "id",
//         },
//       },
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "users",
//           key: "id",
//         },
//       },
//       day_of_week: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ],
//       },
//       start_time: {
//         type: DataTypes.TIME,
//         allowNull: false,
//       },
//       end_time: {
//         type: DataTypes.TIME,
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
//   ScheduleAudit.sync({ alter: false });
//   return ScheduleAudit;
// };
