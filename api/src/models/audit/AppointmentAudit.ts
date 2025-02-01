// module.exports = (sequelize, DataTypes) => {
//   const AppointmentAudit = sequelize.define(
//     "appointments_audit",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       appointment_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       patient_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "patients",
//           key: "id",
//         },
//       },
//       patient_name: DataTypes.STRING,
//       doctor_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "users",
//           key: "id",
//         },
//       },
//       appointment_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: true,
//       },
//       appointment_time: {
//         type: DataTypes.TIME,
//         allowNull: true,
//       },
//       reason: DataTypes.STRING,
//       appointment_type: DataTypes.STRING,
//       status: {
//         type: DataTypes.ENUM,
//         allowNull: true,
//         values: ["upcoming", "overdue", "cancelled"],
//         defaultValue: "upcoming",
//       },
//       metaData: {
//         type: DataTypes.JSON,
//         allowNull: true,
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
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
//   AppointmentAudit.sync({ alter: false });
//   return AppointmentAudit;
// };
