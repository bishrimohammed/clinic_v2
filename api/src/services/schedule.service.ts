import { Schedule } from "../models";
import { working_hourT } from "../types/clinic-profile";
import { addDoctorWorkingHoursInput } from "../types/user";

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

export const createDoctorWorkingHour = async (
  data: addDoctorWorkingHoursInput & { doctorId: number }
) => {
  const { day_of_week, doctorId, end_time, start_time } = data;
  const schedule = await Schedule.create({
    day_of_week,
    end_time,
    start_time,
    doctor_id: doctorId,
  });
  return;
};
