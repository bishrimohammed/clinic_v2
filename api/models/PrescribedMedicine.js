module.exports = (sequelize, DataTypes) => {
  const PrescribedMedicine = sequelize.define(
    "prescribed_medicine",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      prescription_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "prescriptions",
          key: "id",
        },

        onDelete: "CASCADE",
      },
      medicine_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      doctor_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_internal: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      dosage: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      frequency: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      drug_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      start_date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      route: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      when: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_excuted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },
      excuted_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      excutedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      hooks: {
        afterCreate: async (prescribedMedicine, options) => {
          await sequelize.models.prescribed_medicines_audit.create({
            prescribedMedicine_id: prescribedMedicine.id,
            prescription_id: prescribedMedicine.prescription_id,
            medicine_id: prescribedMedicine.medicine_id,
            doctor_id: prescribedMedicine.doctor_id,
            quantity: prescribedMedicine.quantity,
            is_internal: prescribedMedicine.is_internal,
            dosage: prescribedMedicine.dosage,
            frequency: prescribedMedicine.frequency,
            duration: prescribedMedicine.duration,
            drug_name: prescribedMedicine.drug_name,
            start_date: prescribedMedicine.start_date,
            route: prescribedMedicine.route,
            when: prescribedMedicine.when,
            is_excuted: prescribedMedicine.is_excuted,
            excutedBy: prescribedMedicine.excuted_by,
            excutedAt: prescribedMedicine.excutedAt,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (prescribedMedicine, options) => {
          const previousValue = prescribedMedicine._previousDataValues;
          await sequelize.models.prescribed_medicines_audit.create({
            prescribedMedicine_id: previousValue.id,
            prescription_id: previousValue.prescription_id,
            medicine_id: previousValue.medicine_id,
            doctor_id: previousValue.doctor_id,
            quantity: previousValue.quantity,
            is_internal: previousValue.is_internal,
            dosage: previousValue.dosage,
            frequency: previousValue.frequency,
            duration: previousValue.duration,
            drug_name: previousValue.drug_name,
            start_date: previousValue.start_date,
            route: previousValue.route,
            when: previousValue.when,
            is_excuted: previousValue.is_excuted,
            excutedBy: previousValue.excuted_by,
            excutedAt: previousValue.excutedAt,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        afterDestroy: async (prescribedMedicine, options) => {},
      },
    }
  );
  PrescribedMedicine.sync({ alter: false, force: false });
  return PrescribedMedicine;
};
