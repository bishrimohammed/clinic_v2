const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define(
    "address",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      woreda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      phone_1: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Phone number is taken",
        },
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
    },
    {
      hooks: {
        afterCreate: async (address, options) => {
          await sequelize.models.address_audit.create({
            address_id: address.id,
            woreda_id: address.woreda_id,
            phone_1: address.phone_1,
            phone_2: address.phone_2,
            email: address.email,
            street: address.street,
            house_number: address.house_number,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (address, options) => {
          const previousAddress = address._previousDataValues;
          console.log("\n\nm");
          console.log(previousAddress);

          console.log("\n\n\nk");
          await sequelize.models.address_audit.create({
            address_id: previousAddress.id,
            woreda_id: previousAddress.woreda_id,
            phone_1: previousAddress.phone_1,
            phone_2: previousAddress.phone_2,
            email: previousAddress.email,
            street: previousAddress.street,
            house_number: previousAddress.house_number,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (address, options) => {
          await sequelize.models.address_audit.create({
            address_id: address.id,
            woreda_id: address.woreda_id,
            phone_1: address.phone_1,
            phone_2: address.phone_2,
            email: address.email,
            street: address.street,
            house_number: address.house_number,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  Address.sync({ force: false, alter: false });
  return Address;
};
