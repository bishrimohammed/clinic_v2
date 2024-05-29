import React from "react";
import { Table } from "react-bootstrap";
import { useGetDashboardDataDoctorWorkingHour } from "../../hooks/useGetDashboardDataDoctorWorkingHour";
import { format, parse } from "date-fns";
const DashboardDoctorWorkingHour = () => {
  const { data } = useGetDashboardDataDoctorWorkingHour();
  // console.log(data);

  return (
    <div className="p-3   bg-hrun-box hrunboxshadow mt-2">
      <h5 className="p-2 mb-0">Doctor's Working Hour</h5>
      <hr className="mt-0" />
      <div className="d-flex"></div>
      <Table responsive striped>
        <thead>
          <tr>
            {/* <td>#</td/> */}
            <th className=""> Doctor</th>
            <th>Today's Working Time</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((doctor, index) => (
            <tr key={doctor.id}>
              <td>
                Dr. {doctor.employee.firstName} {doctor.employee.middleName}
              </td>
              <td colSpan={2}>
                {doctor?.schedules.map((schedule, index) => (
                  <div>
                    {index + 1}.{" "}
                    {format(
                      parse(schedule.start_time, "HH:mm:ss", new Date()),
                      "h:mm a"
                    )}{" "}
                    -{" "}
                    {format(
                      parse(schedule.end_time, "HH:mm:ss", new Date()),
                      "h:mm a"
                    )}
                  </div>
                  // <td>{schedule.end_time}</td>
                ))}
              </td>

              {/* <td>{doctor.monday_end_time}</td>
              <td>{doctor.tuesday_start_time}</td>
              <td>{doctor.tuesday_end_time}</td> */}
            </tr>
          ))}
          {/* <tr>
            <td></td>
            <td></td>
            <td>start Tiem</td>
            <td>end Time</td>
            <td></td>
            <td></td>
          </tr> */}

          {/* <tr>
          <td>1</td>
          <td>Dr. 1</td>
          <td>Dr. 2</td>
          <td>2020-01-01</td>
          <td>10:00 AM</td>
          <td>
            <span className="">Done</span>
          </td>
        </tr> */}
        </tbody>
      </Table>
    </div>
  );
};

export default DashboardDoctorWorkingHour;
