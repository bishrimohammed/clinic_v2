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
      doctor_titer: {
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
      hooks: {
        afterCreate: async (employee, options) => {
          await sequelize.models.employees_audit.create({
            employee_id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName,
            gender: employee.gender,
            date_of_birth: employee.date_of_birth,
            date_of_hire: employee.date_of_hire,
            position: employee.position,
            other_position: employee.other_position,
            photo: employee.photo,
            address_id: employee.address_id,
            emergence_contact_id: employee.emergence_contact_id,
            has_digital_signature: employee.has_digital_signature,
            digital_signature: employee.digital_signature,
            status: employee.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (employee, options) => {
          const previousValue = employee._previousDataValues;
          console.log(previousValue);
          await sequelize.models.employees_audit.create({
            employee_id: previousValue.id,
            firstName: previousValue.firstName,
            lastName: previousValue.lastName,
            middleName: previousValue.middleName,
            gender: previousValue.gender,
            date_of_birth: previousValue.date_of_birth,
            date_of_hire: previousValue.date_of_hire,
            position: previousValue.position,
            other_position: previousValue.other_position,
            photo: previousValue.photo,
            address_id: previousValue.address_id,
            emergence_contact_id: previousValue.emergence_contact_id,
            has_digital_signature: previousValue.has_digital_signature,
            digital_signature: previousValue.digital_signature,
            status: previousValue.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (employee, options) => {
          await sequelize.models.employees_audit.create({
            employee_id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            middleName: employee.middleName,
            gender: employee.gender,
            date_of_birth: employee.date_of_birth,
            date_of_hire: employee.date_of_hire,
            position: employee.position,
            other_position: employee.other_position,
            photo: employee.photo,
            address_id: employee.address_id,
            emergence_contact_id: employee.emergence_contact_id,
            has_digital_signature: employee.has_digital_signature,
            digital_signature: employee.digital_signature,
            status: employee.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Employee.sync({ alter: true, force: false });
  return Employee;
};
