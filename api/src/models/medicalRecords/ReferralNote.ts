// module.exports = (sequilize, DataTypes) => {
//   const ReferralNote = sequilize.define("referral_note", {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     medical_record_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     patient_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     doctor_id: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     referral_date: {
//       type: DataTypes.DATE,
//       allowNull: false,
//     },
//     reason_for_referral: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     referral_to: {
//       type: DataTypes.TEXT,
//       allowNull: false,
//     },
//     department: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     clinical_finding: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },
//     // status: {
//     //   type: DataTypes.STRING,
//     //   defaultValue: "pending",
//     //   allowNull: false,
//     // },
//     // completed_date: {
//     //   type: DataTypes.DATE,
//     // },
//     // follow_up_date: {
//     //   type: DataTypes.DATE,
//     // },
//     // follow_up_status: {
//   });
//   ReferralNote.sync({ alter: false, force: false });
//   return ReferralNote;
// };

import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
} from "sequelize";
import sequelize from "../../db/index"; // Ensure the correct path

class ReferralNote extends Model<
  InferAttributes<ReferralNote>,
  InferCreationAttributes<ReferralNote>
> {
  declare id: CreationOptional<number>;
  declare medical_record_id: number;
  declare patient_id: number;
  declare doctor_id: number;
  declare referral_date: Date;
  declare reason_for_referral: string;
  declare referral_to: string;
  declare department?: string;
  declare clinical_finding?: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  // Additional fields can be added as needed
}

ReferralNote.init(
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
    patient_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    referral_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason_for_referral: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    referral_to: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    department: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    clinical_finding: {
      type: DataTypes.TEXT,
      allowNull: true,
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
    modelName: "referral_note",
    tableName: "referral_notes",
    timestamps: true,
    // Optionally add hooks or other configurations here
  }
);

// Syncing the model is generally done in the database initialization
// Commented out to avoid potential issues during migrations
// ReferralNote.sync({ alter: false });

export default ReferralNote;
