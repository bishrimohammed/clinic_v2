module.exports = (sequelize, DataTypes) => {
  const ExternalService = sequelize.define(
    "external_service",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      patient_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      examiner: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "users",
          key: "id",
        },
      },
      service_type: {
        type: DataTypes.ENUM,
        values: ["procedure", "lab"],
        allowNull: false,
      },
      reason: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      service_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      orderd_by: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      //   deletedAt: {
      //     type: DataTypes.DATE,
      //     allowNull: true,
      //     defaultValue: null,
      //   },
    },
    {
      timestamps: false,
      hooks: {
        afterCreate: async (externalService, options) => {
          await sequelize.models.external_service_audit.create({
            externalService_id: externalService.id,
            patient_name: externalService.patient_name,
            examiner: externalService.examiner,
            service_type: externalService.service_type,
            reason: externalService.reason,
            service_time: externalService.service_time,
            orderd_by: externalService.orderd_by,
            status: externalService.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (externalService, options) => {
          const previousExternalService = externalService._previousDataValues;
          await sequelize.models.external_service_audit.create({
            externalService_id: previousExternalService.id,
            patient_name: previousExternalService.patient_name,
            examiner: previousExternalService.examiner,
            service_type: previousExternalService.service_type,
            reason: previousExternalService.reason,
            service_time: previousExternalService.service_time,
            orderd_by: previousExternalService.orderd_by,
            status: previousExternalService.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );

  ExternalService.sync({ alter: false, force: false });
  return ExternalService;
};
