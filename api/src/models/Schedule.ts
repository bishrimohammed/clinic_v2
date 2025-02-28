import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  Op,
} from "sequelize";
import sequelize from "../db/index"; // Ensure the correct path

class Schedule extends Model<
  InferAttributes<Schedule>,
  InferCreationAttributes<Schedule>
> {
  declare id: CreationOptional<number>;
  declare clinic_id?: number | null; // Can be null
  declare doctor_id?: number | null; // Can be null
  declare day_of_week:
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday";
  declare start_time: string; // Time type
  declare end_time: string; // Time type
  declare createdAt?: CreationOptional<Date>;
  declare updatedAt?: CreationOptional<Date>;

  // Method to check for schedule overlap
  // checkScheduleOverlap(value: string) {
  //   const whereClause: any = {
  //     id: { [Op.ne]: this.id },
  //     day_of_week: this.day_of_week,
  // [Op.or]: [
  //   {
  //     start_time: { [Op.lt]: value },
  //     end_time: { [Op.gt]: value },
  //   },
  //   {
  //     start_time: { [Op.lt]: this.end_time },
  //     end_time: { [Op.gt]: this.end_time },
  //   },
  //   {
  //     start_time: { [Op.gte]: value },
  //     end_time: { [Op.lte]: this.end_time },
  //   },
  // ],
  //   };

  //   // Check if doctor_id is not null before adding it to the whereClause
  //   if (this.doctor_id) {
  //     whereClause.doctor_id = { [Op.eq]: this.doctor_id };
  //     const existingSchedule = await Schedule.findOne({
  //       where: whereClause,
  //     });
  //     if (existingSchedule) {
  //       throw new Error("Work Hour overlap detected");
  //     }
  //   }
  // }
}

Schedule.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    clinic_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
    start_time: {
      type: DataTypes.TIME,
      allowNull: false,
      // validate: {
      //   async checkOverlap(value: string) {
      //     await this.checkScheduleOverlap(value);
      //   },
      // },
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "schedules",
    timestamps: true,
  }
);

Schedule.sync({ alter: false, force: false });

export default Schedule;
