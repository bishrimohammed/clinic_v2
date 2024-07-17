module.exports = (sequelize, DataTypes) => {
  const VitalResult = sequelize.define(
    "vital_result",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      vital_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      vitalSignField_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      paranoid: true,

      freezeTableName: true,
      timestamps: false,
      tableName: "vital_result",
    }
  );
  VitalResult.sync({ alter: false, force: false });
  return VitalResult;
};
