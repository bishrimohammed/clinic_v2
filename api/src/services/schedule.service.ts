import { Schedule } from "../models";
import { working_hourT } from "../types/clinic-profile";

export const updateWorkingHour = async (workHour: working_hourT) => {
  return await Schedule.update(
    {
      start_time: workHour.start_time,
      end_time: workHour.end_time,
    },
    {
      where: {
        id: workHour.id,
        day_of_week: workHour.day_of_week,
      },
    }
  );
};
