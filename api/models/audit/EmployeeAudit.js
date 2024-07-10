module.exports = (sequelize, DataTypes) => {
  const EmployeeAudit = sequelize.define(
    "employees_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "employees",
          key: "id",
        },
        onDelete: "CASCADE",
      },
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
      operation_type: {
        type: DataTypes.ENUM,
        values: ["I", "U", "D"],
      },
      change_status: {
        type: DataTypes.ENUM,
        values: ["P", "A", "R"],
        allowNull: true,
      },
      changed_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      changed_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      approved_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      approved_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  EmployeeAudit.sync({ alter: false });
  return EmployeeAudit;
};
