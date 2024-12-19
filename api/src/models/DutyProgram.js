module.exports = (sequelize, DataTypes) => {
  const DutyProgram = sequelize.define(
    "dutyprogram",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      weekStartDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      weekEndDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      duty_week: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: "duty week must be greater than 0",
          },
          max: {
            args: 52,
            msg: "duty week must be less than 52",
          },
        },
      },
      year: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 2024,
            msg: "year must be greater than 2024",
          },
        },
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      indexes: [
        {
          unique: true,
          fields: ["duty_week", "year"],
          name: "unique_duty_week_year",
        },
      ],
    }
  );
  DutyProgram.sync({ alter: false, force: false });

  return DutyProgram;
};
