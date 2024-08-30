module.exports = (sequelize, DataTypes) => {
  const MedicalRecordDocument = sequelize.define(
    "medical_record_document",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      medical_record_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      document_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      document_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },

      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      //   freezeTableName: true,
      timestamps: false,
    }
  );
  MedicalRecordDocument.sync({ alter: true });
  return MedicalRecordDocument;
};
