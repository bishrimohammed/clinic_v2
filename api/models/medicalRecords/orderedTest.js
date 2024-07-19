// const db = require("..");
// const { sequelize } = require("..");

module.exports = (sequelize, DataTypes) => {
  const OrderedTest = sequelize.define(
    "orderedtest",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      investigationOrder_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "investigationorders",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      serviceItem_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //   references: {
        //     model: db.ServiceItem,
        //     key: "id",
        //   },
      },
      order_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
      report_time: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      result: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      requested_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      reported_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      is_underpanel: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM,
        allowNull: true,
        defaultValue: "pending",
        values: ["pending", "completed"],
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
        afterCreate: async (orderedTest, options) => {
          await sequelize.models.ordered_tests_audit.create({
            orderedTest_id: orderedTest.id,
            investigationOrder_id: orderedTest.investigationOrder_id,
            serviceItem_id: orderedTest.serviceItem_id,
            order_time: orderedTest.order_time,
            report_time: orderedTest.report_time,
            result: orderedTest.result,
            comment: orderedTest.comment,
            requested_by: orderedTest.requested_by,
            reported_by: orderedTest.reported_by,
            is_underpanel: orderedTest.is_underpanel,
            status: orderedTest.status,
            operation_type: "I",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
        beforeUpdate: async (orderedTest, options) => {
          const previousOrderedTest = orderedTest._previousDataValues;
          await sequelize.models.ordered_tests_audit.create({
            orderedTest_id: previousOrderedTest.id,
            investigationOrder_id: previousOrderedTest.investigationOrder_id,
            serviceItem_id: previousOrderedTest.serviceItem_id,
            order_time: previousOrderedTest.order_time,
            report_time: previousOrderedTest.report_time,
            result: previousOrderedTest.result,
            comment: previousOrderedTest.comment,
            requested_by: previousOrderedTest.requested_by,
            reported_by: previousOrderedTest.reported_by,
            is_underpanel: previousOrderedTest.is_underpanel,
            status: previousOrderedTest.status,
            operation_type: "U",
            changed_by: options.userId,
            changed_at: Date.now(),
          });
        },
      },
    }
  );
  OrderedTest.sync({ force: false, alter: false });
  return OrderedTest;
};
