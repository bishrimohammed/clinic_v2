module.exports = (sequelize, DataTypes) => {
  const AddressAudit = sequelize.define(
    "address_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      address_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "addresses",
          key: "id",
        },
      },
      phone_1: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      phone_2: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        // unique: {
        //   args: true,
        //   msg: "Email is already taken",
        // },
        allowNull: true,
      },
      street: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      house_number: {
        type: DataTypes.STRING,
        allowNull: true,
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
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
      freezeTableName: true,
    }
  );
  AddressAudit.sync({ alter: false });
  return AddressAudit;
};
