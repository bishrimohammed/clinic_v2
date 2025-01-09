// const { sequelize } = require(".");

// module.exports = (sequelize, DataTypes) => {
//   const Duty = sequelize.define(
//     "duty",
//     {
//       id: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true,
//       },
//       user_id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//       },
//       day_of_week: {
//         type: DataTypes.ENUM,
//         allowNull: false,
//         values: [
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//           "Sunday",
//         ],
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
//       duty_year: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         validate: {
//           min: {
//             args: 2024,
//             msg: "duty year must be greater than or equal to 2024",
//           },
//         },
//       },
//       duty_date: {
//         type: DataTypes.DATEONLY,
//         allowNull: false,
//       },
//     },
//     {
//       indexes: [
//         {
//           unique: true,
//           fields: ["user_id", "day_of_week", "duty_week", "duty_year"],
//         },
//       ],
//     }
//   );
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class Duty extends Model<InferAttributes<Duty>, InferCreationAttributes<Duty>> {
  declare id: CreationOptional<number>;
  declare user_id: number;
  declare day_of_week:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  declare duty_week: number;
  declare duty_year: number;
  declare duty_date: string; // DATEONLY as string
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;
}

Duty.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    day_of_week: {
      type: DataTypes.ENUM(
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
      ),
      allowNull: false,
    },
    duty_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          // args: 1,
          msg: "duty week must be greater than 0",
          args: [0],
        },
        max: {
          args: [52],
          msg: "duty week must be less than 52",
        },
      },
    },
    duty_year: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [2024],
          msg: "duty year must be greater than or equal to 2024",
        },
      },
    },
    duty_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
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
    modelName: "duty",
    tableName: "dutys",
    indexes: [
      {
        unique: true,
        fields: ["user_id", "day_of_week", "duty_week", "duty_year"],
      },
    ],
  }
);

export default Duty;
