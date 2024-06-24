module.exports = (sequelize, DataTypes) => {
  const TemporaryLabInvestigation = sequelize.define(
    "temporary_ordered_lab_investigation",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      investigationOrder_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      data: {
        type: DataTypes.JSON,
        allowNull: false,
      },

      progress_note_id: { type: DataTypes.INTEGER, allowNull: true },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      //   is_underpanel: {
      //     type: DataTypes.BOOLEAN,
      //     allowNull: true,
      //     defaultValue: false,
      //   },
    }
  );
  TemporaryLabInvestigation.sync({ alter: false });
  return TemporaryLabInvestigation;
};
