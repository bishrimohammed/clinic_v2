module.exports = (sequilize, DataTypes) => {
  const Procedure = sequilize.define("procedure", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    externalService_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "external_services",
        key: "id",
      },
    },
    is_internal_service: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceItem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  });
  Procedure.sync({ alter: false, force: false });
  return Procedure;
};
