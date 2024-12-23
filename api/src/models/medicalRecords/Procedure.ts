// module.exports = (sequilize, DataTypes) => {
//   const Procedure = sequilize.define("procedure", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     medical_record_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//     },
//     externalService_id: {
//       type: DataTypes.INTEGER,
//       allowNull: true,
//       references: {
//         model: "external_services",
//         key: "id",
//       },
//     },
//     is_internal_service: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//     created_by: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     serviceItem_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     note: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     status: {
//       type: DataTypes.BOOLEAN,
//       defaultValue: true,
//     },
//   });
//   Procedure.sync({ alter: false, force: false });
//   return Procedure;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index";

class Procedure extends Model<
  InferAttributes<Procedure>,
  InferCreationAttributes<Procedure>
> {
  declare id: CreationOptional<number>;
  declare medical_record_id?: number;
  declare externalService_id?: number;
  declare is_internal_service: boolean;
  declare created_by: number;
  declare serviceItem_id: number;
  declare note?: string;
  declare status?: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

Procedure.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    externalService_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "external_services",
        key: "id",
      },
    },
    is_internal_service: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    serviceItem_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: "procedure",
    tableName: "procedures",
    // Optionally, you can add hooks or other configurations here
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// Procedure.sync({ alter: false });

export default Procedure;
