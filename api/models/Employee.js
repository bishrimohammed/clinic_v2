module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "employee",
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      middleName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      gender: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Male", "Female"],
      },
      date_of_birth: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      date_of_hire: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      position: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Doctor", "Nurse", "Laboratorian", "Cashier", "Other"],
      },
      other_position: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      photo: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      emergence_contact_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      has_digital_signature: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      digital_signature: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      paranoid: true,
    }
  );
  Employee.sync({ alter: true, force: false });
  return Employee;
};
