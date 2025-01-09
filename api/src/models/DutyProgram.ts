// module.exports = (sequelize, DataTypes) => {
//   const DutyProgram = sequelize.define(
//     "dutyprogram",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//         allowNull: false,
//       },
//       weekStartDate: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       weekEndDate: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//       duty_week: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//           min: {
//             args: 1,
//             msg: "duty week must be greater than 0",
//           },
//           max: {
//             args: 52,
//             msg: "duty week must be less than 52",
//           },
//         },
//       },
//       year: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//           min: {
//             args: 2024,
//             msg: "year must be greater than 2024",
//           },
//         },
//       },
//       status: {
//         type: DataTypes.BOOLEAN,
//         allowNull: true,
//         defaultValue: true,
//       },
//     },
//     {
//       indexes: [
//         {
//           unique: true,
//           fields: ["duty_week", "year"],
//           name: "unique_duty_week_year",
//         },
//       ],
//     }
//   );
//   DutyProgram.sync({ alter: false, force: false });

//   return DutyProgram;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class DutyProgram extends Model<
  InferAttributes<DutyProgram>,
  InferCreationAttributes<DutyProgram>
> {
  declare id: CreationOptional<number>;
  declare weekStartDate: string; // DATEONLY as string
  declare weekEndDate: string; // DATEONLY as string
  declare duty_week: number;
  declare year: number;
  declare status?: boolean;
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

DutyProgram.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    weekStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    weekEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    duty_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "duty week must be greater than 0",
        },
        max: {
          args: [52],
          msg: "duty week must be less than 52",
        },
      },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [2024],
          msg: "year must be greater than or equal to 2024",
        },
      },
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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
    modelName: "dutyprogram",
    tableName: "dutyprograms",
    indexes: [
      {
        unique: true,
        fields: ["duty_week", "year"],
        name: "unique_duty_week_year",
      },
    ],
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// DutyProgram.sync({ alter: false, force: false });

export default DutyProgram;
