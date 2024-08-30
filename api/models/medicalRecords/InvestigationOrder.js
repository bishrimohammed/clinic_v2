module.exports = (sequelize, DataTypes) => {
  const InvestigationOrder = sequelize.define(
    "investigationorder",
    {
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "medicalrecords",
          key: "id",
        },
        onDelete: "",
      },
      externalService_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
          model: "external_services",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      is_internal_service: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      // clinical_finding: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      paranoid: true,
      hooks: {
        afterCreate: async (investigationOrder, options) => {
          await sequelize.models.investigation_orders_audit.create({
            investigationOrder_id: investigationOrder.id,
            medicalRecord_id: investigationOrder.medicalRecord_id,
            externalService_id: investigationOrder.externalService_id,
            is_internal_service: investigationOrder.is_internal_service,
            // clinical_finding: investigationOrder.clinical_finding,
            status: investigationOrder.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (investigationOrder, options) => {
          const previousValue = investigationOrder._previousDataValues;
          await sequelize.models.investigation_orders_audit.create({
            investigationOrder_id: previousValue.id,
            medicalRecord_id: previousValue.medicalRecord_id,
            externalService_id: investigationOrder.externalService_id,
            is_internal_service: investigationOrder.is_internal_service,
            // clinical_finding: previousValue.clinical_finding,
            old_status: previousValue.status,
            new_status: investigationOrder.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeDestroy: async (investigationOrder, options) => {
          await sequelize.models.investigation_orders_audit.create({
            investigationOrder_id: investigationOrder.id,
            medicalRecord_id: investigationOrder.medicalRecord_id,
            externalService_id: investigationOrder.externalService_id,
            is_internal_service: investigationOrder.is_internal_service,
            // clinical_finding: investigationOrder.clinical_finding,
            status: investigationOrder.status,
            operation_type: "D",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  InvestigationOrder.sync({ force: false, alter: false });
  return InvestigationOrder;
};
