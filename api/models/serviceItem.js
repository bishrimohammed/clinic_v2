
module.exports = (sequelize, DataTypes) => {
  const ServiceItem = sequelize.define("serviceitem", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      valiate: {
        min: 0,
      },
    },
    serviceCategory_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //     model: ServiceCategory,
      //     key: "id",
      // },
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    isFixed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  });
  ServiceItem.sync({
    force: false,
    alter: false,
  });
  return ServiceItem;
};
