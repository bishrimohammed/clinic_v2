// module.exports = (sequelize, DataTypes) => {
//   const InvestigationOrder = sequelize.define(
//     "investigationorder",
//     {
//       medicalRecord_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "medicalrecords",
//           key: "id",
//         },
//         onDelete: "",
//       },
//       externalService_id: {
//         type: DataTypes.INTEGER,
//         allowNull: true,
//         references: {
//           model: "external_services",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//       },
//       is_internal_service: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true,
//       },
//       // clinical_finding: DataTypes.STRING,
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: true,
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
//         afterCreate: async (investigationOrder, options) => {
//           await sequelize.models.investigation_orders_audit.create({
//             investigationOrder_id: investigationOrder.id,
//             medicalRecord_id: investigationOrder.medicalRecord_id,
//             externalService_id: investigationOrder.externalService_id,
//             is_internal_service: investigationOrder.is_internal_service,
//             // clinical_finding: investigationOrder.clinical_finding,
//             status: investigationOrder.status,
//             operation_type: "I",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeUpdate: async (investigationOrder, options) => {
//           const previousValue = investigationOrder._previousDataValues;
//           await sequelize.models.investigation_orders_audit.create({
//             investigationOrder_id: previousValue.id,
//             medicalRecord_id: previousValue.medicalRecord_id,
//             externalService_id: investigationOrder.externalService_id,
//             is_internal_service: investigationOrder.is_internal_service,
//             // clinical_finding: previousValue.clinical_finding,
//             old_status: previousValue.status,
//             new_status: investigationOrder.status,
//             operation_type: "U",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//         beforeDestroy: async (investigationOrder, options) => {
//           await sequelize.models.investigation_orders_audit.create({
//             investigationOrder_id: investigationOrder.id,
//             medicalRecord_id: investigationOrder.medicalRecord_id,
//             externalService_id: investigationOrder.externalService_id,
//             is_internal_service: investigationOrder.is_internal_service,
//             // clinical_finding: investigationOrder.clinical_finding,
//             status: investigationOrder.status,
//             operation_type: "D",
//             changed_by: options.userId,
//             changed_at: Date.now(),
//           });
//         },
//       },
//     }
//   );
//   InvestigationOrder.sync({ force: false, alter: false });
//   return InvestigationOrder;
// };
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class InvestigationOrder extends Model<
  InferAttributes<InvestigationOrder>,
  InferCreationAttributes<InvestigationOrder>
> {
  declare id: CreationOptional<number>; // Assuming there's an auto-generated ID
  declare medicalRecord_id?: number;
  declare externalService_id?: number;
  declare is_internal_service: boolean;
  declare status?: boolean;
  declare deletedAt?: Date | null;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

InvestigationOrder.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medicalRecord_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "medicalrecords",
        key: "id",
      },
      // onDelete: "", // Specify onDelete behavior if needed
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
    modelName: "investigationorder",
    tableName: "investigationorders",
    paranoid: true, // Enables soft deletes
    // hooks: {
    //   afterCreate: async (investigationOrder, options) => {
    //     await sequelize.models.investigation_orders_audit.create({
    //       investigationOrder_id: investigationOrder.id,
    //       medicalRecord_id: investigationOrder.medicalRecord_id,
    //       externalService_id: investigationOrder.externalService_id,
    //       is_internal_service: investigationOrder.is_internal_service,
    //       status: investigationOrder.status,
    //       operation_type: "I",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeUpdate: async (investigationOrder, options) => {
    //     const previousValue = investigationOrder._previousDataValues;
    //     await sequelize.models.investigation_orders_audit.create({
    //       investigationOrder_id: previousValue.id,
    //       medicalRecord_id: previousValue.medicalRecord_id,
    //       externalService_id: investigationOrder.externalService_id,
    //       is_internal_service: investigationOrder.is_internal_service,
    //       old_status: previousValue.status,
    //       new_status: investigationOrder.status,
    //       operation_type: "U",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    //   beforeDestroy: async (investigationOrder, options) => {
    //     await sequelize.models.investigation_orders_audit.create({
    //       investigationOrder_id: investigationOrder.id,
    //       medicalRecord_id: investigationOrder.medicalRecord_id,
    //       externalService_id: investigationOrder.externalService_id,
    //       is_internal_service: investigationOrder.is_internal_service,
    //       status: investigationOrder.status,
    //       operation_type: "D",
    //       changed_by: options.userId,
    //       changed_at: new Date(),
    //     });
    //   },
    // },
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// InvestigationOrder.sync({ force: false });

export default InvestigationOrder;
