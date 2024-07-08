module.exports = (sequelize, DataTypes) => {
  const AllergyAudit = sequelize.define(
    "allergies_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      allergy_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "allergies",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      //Mild, Moderate, Severe
      allergy_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      severity: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: ["Mild", "Moderate", "Severe"],
      },
      reaction_details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
  AllergyAudit.sync({ alter: true });
  return AllergyAudit;
};
