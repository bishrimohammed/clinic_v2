module.exports = (sequelize, DataTypes) => {
  const Medicine = sequelize.define("medicine", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    service_item_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    formulation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    in_stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  Medicine.sync({ alter: false });
  return Medicine;
};
