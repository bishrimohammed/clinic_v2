module.exports = (sequelize, DataTypes) => {
  const PatientVisitAudit = sequelize.define(
    "patientvisits_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patient_visit_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patientassignments",
          key: "id",
        },
      },
      patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "patients",
          key: "id",
        },
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "medicalrecords",
          key: "id",
        },
      },
      visitType_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      assignment_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        // defaultValue: new Date(),
      },
      visit_time: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      visit_type: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_referred: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      symptom_notes: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      mode_of_arrival: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stage: {
        type: DataTypes.ENUM,
        allowNull: true,
        values: [
          "Waiting for service fee",
          "Waiting for triage",
          "Waiting for examiner",
          "Performing triage",
          "Admitted",
          "Performing consultation",
          "Waiting for payment",
          "Waiting for lab",
          "Waiting for doctor",
          "Done",
        ],
      },
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
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
  PatientVisitAudit.sync({ alter: false, force: false });
  return PatientVisitAudit;
};
