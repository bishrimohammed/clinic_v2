// const db = require("..");
// const { sequelize } = require("..");

// module.exports = (sequelize, DataTypes) => {
//   const OrderedTest = sequelize.define(
//     "orderedtest",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       investigationOrder_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "investigationorders",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       serviceItem_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         // references: {
//         //   model: "serviceitems",
//         //   key: "id",
//         // },
//         // onDelete: "SET NULL",
//       },
//       order_time: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: new Date(),
//       },
//       report_time: {
//         type: DataTypes.DATE,
//         allowNull: true,
//       },
//       result: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       comment: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       requested_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       reported_by: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//       },
//       is_underpanel: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: false,
//       },
//       status: {
//         type: DataTypes.ENUM,
//         allowNull: true,
//         defaultValue: "pending",
//         values: ["pending", "completed"],
//       },
//       deletedAt: {
//         type: DataTypes.DATE,
//         allowNull: true,
//         defaultValue: null,
//       },
//     },
//     {
//       paranoid: true,
//       hooks: {
//         afterCreate: async (orderedTest, options) => {
//           await sequelize.models.ordered_tests_audit.create({
//             orderedTest_id: orderedTest.id,
//             investigationOrder_id: orderedTest.investigationOrder_id,
//             serviceItem_id: orderedTest.serviceItem_id,
//             order_time: orderedTest.order_time,
//             report_time: orderedTest.report_time,
//             result: orderedTest.result,
//             comment: orderedTest.comment,
//             requested_by: orderedTest.requested_by,
//             reported_by: orderedTest.reported_by,
//             is_underpanel: orderedTest.is_underpanel,
//             status: orderedTest.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (orderedTest, options) => {
//           const previousOrderedTest = orderedTest._previousDataValues;
//           await sequelize.models.ordered_tests_audit.create({
//             orderedTest_id: previousOrderedTest.id,
//             investigationOrder_id: previousOrderedTest.investigationOrder_id,
//             serviceItem_id: previousOrderedTest.serviceItem_id,
//             order_time: previousOrderedTest.order_time,
//             report_time: previousOrderedTest.report_time,
//             result: previousOrderedTest.result,
//             comment: previousOrderedTest.comment,
//             requested_by: previousOrderedTest.requested_by,
//             reported_by: previousOrderedTest.reported_by,
//             is_underpanel: previousOrderedTest.is_underpanel,
//             status: previousOrderedTest.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   OrderedTest.sync({ force: false, alter: false });
//   return OrderedTest;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class OrderedTest extends Model<
  InferAttributes<OrderedTest>,
  InferCreationAttributes<OrderedTest>
> {
  declare id: CreationOptional<number>;
  declare investigationOrder_id: number;
  declare serviceItem_id: number;
  declare order_time: Date;
  declare report_time?: Date;
  declare result?: string;
  declare comment?: string;
  declare requested_by: number;
  declare reported_by?: number;
  declare is_underpanel: boolean;
  declare status: "pending" | "completed";
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

OrderedTest.init(
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
      // Uncomment the references if needed
      // references: {
      //   model: "serviceitems",
      //   key: "id",
      // },
      // onDelete: "SET NULL",
    },
    order_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
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
      type: DataTypes.ENUM("pending", "completed"),
      allowNull: true,
      defaultValue: "pending",
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "orderedtest",
    tableName: "orderedtests",
    paranoid: true, // Enables soft deletes
    // hooks: {
    //   afterCreate: async (orderedTest, options) => {
    //     await sequelize.models.ordered_tests_audit.create({
    //       orderedTest_id: orderedTest.id,
    //       investigationOrder_id: orderedTest.investigationOrder_id,
    //       serviceItem_id: orderedTest.serviceItem_id,
    //       order_time: orderedTest.order_time,
    //       report_time: orderedTest.report_time,
    //       result: orderedTest.result,
    //       comment: orderedTest.comment,
    //       requested_by: orderedTest.requested_by,
    //       reported_by: orderedTest.reported_by,
    //       is_underpanel: orderedTest.is_underpanel,
    //       status: orderedTest.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (orderedTest, options) => {
    //     const previousOrderedTest = orderedTest._previousDataValues;
    //     await sequelize.models.ordered_tests_audit.create({
    //       orderedTest_id: previousOrderedTest.id,
    //       investigationOrder_id: previousOrderedTest.investigationOrder_id,
    //       serviceItem_id: previousOrderedTest.serviceItem_id,
    //       order_time: previousOrderedTest.order_time,
    //       report_time: previousOrderedTest.report_time,
    //       result: previousOrderedTest.result,
    //       comment: previousOrderedTest.comment,
    //       requested_by: previousOrderedTest.requested_by,
    //       reported_by: previousOrderedTest.reported_by,
    //       is_underpanel: previousOrderedTest.is_underpanel,
    //       status: previousOrderedTest.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// OrderedTest.sync({ force: false });

export default OrderedTest;
