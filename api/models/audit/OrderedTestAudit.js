module.exports = (sequelize, DataTypes) => {
  const OrderedTestAudit = sequelize.define(
    "ordered_tests_audit",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      orderedTest_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "orderedtests",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      investigationOrder_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        //   references: {
        //     model: db.InvestigationOrder,
        //     key: "id",
        //   },
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
  OrderedTestAudit.sync({ alter: false });
  return OrderedTestAudit;
};
