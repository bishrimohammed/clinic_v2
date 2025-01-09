// module.exports = (sequelize, DataTypes) => {
//   const MedicalRecordDocument = sequelize.define(
//     "medical_record_document",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       medical_record_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       document_name: {
//         type: DataTypes.STRING,
//         allowNull: true,
//       },
//       document_url: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       created_at: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW,
//       },

//       created_by: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//           model: "users",
//           key: "id",
//         },
//       },
//     },
//     {
//       //   freezeTableName: true,
//       timestamps: false,
//     }
//   );
//   MedicalRecordDocument.sync({ alter: false });
//   return MedicalRecordDocument;
// };
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class MedicalRecordDocument extends Model<
  InferAttributes<MedicalRecordDocument>,
  InferCreationAttributes<MedicalRecordDocument>
> {
  declare id: CreationOptional<number>;
  declare medical_record_id: number;
  declare document_name?: string;
  declare document_url: string;
  declare created_at: Date;
  declare created_by: number;
}

MedicalRecordDocument.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    medical_record_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    document_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    document_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "medical_record_document",
    tableName: "medical_record_documents",
    timestamps: false, // No automatic timestamps
    // freezeTableName: true, // Uncomment if you want to prevent pluralization
  }
);

// MedicalRecordDocument.sync({ alter: false });

export default MedicalRecordDocument;
