const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const InvestigationOrder = sequelize.define(
    "investigationorder",
    {
      medicalRecord_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // clinical_finding: DataTypes.STRING,
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
    },
    {
      hooks: {
        afterCreate: async (investigationOrder, options) => {
          await sequelize.models.investigation_orders_audit.create({
            investigationOrder_id: investigationOrder.id,
            medicalRecord_id: investigationOrder.medicalRecord_id,
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
  InvestigationOrder.sync({ force: false, alter: true });
  return InvestigationOrder;
};
